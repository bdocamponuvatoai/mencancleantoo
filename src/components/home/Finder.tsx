"use client";

import { useState } from "react";
import { finderOptions } from "@/content/finder";
import { TextLink } from "@/components/ui/TextLink";

export function Finder() {
  const [selected, setSelected] = useState<string>(finderOptions[0].key);
  const option =
    finderOptions.find((o) => o.key === selected) ?? finderOptions[0];

  return (
    <div className="finder-box">
      <div
        className="segmented"
        role="group"
        aria-label="Find a cleaning service"
      >
        {finderOptions.map((o) => (
          <button
            key={o.key}
            type="button"
            aria-pressed={o.key === selected}
            onClick={() => setSelected(o.key)}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        <p className="finder-title">{option.title}</p>
        <p>{option.copy}</p>
        <TextLink href={`/plan/?service=${option.service}`}>
          {option.link}
        </TextLink>
      </div>
    </div>
  );
}
