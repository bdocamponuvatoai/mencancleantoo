"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Blocks that fade up as they scroll into view. Hero and page intros animate on load instead (CSS).
const REVEAL = [
  ".section-heading",
  ".service-card",
  ".extra-services > a",
  ".finder",
  ".commercial-feature",
  ".proof-grid > div",
  ".before-after",
  ".reviews-head",
  ".review-card",
  ".steps-grid article",
  ".neighbor-banner",
  ".faq-section > div",
  ".faq-list details",
  ".closing",
  ".simple-banner",
  ".detail-content > div",
  ".about-grid > div",
  ".community-card",
  ".contact-card",
  ".location-section > div",
  ".prose > *",
  ".footer-grid > div",
].join(",");

/**
 * Scroll-driven polish: marks the header once the page scrolls, feeds the progress line,
 * and reveals blocks as they enter the viewport. Content is visible without JavaScript;
 * hiding only starts once this runs, and never for reduced-motion users.
 */
export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty(
        "--scroll-progress",
        String(max > 0 ? Math.min(1, scrollY / max) : 0),
      );
      root.toggleAttribute("data-scrolled", scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const items = [...document.querySelectorAll<HTMLElement>(REVEAL)];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of items) {
      if (el.hasAttribute("data-revealed")) continue;
      // Siblings revealed together cascade slightly.
      const index = [...(el.parentElement?.children ?? [])].indexOf(el);
      el.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 70}ms`);
      // Already on screen: show immediately so nothing above the fold blinks.
      if (el.getBoundingClientRect().top < window.innerHeight)
        el.setAttribute("data-revealed", "");
      else observer.observe(el);
      el.setAttribute("data-reveal", "");
    }
    root.setAttribute("data-motion", "");
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
