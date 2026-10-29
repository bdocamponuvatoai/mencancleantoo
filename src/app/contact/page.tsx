import { ClosingCta } from "@/components/sections/ClosingCta";
import { Spark } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Let’s talk about your clean",
  path: "/contact/",
  description: `Contact Men Can Clean Too in Springfield at ${site.phone.dashed} or ${site.email}.`,
});

const cards = [
  {
    href: site.phone.href,
    eyebrow: "CALL THE TEAM",
    title: site.phone.display,
    text: "A quick conversation can make things clearer.",
  },
  {
    href: `mailto:${site.email}`,
    eyebrow: "DROP US A NOTE",
    title: "Email us",
    text: site.email,
  },
  {
    href: "/plan/",
    eyebrow: "GATHER YOUR IDEAS",
    title: "Build your plan",
    text: "Choose a service and make your priorities clear.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">LET’S TALK</p>
        <h1>
          A fresh start begins
          <br />
          {" with a "}
          <em>hello.</em>
        </h1>
        <p>
          {`Talk to ${site.owner} and the team about your space,`}
          <br />
          {" your priorities, and the clean you have in mind."}
        </p>
      </section>
      <section className="container contact-grid">
        {cards.map((card) => (
          <SmartLink
            key={card.eyebrow}
            className="contact-card"
            href={card.href}
          >
            <span className="contact-icon">↗</span>
            <p className="eyebrow">{card.eyebrow}</p>
            <h2>{card.title}</h2>
            <p>{card.text}</p>
          </SmartLink>
        ))}
      </section>
      <section className="container section location-section" id="service-area">
        <div>
          <p className="eyebrow">CLOSE TO HOME</p>
          <h2>
            Springfield.
            <br />
            {" And a little beyond."}
          </h2>
          <p>
            Serving Springfield and nearby communities in the Ozarks. Contact
            the team to confirm your address and scheduling options.
          </p>
          <div className="city-tags">
            {[...site.serviceArea, "Nearby Ozarks"].map((city) => (
              <span key={city}>{city}</span>
            ))}
          </div>
        </div>
        <div className="location-card">
          <Spark />
          <h3>{site.name}</h3>
          <p>
            {site.address.street}
            <br />
            {` ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`}
          </p>
          <p className="small">
            Please call before visiting. Cleaning takes place at your property.
          </p>
          <TextLink href={site.phone.href}>Confirm a service visit</TextLink>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
