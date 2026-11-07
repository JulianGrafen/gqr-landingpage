import type { SubstanceFaqItems } from '@/config/betriebsanweisung/types';

/**
 * FAQ pro Stoffseite. Antworten beginnen mit der Kernaussage (AEO) und bleiben stoffneutral:
 * keine Einstufung, Schutzmaßnahmen oder Grenzwerte, maßgeblich ist das Lieferanten-SDB.
 */
export function buildBetriebsanweisungFaqItems(substanceName: string): SubstanceFaqItems {
  return [
    {
      question: `Brauche ich eine Betriebsanweisung für ${substanceName}?`,
      answer: `Ja, sofern ${substanceName} im Betrieb als Gefahrstoff verwendet wird. Nach § 14 GefStoffV muss vor Aufnahme der Tätigkeit eine schriftliche, arbeitsplatzbezogene Betriebsanweisung vorliegen, die auf dem Sicherheitsdatenblatt des tatsächlich verwendeten Produkts beruht.`,
    },
    {
      question: `Was muss in einer Betriebsanweisung für ${substanceName} stehen?`,
      answer:
        'Eine Betriebsanweisung nach TRGS 555 gliedert sich in sechs Abschnitte: Anwendungsbereich, Gefahren für Mensch und Umwelt, Schutzmaßnahmen und Verhaltensregeln, Verhalten im Gefahrfall, Erste Hilfe sowie sachgerechte Entsorgung. Die Inhalte stammen aus dem Sicherheitsdatenblatt Ihres Lieferanten und werden an die Bedingungen am Arbeitsplatz angepasst.',
    },
    {
      question: 'Darf ich eine universelle Mustervorlage aus dem Internet verwenden?',
      answer:
        'Nein, nicht ungeprüft. Gewerbeaufsicht und Berufsgenossenschaften erwarten einen direkten Bezug zum Sicherheitsdatenblatt des verwendeten Produkts und zu den Bedingungen am Arbeitsplatz. Konzentration, Menge und Lüftung vor Ort bestimmen die Schutzmaßnahmen.',
    },
    {
      question: `Wie oft muss zu ${substanceName} unterwiesen werden?`,
      answer:
        'Vor Aufnahme der Tätigkeit und danach mindestens einmal jährlich, mündlich und arbeitsplatzbezogen auf Grundlage der Betriebsanweisung (§ 14 Abs. 2 GefStoffV). Inhalt und Zeitpunkt der Unterweisung sind schriftlich festzuhalten und von den Unterwiesenen zu bestätigen.',
    },
    {
      question: 'Wer muss den KI-gestützten Entwurf freigeben?',
      answer:
        'Die fachliche Prüfung und Freigabe liegt beim Arbeitgeber bzw. bei der beauftragten Fachkraft für Arbeitssicherheit (SiFa). Gefahrstoff-QR liefert einen KI-gestützten Entwurf (gemäß TRGS 555) als Vorprüfung zur fachlichen Freigabe durch die SiFa / den Arbeitgeber (§ 14 GefStoffV).',
    },
  ];
}
