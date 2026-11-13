/**
 * AppFolio Database API adapter.
 *
 * Two functions the site uses:
 *   getListings()  — advertised units, for the Available Units grid
 *   createLead()   — write a guest card from a site form
 *
 * With no credentials in the environment, both fall back to mock data so the
 * site builds and runs today. Endpoint paths below are placeholders to be
 * confirmed against the Database API docs once AppFolio's integrations team
 * runs the enablement call; the shape of `Listing` matches what John described
 * (rent, availability, beds/baths, sq ft, title, description, amenities,
 * photos, application link, contact).
 */

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
  propertyId?: string;
  source: 'website' | 'waitlist' | 'sms';
  smsConsent: boolean;
};

const env = import.meta.env;
const configured = Boolean(env.APPFOLIO_CLIENT_ID && env.APPFOLIO_CLIENT_SECRET && env.APPFOLIO_DATABASE);

function authHeader() {
  const token = Buffer.from(`${env.APPFOLIO_CLIENT_ID}:${env.APPFOLIO_CLIENT_SECRET}`).toString('base64');
  return { Authorization: `Basic ${token}`, Accept: 'application/json' };
}

export async function getListings(): Promise<Listing[]> {
  if (!configured) return mockListings;
  const base = env.APPFOLIO_API_BASE ?? 'https://api.appfolio.com';
  const res = await fetch(`${base}/api/v2/databases/${env.APPFOLIO_DATABASE}/listings`, {
    headers: authHeader(),
  });
  if (!res.ok) throw new Error(`AppFolio listings ${res.status}`);
  const data = await res.json();
  return (data.results ?? data).map(normalizeListing);
}

export async function createLead(lead: LeadInput): Promise<{ ok: boolean; id?: string }> {
  if (!configured) {
    console.log('[mock] lead', lead);
    return { ok: true, id: 'mock' };
  }
  const base = env.APPFOLIO_API_BASE ?? 'https://api.appfolio.com';
  const res = await fetch(`${base}/api/v2/databases/${env.APPFOLIO_DATABASE}/leads`, {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: lead.firstName,
      last_name: lead.lastName,
      email: lead.email,
      phone_number: lead.phone,
      move_in_date: lead.moveInDate,
      bedrooms: lead.bedrooms,
      budget: lead.budget,
      property_id: lead.propertyId,
      source: `anchorrentalshawaii.com/${lead.source}`,
      notes: lead.smsConsent ? 'SMS consent given on website form' : undefined,
    }),
  });
  if (!res.ok) return { ok: false };
  const data = await res.json();
  return { ok: true, id: data.id };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeListing(r: any): Listing {
  return {
    id: String(r.id),
    propertyName: r.property_name ?? r.marketing_title ?? '',
    address: r.address ?? '',
    unit: r.unit ?? r.unit_name ?? '',
    bedrooms: Number(r.bedrooms ?? 0),
    bathrooms: Number(r.bathrooms ?? 0),
    squareFeet: r.square_feet ? Number(r.square_feet) : null,
    rent: Number(r.advertised_rent ?? r.rent ?? 0),
    availableOn: r.available_date ?? r.availability_date ?? '',
    title: r.marketing_title ?? '',
    description: r.marketing_description ?? '',
    amenities: r.amenities ?? [],
    photos: (r.photos ?? []).map((p: any) => ({ full: p.full_url ?? p.url, thumb: p.thumbnail_url ?? p.url })),
    applicationUrl: r.application_url ?? env.PUBLIC_APPLY_URL ?? '#',
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
    applicationUrl: env.PUBLIC_APPLY_URL ?? '#',
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
    applicationUrl: env.PUBLIC_APPLY_URL ?? '#',
  },
];
