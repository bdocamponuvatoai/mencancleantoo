import Image from "next/image";
import freshHome from "@/assets/images/fresh-home.webp";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Spark } from "@/components/ui/Icon";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Good people. Thoughtful cleaning.",
  path: "/about/",
  description:
    "Get to know Men Can Clean Too and its Springfield community cleaning program.",
});

export default function AboutPage() {
  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">MEN CAN CLEAN TOO!</p>
        <h1>
          Clean spaces.
          <br /> <em>Human</em>
          {" kindness."}
        </h1>
        <p>
          Cleaning is personal. It’s your home, your routine,
          <br />
          {" your place in the world. That deserves care."}
        </p>
      </section>
      <section className="container about-grid">
        <div className="about-photo">
          <Image
            src={freshHome}
            sizes="(max-width: 700px) calc(100vw - 40px), 50vw"
            alt="A peaceful, bright living room with comfortable natural finishes"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="about-copy">
          <p className="eyebrow">ROOTED IN SPRINGFIELD</p>
          <h2>
            A local name.
            <br />
            {" A personal connection."}
          </h2>
          <p>
            {`Meet ${site.name}, the Springfield cleaning business owned by ${site.owner}. Whether you’re looking after your home or running a business, start with a conversation about what a good clean means to you.`}
          </p>
          <p>
            The company’s Christian values shape its focus on caring for people,
            with service extending beyond the everyday cleaning visit.
          </p>
          <ButtonLink href="/contact/" secondary>
            Say hello to the team
          </ButtonLink>
        </div>
      </section>
      <section className="container section" id="community">
        <div className="community-card">
          <div>
            <Spark />
            <p className="eyebrow">BLESS A NEIGHBOR</p>
            <h2>
              A little kindness
              <br />
              {" can change a day."}
            </h2>
          </div>
          <div>
            <p>
              {`Each month, ${site.name} offers a free home clean to someone in the Ozarks through its community nomination program.`}
            </p>
            <p>
              Know someone who could use that lift? Share their story through
              the company’s nomination page. Selection and availability are
              managed by the team.
            </p>
            <ButtonLink href={site.live.nominate}>
              Nominate a neighbor
            </ButtonLink>
            <p className="small">
              Opens the company’s current nomination page.
            </p>
          </div>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
