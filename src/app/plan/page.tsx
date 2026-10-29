import { Suspense } from "react";
import { PlanBuilder } from "@/components/plan/PlanBuilder";
import { PlanFromQuery } from "@/components/plan/PlanFromQuery";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Find your kind of clean",
  path: "/plan/",
  description:
    "A guided cleaning-plan builder for your home, move or business. Choose priorities and connect with the team.",
});

export default function PlanPage() {
  return (
    <>
      <section className="container planner-intro">
        <p className="eyebrow">YOUR SPACE. YOUR PRIORITIES.</p>
        <h1>
          {"Let’s find your "}
          <em>clean.</em>
        </h1>
        <p>A few simple choices. A clearer next step.</p>
      </section>
      {/* The static HTML ships the un-preset form; the query preset applies on hydration. */}
      <Suspense fallback={<PlanBuilder preset={null} />}>
        <PlanFromQuery />
      </Suspense>
    </>
  );
}
