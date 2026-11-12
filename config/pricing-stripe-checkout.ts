import type { PricingPlanId } from '@/config/pricing-plans';

/** Stripe Payment Links (Checkout) — Nettopreise wie in config/pricing-plans.ts. */
export type PricingBillingInterval = 'monthly' | 'yearly';

export type StripeCheckoutPlanId = Extract<
  PricingPlanId,
  'kmu-basis' | 'kmu-pro' | 'sifa-multi-mandant' | 'industrie'
>;

export const PRICING_STRIPE_CHECKOUT: Record<
  StripeCheckoutPlanId,
  Record<PricingBillingInterval, string>
> = {
  'kmu-basis': {
    monthly: 'https://buy.stripe.com/9B68wOduzesC0jz2asdAk06',
    yearly: 'https://buy.stripe.com/00wbJ03TZ70a8Q5cP6dAk03',
  },
  'kmu-pro': {
    monthly: 'https://buy.stripe.com/3cI9AS3TZ0BM4zP5mEdAk05',
    yearly: 'https://buy.stripe.com/bJecN4gGLbgq4zP9CUdAk02',
  },
  'sifa-multi-mandant': {
    monthly: 'https://buy.stripe.com/6oU14m9ej1FQ5DT16odAk04',
    yearly: 'https://buy.stripe.com/eVqcN43TZ84e4zPaGYdAk01',
  },
  industrie: {
    monthly: 'https://buy.stripe.com/dRm28q2PVacm8Q5dTadAk07',
    yearly: 'https://buy.stripe.com/dRm9ASbmr84e7M16qIdAk08',
  },
};

export const PRICING_SECTION_MARKETING = {
  kicker: 'Preise',
  headline: 'Transparente Preise für jedes Unternehmen',
  subheadline:
    'Vom unverbindlichen Tariftest bis zur SiFa-Mandantenverwaltung: KMU Basis, KMU Pro oder SiFa Multi-Mandant. Jährliche Abrechnung ist Standard und günstiger — monatlich jederzeit kündbar. QR-Notfallzugriff ist in den bezahlten Plänen inklusive.',
  billingHintYearly: 'Jährliche Abrechnung (Standard) — effektiv bis zu 17 % günstiger.',
  billingHintMonthly: 'Monatliche Abrechnung, monatlich kündbar.',
  yearlyEquivalentNote: (monthlyEur: number) =>
    `Entspricht ${monthlyEur.toLocaleString('de-DE')} €/Monat · Standard bei Jahreszahlung`,
} as const;
