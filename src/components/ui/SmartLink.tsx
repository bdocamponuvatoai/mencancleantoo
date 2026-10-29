import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<"a"> & { href: string };

/** Internal paths use next/link; tel:, mailto:, #fragment and external URLs stay plain anchors. */
export function SmartLink({ href, ...rest }: Props) {
  if (href.startsWith("/")) return <Link href={href} {...rest} />;
  return <a href={href} {...rest} />;
}
