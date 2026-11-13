import type { APIRoute } from 'astro';
import { createLead } from '../../lib/appfolio';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response('Bad request', { status: 400 });
  }
  const phone = String(body.phone ?? '').replace(/[^\d+]/g, '');
  if (!body.firstName || phone.length < 10) return new Response('Missing fields', { status: 422 });

  const result = await createLead({
    firstName: String(body.firstName).slice(0, 80),
    lastName: String(body.lastName ?? '-').slice(0, 80),
    email: body.email ? String(body.email).slice(0, 120) : undefined,
    phone,
    moveInDate: body.moveInDate,
    bedrooms: body.bedrooms ? Number(body.bedrooms) : undefined,
    budget: body.budget ? Number(body.budget) : undefined,
    propertyId: body.propertyId,
    source: body.source === 'website' ? 'website' : 'waitlist',
    smsConsent: Boolean(body.smsConsent),
  });

  return new Response(JSON.stringify(result), {
    status: result.ok ? 200 : 502,
    headers: { 'Content-Type': 'application/json' },
  });
};
