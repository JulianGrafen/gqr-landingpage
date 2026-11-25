import { HOME_SECTION_STYLES as styles } from '@/components/home/home-section-styles';
import { PricingAudienceSwitch } from '@/components/home/PricingAudienceSwitch';
import { PricingCompareTable } from '@/components/home/PricingCompareTable';
import { PricingTierCard } from '@/components/home/PricingTierCard';
import {
  HOME_PRICING_CARD_IDS,
  HOME_PRICING_FOOTNOTE_DEFAULT,
  HOME_PRICING_SECTION_MARKETING,
} from '@/config/home-sections/pricing';
import { PRICING_SECTION_LEGAL_LINE } from '@/config/pricing-vat';

const PRICING_HEADLINE_ID = 'pricingHeadline';

/** Startseite #preise: Billing, 3 Kern-Tarife, Industrie-Leiste, Fußnote, Planvergleich. */
export function HomePricingSection() {
  const marketing = HOME_PRICING_SECTION_MARKETING;

  return (
    <section
      id="preise"
      className="border-t mt-8 border-white/[0.07] bg-white/[0.02] py-14 lg:py-24"
      aria-labelledby={PRICING_HEADLINE_ID}
      data-billing-mode="yearly"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{marketing.kicker}</p>
          <h2 id={PRICING_HEADLINE_ID} className={styles.headline}>
            {marketing.headline}
          </h2>
          <p className={styles.lead}>{marketing.subheadline}</p>
          <p className="pricing-trial-promo mt-5 text-lg font-bold leading-snug">
            <a
              href={marketing.trialHeadline.href}
              className="text-teal-300 underline-offset-4 hover:underline"
            >
              {marketing.trialHeadline.text}
            </a>
          </p>
        </div>

        <PricingAudienceSwitch />

        <div className="pricing-billing" data-pricing-billing>
          <div className="pricing-billing__switch" role="group" aria-label="Abrechnungszeitraum wählen">
            <span className="pricing-billing__thumb" aria-hidden="true" />
            <button type="button" className="pricing-billing__option" data-billing="monthly" aria-pressed="false">
              Monatlich
            </button>
            <button
              type="button"
              className="pricing-billing__option is-active"
              data-billing="yearly"
              aria-pressed="true"
            >
              Jährlich
              <span className="pricing-billing__badge">Standard</span>
            </button>
          </div>
          <p className="pricing-billing__hint" data-pricing-billing-hint>
            {marketing.billingHintYearly}
          </p>
        </div>

        <div className="pricing-tier-grid pricing-tier-grid--core">
          {HOME_PRICING_CARD_IDS.map((id) => (
            <PricingTierCard key={id} planId={id} />
          ))}
        </div>

        <p className="pricing-industry-bar mt-8 border-t border-white/[0.08] pt-6 text-center text-sm leading-relaxed text-[#8fa4c0]">
          {marketing.industryBar.summary}{' '}
          <a className="sds-secondary-link text-sm font-semibold" href={marketing.industryBar.href}>
            {marketing.industryBar.ctaLabel} →
          </a>
        </p>

        <p className="mt-8 text-center text-sm text-[#8fa4c0]" data-pricing-footnote>
          {HOME_PRICING_FOOTNOTE_DEFAULT}{' '}
          <a
            href={marketing.trialHeadline.href}
            className="font-semibold text-teal-300 underline-offset-2 hover:underline"
          >
            {marketing.footnoteRegisterLabel}
          </a>
          , ohne Kreditkarte.
        </p>

        <PricingCompareTable />

        <p className="mt-6 text-center text-xs leading-relaxed text-[#8fa4c0]">{PRICING_SECTION_LEGAL_LINE}</p>
      </div>
    </section>
  );
}