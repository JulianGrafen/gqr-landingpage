/** B2B-USt-Hinweis für alle Nettopreise (Landing, pSEO, App-Marketing). */
export const PRICING_VAT_SUFFIX = 'zzgl. MwSt.' as const;

export const PRICING_VAT_FOOTNOTE_BILLING = {
  monthly: `Alle Preise ${PRICING_VAT_SUFFIX}, monatliche Abrechnung`,
  yearly: `Alle Preise ${PRICING_VAT_SUFFIX}, jährliche Vorauszahlung (Standard)`,
} as const;