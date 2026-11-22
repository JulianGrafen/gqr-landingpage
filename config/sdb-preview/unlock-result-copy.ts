/**
 * CRO-Texte der SDB-Live-Ergebnisanzeige (Startseite + Next-Dropzone).
 * Compliance: kein Fix-Dauer-Versprechen mit „Sekunden“-Wortlaut; Legal-Hinweis bleibt sichtbar.
 */
export const SDB_UNLOCK_RESULT_COPY = {
  successBadgeFallback: '✓ Aus Ihrem SDB ausgelesen',
  successBadgeFrom: (sourceLabel: string) => `✓ Aus ${sourceLabel} ausgelesen`,
  headlineFallback: 'Ihr TRGS-555-Entwurf ist fertig',
  headlineForProduct: (productName: string) => `Ihre Betriebsanweisung für „${productName}“ ist fertig`,
  cta: 'Vollständige BA & QR-Code kostenlos freischalten',
  microTrust: 'Kostenloser Zugang in 30 Sek. · Keine Kreditkarte · Kein Verkaufsgespräch',
  legalLine: 'Fachliche Prüfung & Freigabe gemäß § 14 GefStoffV durch SiFa/Arbeitgeber',
} as const;
