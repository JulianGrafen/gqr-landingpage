import { BETRIEBSANWEISUNG_HERO_DISCLAIMER } from '@/config/legal/site-copy';

/** Hero-Subheadline der pSEO-Slug-Seiten (Absätze wie auf der Startseite). */

/** USP-Checkliste im Hero (Stil wie HOME_HERO.benefitBullets). */
export const BETRIEBSANWEISUNG_HERO_USP_BULLETS = [
  'Lieferanten-SDB hochladen statt Betriebsanweisung abtippen',
  'KI-gestützter Entwurf nach TRGS 555 aus relevanten PDF-Angaben',
  'Vorprüfung zur fachlichen Freigabe durch die SiFa / den Arbeitgeber (§ 14 GefStoffV)',
  'Gefahrstoff im Kataster mit Betriebsanweisung und QR-Code verknüpfen',
  'Selbstständige SiFa? Klare Mandantentrennung fürs Kataster',
] as const;

/** Hub /betriebsanweisung/ */
export const BETRIEBSANWEISUNG_HUB_HERO_LEAD: readonly string[] = [
  `Eine Betriebsanweisung nach TRGS 555 beschreibt für einen Gefahrstoff, welche Gefahren am Arbeitsplatz bestehen, welche Schutzmaßnahmen gelten und was im Notfall zu tun ist. Sie ist nach § 14 GefStoffV Pflicht und muss auf dem Sicherheitsdatenblatt des tatsächlich verwendeten Produkts beruhen.`,
  `${BETRIEBSANWEISUNG_HERO_DISCLAIMER} Diese Übersicht enthält bewusst keine CAS-, GHS- oder H/P-Angaben. Maßgeblich sind die Angaben im Sicherheitsdatenblatt Ihres Lieferanten.`,
] as const;

export function buildBetriebsanweisungHeroSubheadlineParagraphs(substanceName: string): readonly string[] {
  return [
    `Schluss mit Abtippen: Laden Sie das Lieferanten-SDB für ${substanceName} hoch.`,
    `Die Software übernimmt relevante Angaben aus Ihrem PDF als strukturierten Textvorschlag in einen TRGS-555-Entwurf und erstellt ein Kataster.`,
    'Die Vorprüfung und Freigabe erfolgt durch die SiFa / den Arbeitgeber (§ 14 GefStoffV).',
  ] as const;
}
