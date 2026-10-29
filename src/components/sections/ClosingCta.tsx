import { ButtonLink } from "@/components/ui/ButtonLink";
import { Spark } from "@/components/ui/Icon";

export function ClosingCta() {
  return (
    <section className="container closing">
      <div>
        <Spark />
        <p className="eyebrow">YOUR TO-DO LIST JUST GOT SHORTER</p>
        <h2>
          Come home to
          <br />
          {" a lighter day."}
        </h2>
        <p>Start with your space. We’ll help with the rest.</p>
        <ButtonLink href="/plan/">Let’s find your clean</ButtonLink>
      </div>
      <div className="closing-art" aria-hidden="true">
        <span>
          Less
          <br /> <em>chores.</em>
        </span>
        <span>
          More
          <br /> <em>life.</em>
        </span>
        <Spark />
      </div>
    </section>
  );
}
