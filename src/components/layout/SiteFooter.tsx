import Link from "next/link";
import { site } from "@/config/site";
import { Brand } from "@/components/ui/Brand";

export function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Brand variant="footer" />
            <p>
              Good people. Thoughtful cleaning.
              <br />
              {" A little more life for you."}
            </p>
          </div>
          <div>
            <h3>Your clean</h3>
            <Link href="/services/recurring-cleaning/">Recurring cleaning</Link>
            <Link href="/services/deep-cleaning/">Deep cleaning</Link>
            <Link href="/services/move-cleaning/">Moving &amp; rentals</Link>
            <Link href="/services/commercial-cleaning/">
              Commercial cleaning
            </Link>
          </div>
          <div>
            <h3>A little more</h3>
            <Link href="/about/">Our story</Link>
            <Link href="/about/#community">Bless a Neighbor</Link>
            <Link href="/contact/#service-area">Our service area</Link>
            <Link href="/plan/">Build your cleaning plan</Link>
          </div>
          <div>
            <h3>Say hello</h3>
            <a className="footer-phone" href={site.phone.href}>
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <p>
              Springfield, Missouri
              <br />
              {" Serving homes & businesses"}
            </p>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>{`© 2026 ${site.name}`}</span>
          <Link href="/privacy/">Privacy &amp; preview information</Link>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
      <div className="mobile-cta">
        <a href={site.phone.href}>Call the team</a>
        <Link href="/plan/">Find your clean ↗</Link>
      </div>
    </>
  );
}
