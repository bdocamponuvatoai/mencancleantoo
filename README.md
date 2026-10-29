# Men Can Clean Too!

Marketing site for **Men Can Clean Too!**, a home and business cleaning company in Springfield, Missouri. It is built with Next.js (App Router) and exported as a fully static site.

The site does not take bookings, payments or form submissions. Booking, walkthrough requests and nominations link to the company's existing website (mencancleantoo.com). The cleaning-plan builder runs entirely in the browser and only prepares a brief that the visitor can download or send from their own email app.

## Getting started

Requires Node.js 20.9 or newer (`.nvmrc` pins the current LTS, 24).

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Script                 | What it does                                                                                                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`          | Development server with hot reload.                                                                                                                                              |
| `npm run build`        | Static export to `out/`. Runs `postbuild` automatically.                                                                                                                         |
| `postbuild`            | `scripts/fix-export-segments.mjs`: flattens prefetch files that Next.js nests on Windows (see the file).                                                                         |
| `npm run images`       | Writes resized copies of `src/assets/images/*` to `public/images/` (`-- --check` only verifies; `check` runs it). Run after adding or replacing an image, and commit the output. |
| `npm run preview`      | Serves `out/` locally with `npx serve@14` (not a project dependency).                                                                                                            |
| `npm run lint`         | ESLint (`eslint-config-next`, core web vitals + TypeScript).                                                                                                                     |
| `npm run typecheck`    | `next typegen` (route types such as `PageProps`) then `tsc --noEmit`.                                                                                                            |
| `npm run format`       | Prettier, write.                                                                                                                                                                 |
| `npm run format:check` | Prettier, check only.                                                                                                                                                            |
| `npm run check`        | `typecheck` + `lint` + `format:check`. CI runs this.                                                                                                                             |

## Structure

```
src/
  app/            Routes (one folder each), root layout, not-found, icon.svg, robots.ts, sitemap.ts
    services/[slug]/   Six service pages from generateStaticParams (dynamicParams = false)
  components/
    layout/       SiteHeader (client: mobile menu), SiteFooter, ScrollEffects (client: header state, progress line, scroll reveal)
    sections/     ClosingCta, ServiceCard, Reviews (shared sections)
    home/         Finder and BeforeAfter (client widgets)
    plan/         PlanBuilder (client: four-step form), PlanFromQuery (?service= preset)
    ui/           Icon (Spark, Arrow), SmartLink, ButtonLink, TextLink, Lines, Brand
    seo/          JsonLd
  config/
    site.ts       Business details and navigation (safe for client code)
    deployment.ts SITE_URL / SITE_INDEXABLE (server only)
  content/        Typed copy: services, FAQ, finder options, plan options, Google reviews
  lib/            metadata builder, plan summary / mailto builder, image loader
  styles/         globals.css imports ordered partials (base, components, layout, sections, pages),
                  then enhancements/ (polish.css, motion.css) last
  assets/         images/ and fonts/ (static imports)
scripts/          fix-export-segments.mjs, generate-image-variants.mjs
public/images/    resized photo and logo variants (generated, committed)
docs/             content-sources.md (provenance), verification.md (migration parity results)
```

## Conventions

- **Server Components by default.** Only the mobile menu, the scroll effects, the home finder, the before/after slider and the plan builder are client components.
- **Copy lives in `src/content/`** and business facts in `src/config/site.ts`. Don't add facts (hours, prices, reviews, years, certifications) that the company hasn't supplied.
- **CSS is global and class-based**, split into partials under `src/styles/`. The import order in `globals.css` matters: rules of equal specificity depend on it. Fonts are referenced through `var(--font)` / `var(--font-serif)`, never by family name.
- **Text nodes:** where literal text sits next to an interpolation, render one template string (`{`Call ${phone}`}`) so the DOM has one text node. Lines broken with `<br>` keep a leading space on the next line (see `ui/Lines.tsx`), because some breakpoints hide the `<br>`.
- **Links:** use `SmartLink`/`ButtonLink`/`TextLink`. Internal paths go through `next/link`; `tel:`, `mailto:`, `#` and external URLs stay plain anchors.
- **Images:** `next/image` with static imports and a `sizes` hint. The above-the-fold image on each page gets `loading="eager" fetchPriority="high"`. A static export has no image server, so `src/lib/image-loader.ts` points each `srcset` width at a committed file, `public/images/<name>-w<width>.webp`, generated by `npm run images` (never enlarging). They are plain public files on purpose: hosts such as Vercel deploy Next.js’s own build output, so files written into `out/` after the build would not ship. In `next dev` the loader returns the original file.
- **Motion** lives in `src/styles/enhancements/motion.css`, inside `@media (prefers-reduced-motion: no-preference)`, so visitors who ask for less motion get a static page. Scroll reveal is added by `ScrollEffects` only after it runs: without JavaScript every block is visible. To reveal a new block on scroll, add its selector to the `REVEAL` list in `ScrollEffects.tsx`.

## Google reviews

The home page has a reviews section that stays hidden while `src/content/reviews.ts` is empty.

1. Open the company on Google Maps (`googleReviewsUrl` in that file).
2. Copy each review **verbatim**: the name as Google shows it, the star rating, the month posted and the text. Never reword, shorten or combine reviews, and never add one that isn’t on Google.
3. Optionally copy the overall rating and review count into `googleRating`, exactly as Google shows them.
4. Get the owner’s OK to feature reviews on the site.

The site does **not** add review structured data (`aggregateRating`): Google doesn’t show self-published review markup for local businesses.

## Routes

| Route                                                                                                                      | Page                                                           |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `/`                                                                                                                        | Home                                                           |
| `/services/`                                                                                                               | All services                                                   |
| `/services/{recurring-cleaning, deep-cleaning, move-cleaning, commercial-cleaning, rental-turnovers, appliance-cleaning}/` | Service details                                                |
| `/about/`                                                                                                                  | Our story and Bless a Neighbor                                 |
| `/contact/`                                                                                                                | Contact and service area                                       |
| `/plan/`                                                                                                                   | Cleaning-plan builder (`?service=<slug>` preselects a service) |
| `/privacy/`                                                                                                                | Privacy and preview information                                |
| `/robots.txt`, `/sitemap.xml`                                                                                              | Generated from `src/app/robots.ts` and `sitemap.ts`            |
| anything else                                                                                                              | Styled 404 (`src/app/not-found.tsx`)                           |

## Configuration

Copy `.env.example` to `.env.local` for local overrides. Both variables are read at build time.

| Variable         | Default                                                                          | Purpose                                                                                                                                                                                        |
| ---------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`       | `https://$VERCEL_PROJECT_PRODUCTION_URL` on Vercel, else `http://localhost:3000` | Origin for canonical URLs, Open Graph, JSON-LD, robots.txt and sitemap.xml. A trailing slash is stripped.                                                                                      |
| `SITE_INDEXABLE` | `false`                                                                          | `"true"` allows search engines (index/follow + robots.txt Allow + sitemap). Anything else: `noindex, nofollow` and `Disallow: /`. The build **fails** if `true` while `SITE_URL` is localhost. |

## Before launch

- [ ] Owner approves the content, the redesign, the AI-generated lifestyle photos (or supplies real ones) and use of the logo.
- [ ] Confirm the street address: the brief says **824 S Fort Ave**, the company's current site says **1824 S Fort Ave** (see `docs/content-sources.md`). Then add `streetAddress`/`postalCode` to the JSON-LD in `src/app/layout.tsx`.
- [ ] Decide whether the remaining preview wording stays (FAQ "Is my booking confirmed in this preview?", the privacy page's "preview" sections, the footer "Privacy & preview information" link).
- [ ] Add the real Google reviews (see “Google reviews”) or leave the section hidden.
- [ ] Confirm the booking, walkthrough and nomination links still point at the right pages on mencancleantoo.com.
- [ ] Set `SITE_URL` to the real domain and, only after approval, `SITE_INDEXABLE=true`. Redeploy.
- [ ] Check robots.txt, sitemap.xml and canonical tags on the live domain, run Lighthouse on the live site, and submit the sitemap in Google Search Console.

## CI

`.github/workflows/ci.yml` runs on pushes to `main` and on pull requests: `npm ci` → `npm run check` → `npm run build`, then uploads `out/` as the `site` artifact. Dependabot (`.github/dependabot.yml`) opens weekly npm updates (Next/React/types grouped) and monthly GitHub Actions updates.

## Hosting

The build output is plain static files in `out/`, so any static host works. The project is set up for **Vercel**:

- Framework preset: Next.js (static export is detected from `output: "export"`; output directory `out`).
- `vercel.json` adds security headers to every response: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` and `Strict-Transport-Security`. There is deliberately no Content-Security-Policy yet. Next.js inlines bootstrap scripts, so a CSP needs hashes or `'unsafe-inline'` and must be tested before it's added.
- Environment: Preview deployments keep `SITE_INDEXABLE=false`. Production gets `SITE_URL=<real domain>`, and `SITE_INDEXABLE=true` only after the owner approves launch.

### Deployment

Not yet deployed. Once the project is imported into Vercel, put the preview URL here.
