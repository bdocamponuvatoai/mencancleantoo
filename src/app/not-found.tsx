import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `Let’s get you back on track | ${site.name}` },
  description: "Explore Men Can Clean Too cleaning services.",
};

export default function NotFound() {
  return (
    <section className="container page-intro">
      <p className="eyebrow">PAGE NOT FOUND</p>
      <h1>
        A little off track?
        <br />
        {" Let’s start "}
        <em>fresh.</em>
      </h1>
      <p>The page you’re looking for isn’t here.</p>
      <ButtonLink href="/">Back to home</ButtonLink>
    </section>
  );
}
