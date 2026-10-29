"use client";

// Static export has no image server, so every width is a pre-built file in public/images/:
// a static import such as /_next/static/media/photo.<hash>.webp maps to /images/photo-w720.webp.
// scripts/generate-image-variants.mjs creates them (`npm run images`).
export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}) {
  if (process.env.NODE_ENV === "development") return src;
  const match = src.match(/\/media\/([^/.]+)\.[^/]+?(\.[a-z0-9]+)$/i);
  if (!match) return src;
  return `/images/${match[1]}-w${width}${match[2].toLowerCase()}`;
}
