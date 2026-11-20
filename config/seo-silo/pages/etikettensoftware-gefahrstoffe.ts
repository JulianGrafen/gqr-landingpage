import { APP_REGISTER_URL } from '@/config/aeo-config';
import type { SeoSiloPageConfig } from '@/config/seo-silo/types';

/**
 * Landingpage "Etikettensoftware Gefahrstoffe" (TRGS-201-Etiketten aus dem SDB).
 * Formatdaten spiegeln die App (gqr-backend: src/config/labelFormats.ts); bei Änderungen dort nachziehen.
 */

export const ETIKETTEN_SILO_PATH = '/etikettensoftware-gefahrstoffe/';

export const ETIKETTEN_SILO_CONFIG: SeoSiloPageConfig = {
  slug: 'etikettensoftware-gefahrstoffe',
  path: ETIKETTEN_SILO_PATH,
  intent: 'labeling',
  seo: {
    title: 'Etikettensoftware Gefahrstoffe: TRGS-201-Etiketten aus dem SDB',
    description:
      'Etikettensoftware für Gefahrstoffe: GHS-Etiketten für Umfüllgebinde nach TRGS 201 KI-gestützt aus dem SDB, mit QR-Code. Kostenlos testen.',
    ogImageAlt: 'Etikettensoftware Gefahrstoffe: GHS-Etikett nach TRGS 201 mit QR-Code aus Gefahrstoff-QR',
    canonicalPath: ETIKETTEN_SILO_PATH,
  },
  breadcrumb: [
    { label: 'Start', href: '/' },
    { label: 'Etikettensoftware Gefahrstoffe', href: ETIKETTEN_SILO_PATH },
  ],
  hero: {
    eyebrow: 'Etikettensoftware für Gefahrstoffe · CLP-Verordnung · TRGS 201',
    h1: 'Etikettensoftware für Gefahrstoffe: Etiketten aus dem Sicherheitsdatenblatt statt aus Word-Vorlagen',
    lead:
      'Wer Reiniger in Sprühflaschen umfüllt oder Lösemittel in Laborflaschen abfüllt, muss das neue Gebinde kennzeichnen. Gefahrstoff-QR übernimmt Signalwort, GHS-Piktogramme sowie H- und P-Sätze aus dem Sicherheitsdatenblatt des Lieferanten und erstellt daraus ein druckfertiges Etikett nach TRGS 201, mit QR-Code zur Notfallansicht.',
    proofLine:
      'TarifVorschau ohne Kreditkarte, bis zu 3 SDB-Uploads. Dauerhaft aktive QR-Codes ab KMU Basis.',
    primaryCta: { label: 'Kostenlos testen', href: APP_REGISTER_URL, external: true },
    secondaryCta: { label: 'Für externe SiFas', href: '#fuer-sifas', external: false },
    trustBullets: [
      'Drei Formate: 62 × 29 mm, DIN A7, DIN A6',
      'Angaben mit Fundstelle im SDB',
      'QR-Code zur Notfallansicht ohne App',
    ],
  },
  features: {
    sectionTitle: 'In drei Schritten vom Sicherheitsdatenblatt zum Gebinde-Etikett',
    sectionSubline:
      'Das Etikett entsteht aus denselben Daten wie das Gefahrstoffverzeichnis nach § 6 GefStoffV. Ändert sich das Sicherheitsdatenblatt, ändert sich die Grundlage für das nächste Etikett.',
    items: [
      {
        id: 'sdb-hochladen',
        title: '1. SDB-PDF hochladen',
        description:
          'Laden Sie das Sicherheitsdatenblatt des Lieferanten im Browser hoch. Eine Installation ist nicht nötig.',
      },
      {
        id: 'angaben-pruefen',
        title: '2. Kennzeichnungselemente prüfen',
        description:
          'Die KI liest Produktbezeichnung, Signalwort, GHS-Piktogramme sowie H- und P-Sätze aus SDB-Abschnitt 2.2 aus, jeweils mit Fundstelle. Sie prüfen die Werte vor dem Druck. Das Ergebnis ist ein KI-gestützter Entwurf zur fachlichen Freigabe durch die SiFa / den Arbeitgeber.',
      },
      {
        id: 'format-drucken',
        title: '3. Format wählen und drucken',
        description:
          'Sie wählen eines von drei Formaten und drucken in Originalgröße ohne Skalierung. H- und P-Sätze lassen sich als Volltext, nur als Codes oder gar nicht ausgeben.',
      },
      {
        id: 'qr-notfall',
        title: 'QR-Code für den Notfallabruf',
        description:
          'Jedes Etikett trägt einen QR-Code. Der Scan mit einem beliebigen Smartphone öffnet die Notfallansicht mit Erste-Hilfe- und Schutzmaßnahmen, ohne App-Installation. So ist die Betriebsanweisung nach § 14 GefStoffV direkt am Gebinde erreichbar.',
      },
      {
        id: 'platz-pruefung',
        title: 'Hinweis bei zu wenig Platz',
        description:
          'Passen zu viele Sätze nicht auf das gewählte Maß oder unterschreiten Piktogramme die 10 × 10 mm der CLP-Vollkennzeichnung, weist die Software darauf hin.',
      },
      {
        id: 'verzeichnis',
        title: 'Verbunden mit Verzeichnis und Betriebsanweisung',
        description:
          'Etikett, Gefahrstoffverzeichnis nach § 6 GefStoffV und BA-Entwurf nach TRGS 555 beruhen auf demselben Datensatz und derselben SDB-Version.',
      },
    ],
  },
  faq: [
    {
      question: 'Welche Etikettensoftware eignet sich für Gefahrstoffe im Betrieb?',
      answer:
        'Für Betriebe eignet sich eine Etikettensoftware, die Gefahrstoffetiketten direkt aus dem Sicherheitsdatenblatt erzeugt statt aus Freitext. Gefahrstoff-QR liest Signalwort, GHS-Piktogramme sowie H- und P-Sätze KI-gestützt aus dem SDB aus und erstellt daraus Etiketten in drei Formaten nach CLP-Verordnung und TRGS 201. Jedes Etikett trägt einen QR-Code zur Notfallansicht. Die Angaben prüft die SiFa vor dem Druck.',
    },
    {
      question: 'Was muss nach TRGS 201 auf einem Gefahrstoffetikett für Umfüllgebinde stehen?',
      answer:
        'Nach TRGS 201 dürfen Gebinde, die nur innerbetrieblich verwendet werden, vereinfacht gekennzeichnet werden. Das Etikett nennt mindestens die Bezeichnung des Stoffes oder Gemisches und die Gefahrenpiktogramme. Signalwort sowie die wesentlichen H- und P-Sätze sollten ergänzt werden. Grundlage ist das Sicherheitsdatenblatt des Lieferanten; die Kennzeichnung muss dauerhaft lesbar sein.',
    },
    {
      question: 'Wie erstelle ich Gefahrstoffetiketten direkt aus dem Sicherheitsdatenblatt?',
      answer:
        'Gefahrstoffetiketten entstehen direkt aus dem Sicherheitsdatenblatt, wenn die Software die Kennzeichnungselemente aus SDB-Abschnitt 2.2 übernimmt. In Gefahrstoff-QR laden Sie das SDB-PDF hoch, prüfen die KI-gestützt ausgelesenen Angaben, wählen das Format (62 × 29 mm, DIN A7 oder DIN A6) und drucken in Originalgröße. Der QR-Code verlinkt auf die Notfallansicht.',
    },
  ],
  closingCta: {
    headline: 'Das nächste Umfüllgebinde mit Etikett aus dem SDB kennzeichnen',
    subline: 'Testen Sie den Etiketten-Workflow mit einem Sicherheitsdatenblatt aus Ihrem Betrieb.',
    primaryCta: { label: 'Kostenlos testen', href: APP_REGISTER_URL, external: true },
    disclaimer: 'Unverbindlich · Keine Kreditkarte · Angebot ausschließlich für Unternehmen (§ 14 BGB)',
  },
};

