import { Fragment } from "react";

/**
 * Renders lines separated by <br>. Each later line keeps the legacy leading space
 * ("<br> next line"), which matters wherever CSS hides the <br> on small screens.
 */
export function Lines({ lines }: { lines: readonly string[] }) {
  return lines.map((line, i) =>
    i === 0 ? (
      <Fragment key={i}>{line}</Fragment>
    ) : (
      <Fragment key={i}>
        <br />
        {` ${line}`}
      </Fragment>
    ),
  );
}
