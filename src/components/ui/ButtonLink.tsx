import { Arrow } from "./Icon";
import { SmartLink } from "./SmartLink";

export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: string;
  secondary?: boolean;
}) {
  return (
    <SmartLink
      className={secondary ? "button secondary" : "button"}
      href={href}
    >
      {`${children} `}
      <Arrow />
    </SmartLink>
  );
}
