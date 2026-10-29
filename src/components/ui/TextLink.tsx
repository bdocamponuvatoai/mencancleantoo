import { Arrow } from "./Icon";
import { SmartLink } from "./SmartLink";

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <SmartLink className="text-link" href={href}>
      {`${children} `}
      <Arrow />
    </SmartLink>
  );
}
