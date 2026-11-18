/**
 * Texte der Live-Vorschau auf `/betriebsanweisung/[slug]` (nach SDB-Upload bzw. Demo-Extraktion).
 *
 * Compliance (AGENTS.md, scripts/validate-legal-copy.mjs): keine „konform“-Versprechen, kein Word-Export
 * (nicht im Produkt), Entwurf immer als KI-gestützt + Freigabe durch SiFa / Arbeitgeber kennzeichnen.
 */

export const LIVE_PREVIEW_COPY = {
  /** Badge über der großen Vorschau; Quelle (Dateiname / Beispiel-SDB) wird angehängt. */
  sourceBadgePrefix: '✓ Live generiert aus:',
  documentKicker: 'KI-gestützter Entwurf (gemäß TRGS 555)',
  documentTitle: 'Betriebsanweisung',
  documentSubtitle: 'gem. § 14 GefStoffV',
  fields: {
    substance: 'Stoff-/Produktname',
    casNumber: 'CAS-Nr.',
    manufacturer: 'Hersteller',
    applicationArea: 'Einsatzbereich',
  },
  sectionTitles: {
    identification: 'Gefahrstoffbezeichnung',
    hazards: 'Gefahren für Mensch und Umwelt',
    protection: 'Schutzmaßnahmen und Verhaltensregeln',
    emergency: 'Verhalten im Gefahrfall',
    firstAid: 'Erste Hilfe',
    disposal: 'Sachgerechte Entsorgung',
    approval: 'Freigabe / Unterschrift',
  },
  noHazardStatements: 'Im SDB wurden keine H-Sätze erkannt. Bitte Abschnitt 2.2 prüfen.',
  noPrecautionaryStatements: 'Konkrete Schutzmaßnahmen aus SDB 7 & 8 nach Freischaltung im Entwurf.',
  moreStatementsSuffix: (count: number) => `+ ${count} weitere nach Freischaltung`,
  lockedOverlay: {
    uploadTitle: 'Vorschau erfolgreich aus Ihrem SDB erstellt',
    demoTitle: 'Vorschau aus dem Beispiel-SDB erstellt',
    text: 'Alle 6 Abschnitte nach TRGS 555 inkl. Erste Hilfe, Entsorgung & QR-Code liegen als KI-gestützter Entwurf zur Prüfung bereit.',
    cta: 'Jetzt kostenlos freischalten & PDF herunterladen',
  },
  checkCard: {
    kicker: 'Aus Ihrem SDB erkannt',
    demoKicker: 'Aus dem Beispiel-SDB erkannt',
    substance: 'Erkannter Stoff',
    manufacturer: 'Hersteller',
    statementCounts: 'Anzahl H-/P-Sätze',
    pictograms: 'GHS-Piktogramme',
    noPictograms: 'keine erkannt',
    primaryCta: 'Betriebsanweisung kostenlos freischalten & als PDF laden',
    secondaryCta: 'Anderes SDB-PDF testen',
    reviewHint: 'Vorprüfung zur fachlichen Freigabe durch die SiFa / den Arbeitgeber (§ 14 GefStoffV).',
  },
  /** Micro-Trust direkt unter den Freischalt-CTAs. */
  trustBullets: [
    'Aufbau nach TRGS 555 · Freigabe gemäß § 14 GefStoffV',
    'Inkl. Eintrag ins Gefahrstoffkataster (§ 6 GefStoffV)',
    'Als DIN-A4-PDF & mit QR-Code für den Arbeitsplatz',
  ],
  /** utm_content für Freischalt-Links ohne übertragbaren Token (Demo). */
  demoRegisterUtmContent: 'demo-extraktion',
} as const;

/** Action-Link unter der Dropzone (1-Klick-Demo ohne eigenes PDF). */
export function buildDemoExtractionLinkLabel(substanceName: string): string {
  return `Kein eigenes PDF zur Hand? → Mit Beispiel-SDB für ${substanceName} live testen`;
}

export function formatStatementCounts(hazard: number, precautionary: number | null): string {
  return `${hazard} H-Sätze · ${precautionary ?? '–'} P-Sätze`;
}
