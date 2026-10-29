import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.webp";
import { site } from "@/config/site";

/** Company logo linking home. The header copy loads eagerly; the footer copy lazily. */
export function Brand({ variant }: { variant: "header" | "footer" }) {
  if (variant === "header") {
    return (
      <Link className="brand" href="/" aria-label={`${site.name} home`}>
        <Image
          src={logo}
          alt={site.name}
          width={142}
          height={90}
          loading="eager"
        />
      </Link>
    );
  }
  return (
    <Link href="/" aria-label="Men Can Clean Too home">
      <Image src={logo} alt={site.name} width={180} height={114} />
    </Link>
  );
}
