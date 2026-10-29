import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to out/.
  output: "export",
  // Keep the legacy URL shape: /about/ -> out/about/index.html.
  trailingSlash: true,
  // No image optimisation server in a static export.
  images: { unoptimized: true },
};

export default nextConfig;
