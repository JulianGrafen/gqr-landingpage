import { SecurityTrustBadgeList } from '@/components/home/SecurityTrustBadgeList';
import {
  FOOTER_BA_SAMPLE_LINKS,
  FOOTER_INDUSTRY_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_PRODUCT_LINKS,
  FOOTER_RESOURCE_LINKS,
  FOOTER_TRUST_BADGES,
} from '@/config/site-footer';
import { FOOTER_COPYRIGHT, FOOTER_TAGLINE } from '@/config/legal/site-copy';
import { resolveMarketingHomeHref } from '@/config/site-seo';

function FooterColumn({ id, title, links }: { id: string; title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="site-footer__column-title">
        {title}
      </h2>
      <ul className="site-footer__link-list">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="site-footer__link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Enterprise-Footer (statisches HTML + Next.js). */
export function EnterpriseSiteFooter() {
  const marketingHomeHref = resolveMarketingHomeHref();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <h2 className="sr-only">Seitenfuß</h2>
          <a href={marketingHomeHref} className="site-footer__brand" aria-label="Gefahrstoff-QR Startseite">
            <p className="site-footer__logo">Gefahrstoff-QR</p>
            <p className="site-footer__tagline">{FOOTER_TAGLINE}</p>
          </a>

          <FooterColumn id="footer-col-product" title="Produkt" links={FOOTER_PRODUCT_LINKS} />
          <FooterColumn id="footer-col-resources" title="Wissen & Tools" links={FOOTER_RESOURCE_LINKS} />
          <FooterColumn id="footer-col-legal" title="Rechtliches" links={FOOTER_LEGAL_LINKS} />
        </div>

        <SecurityTrustBadgeList
          badges={FOOTER_TRUST_BADGES}
          className="site-footer__trust mt-8 w-full border-t border-white/10 pt-8"
        />

        <div className="site-footer__secondary">
          <div className="site-footer__secondary-col">
            <h2 className="site-footer__column-title">Lösungen nach Branche</h2>
            <ul className="site-footer__link-list site-footer__link-list--secondary site-footer__link-list--industry">
              {FOOTER_INDUSTRY_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="site-footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="site-footer__secondary-col">
            <h2 className="site-footer__column-title">
              <a href="/betriebsanweisung/" className="site-footer__heading-link">
                Betriebsanweisungen (TRGS 555)
              </a>
            </h2>
            <ul className="site-footer__link-list site-footer__link-list--secondary site-footer__link-list--ba-samples">
              {FOOTER_BA_SAMPLE_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="site-footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="site-footer__link-list__full-row">
                <a href="/betriebsanweisung/" className="site-footer__link site-footer__link--accent">
                  Alle Stoffe ansehen →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="site-footer__legal">{FOOTER_COPYRIGHT}</p>
      </div>
    </footer>
  );
}
