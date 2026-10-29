import type { Metadata } from "next";
import { site } from "@/config/site";
import ogImage from "@/assets/images/home-cleaning.webp";

/** Per-page metadata: "<title> | Men Can Clean Too!", canonical URL and Open Graph. */
export function pageMetadata({
  title,
  path,
  description,
}: {
  title: string;
  path: string;
  description: string;
}): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      url: path,
      images: [
        { url: ogImage.src, width: ogImage.width, height: ogImage.height },
      ],
    },
  };
}
