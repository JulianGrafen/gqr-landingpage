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
    yearly: 'https://buy.stripe.com/eVqfZgeyDbgq2rH8yQdAk0a',
  },
  industrie: {
    monthly: 'https://buy.stripe.com/dRm9ASbmr84e7M16qIdAk08',
    yearly: 'https://buy.stripe.com/dRm28q2PVacm8Q5dTadAk07',
  },
};

export { HOME_PRICING_SECTION_MARKETING as PRICING_SECTION_MARKETING } from '@/config/home-sections/pricing';
