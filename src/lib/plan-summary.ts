import { site } from "@/config/site";
import { serviceName } from "@/content/services";

export type PlanSummary = {
  service: string;
  rows: [label: string, value: string][];
  text: string;
  mailto: string;
};

/** Builds the review rows, the downloadable text and the mailto: link from the plan form. */
export function buildPlanSummary(data: FormData): PlanSummary {
  const service = String(data.get("service") ?? "");
  const name = serviceName(service) ?? "";
  const rows: PlanSummary["rows"] = [
    ["Service", name],
    ["Location", String(data.get("city") ?? "").trim()],
    ["Property", String(data.get("property") ?? "")],
    ["Size", String(data.get("size") ?? "")],
    ["Frequency", String(data.get("frequency") ?? "")],
    [
      "Priorities",
      data.getAll("priorities").join(", ") || "Discuss with the team",
    ],
    ["Notes", String(data.get("notes") ?? "").trim() || "No additional notes"],
  ];
  const text =
    `${site.name.toUpperCase()}\nMy cleaning plan\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    "\n\nThis is a planning brief, not a confirmed booking or price. Please confirm scope, availability and pricing with the team.\n" +
    `${site.phone.dashed}\n${site.email}\n`;
  const mailto =
    `mailto:${site.email}?subject=` +
    encodeURIComponent(`My cleaning plan — ${name}`) +
    "&body=" +
    encodeURIComponent(text);
  return { service, rows, text, mailto };
}

/** Property and frequency defaults that follow the chosen service. */
export function planDefaults(
  service: string | null,
  currentProperty = "House",
) {
  if (service === "commercial-cleaning")
    return { property: "Office", frequency: "Let’s discuss a schedule" };
  if (service === "rental-turnovers")
    return { property: "Rental property", frequency: "One time" };
  const commercialish = [
    "Office",
    "Retail or other commercial space",
    "Rental property",
  ];
  return {
    property: commercialish.includes(currentProperty)
      ? "House"
      : currentProperty,
    frequency:
      service === "recurring-cleaning" ? "Every two weeks" : "One time",
  };
}
