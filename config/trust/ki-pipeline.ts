/**
 * Copy für /so-funktioniert-die-ki/ (Decision-Layer: KI & fachliche Sicherheit).
 * Konsument: app/so-funktioniert-die-ki/page.tsx
 * Compliance: AGENTS.md § 3 — Begriffe „KI-gestützter Entwurf (gemäß TRGS 555)“ und
 * „Vorprüfung zur fachlichen Freigabe durch die SiFa / den Arbeitgeber (§ 14 GefStoffV)“.
 */
import { APP_REGISTER_URL } from '@/config/aeo-config';
import { KI_PIPELINE_PATH, SICHERHEIT_AVV_PATH } from '@/config/trust/decision-pages';
import type { ChecklistItem, PipelineStage, TrustPageConfig } from '@/config/trust/types';

/** Neue CLP-Gefahrenklassen (Delegierte Verordnung (EU) 2023/707), die Stufe 2 explizit prüft. */
export const NEW_CLP_EUH_CODES = ['EUH380', 'EUH381', 'EUH430', 'EUH431', 'EUH440', 'EUH441'] as const;

export const KI_PIPELINE_PAGE: TrustPageConfig = {
  path: KI_PIPELINE_PATH,
  seo: {
    title: 'So funktioniert die KI: SDB-Extraktion mit Regelprüfung',
    description:
      'Wie Gefahrstoff-QR Sicherheitsdatenblätter ausliest: strukturierte Extraktion, Regelprüfung von H-/P-/EUH-Sätzen, Abgleich am Original-PDF, Versions-Diff.',
    ogImageAlt: 'Vier-Stufen-Pipeline der KI-gestützten SDB-Prüfung in Gefahrstoff-QR',
  },
  breadcrumbLabel: 'So funktioniert die KI',
  hero: {
    eyebrow: 'KI & fachliche Sicherheit',
    h1: 'So funktioniert die KI in Gefahrstoff-QR',
    answer:
      'Gefahrstoff-QR setzt KI als Extraktions- und Prüfassistent ein, nicht als freien Textgenerator. Sie liest Sicherheitsdatenblätter strukturiert aus, feste Regelwerke prüfen jeden extrahierten Wert, und jedes Feld lässt sich am Original-PDF nachprüfen. Das Ergebnis ist ein KI-gestützter Entwurf (gemäß TRGS 555) zur Vorprüfung zur fachlichen Freigabe durch die SiFa / den Arbeitgeber (§ 14 GefStoffV).',
  },
  faq: [
    {
      question: 'Kann die KI H-Sätze erfinden?',
      answer:
        'Nein, nicht unbemerkt. Die KI darf nur Werte übernehmen, die im hochgeladenen Sicherheitsdatenblatt stehen. Jeder extrahierte H-, P- oder EUH-Satz wird anschließend gegen die amtliche Liste der Codes nach CLP-Verordnung geprüft. Ein Code, der dort nicht existiert, wird als Prüfhinweis markiert und nicht stillschweigend übernommen. Zusätzlich liegt das Original-PDF bei der Prüfung neben den Feldern.',
    },
    {
      question: 'Wie erkennt das System neue CLP-Gefahrenklassen (EUH380–EUH441)?',
      answer: `Die mit der Delegierten Verordnung (EU) 2023/707 eingeführten Codes für endokrine Disruptoren sowie PBT-/vPvB-Eigenschaften (${NEW_CLP_EUH_CODES.join(', ')}) sind im Regelwerk der Prüfstufe hinterlegt. Stehen sie in Abschnitt 2 oder 3 des SDB, werden sie wie jeder andere Gefahrenhinweis validiert und im Kataster ausgewiesen. Fehlen sie in einer neuen SDB-Fassung, obwohl sie zuvor angegeben waren, zeigt der Versions-Diff die Abweichung an.`,
    },
    {
      question: 'Werden unsere Sicherheitsdatenblätter für KI-Training verwendet?',
      answer:
        'Nein. Hochgeladene SDB und Katasterdaten werden ausschließlich zur Verarbeitung Ihres Auftrags genutzt. Sie fließen weder in das Training eigener noch fremder KI-Modelle ein. Die eingesetzten Dienste sind vertraglich auf diese Zweckbindung verpflichtet; Details stehen im Auftragsverarbeitungsvertrag (AVV).',
    },
  ],
  closingCta: {
    headline: 'Prüfen Sie die Pipeline an Ihrem eigenen SDB',
    body: 'Laden Sie ein Sicherheitsdatenblatt aus Ihrem Bestand hoch und vergleichen Sie jedes extrahierte Feld mit dem Original.',
    primary: { label: 'Kostenlos starten', href: APP_REGISTER_URL, external: true },
    secondary: { label: 'Datenschutz, Hosting & AVV', href: SICHERHEIT_AVV_PATH },
    note: 'Keine Kreditkarte erforderlich. Angebot ausschließlich für Unternehmen (§ 14 BGB).',
  },
  datePublished: '2026-11-19',
  dateModified: '2026-11-19',
};

