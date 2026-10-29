# Areen Stay

Website for **areenstay.com**, Areen Albasateen Hotel (أرين البساتين), Jeddah.
"More than a stay" / "إقامة .. بتجربة تتجاوز التوقعات".

## Stack

Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · lucide-react · Lenis (smooth scroll).
Fonts: Tajawal (Arabic) and Montserrat (English) via `next/font`.

```bash
npm install
npm run dev   # http://localhost:3000 -> redirects to /ar or /en
```

## Languages

Every page exists at `/ar/...` (right-to-left) and `/en/...`. `middleware.ts` sends visitors without a language in the URL to:
their saved choice (cookie set by the language switch) → Arabic for visitors in Saudi Arabia (Vercel geo header) → their browser language → Arabic.

## Pages

| URL | File |
| --- | --- |
| `/` home | `app/[locale]/page.tsx` |
| `/rooms`, `/rooms/[slug]` | `app/[locale]/rooms/` |
| `/dining`, `/offers`, `/gallery`, `/location` | `app/[locale]/*/page.tsx` |
| `/umrah`, `/corporate` | share `components/feature-page.tsx` |
| `/brand` brand guide (not indexed) | `app/[locale]/brand/page.tsx` |

## Editing content

All text, rooms, prices and contact details live in `content/`, in both languages:

- `content/site.ts`: phone, WhatsApp, email, address, social links, booking-site listings, and all shared UI text. Values marked `TODO` are placeholders.
- `content/rooms.ts`, `content/dining.ts`, `content/offers.ts`: one entry per room / venue / offer.
- `content/pages.ts`: intro text for the inner pages, Umrah and business features, gallery captions, drive times.

## Photos

Every image slot uses `components/photo.tsx`: a branded placeholder with the photo on top. For now the photos are **temporary Unsplash fillers**, all listed in `content/stock.ts`; if one fails to load, the placeholder shows.
To add real photos, put them in `public/photos/` and swap the paths in the content files (e.g. `images: ["/photos/rooms/deluxe-1.jpg"]` in `content/rooms.ts`), or point the keys in `content/stock.ts` at the new files.

## Booking

Until a booking engine is chosen, the booking form opens WhatsApp with the dates, guests and room filled in (`components/booking-bar.tsx`). Phones also get a pinned bar with Call / WhatsApp / Book (`components/mobile-book-bar.tsx`). To connect an engine later, replace `onSubmit` in the booking bar with a redirect to its URL.

## Logo

`components/areen-logo.tsx` is the logo drawn in code (variants `lockup`, `horizontal`, `mark`). Every part has a `data-part` and every letter is its own path, so it can be animated. Intro, star twinkle and hover shimmer are in `components/areen-logo.css`.
Files: `public/brand/*.svg`, PNG/white/gold/avatar exports in `public/brand/export/`, favicon in `app/icon.png`. Regenerate with `scripts/logo/` (see its README). Preview everything at `/en/brand`.

## SEO

Per-page titles and descriptions with `ar`/`en` alternates (`lib/seo.ts`), schema.org `Hotel` data in the layout, `sitemap.xml`, `robots.txt`, and a share image at `public/og.png`.

## Deploying

Built for Vercel: import the repo, then add `areenstay.com` under Project → Domains. The Saudi-visitor language detection uses Vercel's geo header; on other hosts it falls back to browser language.
