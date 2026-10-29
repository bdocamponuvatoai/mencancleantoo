import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy & preview information",
  path: "/privacy/",
  description:
    "How this preview handles your cleaning plan, external booking and illustrative imagery.",
});

export default function PrivacyPage() {
  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">A LITTLE TRANSPARENCY</p>
        <h1>
          Privacy &amp;
          <br />
          {" preview information."}
        </h1>
      </section>
      <section className="container prose">
        <h2>Your cleaning plan</h2>
        <p>
          This design preview processes your plan in your browser. It does not
          send the plan to the company, save it to a server, or store it after a
          page reload. Downloading creates a text file on your device. The email
          option opens a draft in your email app; you decide whether to send it.
        </p>
        <h2>Booking and external services</h2>
        <p>
          Booking and nomination links take you to the company’s current
          website. Information you enter there is governed by that site’s
          policies. Phone and email links open your device’s chosen application.
        </p>
        <h2>About this preview</h2>
        <p>
          This is a proposed design, not a replacement for the company’s current
          booking system. Lifestyle images are AI-generated illustrations of
          cleaning services and do not depict actual staff or completed client
          projects. The before-and-after images and existing logo are from the
          company’s website. No testimonials or review counts have been
          invented.
        </p>
        <h2>Questions</h2>
        <p>
          {"Contact "}
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {" about the company’s services. "}
          <a href={site.live.privacy}>
            Read the current company privacy policy
          </a>
          .
        </p>
      </section>
    </>
  );
}
