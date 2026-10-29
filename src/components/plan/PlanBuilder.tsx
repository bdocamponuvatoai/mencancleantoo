"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { site } from "@/config/site";
import {
  frequencies,
  nextLabels,
  planSteps,
  priorities,
  propertyTypes,
  sizes,
} from "@/content/plan";
import { getService, services } from "@/content/services";
import {
  buildPlanSummary,
  planDefaults,
  type PlanSummary,
} from "@/lib/plan-summary";

const LAST = planSteps.length - 1;

/** Four-step cleaning-plan builder. Every step stays mounted (hidden) so values survive Back. */
export function PlanBuilder({ preset }: { preset: string | null }) {
  const presetService = preset && getService(preset) ? preset : null;
  const initial = planDefaults(presetService);

  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [summary, setSummary] = useState<PlanSummary | null>(null);

  function show(index: number) {
    const form = formRef.current!;
    flushSync(() => {
      setCurrent(index);
      setError("");
      if (index === LAST) {
        setStatus("");
        setSummary(buildPlanSummary(new FormData(form)));
      }
    });
    headingRefs.current[index]?.focus({ preventScroll: true });
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    cardRef.current?.scrollIntoView({
      behavior: reduce ? "instant" : "smooth",
      block: "start",
    });
  }

  function advance() {
    const form = formRef.current!;
    if (current === 0) {
      const firstService = form.elements.namedItem("service") as RadioNodeList;
      const first = firstService[0] as HTMLInputElement;
      if (!first.checkValidity()) {
        setError("Choose a service to get started.");
        first.focus();
        return;
      }
    }
    if (current === 1) {
      const city = form.elements.namedItem("city") as HTMLInputElement;
      if (!city.value.trim()) {
        setError("Please add your city or community.");
        city.focus();
        return;
      }
    }
    if (current < LAST) show(current + 1);
  }

  function applyDefaults(service: string) {
    const form = formRef.current!;
    const property = form.elements.namedItem("property") as HTMLSelectElement;
    const frequency = form.elements.namedItem("frequency") as HTMLSelectElement;
    const next = planDefaults(service, property.value);
    property.value = next.property;
    frequency.value = next.frequency;
  }

  function download() {
    if (!summary) return;
    const blob = new Blob([summary.text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "men-can-clean-too-my-cleaning-plan.txt";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(
      "Your plan download is ready. Nothing has been sent to the company.",
    );
  }

  const business = summary?.service === "commercial-cleaning";

  return (
    <section className="container planner-layout">
      <aside className="plan-aside">
        <p className="eyebrow">A LITTLE PLAN GOES A LONG WAY</p>
        <ol className="plan-progress">
          {planSteps.map((label, i) => (
            <li
              key={label}
              className={
                i === current ? "active" : i < current ? "done" : undefined
              }
              aria-current={i === current ? "step" : undefined}
            >
              <span>{i + 1}</span>
              {label}
            </li>
          ))}
        </ol>
        <div className="plan-help">
          <p>Prefer to talk it through?</p>
          <a href={site.phone.href}>{`${site.phone.display} ↗`}</a>
        </div>
      </aside>
      <div className="planner-card" ref={cardRef}>
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            advance();
          }}
        >
          <section className="plan-step" hidden={current !== 0}>
            <p className="eyebrow">STEP 01 / 04</p>
            <h2 tabIndex={-1} ref={(el) => void (headingRefs.current[0] = el)}>
              What kind of clean?
            </h2>
            <p>
              Choose the best starting point. You can change it before you
              finish.
            </p>
            <fieldset>
              <legend className="sr-only">Choose a cleaning service</legend>
              <div className="choice-grid">
                {services.map((s) => (
                  <label key={s.slug} className="choice">
                    <input
                      type="radio"
                      name="service"
                      value={s.slug}
                      required
                      defaultChecked={s.slug === presetService}
                      onChange={() => applyDefaults(s.slug)}
                    />
                    <span>
                      <strong>{s.name}</strong>
                      <small>{s.short}</small>
                    </span>
                    <span className="choice-dot" aria-hidden="true"></span>
                  </label>
                ))}
              </div>
            </fieldset>
          </section>

          <section className="plan-step" hidden={current !== 1}>
            <p className="eyebrow">STEP 02 / 04</p>
            <h2 tabIndex={-1} ref={(el) => void (headingRefs.current[1] = el)}>
              Tell us about your space.
            </h2>
            <p>Just the basics. No personal contact details needed here.</p>
            <div className="form-grid">
              <label>
                City or community
                <input
                  name="city"
                  autoComplete="address-level2"
                  maxLength={80}
                  required
                  placeholder="e.g. Springfield"
                />
              </label>
              <label>
                Property type
                <select name="property" defaultValue={initial.property}>
                  {propertyTypes.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label>
                Approximate size
                <select name="size">
                  {sizes.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label>
                How often?
                <select name="frequency" defaultValue={initial.frequency}>
                  {frequencies.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <section className="plan-step" hidden={current !== 2}>
            <p className="eyebrow">STEP 03 / 04</p>
            <h2 tabIndex={-1} ref={(el) => void (headingRefs.current[2] = el)}>
              What matters most?
            </h2>
            <p>
              Pick any priorities you’d like to discuss. These are requests, not
              confirmed inclusions.
            </p>
            <fieldset>
              <legend className="sr-only">Cleaning priorities</legend>
              <div className="priority-grid">
                {priorities.map((p) => (
                  <label key={p}>
                    <input type="checkbox" name="priorities" value={p} />
                    <span>{p}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="notes-label">
              {"Anything else? "}
              <span className="optional">Optional</span>
              <textarea
                name="notes"
                rows={3}
                maxLength={800}
                placeholder="A move deadline, a room to focus on, or a question for the team. Please leave out entry codes or sensitive details."
              ></textarea>
            </label>
          </section>

          <section className="plan-step" hidden={current !== 3}>
            <p className="eyebrow">STEP 04 / 04</p>
            <h2 tabIndex={-1} ref={(el) => void (headingRefs.current[3] = el)}>
              Your clean, taking shape.
            </h2>
            <p>
              Here’s your starting point. Review it with the team to confirm the
              scope, price and availability.
            </p>
            <div className="plan-summary">
              {summary?.rows.map(([label, value]) => (
                <div key={label} className="summary-row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="next-step-box">
              <p className="eyebrow">READY WHEN YOU ARE</p>
              <h3>
                {business
                  ? "Let’s arrange a walkthrough."
                  : "See your price & book."}
              </h3>
              <p>
                {business
                  ? "Continue to the company’s walkthrough request form. The team will confirm the scope, schedule and pricing. Your plan isn’t transferred automatically."
                  : "Continue to the company’s live booking page. Keep your plan handy; your choices aren’t transferred automatically."}
              </p>
              <a
                className="button"
                href={business ? site.live.walkthrough : site.live.booking}
              >
                {business
                  ? "Request a walkthrough ↗"
                  : "Continue to live booking ↗"}
              </a>
            </div>
            <div className="summary-actions">
              <button type="button" className="text-link" onClick={download}>
                Download my plan ↓
              </button>
              <a
                className="text-link"
                href={summary?.mailto ?? `mailto:${site.email}`}
              >
                Open an email draft ↗
              </a>
            </div>
            <p className="small">
              Nothing has been sent or booked. The email link opens your email
              app so you can review and send the plan yourself.
            </p>
            <p className="small" role="status">
              {status}
            </p>
          </section>

          <p className="form-error" role="alert">
            {error}
          </p>
          <div className="plan-controls">
            <button
              type="button"
              className="button secondary"
              hidden={current === 0 || current === LAST}
              onClick={() => show(current - 1)}
            >
              ← Back
            </button>
            <button
              type="button"
              id="plan-next"
              className="button"
              hidden={current === LAST}
              onClick={advance}
            >
              {nextLabels[current] ?? "Next"}
            </button>
            <button
              type="button"
              className="button secondary"
              hidden={current !== LAST}
              onClick={() => show(0)}
            >
              Edit my choices
            </button>
          </div>
        </form>
        <noscript>
          <p>
            {"The plan builder needs JavaScript. You can "}
            <a href={site.live.booking}>book on the company website</a>
            {" or "}
            <a href={site.phone.href}>{`call ${site.phone.dashed}`}</a>.
          </p>
        </noscript>
        <div className="planner-disclaimer">
          Your plan stays in this page and is cleared when you reload. This tool
          prepares a brief; it does not create a booking or provide a price.
        </div>
      </div>
    </section>
  );
}