/** Problem-Sektion: warum selbst gebaute Etiketten bei Begehungen beanstandet werden. */
export const ETIKETTEN_PROBLEMS = {
  id: 'etiketten-probleme',
  eyebrow: 'Kennzeichnung in der Praxis',
  title: 'Warum Etiketten aus Word, Excel und Bürovorlagen bei Begehungen beanstandet werden',
  intro:
    'Das Problem ist nicht das Etikettenpapier, sondern der Inhalt. Ein Etikett ist nur so aktuell wie die Quelle, aus der es abgeschrieben wurde. Bei Word- und Excel-Vorlagen fehlt diese Verbindung zum Sicherheitsdatenblatt.',
  items: [
    {
      title: 'GHS-Piktogramme fehlen oder sind falsch dargestellt',
      body: 'Piktogramme werden als Bilddatei eingefügt, verkleinert oder ganz weggelassen, weil der Platz nicht reicht. Ohne die rot umrandete Raute ist die Gefahr am Gebinde nicht erkennbar.',
    },
    {
      title: 'H- und P-Sätze sind veraltet',
      body: 'Der Lieferant überarbeitet das Sicherheitsdatenblatt, das Etikett im Regal bleibt unverändert. Ob die Angaben noch zur aktuellen SDB-Version passen, lässt sich an einer Word-Datei nicht nachvollziehen.',
    },
    {
      title: 'Handschrift und Abkürzungen',
      body: 'Mit Filzstift beschriftete Sprühflaschen verblassen, Abkürzungen versteht nur, wer sie geschrieben hat. Für Beschäftigte, Ersthelfer und Prüfer ist der Inhalt dann nicht mehr eindeutig.',
    },
  ],
} as const;

