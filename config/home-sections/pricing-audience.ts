/** Zielgruppen-Umschalter in #preise (Query: ?tab=sifa). */
export const HOME_PRICING_AUDIENCE_QUERY_KEY = 'tab' as const;

export const HOME_PRICING_AUDIENCE_SIFA_VALUE = 'sifa' as const;

export const HOME_PRICING_AUDIENCE_TABS = {
  kmu: {
    id: 'kmu',
    label: 'Betrieb / KMU',
  },
  sifa: {
    id: 'sifa',
    label: 'Externe SiFa',
  },
} as const;

export type HomePricingAudienceId = keyof typeof HOME_PRICING_AUDIENCE_TABS;

export const HOME_PRICING_SIFA_TAB_HREF = `/?${HOME_PRICING_AUDIENCE_QUERY_KEY}=${HOME_PRICING_AUDIENCE_SIFA_VALUE}#preise` as const;