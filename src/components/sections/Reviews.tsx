import { TextLink } from "@/components/ui/TextLink";
import { googleRating, googleReviewsUrl, reviews } from "@/content/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={n <= rating ? "on" : undefined}
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}

/** Verbatim Google reviews. Renders nothing until reviews are added to src/content/reviews.ts. */
export function Reviews() {
  if (reviews.length === 0) return null;

  return (
    <section className="reviews-section" aria-labelledby="reviews-title">
      <div className="container">
        <div className="reviews-head">
          <div>
            <p className="eyebrow">IN THEIR WORDS</p>
            <h2 id="reviews-title">
              Real homes.
              <br />
              {" Real reviews."}
            </h2>
          </div>
          <div className="reviews-summary">
            {googleRating && (
              <p className="reviews-score">
                <strong>{googleRating.average.toFixed(1)}</strong>
                <Stars rating={Math.round(googleRating.average)} />
                <span>{`${googleRating.count} reviews on Google`}</span>
              </p>
            )}
            <TextLink href={googleReviewsUrl}>
              Read all reviews on Google
            </TextLink>
          </div>
        </div>
        <ul className="reviews-track">
          {reviews.map((review) => (
            <li key={`${review.name}-${review.date}`} className="review-card">
              <Stars rating={review.rating} />
              <blockquote>
                <p>{review.text}</p>
              </blockquote>
              <p className="review-meta">
                <strong>{review.name}</strong>
                <span>{`Google review · ${review.date}`}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
