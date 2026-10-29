import type { StaticImageData } from "next/image";
import freshHome from "@/assets/images/fresh-home.webp";
import homeCleaning from "@/assets/images/home-cleaning.webp";
import movingDay from "@/assets/images/moving-day.webp";
import workplaceCleaning from "@/assets/images/workplace-cleaning.webp";

export type Service = {
  slug: string;
  name: string;
  tag: string;
  image: StaticImageData;
  alt: string;
  short: string;
  /** Detail-page heading, one entry per line. */
  title: string[];
  intro: string;
  items: string[];
  note: string;
  next: string;
  kind: "home" | "business";
};

export const services: Service[] = [
  {
    slug: "recurring-cleaning",
    name: "Recurring cleaning",
    tag: "A little help. On repeat.",
    image: freshHome,
    alt: "A bright, comfortable living room with an orange accent cushion",
    short: "Keep the everyday mess from becoming your weekend plans.",
    title: ["A fresh home.", "A familiar feeling."],
    intro:
      "Find your rhythm with weekly, biweekly, or monthly home cleaning. Make a little more space for the things you love.",
    items: [
      "Kitchen and bathroom surfaces",
      "Dusting, vacuuming and mopping",
      "Beds made and trash emptied",
      "Handles, switches and everyday touchpoints",
    ],
    note: "Tell us which rooms matter most. Your final checklist and visit frequency are agreed with the team.",
    next: "Choose your routine",
    kind: "home",
  },
  {
    slug: "deep-cleaning",
    name: "Deep cleaning",
    tag: "The satisfying reset.",
    image: homeCleaning,
    alt: "Professional cleaner carefully wiping a kitchen island",
    short: "Give the places that need more attention a proper reset.",
    title: ["That fresh-start", "kind of clean."],
    intro:
      "For the buildup, the overlooked corners, and the feeling of finally getting on top of things. A one-time clean with room for the details.",
    items: [
      "Extra attention to kitchen and bathroom buildup",
      "Reachable fans, lights and door frames",
      "Baseboards, doors and trim",
      "Spot cleaning on doors and walls",
    ],
    note: "Appliance interiors and specialty tasks need to be agreed separately. Tell us about condition and access when booking.",
    next: "Plan a fresh start",
    kind: "home",
  },
  {
    slug: "move-cleaning",
    name: "Move-in & move-out",
    tag: "New keys. Clean slate.",
    image: movingDay,
    alt: "Fresh home entryway with neatly stacked moving boxes",
    short: "One less thing to carry into your next chapter.",
    title: ["You handle the keys.", "We’ll handle the clean."],
    intro:
      "Leaving a place or making a new one yours? Plan a detailed clean around your move, your access, and the rooms that need attention.",
    items: [
      "Kitchen, bathroom and floor reset",
      "Reachable surfaces, trim and baseboards",
      "Empty cabinets and drawers by agreement",
      "Oven and refrigerator interiors by agreement",
    ],
    note: "Share your move date and whether the space will be empty. Appliance access, extras and the complete scope are confirmed before work begins.",
    next: "Plan your move clean",
    kind: "home",
  },
  {
    slug: "commercial-cleaning",
    name: "Commercial cleaning",
    tag: "A better place to work.",
    image: workplaceCleaning,
    alt: "Cleaning technician caring for a bright office",
    short: "A considered cleaning plan for the space behind your business.",
    title: ["Good work starts", "with a cared-for space."],
    intro:
      "From a welcoming entrance to a ready-for-tomorrow workspace, make cleaning one less thing your team has to think about.",
    items: [
      "Offices, retail spaces and showrooms",
      "Schools, daycares and fitness spaces",
      "Restrooms, common areas and break rooms",
      "Frequency and access arranged around your business",
    ],
    note: "Start with a walkthrough. The team will confirm your site requirements, agreed tasks, schedule and pricing. Ask about after-hours options.",
    next: "Plan a walkthrough",
    kind: "business",
  },
  {
    slug: "rental-turnovers",
    name: "Rental turnovers",
    tag: "Ready for what’s next.",
    image: freshHome,
    alt: "A clean, light-filled living room prepared for its next occupants",
    short: "Help your property feel ready for its next arrival.",
    title: ["A fresh welcome", "between chapters."],
    intro:
      "For owners, landlords and property managers preparing a home or apartment between occupants. Build the clean around the handover.",
    items: [
      "Kitchen and bathroom cleaning",
      "Accessible surfaces and floor care",
      "Interior cabinets when empty and agreed",
      "Appliance interiors when included in the scope",
    ],
    note: "Tell us your property size, condition and access window. Turnover timing is subject to scheduling confirmation; linen, restocking and repair services are not implied.",
    next: "Plan a property clean",
    kind: "home",
  },
  {
    slug: "appliance-cleaning",
    name: "Appliance add-ons",
    tag: "Small spaces. Big difference.",
    image: homeCleaning,
    alt: "Kitchen cleaning in a warm modern home",
    short: "Give the hardworking parts of your kitchen a little extra care.",
    title: ["A little extra care.", "Right where it counts."],
    intro:
      "Bring your oven, refrigerator or microwave into the conversation when planning a clean. Small details can change how your whole kitchen feels.",
    items: [
      "Oven interior cleaning",
      "Refrigerator interior cleaning",
      "Microwave cleaning",
      "A scope tailored to your main cleaning service",
    ],
    note: "Add-ons are confirmed with the team and may change your quote. Share what needs attention, and arrange safe access and emptying in advance.",
    next: "Include an appliance",
    kind: "home",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function serviceName(slug: string): string | undefined {
  return getService(slug)?.name;
}
