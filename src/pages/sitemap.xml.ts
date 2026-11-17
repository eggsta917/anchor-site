import type { APIRoute } from 'astro';
import { buildings } from '../data/buildings';
export const GET: APIRoute = () => {
  const site = 'https://anchorrentalshawaii.com';
  const urls = ['/', '/ja/', '/units/', '/buildings/', '/eligibility/', '/about/', '/privacy/', ...buildings.map((b) => `/buildings/${b.slug}/`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${site}${u}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
