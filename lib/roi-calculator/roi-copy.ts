export const ROI_COPY = {
  title: 'ROI-Rechner',
  subtitle: 'Zeitaufwand für Ersterfassung & Pflege Ihrer SDBs',
  kmuSubstanceLabel: 'Gefahrstoffe im Betrieb',
  sifaSubstanceLabel: 'Ø Gefahrstoffe pro Mandant',
  clientLabel: 'Anzahl der Mandanten',
  excelLabel: 'Mit Excel',
  digitalLabel: 'Mit Gefahrstoff-QR',
  savedTimeLabel: 'Gesparte Zeit',
  sifaCostLabel: 'Blockiertes Honorarpotenzial',
  kmuCostLabel: 'Gesparte Personalkosten',
  ctaPrefix: 'Diese',
  ctaSuffix: 'Stunden zurückholen',
  microcopy: 'Kostenlos mit eigenem SDB testen · Keine Kreditkarte · Kein Verkaufsgespräch',
  assumption: 'Annahme: rund 20 Minuten manuelles Abtippen pro Sicherheitsdatenblatt.',
} as const;

export function hourlyRateHint(hourlyRateEur: number): string {
  return `(bei ${hourlyRateEur}\u00a0€/h)`;
}

export function totalSubstancesLabel(formattedCount: string): string {
  return `Gesamt: ${formattedCount} Sicherheitsdatenblätter`;
}

export function softwareRoiLine(yearlyPriceFormatted: string, factorFormatted: string): string {
  return `Software-Kosten: ${yearlyPriceFormatted} €/Jahr · ROI: ${factorFormatted}x`;
}
