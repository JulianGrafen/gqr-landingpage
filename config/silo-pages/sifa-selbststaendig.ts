import { APP_REGISTER_URL } from '@/config/aeo-config';
import type { HeroCopy } from '@/config/home-sections/hero';
import type { SeoFaqItem } from '@/lib/seo/seo-faq-types';
import { SIFA_MANDANT_INCLUDED, SIFA_MANDANT_EXTENSION_LABEL } from '@/config/sifa-mandant-pricing';
import { SIFA_SELBSTSTAENDIG_DIR } from '@/config/static-redirects';

/** ASCII-Slug; die alte Umlaut-URL leitet per Stub weiter (`config/static-redirects.ts`). */
export const SIFA_SELBSTSTAENDIG_PATH = `/${SIFA_SELBSTSTAENDIG_DIR}/` as const;

export const SIFA_SELBSTSTAENDIG = {
  path: SIFA_SELBSTSTAENDIG_PATH,
  metaTitle: 'Gefahrstoff Software für SiFas: Multi-Mandant & Kataster',
  metaDescription:
    'Alle Mandanten in einer App: SDB-Import, Gefahrstoffverzeichnis nach § 6 GefStoffV, TRGS-555-Entwürfe und QR-Codes. SiFa-Tarif ab 189 €/Monat.',
  staticHero: {
    eyebrow: 'Multi-Mandant für externe Sicherheitsfachkräfte',
    headline: 'Gefahrstoffverzeichnis für alle Mandanten',
    headlineAccent: 'ohne Excel-Zettelwirtschaft.',
    subheadlineParagraphs: [
      'Sicherheitsdatenblatt hochladen: KI-gestützter Entwurf für § 6 GefStoffV und Betriebsanweisungen (gemäß TRGS 555). Sie prüfen und geben fachlich frei.',
      `Bis ${SIFA_MANDANT_INCLUDED} Mandantenbetriebe inklusive, saubere Trennung nach Werk und Tätigkeit. ${SIFA_MANDANT_EXTENSION_LABEL}.`,
    ],
    secondaryLinks: [
      { label: 'SiFa-Tarif & Preise', href: '#preise?tab=sifa' },
      { label: 'Multi-Mandant im Detail', href: '#fuer-sifas' },
      { label: 'SDB jetzt im Browser testen', href: '#live-demo' },
    ],
  } satisfies HeroCopy,
  faq: [
    {
      question: 'Wie funktioniert die Mandantentrennung für selbstständige SiFas?',
      answer:
        'Jeder Kundenbetrieb ist ein eigener Mandant mit eigenen Werken, Lagerorten und Stoffen. Sie wechseln in der Oberfläche zwischen Mandanten, ohne Daten zu vermischen. Exporte und QR-Codes beziehen sich immer nur auf den jeweiligen Betrieb.',
    },
    {
      question: 'Kann ich Stoffe bei der Begehung erfassen, wenn kein SDB vorliegt?',
      answer:
        'Ja. Im Begehungs-Modus erfassen Sie Produktnamen und Arbeitsbereiche vor Ort. Fehlende Pflichtangaben werden im Export markiert, damit Sie beim Nachreichen des Sicherheitsdatenblatts keine Lücken übersehen.',
    },
    {
      question: 'Was kostet Gefahrstoff-QR für externe SiFas?',
      answer:
        `Der SiFa Multi-Mandant-Tarif beginnt bei 189 € pro Monat (159 €/Monat bei Jahreszahlung), bis ${SIFA_MANDANT_INCLUDED} Mandantenbetriebe inklusive. ${SIFA_MANDANT_EXTENSION_LABEL}. Kauf auf Rechnung ist möglich. Vorher testen Sie mit eigenen Sicherheitsdatenblättern kostenlos im Browser.`,
    },
    {
      question: 'Ersetzt die Software meine fachliche Freigabe als SiFa?',
      answer:
        'Nein. Gefahrstoff-QR liefert KI-gestützte Entwürfe für Verzeichnis und Betriebsanweisungen (gemäß TRGS 555) als Vorprüfung. Die fachliche Freigabe erfolgt weiterhin durch Sie als SiFa bzw. den Arbeitgeber (§ 14 GefStoffV).',
    },
    {
      question: 'Wie starte ich ohne Verkaufsgespräch?',
      answer: `Registrieren Sie sich unter ${APP_REGISTER_URL.replace('https://', '')}: Drei eigene Sicherheitsdatenblätter können Sie auslesen und Betriebsanweisungs-Entwürfe direkt im Browser prüfen, ohne Kreditkarte.`,
    },
  ] satisfies readonly SeoFaqItem[],
} as const;