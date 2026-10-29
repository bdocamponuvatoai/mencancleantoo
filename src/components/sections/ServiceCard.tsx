import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/content/services";

export function ServiceCard({
  service,
  number,
}: {
  service: Service;
  number: number;
}) {
  return (
    <Link className="service-card" href={`/services/${service.slug}/`}>
      <div className="card-photo">
        <Image src={service.image} alt={service.alt} />
        <span className="card-number">{`0${number}`}</span>
        <span className="round-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <p className="eyebrow">{service.tag}</p>
      <h3>{service.name}</h3>
      <p>{service.short}</p>
    </Link>
  );
}
