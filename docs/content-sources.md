# Content and asset provenance

Research date: 2026-10-29.

## User-provided facts

- Business: Men Can Clean Too!
- Owner: Mark (no surname or invented biography added)
- Address: 824 S Fort Ave, Springfield, MO 65807
- Phone: 417-719-1380
- Email: contact@mencancleantoo.com

## Official sources

- https://www.mencancleantoo.com/ — service categories, existing logo, contact information, original stove before/after photography, community program, booking links.
- https://www.mencancleantoo.com/house-cleaning — recurring, deep and appliance cleaning; scope and supplies information.
- https://www.mencancleantoo.com/move-in-out-cleaning — moving and rental turnover cleaning; access and scope considerations.
- https://www.mencancleantoo.com/commercial-cleaning — commercial cleaning and walkthrough process. Live request URL: https://www.mencancleantoo.com/commercial-cleaning#email-form
- https://www.mencancleantoo.com/price — current residential pricing and booking destination.
- https://www.mencancleantoo.com/bless-a-neighbor — monthly community cleaning program and nomination destination.
- https://www.mencancleantoo.com/privacy — company privacy policy link extracted from the official homepage.

Service content is a concise original presentation of published offerings. No review counts, testimonials, performance statistics, license claims, promotional discounts, or response-time guarantees have been invented or added. Final inclusions are explicitly confirmed with the team; published moving-scope descriptions differ between official pages, so appliance and cabinet interiors are presented as items to agree rather than blanket inclusions.

## Address discrepancy to resolve before public launch

The user's brief says **824 S Fort Ave**. The existing official homepage lists **1824 S Fort Ave**. The site shows the address from the brief on the contact page and does not generate a location map or directions that could send visitors to the wrong address. The structured data (JSON-LD) deliberately leaves out the street address until this is confirmed with Mark.

## Existing company assets

- `src/assets/images/logo.webp`: transparent-padding crop and web optimization of the existing logo, from https://cdn.prod.website-files.com/67afb0489c6cfbd257d8d8e0/6a18809983360e95b2a5ec6d_Men%20Can%20Clean%20Too_New%20Logo.png (the full-size original is not shipped).
- `src/assets/images/stove-before.webp`: https://cdn.prod.website-files.com/67afb0489c6cfbd257d8d8e0/67c1ec910542747df664d2b7_1000008465.webp
- `src/assets/images/stove-after.webp`: https://cdn.prod.website-files.com/67afb0489c6cfbd257d8d8e0/67c1ec8406a1e02dda99180b_1000008466.webp
- Not shipped: a faucet before/after collage from the company site (https://cdn.prod.website-files.com/67afb0489c6cfbd257d8d8e0/699cecafe1fb22dc13e6394d_487491794_1063125032502131_7923463578728113152_n-p-1600.jpg). It was never used on a page. Its source alt text incorrectly described a team member; visual inspection shows a faucet collage.

Image optimization changes resolution/compression only. The stove photos are shown with an explicit note that camera angles vary slightly.

## Generated lifestyle images

`fresh-home.webp`, `home-cleaning.webp`, `moving-day.webp` and `workplace-cleaning.webp` in `src/assets/images/` are AI-generated illustrations. They do not show the company's staff, customers or completed work. The privacy page says so; replace them with real photography before launch if possible.

## Other assets

- `src/app/icon.svg` (favicon) is a small code-native sparkle motif in the brand palette. The original company logo remains the visible site identity.
- `src/assets/fonts/manrope.woff2` is Manrope, bundled locally under the SIL Open Font License (`manrope-OFL.txt` alongside it).

## History

The site was first generated as static HTML by a Python build script and migrated to Next.js on 2026-10-30. The migration was verified pixel-for-pixel against the original build; see `docs/verification.md`.
