import type { SeoFaqItem } from '@/lib/seo/seo-faq-types';
import type { SubstanceFaqTuple } from '@/config/betriebsanweisung/types';

export function buildBetriebsanweisungFaqItems(substanceName: string): SubstanceFaqTuple {
  const items: [SeoFaqItem, SeoFaqItem, SeoFaqItem] = [
    {
      question: `Gilt für ${substanceName} eine Pflicht zur Betriebsanweisung?`,
      answer:
        'Ja, sobald Tätigkeiten mit Gefahrstoffen nach § 14 GefStoffV ausgeübt werden, muss vor Aufnahme der Arbeit eine schriftliche Betriebsanweisung vorliegen.',
    },
    {
      question: 'Darf ich eine universelle Mustervorlage aus dem Internet verwenden?',
      answer:
        'Nein. Die Gewerbeaufsicht und Berufsgenossenschaften fordern einen direkten Bezug zum Sicherheitsdatenblatt des verwendeten Produkts und zu den Bedingungen am Arbeitsplatz.',
    },
    {
      question: 'Wer muss den Entwurf freigeben?',
      answer:
        'Die fachliche Prüfung und Freigabe obliegt dem Arbeitgeber bzw. der beauftragten Fachkraft für Arbeitssicherheit (SiFa).',
    },
  ];
  return items;
}
