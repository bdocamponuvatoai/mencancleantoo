import "server-only";

// Deployment settings, read from the environment at build time.
//   SITE_URL        Public origin, e.g. https://www.example.com (no trailing slash needed)
//   SITE_INDEXABLE  "true" to allow search engines; anything else keeps noindex + Disallow

function resolveSiteUrl(): string {
  const raw =
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");
  return raw.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();
export const isIndexable = process.env.SITE_INDEXABLE === "true";

if (isIndexable && new URL(siteUrl).hostname === "localhost") {
  throw new Error(
    "SITE_INDEXABLE is true but SITE_URL is not set to the public domain.",
  );
}
