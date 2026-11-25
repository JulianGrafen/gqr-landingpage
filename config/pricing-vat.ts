/** B2B-USt-Hinweis für alle Nettopreise (Landing, pSEO, App-Marketing). */
export const PRICING_VAT_SUFFIX = 'zzgl. MwSt.' as const;

export const PRICING_VAT_RATE_LABEL = 'zzgl. 19 % MwSt.' as const;

/** Pflichthinweis unter #preise (B2B, § 14 BGB, PAngV). */
export const PRICING_SECTION_LEGAL_LINE =
  'Alle Preise netto zzgl. 19 % MwSt. Das Angebot richtet sich ausschließlich an Unternehmer (§ 14 BGB).' as const;

export const PRICING_VAT_FOOTNOTE_BILLING = {
  monthly: `Alle Preise ${PRICING_VAT_RATE_LABEL}, monatliche Abrechnung`,
  yearly: `Alle Preise ${PRICING_VAT_RATE_LABEL}, jährliche Vorauszahlung (Standard)`,
} as const;