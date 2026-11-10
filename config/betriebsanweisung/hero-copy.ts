/** Hero-Subheadline der pSEO-Slug-Seiten (Absätze wie auf der Startseite). */

/** USP-Checkliste im Hero (Stil wie HOME_HERO.benefitBullets). */
export const BETRIEBSANWEISUNG_HERO_USP_BULLETS = [
  'Lieferanten-SDB hochladen statt Betriebsanweisung abtippen',
  'KI-gestützter Entwurf nach TRGS 555 aus relevanten PDF-Angaben',
  'Vorprüfung zur fachlichen Freigabe durch die SiFa / den Arbeitgeber (§ 14 GefStoffV)',
  'Gefahrstoff im Kataster mit Betriebsanweisung und QR-Code verknüpfen',
] as const;

export function buildBetriebsanweisungHeroSubheadlineParagraphs(substanceName: string): readonly string[] {
  return [
    `Schluss mit Abtippen: Laden Sie das Lieferanten-SDB für ${substanceName} hoch.`,
    `Die Software übernimmt relevante Angaben aus Ihrem PDF als strukturierten Textvorschlag in einen TRGS-555-Entwurf.`,
    'Die Vorprüfung und Freigabe erfolgt durch die SiFa / den Arbeitgeber (§ 14 GefStoffV).',
  ] as const;
}
