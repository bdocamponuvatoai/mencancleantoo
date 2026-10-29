import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to out/.
  output: "export",
  // Keep the legacy URL shape: /about/ -> out/about/index.html.
  trailingSlash: true,
  // No image server in a static export: the loader points at pre-built widths that
  // scripts/generate-image-variants.mjs creates after the build.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 720, 960, 1280, 1536],
    imageSizes: [180, 360],
  },
};

export default nextConfig;
