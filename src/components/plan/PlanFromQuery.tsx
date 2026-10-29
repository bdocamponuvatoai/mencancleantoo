"use client";

import { useSearchParams } from "next/navigation";
import { PlanBuilder } from "./PlanBuilder";

/** Reads the ?service= preset. Keyed so a new preset starts a fresh plan. */
export function PlanFromQuery() {
  const preset = useSearchParams().get("service");
  return <PlanBuilder key={preset ?? ""} preset={preset} />;
}
