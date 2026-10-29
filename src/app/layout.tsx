import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { isIndexable, siteUrl } from "@/config/deployment";
import { site } from "@/config/site";
import logo from "@/assets/images/logo.webp";
import "@/styles/globals.css";

const manrope = localFont({
  src: "../assets/fonts/manrope.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-manrope",
  // Manrope has no arrow glyphs (→ ←). Without a synthetic size-adjusted fallback
  // they render from plain Arial, exactly as in the original design.
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
};

// Facts shown on the site only. The street address is left out until the
// 824 vs 1824 S Fort Ave discrepancy is resolved with the owner.
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: `${siteUrl}/`,
  logo: `${siteUrl}${logo.src}`,
  telephone: `+1-${site.phone.dashed}`,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: "US",
  },
  areaServed: site.serviceArea.map((name) => ({ "@type": "City", name })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={manrope.variable} data-scroll-behavior="smooth">
      <body id="top">
        <a className="skip" href="#main">
          Skip to content
        </a>
        <div className="announcement">
          {"A little clean. A lot more life. "}
          <span>Springfield &amp; the Ozarks</span>
        </div>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <JsonLd data={businessJsonLd} />
      </body>
    </html>
  );
}