export interface LabelFormatRow {
  name: string;
  size: string;
  usage: string;
}

/** Etikettenformate der App (Quelle: gqr-backend src/config/labelFormats.ts). */
export const ETIKETTEN_FORMATS = {
  id: 'etiketten-formate',
  eyebrow: 'Formate',
  title: 'Drei Etikettenformate für Sprühflasche, Laborflasche und Kanister',
  caption: 'Etikettenformate in Gefahrstoff-QR mit Maß und Einsatzzweck',
  rows: [
    {
      name: 'Kompakt',
      size: '62 × 29 mm',
      usage:
        'Vereinfachte innerbetriebliche Kennzeichnung nach TRGS 201, z. B. Sprühflaschen; passend für Endlos-Etikettendrucker',
    },
    {
      name: 'Mittel',
      size: 'DIN A7 (105 × 74 mm)',
      usage: 'Umfüllgebinde und Laborflaschen nach CLP-Verordnung und TRGS 201',
    },
    {
      name: 'Groß',
      size: 'DIN A6 (148 × 105 mm)',
      usage: 'Vollständige CLP-Kennzeichnung für Kanister und Fässer ab 3 Liter',
    },
  ] satisfies LabelFormatRow[],
} as const;

export interface IntentPitchCard {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
}

/** Intent-Weiche: Einzelbetrieb vs. externe SiFa. */
export const ETIKETTEN_INTENT_CARDS = {
  id: 'fuer-sifas',
  title: 'Ein Betrieb oder mehrere Kunden?',
  cards: [
    {
      id: 'kmu',
      eyebrow: 'KMU, Werkstatt, Produktion, Gebäudereinigung',
      title: 'Ihr Betrieb, Ihre Gebinde',
      body: 'Sie kennzeichnen Umfüllgebinde an einem Standort. KMU Basis umfasst bis zu 30 Gefahrstoffe mit Verzeichnis nach § 6 GefStoffV, BA-Entwürfen nach TRGS 555, Etiketten und aktiver QR-Notfallansicht. 49 €/Monat bei Jahreszahlung, monatlich zahlbar 59 € — jeweils zzgl. MwSt.',
      cta: { label: 'Kostenlos testen', href: APP_REGISTER_URL },
    },
    {
      id: 'sifa',
      eyebrow: 'Externe Fachkräfte für Arbeitssicherheit & Ingenieurbüros',
      title: 'Etiketten für jeden Kundenbetrieb getrennt',
      body: 'Sie betreuen mehrere Betriebe. Im Tarif SiFa Multi-Mandant führen Sie jeden Kunden als eigenen Mandanten mit Werken und Tätigkeiten. Etiketten, Verzeichnis und Betriebsanweisungen bleiben strikt getrennt. 15 Mandanten sind inklusive. 159 €/Monat bei Jahreszahlung, monatlich zahlbar 189 €, auf Wunsch per Rechnung — jeweils zzgl. MwSt.',
      cta: { label: 'Als SiFa starten', href: APP_REGISTER_URL },
    },
  ] satisfies IntentPitchCard[],
} as const;
