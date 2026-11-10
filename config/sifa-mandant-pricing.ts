/**
 * SiFa Multi-Mandant: inkludierte Mandantenbetriebe und Skalierung per 10er-Block.
 * Einzige Quelle für Limits, FAQ und Marketing-Texte (Startseite #preise, #fuer-sifas).
 */

export const SIFA_MANDANT_INCLUDED = 15;
export const SIFA_MANDANT_BLOCK_SIZE = 10;
export const SIFA_MANDANT_BLOCK_PRICE_MONTHLY_EUR = 79;

const EURO_DECIMAL = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatEuroAmount(amount: number): string {
  return `${EURO_DECIMAL.format(amount)} €`;
}

/** Anzahl 10er-Blöcke ab dem ersten Mandanten über dem Inklusivkontingent. */
export function sifaExtensionBlockCount(mandantCount: number): number {
  if (mandantCount <= SIFA_MANDANT_INCLUDED) return 0;
  const extra = mandantCount - SIFA_MANDANT_INCLUDED;
  return Math.ceil(extra / SIFA_MANDANT_BLOCK_SIZE);
}

/** Gesamtpreis pro Monat inkl. Block-Aufschläge (netto). */
export function sifaMonthlyTotalEur(mandantCount: number, baseMonthlyEur: number): number {
  return (
    baseMonthlyEur + sifaExtensionBlockCount(mandantCount) * SIFA_MANDANT_BLOCK_PRICE_MONTHLY_EUR
  );
}

export const SIFA_MANDANT_LIMITS_LABEL = `bis ${SIFA_MANDANT_INCLUDED} Mandantenbetriebe inklusive`;

export const SIFA_MANDANT_EXTENSION_LABEL = `Ab dem ${SIFA_MANDANT_INCLUDED + 1}. Mandant: +${formatEuroAmount(SIFA_MANDANT_BLOCK_PRICE_MONTHLY_EUR)}/Monat je ${SIFA_MANDANT_BLOCK_SIZE}er-Block weiterer Mandanten`;

/** Rechenbeispiele (Jahreszahlung, eff. 159 €/Monat Grundpreis). */
export const SIFA_MANDANT_PRICE_EXAMPLES = [
  {
    mandanten: 35,
    totalMonthlyEur: 317,
    perMandantEur: 9.06,
    label: 'großes Ingenieurbüro',
  },
  {
    mandanten: 55,
    totalMonthlyEur: 475,
    perMandantEur: 8.64,
    label: 'Großbüro',
  },
] as const;
