/**
 * AppFolio Database API adapter (v0).
 * Docs: https://developer.appfolio.com/api_documentation/database
 *
 * Two functions the site uses:
 *   getListings()  — advertised units, for the Available Units grid
 *   createLead()   — write a lead (guest card) from a site form
 *
 * Base URL  https://api.appfolio.com/api/v0/{endpoint}
 * Auth      OAuth 2.0 client credentials (token from /oauth/token, valid ~5 min)
 *           with X-AppFolio-Developer-ID and X-AppFolio-Database-ID headers.
 *           Set APPFOLIO_AUTH=basic to use the deprecated HTTP Basic scheme
 *           (Developer ID header only; AppFolio retires it March 1, 2027).
 *
 * With credentials missing, or if AppFolio returns an error at build time,
 * getListings() falls back to mock data so the site still builds.
 */
import { buildings } from '../data/buildings';

export type Listing = {
  id: string;
  propertyName: string;
  address: string;
  unit: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number | null;
  rent: number;
  availableOn: string; // ISO date
  title: string;
  description: string;
  amenities: string[];
  photos: { full: string; thumb: string }[];
  applicationUrl: string;
};

export type LeadInput = {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  moveInDate?: string;
  bedrooms?: number;
  budget?: number;
  /** building slug from the site, or an AppFolio property UUID */
  propertyId?: string;
  source: 'website' | 'waitlist' | 'sms';
  smsConsent: boolean;
};

const penv = (typeof process !== 'undefined' ? process.env : {}) as Record<string, string | undefined>;
const get = (k: string): string | undefined => (import.meta.env as Record<string, string | undefined>)[k] ?? penv[k];

const CLIENT_ID = get('APPFOLIO_CLIENT_ID');
const CLIENT_SECRET = get('APPFOLIO_CLIENT_SECRET');
const DEVELOPER_ID = get('APPFOLIO_DEVELOPER_ID');
const DATABASE_ID = get('APPFOLIO_DATABASE_ID');
const AUTH_MODE = (get('APPFOLIO_AUTH') ?? 'oauth').toLowerCase();
const HOST = (get('APPFOLIO_API_BASE') ?? 'https://api.appfolio.com').replace(/\/+$/, '');
const API = `${HOST}/api/v0`;
const SITE_LIVE = get('PUBLIC_SITE_LIVE') === 'true';

const configured = Boolean(
  CLIENT_ID && CLIENT_SECRET && DEVELOPER_ID && (AUTH_MODE === 'basic' || DATABASE_ID),
);

let cachedToken: { value: string; expires: number } | null = null;

async function accessToken(): Promise<string> {
  if (cachedToken && cachedToken.expires > Date.now() + 15_000) return cachedToken.value;
  const res = await fetch(`${HOST}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID!,
      client_secret: CLIENT_SECRET!,
    }),
  });
  if (!res.ok) throw new Error(`AppFolio token ${res.status}`);
  const data = await res.json();
  cachedToken = { value: data.access_token, expires: Date.now() + Number(data.expires_in ?? 300) * 1000 };
  return cachedToken.value;
}

async function headers(): Promise<Record<string, string>> {
  const h: Record<string, string> = { Accept: 'application/json', 'X-AppFolio-Developer-ID': DEVELOPER_ID! };
  if (AUTH_MODE === 'basic') {
    h.Authorization = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`;
  } else {
    h.Authorization = `Bearer ${await accessToken()}`;
    h['X-AppFolio-Database-ID'] = DATABASE_ID!;
  }
  return h;
}

/** GET a list endpoint, following next_page_path until the last page. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getAll(path: string): Promise<any[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: any[] = [];
  let next: string | null = path;
  for (let page = 0; next && page < 20; page++) {
    const url: string = next.startsWith('/api/') ? `${HOST}${next}` : `${API}${next}`;
    const res = await fetch(url, { headers: await headers() });
    if (!res.ok) throw new Error(`AppFolio GET ${path} ${res.status}`);
    const body = await res.json();
    out.push(...(body.data ?? []));
    next = body.next_page_path ?? null;
  }
  return out;
}

const street = (a: string) => a.split(',')[0].trim().toLowerCase();

function buildingFor(address1: string) {
  const a = (address1 ?? '').trim().toLowerCase();
  // match on house number + first street word, e.g. "1568 pensacola"
  return buildings.find((b) => {
    const [num, word] = street(b.address).split(/\s+/);
    return a.startsWith(`${num} ${word}`) || a.includes(`${num} ${word}`);
  });
}

let listingsOnce: Promise<Listing[]> | null = null;

/** One AppFolio call per build/process, shared by every page. */
export function getListings(): Promise<Listing[]> {
  return (listingsOnce ??= fetchListings());
}

