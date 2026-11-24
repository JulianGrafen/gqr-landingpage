import type { ReactNode } from 'react';
import {
  HOME_PRICING_CARD_BULLETS,
  formatYearlyBilledNote,
  getHomePricingPlan,
  isHomePricingRecommended,
  pricingCardAnchorEur,
  type HomePricingCardId,
} from '@/config/home-sections/pricing';
import { PRICING_CARD_CTA_LABEL, PRICING_DISPLAY_ANCHOR_OFFSET_EUR } from '@/config/pricing-plans';
import { PRICING_STRIPE_CHECKOUT } from '@/config/pricing-stripe-checkout';
import { PRICING_VAT_SUFFIX } from '@/config/pricing-vat';
import { buildSifaPricingCardPitch } from '@/config/sifa-mandant-pricing';

const CARD_CLASS =
  'relative flex flex-col rounded-2xl border border-white/[0.08] bg-[#0f1e35]/70 p-6 shadow-lg shadow-black/10 lg:p-7';

interface PricingTierCardProps {
  planId: HomePricingCardId;
}

function PricingFeatureBullet({ text }: { text: string }) {
  return (
    <li className="flex gap-2">
      <span className="text-teal-300" aria-hidden="true">
        &#10003;
      </span>
      {text}
    </li>
  );
}

function SifaMandantPitch() {
  const lines = buildSifaPricingCardPitch();
  return (
    <li className="pricing-tier__pitch list-none border-t border-white/[0.08] pt-4">
      {lines.map((line, index) => (
        <p
          key={line}
          className={
            index === 0
              ? 'm-0 leading-relaxed text-[#c5d0e2]'
              : 'm-0 mt-2 leading-relaxed text-[#c5d0e2]'
          }
        >
          {line}
        </p>
      ))}
      <p className="m-0 mt-2 text-xs leading-relaxed text-[#8fa4c0]">
        Rechenbeispiele bei Jahreszahlung zum reduzierten Monatspreis.
      </p>
    </li>
  );
}

export function PricingTierCard({ planId }: PricingTierCardProps) {
  const plan = getHomePricingPlan(planId);
  const recommended = isHomePricingRecommended(plan.id);
  const yearlyMonthly = plan.yearlyMonthlyPriceEur ?? plan.monthlyPriceEur;
  const yearlyTotal = plan.yearlyTotalPriceEur ?? yearlyMonthly * 12;
  const anchor = pricingCardAnchorEur(plan.monthlyPriceEur);
  const bullets = HOME_PRICING_CARD_BULLETS[planId];
  const checkoutYearly = PRICING_STRIPE_CHECKOUT[planId].yearly;
  const sifaPitchAfterIndex = planId === 'sifa-multi-mandant' ? 2 : -1;

  const listItems: ReactNode[] = [];
  bullets.forEach((bullet, index) => {
    listItems.push(<PricingFeatureBullet key={bullet.text} text={bullet.text} />);
    if (index === sifaPitchAfterIndex) {
      listItems.push(<SifaMandantPitch key="sifa-pitch" />);
    }
  });

  return (
    <article className={CARD_CLASS} data-pricing-tier={plan.id}>
      {recommended ? <span className="pricing-badge-recommended">Empfohlen</span> : null}
      <p className="text-lg font-bold text-[#f0f6ff]">{plan.name}</p>
      <p className="mt-1 text-sm text-[#8fa4c0]">{plan.audience}</p>
      <p
        className="pricing-tier__price text-3xl font-black text-[#f0f6ff]"
        data-pricing-price
        data-monthly={plan.monthlyPriceEur}
        data-yearly={yearlyMonthly}
        data-yearly-total={yearlyTotal}
        data-anchor-offset={PRICING_DISPLAY_ANCHOR_OFFSET_EUR}
      >
        <span className="pricing-tier__price-row">
          <s className="pricing-tier__price-anchor" data-pricing-anchor>
            {anchor}&nbsp;&euro;
          </s>
          <span className="pricing-tier__price-current">
            <span data-pricing-amount>{yearlyMonthly}</span>
            &nbsp;&euro;
            <span className="text-base font-semibold text-[#8fa4c0]" data-pricing-period>
              /Monat
            </span>
          </span>
        </span>
        <span className="pricing-tier__price-vat">{PRICING_VAT_SUFFIX}</span>
      </p>
      <p className="pricing-tier__price-note" data-pricing-note>
        {formatYearlyBilledNote(yearlyTotal)}
      </p>
      <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm text-[#c5d0e2]">{listItems}</ul>
      <a
        className="btn-glass-outline btn-glass-outline--block mt-8"
        href={checkoutYearly}
        data-pricing-cta
        data-pricing-plan={plan.id}
        rel="noopener noreferrer"
      >
        {plan.ctaLabel ?? PRICING_CARD_CTA_LABEL}
      </a>
    </article>
  );
}