import { LandingCtaLink } from '@/components/seo-silo/LandingCtaLink';
import type { DecisionCta } from '@/config/trust/types';

type DecisionCtaBoxProps = {
  cta: DecisionCta;
  id?: string;
};

/** Abschluss-Box der Decision-Layer-Seiten (gleiche Kartenoptik wie LandingCtaBand, plus Sekundär-CTA). */
export function DecisionCtaBox({ cta, id = 'decision-cta' }: DecisionCtaBoxProps) {
  return (
    <section className="py-14 lg:py-20" aria-labelledby={`${id}-title`}>
      <div className="gqr-container">
        <div className="gqr-sidebar-card gqr-sidebar-card--cta mx-auto max-w-3xl px-6 py-10 text-center sm:px-10 sm:py-12">
          <h2 id={`${id}-title`} className="gqr-post-section-title">
            {cta.headline}
          </h2>
          <p className="gqr-post-section-sub mt-3">{cta.body}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <LandingCtaLink cta={cta.primary} variant="primary" />
            {cta.secondary ? <LandingCtaLink cta={cta.secondary} variant="secondary" /> : null}
          </div>
          {cta.note ? <p className="mt-4 text-xs text-gqr-muted">{cta.note}</p> : null}
        </div>
      </div>
    </section>
  );
}