async function fetchListings(): Promise<Listing[]> {
  if (!configured) return mockListings;
  try {
    // LastUpdatedAtFrom is a required filter; a far-past date returns every current listing.
    const rows = await getAll('/listings?filters[LastUpdatedAtFrom]=2020-01-01T00:00:00Z');
    const live = rows.filter((r) => r.PostedToWebsite !== false).map(normalizeListing);
    // Before launch, keep the placeholder cards until real listings exist in AppFolio.
    if (live.length === 0 && !SITE_LIVE) return mockListings;
    return live;
  } catch (err) {
    console.error('[appfolio] listings failed, using mock data:', (err as Error).message);
    return mockListings;
  }
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
let propertyIdCache: Record<string, string> | null = null;

/** Site building slug -> AppFolio property UUID. */
async function resolvePropertyId(slugOrId?: string): Promise<string | undefined> {
  if (slugOrId && UUID.test(slugOrId)) return slugOrId;
  if (!propertyIdCache) {
    propertyIdCache = {};
    // Optional explicit map: APPFOLIO_PROPERTY_IDS={"makiki-banyan":"<uuid>",...}
    try {
      Object.assign(propertyIdCache, JSON.parse(get('APPFOLIO_PROPERTY_IDS') ?? '{}'));
    } catch {
      /* ignore malformed map */
    }
    try {
      const props = await getAll('/properties?filters[LastUpdatedAtFrom]=2000-01-01T00:00:00Z');
      const norm = (v: string) => (v ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
      // 1) exact name match (e.g. "Piikoi Flats"), so an older record at the same
      //    street address (the former "1525 Piikoi St" building) is never picked.
      for (const b of buildings) {
        const hit = props.find((p) => norm(p.Name) === norm(b.name));
        if (hit && !propertyIdCache[b.slug]) propertyIdCache[b.slug] = hit.Id;
      }
      // 2) otherwise by address, but only properties still under management.
      for (const p of props) {
        if (p.ManagementEndDate) continue;
        const b = buildingFor(p.Address1 ?? '');
        if (b && !propertyIdCache[b.slug]) propertyIdCache[b.slug] = p.Id;
      }
    } catch (err) {
      console.error('[appfolio] property lookup failed:', (err as Error).message);
    }
  }
  return (slugOrId && propertyIdCache[slugOrId]) || get('APPFOLIO_DEFAULT_PROPERTY_ID');
}

export async function createLead(lead: LeadInput): Promise<{ ok: boolean; id?: string; error?: string }> {
  if (!configured) {
    console.log('[mock] lead', lead);
    return { ok: true, id: 'mock' };
  }
  try {
    const PropertyId = await resolvePropertyId(lead.propertyId);
    if (!PropertyId) {
      console.error('[appfolio] lead not sent: no AppFolio property for', lead.propertyId ?? '(none)', lead);
      return { ok: false, error: 'no-property' };
    }
    const source = `anchorrentalshawaii.com/${lead.source}`;
    const note = lead.smsConsent
      ? 'Submitted on anchorrentalshawaii.com. SMS consent given on the website form.'
      : 'Submitted on anchorrentalshawaii.com. No SMS consent given.';
    const body = {
      FirstName: lead.firstName,
      LastName: lead.lastName,
      PropertyId,
      Email: lead.email,
      PhoneNumber: lead.phone,
      DesiredMoveIn: lead.moveInDate,
      Bedrooms: lead.bedrooms,
      MaxRent: lead.budget != null ? String(lead.budget) : undefined,
      Source: source,
      Messages: [{ PropertyId, Message: note, Source: source, Timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') }],
    };
    const res = await fetch(`${API}/leads`, {
      method: 'POST',
      headers: { ...(await headers()), 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error('[appfolio] lead failed', res.status, await res.text().catch(() => ''), lead);
      return { ok: false, error: `appfolio-${res.status}` };
    }
    const data = await res.json();
    return { ok: true, id: data.Id };
  } catch (err) {
    console.error('[appfolio] lead error', (err as Error).message, lead);
    return { ok: false, error: 'exception' };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeListing(r: any): Listing {
  const b = buildingFor(r.Address1 ?? '');
  const rent = Number(r.ListedRent ?? r.LowAdvertisedRent ?? r.AdvertisedRent ?? 0);
  return {
    id: String(r.Id),
    propertyName: b?.name ?? r.PropertyMarketingTitle ?? '',
    address: r.Address1 ?? '',
    unit: r.Address2 ?? r.UnitType ?? '',
    bedrooms: Number(r.Bedrooms ?? 0),
    bathrooms: Number(r.Bathrooms ?? 0),
    squareFeet: r.SquareFeet ? Number(r.SquareFeet) : null,
    rent: Number.isFinite(rent) ? rent : 0,
    availableOn: r.AvailableOn ?? '',
    title: r.MarketingTitle ?? '',
    description: r.MarketingDescription ?? '',
    amenities: r.UnitAmenities ?? [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    photos: (r.UnitPhotos ?? []).map((p: any) => ({ full: p.Url, thumb: p.ThumbnailUrl ?? p.Url })),
    applicationUrl: r.ApplicationURL ?? get('PUBLIC_APPLY_URL') ?? '#',
  };
}

export const mockListings: Listing[] = [
  {
    id: 'mb-1br',
    propertyName: 'Makiki Banyan',
    address: '1568 Pensacola St',
    unit: '1 bd',
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 350,
    rent: 0,
    availableOn: '2027-01-01',
    title: 'One-bedroom at Makiki Banyan',
    description: 'New one-bedroom in Makiki.',
    amenities: ['Air conditioning', 'In-unit laundry hookup', 'Secured entry'],
    photos: [{ full: '/images/unit-1br.jpg', thumb: '/images/unit-1br.jpg' }],
    applicationUrl: get('PUBLIC_APPLY_URL') ?? '#',
  },
  {
    id: 'mb-2br',
    propertyName: 'Makiki Banyan',
    address: '1568 Pensacola St',
    unit: '2 bd',
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 695,
    rent: 0,
    availableOn: '2027-01-01',
    title: 'Two-bedroom at Makiki Banyan',
    description: 'New two-bedroom in Makiki.',
    amenities: ['Air conditioning', 'Secured entry'],
    photos: [{ full: '/images/unit-1br.jpg', thumb: '/images/unit-1br.jpg' }],
    applicationUrl: get('PUBLIC_APPLY_URL') ?? '#',
  },
];
