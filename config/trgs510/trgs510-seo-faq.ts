import type { SeoFaqItem } from '@/lib/seo/seo-faq-types';

/** FAQ für /trgs-510-zusammenlagerungs-check/ (UI + FAQPage JSON-LD). */
export const TRGS510_SEO_FAQ: readonly SeoFaqItem[] = [
  {
    question: 'Was macht der TRGS 510 Zusammenlagerungs-Check?',
    answer:
      'Sie wählen zwei Lagerklassen aus. Der Check zeigt ein Ampel-Ergebnis und verweist auf die Regel aus Tabelle 12 der TRGS 510. So sehen Sie schneller, ob eine Zusammenlagerung erlaubt, eingeschränkt oder getrennt erfolgen soll.',
  },
  {
    question: 'Ersetzt der Check eine Gefährdungsbeurteilung?',
    answer:
      'Nein. Der Check unterstützt bei der Orientierung an der TRGS 510. Die Gefährdungsbeurteilung und die fachliche Freigabe im Betrieb bleiben Aufgabe der SiFa bzw. Fachkraft.',
  },
  {
    question: 'Was muss ich zusätzlich selbst prüfen?',
    answer:
      'Mengen, bauliche Lage, Trennungen und betriebliche Besonderheiten am Lagerort bleiben in Ihrer Verantwortung. Der Check ersetzt keine Begehung und keine dokumentierte GB-Entscheidung.',
  },
  {
    question: 'Brauche ich ein Konto, um den Check zu nutzen?',
    answer:
      'Nein. Der Zusammenlagerungs-Check läuft im Browser auf dieser Seite, ohne Registrierung und ohne Anmeldung in der Gefahrstoff-QR App.',
  },
];