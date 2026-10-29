import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Lines } from "@/components/ui/Lines";
import { site } from "@/config/site";
import { getService, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.name} in Springfield, MO`,
    path: `/services/${service.slug}/`,
    description: service.short,
  });
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();

  return (
    <>
      <section className="container detail-hero">
        <div>
          <Link className="breadcrumb" href="/services/">
            ← All services
          </Link>
          <p className="eyebrow">{service.name}</p>
          <h1>
            <Lines lines={service.title} />
          </h1>
          <p className="lead">{service.intro}</p>
          <ButtonLink href={`/plan/?service=${service.slug}`}>
            {service.next}
          </ButtonLink>
          <p className="small">Springfield &amp; nearby Ozarks communities</p>
        </div>
        <div className="detail-photo">
          <Image
            src={service.image}
            alt={service.alt}
            loading="eager"
            fetchPriority="high"
          />
          <span>{service.tag}</span>
        </div>
      </section>
      <section className="container section detail-content">
        <div>
          <p className="eyebrow">LET’S TALK DETAILS</p>
          <h2>
            A good clean starts
            <br />
            {" with a clear plan."}
          </h2>
          <p>{service.note}</p>
        </div>
        <div className="scope-card">
          <h3>
            {service.kind === "business"
              ? "Spaces and scope"
              : "What to plan for"}
          </h3>
          <ul className="checklist">
            {service.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="small">
            Final tasks, access, availability and price are confirmed by the
            company.
          </p>
        </div>
      </section>
      <section className="container simple-banner">
        <div>
          <p className="eyebrow">PREFER A CONVERSATION?</p>
          <h2>We’re a phone call away.</h2>
        </div>
        <ButtonLink
          href={site.phone.href}
        >{`Call ${site.phone.display}`}</ButtonLink>
      </section>
      <ClosingCta />
    </>
  );
}
