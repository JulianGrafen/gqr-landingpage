import {
  formatPricingAmountEur,
  formatYearlyTotalNote,
  pricingPricePrefix,
  resolveDisplayedMonthlyEur,
  type PricingBillingInterval,
  type PricingTierConfig,
} from '@/lib/pricing-config';

const CARD_BASE =
  'relative flex h-full min-h-full flex-col rounded-2xl border bg-[#0f1e35]/70 p-6 shadow-lg shadow-black/10 lg:p-7';

const CARD_DEFAULT = `${CARD_BASE} border-white/[0.08]`;
const CARD_HIGHLIGHTED = `${CARD_BASE} border-teal-400/35 ring-1 ring-teal-400/20`;

interface PricingTierCardProps {
  tier: PricingTierConfig;
  billing: PricingBillingInterval;
}

export function PricingTierCard({ tier, billing }: PricingTierCardProps) {
  const monthlyDisplay = resolveDisplayedMonthlyEur(tier.price, billing);
  const fixedPrice = tier.price.kind === 'fixed' ? tier.price : null;
  const showYearlyNote = fixedPrice !== null && billing === 'yearly';
  const ctaClass =
    tier.cta.variant === 'primary'
      ? 'btn-cta-orange btn-cta-orange--block'
      : 'btn-glass-outline btn-glass-outline--block';

  return (
    <article className={tier.highlighted ? CARD_HIGHLIGHTED : CARD_DEFAULT}>
      {tier.badge ? (
        <span className="pricing-badge-recommended" aria-label={tier.badge}>
          {tier.badge}
        </span>
      ) : null}
      <h3 className="m-0 text-lg font-bold text-[#f0f6ff]">{tier.name}</h3>
      <p className="pricing-tier-card__audience m-0 mt-1 text-sm leading-relaxed text-[#8fa4c0]">
        {tier.description}
      </p>

      <p className="pricing-tier__price m-0 mt-6 tabular-nums text-3xl font-black tracking-tight text-[#f0f6ff]">
        <span className="text-3xl font-black">
          {pricingPricePrefix(tier.price)}
          {monthlyDisplay !== null ? formatPricingAmountEur(monthlyDisplay) : null}
        </span>
        <span className="ml-1 text-lg font-bold text-[#8fa4c0]">/ Monat</span>
      </p>

      {showYearlyNote && fixedPrice ? (
        <p className="pricing-tier__price-note m-0 mt-2 min-h-5 text-sm tabular-nums text-[#8fa4c0]">
          {formatYearlyTotalNote(fixedPrice.yearlyTotalEur)}
        </p>
      ) : (
        <p className="pricing-tier__price-note pricing-tier__price-note--spacer m-0 mt-2 min-h-5" aria-hidden="true" />
      )}

      <ul className="pricing-tier-card__features m-0 mt-6 flex flex-1 list-none flex-col p-0 gap-2.5 text-sm leading-relaxed text-[#c5d0e2]">
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="shrink-0 text-teal-300" aria-hidden="true">
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="pricing-tier-card__cta mt-auto pt-8">
        <a className={ctaClass} href={tier.cta.href}>
          {tier.cta.label}
        </a>
      </div>
    </article>
  );
}