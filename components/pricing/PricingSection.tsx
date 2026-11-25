'use client';

import { useEffect, useRef } from 'react';
import { HOME_SECTION_STYLES as styles } from '@/components/home/home-section-styles';
import { PricingTierCard } from '@/components/pricing/PricingTierCard';
import {
  PRICING_GRID_LEGAL_LINE,
  PRICING_SECTION_MARKETING,
  PRICING_TIERS_BY_PERSONA,
  type PricingPersonaId,
} from '@/lib/pricing-config';
import { usePricingUrlState } from '@/lib/pricing/use-pricing-url-state';

const PRICING_HEADLINE_ID = 'pricingHeadline';

export interface PricingSectionProps {
  sectionId?: string;
  /** Nur für Next /pricing beim SSR (Export-Build sonst Default). */
  initialPersona?: PricingPersonaId;
  className?: string;
  /** Statisches Hydrate-Mount: kein zusätzliches äußeres section-Element. */
  embedded?: boolean;
}

function personaGridClass(persona: PricingPersonaId): string {
  if (persona === 'sifa') {
    return 'pricing-tier-grid pricing-tier-grid--kmu mx-auto max-w-3xl lg:max-w-4xl';
  }
  return 'pricing-tier-grid pricing-tier-grid--core';
}

export function PricingSection({
  sectionId = 'preise',
  initialPersona,
  className,
  embedded = false,
}: PricingSectionProps) {
  const marketing = PRICING_SECTION_MARKETING;
  const { persona, billing, setPersona, setBilling } = usePricingUrlState(initialPersona);
  const tiers = PRICING_TIERS_BY_PERSONA[persona];
  const billingSwitchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.getElementById(sectionId);
    el?.setAttribute('data-billing-mode', billing);
  }, [billing, sectionId]);

  useEffect(() => {
    const switchEl = billingSwitchRef.current;
    if (!switchEl) return;
    const thumb = switchEl.querySelector<HTMLElement>('.pricing-billing__thumb');
    const active = switchEl.querySelector<HTMLElement>('.pricing-billing__option.is-active');
    if (!thumb || !active) return;
    thumb.style.width = `${active.offsetWidth}px`;
    thumb.style.left = `${active.offsetLeft}px`;
  }, [billing, persona]);

  const body = (
    <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{marketing.kicker}</p>
          <h2 id={PRICING_HEADLINE_ID} className={styles.headline}>
            {marketing.headline}
          </h2>
          <p className={styles.lead}>{marketing.subheadline}</p>
        </div>

        <div className="mb-8 flex flex-col items-center gap-4 lg:flex-row lg:justify-center lg:gap-6">
          <div className="pricing-persona-toggle" role="tablist" aria-label="Zielgruppe wählen">
            {(Object.keys(marketing.personaLabels) as PricingPersonaId[]).map((key) => {
              const active = persona === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={['pricing-persona-toggle__btn', active ? 'is-active' : ''].join(' ').trim()}
                  onClick={() => setPersona(key)}
                >
                  {marketing.personaLabels[key]}
                </button>
              );
            })}
          </div>

          <div
            className="pricing-billing"
            role="group"
            aria-label="Abrechnungszeitraum wählen"
          >
            <div className="pricing-billing__switch" ref={billingSwitchRef}>
              <span className="pricing-billing__thumb" aria-hidden="true" />
              <button
                type="button"
                className={['pricing-billing__option', billing === 'yearly' ? 'is-active' : ''].join(' ')}
                aria-pressed={billing === 'yearly'}
                onClick={() => setBilling('yearly')}
              >
                {marketing.billingLabels.yearly}
              </button>
              <button
                type="button"
                className={['pricing-billing__option', billing === 'monthly' ? 'is-active' : ''].join(' ')}
                aria-pressed={billing === 'monthly'}
                onClick={() => setBilling('monthly')}
              >
                {marketing.billingLabels.monthly}
              </button>
            </div>
          </div>
        </div>

        <div className={personaGridClass(persona)} role="tabpanel">
          {tiers.map((tier) => (
            <PricingTierCard key={tier.id} tier={tier} billing={billing} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs leading-relaxed text-[#8fa4c0]">{PRICING_GRID_LEGAL_LINE}</p>
      </div>
  );

  if (embedded) {
    return body;
  }

  return (
    <section
      id={sectionId}
      data-pricing-section
      data-billing-mode={billing}
      className={[styles.sectionRaised, 'mt-8', className].filter(Boolean).join(' ')}
      aria-labelledby={PRICING_HEADLINE_ID}
    >
      {body}
    </section>
  );
}