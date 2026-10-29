"use client";

// Static export has no image server, so each width is a pre-built file next to the
// original: /_next/static/media/photo.<hash>.webp -> photo.<hash>.w640.webp.
// scripts/generate-image-variants.mjs creates every variant the exported pages reference.
export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}) {
  if (process.env.NODE_ENV === "development") return src;
  return src.replace(/(\.[a-z0-9]+)$/i, `.w${width}$1`);
}
