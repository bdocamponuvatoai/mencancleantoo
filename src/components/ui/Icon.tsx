/** The brand sparkle used throughout the design. */
export function Spark() {
  return (
    <svg className="spark" aria-hidden="true" viewBox="0 0 64 64">
      <path
        d="M32 2C36 21 43 28 62 32 43 36 36 43 32 62 28 43 21 36 2 32 21 28 28 21 32 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Decorative "↗" arrow that follows link and button labels. */
export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
