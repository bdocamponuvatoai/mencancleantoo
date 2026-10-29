// Google reviews, copied verbatim from the company's Google Business Profile.
// Never edit a review's wording, and never add one that isn't on Google. Use the name
// exactly as Google shows it (or initials, if the reviewer prefers). While this list is
// empty the reviews section is not rendered at all.

export type Review = {
  /** Reviewer name as shown on Google. */
  name: string;
  /** Star rating, 1–5. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** When the review was posted, as Google shows it (e.g. "March 2026" or "2 months ago" converted to a month). */
  date: string;
  /** Review text, verbatim. */
  text: string;
};

export const reviews: Review[] = [];

/**
 * Overall figures exactly as the Google profile shows them (e.g. 4.9 from 37 reviews).
 * Leave null until copied from Google; the site never computes or rounds these itself.
 */
export const googleRating: { average: number; count: number } | null = null;

/** The company's Google Maps listing (customer ID from the Google search link supplied). */
export const googleReviewsUrl =
  "https://maps.google.com/?cid=11765939869226572227";