export const KI_PIPELINE_SECTION = {
  id: 'pipeline',
  eyebrow: 'Prozess',
  title: 'Vier Stufen vom SDB-PDF zum freigabefähigen Entwurf',
  intro:
    'Jede Stufe hat eine klar begrenzte Aufgabe. Generative Verfahren kommen nur beim Lesen des Dokuments zum Einsatz; Einstufung und Codes werden regelbasiert geprüft.',
} as const;

export const KI_PIPELINE_STAGES: readonly PipelineStage[] = [
  {
    id: 'dokumentenanalyse',
    label: 'Stufe 1',
    title: 'Dokumentenanalyse',
    description:
      'Azure Document Intelligence erkennt Tabellen, Abschnitte 1–16 und das Seitenlayout des SDB. Werte werden aus ihrer Struktur gelesen, nicht per Rohtext-Scraping aus dem Fließtext geraten.',
    tags: ['Abschnitte 1–16', 'Tabellen', 'Layout'],
  },
  {
    id: 'regelpruefung',
    label: 'Stufe 2',
    title: 'Deterministische Regelprüfung',
    description:
      'H-, P- und EUH-Sätze (inkl. EUH380–EUH441), GHS-Piktogramme, CAS-Nummern, WGK und Lagerklassen nach TRGS 510 werden gegen feste Regelwerke validiert. Unbekannte oder widersprüchliche Angaben werden markiert, nicht ergänzt.',
    tags: ['H-/P-/EUH-Sätze', 'CAS-Nummern', 'WGK', 'TRGS 510'],
  },
  {
    id: 'split-screen',
    label: 'Stufe 3',
    title: 'Split-Screen-Abgleich',
    description:
      'Bei der Prüfung liegt das Original-SDB-PDF direkt neben den extrahierten Feldern. Jedes Feld lässt sich unmittelbar gegen die Quelle prüfen, ohne das PDF separat zu öffnen.',
    tags: ['Original-PDF', 'Feld neben Quelle'],
  },
  {
    id: 'versions-diff',
    label: 'Stufe 4',
    title: 'SDB-Versionierung & Diff',
    description:
      'Bei einer neuen SDB-Fassung vergleicht das System die Strukturdaten Feld für Feld mit der Vorgängerversion. Markiert werden auch Änderungen, die der Lieferant in Abschnitt 16 nicht ausgewiesen hat.',
    tags: ['Feldweiser Vergleich', 'Abschnitt 16'],
  },
];

export const KI_BOUNDARIES_SECTION = {
  id: 'grenzen',
  eyebrow: 'Klare Grenzen',
  title: 'Was unsere KI ausdrücklich nicht tut',
  intro:
    'Die Verantwortung für Gefährdungsbeurteilung und Unterweisung bleibt beim Arbeitgeber. Das System ist so gebaut, dass diese Zuständigkeit nicht verschwimmt.',
} as const;

export const KI_BOUNDARIES: readonly ChecklistItem[] = [
  {
    title: 'Kein eigenmächtiges Überschreiben freigegebener Kataster-Einträge',
    description:
      'Neue Extraktionsergebnisse landen als Änderungsvorschlag in der Prüfansicht. Ein freigegebener Eintrag ändert sich erst, wenn eine berechtigte Person die Änderung bestätigt.',
  },
  {
    title: 'Kein Training von KI-Modellen mit Kunden-SDB',
    description:
      'Hochgeladene Dokumente werden nur zur Bearbeitung Ihres Mandanten verarbeitet und nicht zum Training eigener oder fremder Modelle verwendet.',
  },
  {
    title: 'Keine Haftungsübernahme anstelle der fachkundigen Person',
    description:
      'Das System liefert nachvollziehbar versionierte Entwürfe nach § 6 / § 14 GefStoffV und TRGS 555. Fachliche Freigabe und Verantwortung verbleiben bei SiFa bzw. Arbeitgeber.',
  },
];

export const KI_FAQ_TITLE = 'Fachfragen zur KI-Prüfung';
