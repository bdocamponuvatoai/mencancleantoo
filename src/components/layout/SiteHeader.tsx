"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, site, type NavKey } from "@/config/site";
import { Brand } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/ButtonLink";

function activeKey(pathname: string): NavKey | undefined {
  if (pathname.startsWith("/services")) return "services";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/contact")) return "contact";
}

export function SiteHeader() {
  const pathname = usePathname();
  // The menu is open only on the path where it was opened, so navigating closes it.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const active = activeKey(pathname);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenOnPath(null);
      toggleRef.current?.focus();
    };
    // The mobile menu only exists below 701px; close it when the layout goes desktop.
    const desktop = window.matchMedia("(min-width: 701px)");
    const onResize = () => desktop.matches && setOpenOnPath(null);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Brand variant="header" />
        <button
          ref={toggleRef}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpenOnPath(open ? null : pathname)}
        >
          <span>Menu</span>
          <span aria-hidden="true">☰</span>
        </button>
        <nav
          id="site-nav"
          className={open ? "open" : undefined}
          aria-label="Main navigation"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                item.key && item.key === active ? "page" : undefined
              }
              onClick={() => setOpenOnPath(null)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="phone-link" href={site.phone.href}>
            {site.phone.display}
          </a>
          <ButtonLink href="/plan/">Find your clean</ButtonLink>
        </div>
      </div>
    </header>
  );
}
