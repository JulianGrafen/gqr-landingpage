import Link from 'next/link';
import type { SeoSiloClosingCta } from '@/config/seo-silo/types';

type LandingCtaBandProps = SeoSiloClosingCta & {
  id?: string;
};

export function LandingCtaBand({
  id = 'silo-closing-cta',
  headline,
  subline,
  primaryCta,
  disclaimer,
}: LandingCtaBandProps) {
  const ctaClassName = 'gqr-cta-primary gqr-cta-primary--lg mt-6 no-underline';

  return (
    <section
      className="py-14 lg:py-20"
      aria-labelledby={`${id}-title`}
    >
      <div className="gqr-container">
        <div className="gqr-sidebar-card gqr-sidebar-card--cta mx-auto max-w-3xl px-6 py-10 text-center sm:px-10 sm:py-12">
          <h2 id={`${id}-title`} className="gqr-post-section-title">
            {headline}
          </h2>
          <p className="gqr-post-section-sub mt-3">{subline}</p>
          {primaryCta.external ? (
            <a
              href={primaryCta.href}
              className={ctaClassName}
              rel="noopener noreferrer"
            >
              {primaryCta.label}
            </a>
          ) : (
            <Link href={primaryCta.href} className={ctaClassName}>
              {primaryCta.label}
            </Link>
          )}
          {disclaimer ? (
            <p className="mt-4 text-xs text-gqr-muted">{disclaimer}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
