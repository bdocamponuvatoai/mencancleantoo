// Home-page "What could use a little care?" recommendations.
export const finderOptions = [
  {
    key: "home",
    label: "My home",
    title: "A home that feels like a fresh start.",
    copy: "Choose a regular routine or a one-time deep clean. Your home, your priorities.",
    link: "Build my home cleaning plan",
    service: "recurring-cleaning",
  },
  {
    key: "moving",
    label: "My move",
    title: "A clean slate for your next chapter.",
    copy: "Moving in or moving out? Plan around your move date, property access and the details that matter.",
    link: "Plan my move clean",
    service: "move-cleaning",
  },
  {
    key: "business",
    label: "My business",
    title: "A space that’s ready for a good day.",
    copy: "Start with your workplace, your schedule and a walkthrough to agree the right scope.",
    link: "Plan a business walkthrough",
    service: "commercial-cleaning",
  },
] as const;
