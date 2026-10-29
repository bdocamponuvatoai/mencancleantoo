"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import stoveAfter from "@/assets/images/stove-after.webp";
import stoveBefore from "@/assets/images/stove-before.webp";

export function BeforeAfter() {
  const [reveal, setReveal] = useState(50);
  const [moved, setMoved] = useState(false);

  return (
    <figure className="before-after">
      <div
        className="comparison"
        style={{ "--reveal": `${reveal}%` } as CSSProperties}
      >
        <Image
          src={stoveAfter}
          alt="Stovetop drip pan after cleaning by Men Can Clean Too"
        />
        <Image
          className="before-image"
          src={stoveBefore}
          alt="The stovetop drip pan before cleaning"
        />
        <span className="before-tag">Before</span>
        <span className="after-tag">After</span>
        <span className="comparison-line" aria-hidden="true">
          <span>↔</span>
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={reveal}
          aria-label="Reveal before and after cleaning"
          aria-valuetext={
            moved ? `${reveal} percent before image revealed` : undefined
          }
          onChange={(e) => {
            setReveal(Number(e.target.value));
            setMoved(true);
          }}
        />
      </div>
      <figcaption>
        Actual company project photography · angles vary slightly
      </figcaption>
    </figure>
  );
}
