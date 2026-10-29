import { ClosingCta } from "@/components/sections/ClosingCta";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Cleaning for every kind of space",
  path: "/services/",
  description:
    "Explore recurring, deep, move-in, commercial, rental turnover and appliance cleaning.",
});

export default function ServicesPage() {
  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">OUR SERVICES</p>
        <h1>
          A little help.
          <br />
          {" A whole lot of "}
          <em>possibility.</em>
        </h1>
        <p>
          Choose the clean that fits your life today.
          <br />
          {" We’ll help you take the next step."}
        </p>
      </section>
      <section className="container service-grid all-services">
        {services.map((s, i) => (
          <ServiceCard key={s.slug} service={s} number={i + 1} />
        ))}
      </section>
      <section className="container simple-banner">
        <h2>Not sure where to start?</h2>
        <ButtonLink href="/plan/">Find your clean</ButtonLink>
      </section>
      <ClosingCta />
    </>
  );
}
