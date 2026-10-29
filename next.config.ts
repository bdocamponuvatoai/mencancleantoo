import type { NextConfig } from "next";
import imageWidths from "./src/lib/image-widths.json";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to out/.
  output: "export",
  // Keep the legacy URL shape: /about/ -> out/about/index.html.
  trailingSlash: true,
  // No image server in a static export: the loader points each width at a committed
  // file in public/images/ (see scripts/generate-image-variants.mjs).
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: imageWidths.deviceSizes,
    imageSizes: imageWidths.imageSizes,
  },
};

export default nextConfig;
