import Link from 'next/link';
import { BA_CONTAINER, BA_SECTION } from '@/components/betriebsanweisung/ba-page-layout';
import { SITE_URL } from '@/config/site-seo';

export type StrikingDistanceMidPageCtaCopy = {
  headline: string;
  body: string;
  primaryLabel: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

type StrikingDistanceMidPageCtaProps = {
  copy: StrikingDistanceMidPageCtaCopy;
  /** Scrollt auf der Stoffseite zur Dropzone statt zur Startseite. */
  onScrollToDropzone?: () => void;
  variant?: 'betriebsanweisung' | 'wissen';
};

const LIVE_TEST_HREF = `${SITE_URL}/#live-demo`;

/**
 * Mid-page CTA (Striking Distance): oberhalb der Seitenmitte, gleiche Kartenoptik wie BA-Abschluss-CTA.
 */
export function StrikingDistanceMidPageCta({
  copy,
  onScrollToDropzone,
  variant = 'betriebsanweisung',
}: StrikingDistanceMidPageCtaProps) {
  const sectionClass = variant === 'betriebsanweisung' ? BA_SECTION : 'border-b border-white/[0.07] py-10 lg:py-14';
  const wrapperClass = variant === 'betriebsanweisung' ? BA_CONTAINER : 'gqr-container';

  return (
    <section className={sectionClass} aria-labelledby="striking-mid-cta-title">
      <div className={wrapperClass}>
        <div className="ba-contrast-panel mx-auto max-w-3xl border-[#ff6b35]/25 bg-[#162340]/90 px-6 py-8 text-center sm:px-10 sm:py-10">
          <h2 id="striking-mid-cta-title" className="text-xl font-bold text-[#f0f6ff] sm:text-2xl">
            {copy.headline}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#8fa4c0]">{copy.body}</p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
            <a
              href={LIVE_TEST_HREF}
              className="gqr-cta-primary gqr-cta-primary--md inline-flex justify-center no-underline"
            >
              {copy.primaryLabel}
            </a>
            {onScrollToDropzone && copy.secondaryLabel ? (
              <button
                type="button"
                className="gqr-cta-secondary gqr-cta-secondary--md inline-flex justify-center"
                onClick={onScrollToDropzone}
              >
                {copy.secondaryLabel}
              </button>
            ) : copy.secondaryLabel ? (
              <Link
                href={copy.secondaryHref ?? '/loesungen/kfz-werkstatt/'}
                className="gqr-cta-secondary gqr-cta-secondary--md inline-flex justify-center"
              >
                {copy.secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}