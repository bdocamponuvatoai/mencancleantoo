// Business details and navigation. Safe to import from client components.

export const site = {
  name: "Men Can Clean Too!",
  owner: "Mark",
  phone: {
    display: "417 719 1380",
    dashed: "417-719-1380",
    href: "tel:+14177191380",
  },
  email: "contact@mencancleantoo.com",
  address: {
    street: "824 S Fort Ave",
    locality: "Springfield",
    region: "MO",
    postalCode: "65807",
  },
  serviceArea: ["Springfield", "Nixa", "Ozark", "Republic"],
  // The company's existing website handles booking, walkthroughs and nominations.
  live: {
    booking: "https://www.mencancleantoo.com/price",
    walkthrough:
      "https://www.mencancleantoo.com/commercial-cleaning#email-form",
    nominate: "https://www.mencancleantoo.com/bless-a-neighbor",
    privacy: "https://www.mencancleantoo.com/privacy",
  },
} as const;

export type NavKey = "services" | "about" | "contact";

export const mainNav: { label: string; href: string; key?: NavKey }[] = [
  { label: "Our services", href: "/services/", key: "services" },
  { label: "The difference", href: "/#difference" },
  { label: "Our story", href: "/about/", key: "about" },
  { label: "Let’s talk", href: "/contact/", key: "contact" },
];
