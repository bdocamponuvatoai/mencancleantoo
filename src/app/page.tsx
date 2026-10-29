import Image from "next/image";
import Link from "next/link";
import homeCleaning from "@/assets/images/home-cleaning.webp";
import workplaceCleaning from "@/assets/images/workplace-cleaning.webp";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { Finder } from "@/components/home/Finder";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Reviews } from "@/components/sections/Reviews";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Arrow, Spark } from "@/components/ui/Icon";
import { TextLink } from "@/components/ui/TextLink";
import { faq } from "@/content/faq";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "A cleaner space. A lighter day.",
  path: "/",
  description:
    "Thoughtful home and business cleaning in Springfield, Missouri. Explore services, build a cleaning plan and connect with Men Can Clean Too.",
});

const benefits = [
  "Home & business cleaning",
  "One-time or a regular routine",
  "Built around your priorities",
  "Springfield & the Ozarks",
];

const steps = [
  {
    title: "Tell us about your space.",
    text: "A home, a workplace, a new beginning. Share the basics and what needs a little attention.",
  },
  {
    title: "Make a plan that fits.",
    text: "Choose your service and priorities. Review pricing and availability with the team.",
  },
  {
    title: "Make room for your day.",
    text: "Once your booking is confirmed, your clean has a place on the calendar. You have something to look forward to.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot"></span>
            {" YOUR SPRINGFIELD CLEANING PEOPLE"}
          </p>
          <h1>
            A cleaner space.
            <br />
            {" A "}
            <em>lighter</em>
            {" day."}
          </h1>
          <p className="hero-description">
            Life’s full. Your to-do list doesn’t have to be.
            <br />
            {" Thoughtful cleaning for your home, your business,"}
            <br className="desktop-only" />
            {"  and everything you’d rather be doing."}
          </p>
          <div className="hero-buttons">
            <ButtonLink href="/plan/">Find your kind of clean</ButtonLink>
            <ButtonLink href="/services/" secondary>
              Explore our services
            </ButtonLink>
          </div>
          <div className="hero-signoff">
            <span className="mini-spark">
              <Spark />
            </span>
            <p>
              Local care. Real attention.
              <br /> <strong>Made for your everyday.</strong>
            </p>
          </div>
        </div>
        <div className="hero-visual">
          <Image
            className="hero-img"
            src={homeCleaning}
            sizes="(max-width: 700px) calc(100vw - 40px), 50vw"
            alt="Cleaner bringing careful attention to a bright home kitchen"
            loading="eager"
            fetchPriority="high"
          />
          <div className="hero-label">
            <span className="little-check">✓</span>
            <span>
              A fresh start.
              <br /> <strong>Without the to-do list.</strong>
            </span>
          </div>
          <div className="hero-stamp">
            MORE
            <br />
            {" ROOM FOR"}
            <br /> <em>living.</em>
            <Spark />
          </div>
        </div>
      </section>

      {/* Two identical sets scroll as one loop; the copy is hidden from assistive tech. */}
      <div className="benefit-strip">
        <div className="benefit-track">
          {[false, true].map((copy) => (
            <ul
              key={String(copy)}
              className="benefit-set"
              aria-hidden={copy || undefined}
            >
              {[...benefits, ...benefits].map((benefit, i) => (
                <li key={i}>
                  <Spark />
                  {` ${benefit}`}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <section className="container section" id="services">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A CLEAN FOR EVERY CHAPTER</p>
            <h2>
              Your space.
              <br />
              {" Your kind of clean."}
            </h2>
          </div>
          <p>
            Sometimes it’s the weekly reset.
            <br />
            {" Sometimes it’s a whole new beginning."}
            <br />
            {" There’s a clean for that."}
          </p>
        </div>
        <div className="service-grid">
          {services.slice(0, 3).map((s, i) => (
            <ServiceCard key={s.slug} service={s} number={i + 1} />
          ))}
        </div>
        <div className="extra-services">
          <Link href="/services/rental-turnovers/">
            <span>Between tenants?</span>
            <strong>
              {"Rental turnovers "}
              <Arrow />
            </strong>
          </Link>
          <Link href="/services/appliance-cleaning/">
            <span>The details make the difference.</span>
            <strong>
              {"Appliance add-ons "}
              <Arrow />
            </strong>
          </Link>
        </div>
      </section>

      <section className="container finder">
        <div>
          <p className="eyebrow">LET’S MAKE IT SIMPLE</p>
          <h2>
            What could use
            <br />
            {" a little care?"}
          </h2>
        </div>
        <Finder />
      </section>

      <section className="container commercial-feature">
        <div className="commercial-image">
          <Image
            src={workplaceCleaning}
            sizes="(max-width: 700px) calc(100vw - 40px), 55vw"
            alt="Cleaning technician wiping a glass partition in a bright office"
          />
        </div>
        <div className="commercial-copy">
          <p className="eyebrow">FOR THE SPACE BEHIND YOUR BUSINESS</p>
          <h2>
            Ready for
            <br />
            {" another"}
            <br /> <em>good day.</em>
          </h2>
          <p>
            Give your team and your customers a space that feels cared for.
            Let’s start with a walkthrough and a plan that fits your business.
          </p>
          <ButtonLink href="/services/commercial-cleaning/">
            Explore commercial cleaning
          </ButtonLink>
        </div>
      </section>

      <section className="proof-section" id="difference">
        <div className="container proof-grid">
          <div>
            <p className="eyebrow">THE DIFFERENCE IS IN THE DETAILS</p>
            <h2>
              A little effort.
              <br />
              {" A very visible"}
              <br /> <em>difference.</em>
            </h2>
            <p>
              Real work from Men Can Clean Too!
              <br />
              {" Move the slider to see this stovetop detail"}
              <br className="desktop-only" />
              {"  before and after cleaning."}
            </p>
            <div className="proof-note">
              <Spark />
              <span>
                The small things?
                <br />
                {" They’re a big part of the clean."}
              </span>
            </div>
            <TextLink href="/about/">Meet the care behind the clean</TextLink>
          </div>
          <BeforeAfter />
        </div>
      </section>

      <Reviews />

      <section className="container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FROM TO-DO TO TA-DA</p>
            <h2>
              A lighter day.
              <br />
              {" Three simple steps."}
            </h2>
          </div>
          <ButtonLink href="/plan/" secondary>
            Start your cleaning plan
          </ButtonLink>
        </div>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <article key={step.title}>
              <span className="step-number">{`0${i + 1}`}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container neighbor-banner">
        <span className="neighbor-icon">
          <Spark />
        </span>
        <div>
          <p className="eyebrow">GOOD NEIGHBORS. GOOD THINGS.</p>
          <h3>A clean home can be a little act of kindness.</h3>
          <p>
            Meet Bless a Neighbor, the company’s monthly community cleaning
            program.
          </p>
        </div>
        <TextLink href="/about/#community">See how it works</TextLink>
      </section>

      <section className="container section faq-section">
        <div>
          <p className="eyebrow">A LITTLE CLARITY</p>
          <h2>
            Good questions.
            <br />
            {" Fresh answers."}
          </h2>
          <p>Something else on your mind?</p>
          <TextLink href="/contact/">Let’s talk</TextLink>
        </div>
        <div className="faq-list">
          {faq.map(({ question, answer }) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
