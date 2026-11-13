# Anchor Rentals — anchorrentalshawaii.com

Astro 5 site, deployed on Vercel. AppFolio (Plus + Database API) is the system of record for listings, applications, portals and leads.

## Run locally
```
npm install
cp .env.example .env   # fill in once AppFolio credentials arrive
npm run dev            # http://localhost:4321
npm run build
```

## How AppFolio is wired
- `src/lib/appfolio.ts` — the only file that talks to AppFolio.
  - `getListings()` → Database API **Listings** endpoint → "Available units" grid (home, /units, each building page). With no credentials it returns `mockListings`.
  - `createLead()` → Database API **leads** write → every waitlist form on the site posts here via `/api/lead`. Mock mode just logs.
  - Endpoint paths are placeholders until the enablement call; adjust `normalizeListing()` to the real field names.
- `/api/lead` (`src/pages/api/lead.ts`) is the one server-rendered route (needs the Vercel adapter). Everything else is static.
- "Apply" and "Resident login" link to AppFolio-hosted pages set in `.env` (`PUBLIC_APPLY_URL`, `PUBLIC_RESIDENT_PORTAL_URL`).

## Content you'll edit
- `src/data/buildings.ts` — the five buildings (EN + JA blurbs, status). Add new buildings here; pages generate automatically at `/buildings/<slug>/`.
- `src/data/incomeLimits.ts` — DPP 80% AMI table. Update every spring from honolulu.gov/dpp.
- `src/i18n.ts` — all homepage copy, English and Japanese.
- `public/images/` — drop `hero.jpg` and `<slug>.jpg` per building; the site shows a colored block until they exist.

## Pages
`/` · `/ja/` · `/units/` · `/buildings/` · `/buildings/<slug>/` · `/eligibility/` (DPP table + quick-check calculator) · `/about/` · `/privacy/` (incl. SMS/TCPA terms and fair-housing statement)

## Deploy
Push to GitHub → import in Vercel → set the env vars from `.env.example` → add `anchorrentalshawaii.com` under Domains. Google Workspace MX/SPF/DKIM/DMARC records go in the same DNS panel.

## Word list
Never "affordable" in site copy. Use "workforce," "income-qualified," "rent-restricted," or plain language.
