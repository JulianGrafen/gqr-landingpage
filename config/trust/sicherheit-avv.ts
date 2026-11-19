/**
 * Copy für /sicherheit-avv/ (Decision-Layer: Datenschutz, Hosting & B2B-Einkauf).
 * Konsument: app/sicherheit-avv/page.tsx
 * Firmenangaben ausschließlich aus config/company.ts.
 */
import { APP_REGISTER_URL } from '@/config/aeo-config';
import { buildCompanyMailto, COMPANY, formatCompanyAddressLine } from '@/config/company';
import { SICHERHEIT_AVV_PATH } from '@/config/trust/decision-pages';
import type { ChecklistItem, FactTable, TrustPageConfig } from '@/config/trust/types';

export const SICHERHEIT_AVV_PAGE: TrustPageConfig = {
  path: SICHERHEIT_AVV_PATH,
  seo: {
    title: 'Sicherheit, Hosting & AVV: Fakten für Datenschutz und Einkauf',
    description:
      'Hosting in der EU, Mandantentrennung per RLS, kein KI-Training mit Kundendaten. AVV als PDF ohne Formular, Kauf auf Rechnung mit PO-Nummer.',
    ogImageAlt: 'Faktenblatt zu Hosting, Datenschutz und Auftragsverarbeitung bei Gefahrstoff-QR',
  },
  breadcrumbLabel: 'Sicherheit & AVV',
  hero: {
    eyebrow: 'Datenschutz, Hosting & Einkauf',
    h1: 'Sicherheit, AVV und Bestellung auf Rechnung',
    answer:
      'Gefahrstoff-QR verarbeitet Kundendaten in EU-Rechenzentren, trennt Mandanten auf Datenbankebene und nutzt hochgeladene Sicherheitsdatenblätter nicht für KI-Training. Den Auftragsverarbeitungsvertrag nach Art. 28 DSGVO laden Sie hier ohne Formular herunter. Jahreslizenzen sind auf Rechnung bestellbar, mit Ihrer PO-Nummer auf Angebot und Rechnung.',
  },
  faq: [
    {
      question: 'Müssen wir für den AVV unsere E-Mail-Adresse angeben?',
      answer:
        'Nein. Der Auftragsverarbeitungsvertrag steht auf dieser Seite als PDF zum direkten Download bereit. Wenn Sie ein von uns unterzeichnetes Exemplar für Ihre Unterlagen benötigen, fordern Sie es per E-Mail an.',
    },
    {
      question: 'Können wir ohne Kreditkarte bestellen?',
      answer:
        'Ja. Alle Jahreslizenzen (KMU Basis, KMU Pro, SiFa Multi-Mandant) und das schlüsselfertige Paket sind auf Rechnung bestellbar. Zahlung per Überweisung; Ihre Bestell- bzw. PO-Nummer wird auf Angebot und Rechnung ausgewiesen.',
    },
    {
      question: 'Wo werden die Daten gespeichert?',
      answer:
        'In Rechenzentren innerhalb der Europäischen Union. Die eingesetzten Subprozessoren sind im AVV mit Sitz und Zweck aufgeführt. Die Übertragung erfolgt TLS-verschlüsselt, die Mandanten sind auf Datenbankebene per Row Level Security getrennt.',
    },
  ],
  closingCta: {
    headline: 'Interne Freigabe vorbereiten',
    body: 'Fordern Sie ein formelles PDF-Angebot für Ihre Budgetfreigabe an oder starten Sie direkt mit der kostenlosen TarifVorschau.',
    primary: {
      label: 'PDF-Angebot anfordern',
      href: buildCompanyMailto(COMPANY.procurementEmail, 'Angebotsanfrage Gefahrstoff-QR'),
      external: true,
    },
    secondary: { label: 'Kostenlos starten', href: APP_REGISTER_URL, external: true },
    note: 'Angebot innerhalb von 24 Stunden an Werktagen. Ausschließlich für Unternehmen (§ 14 BGB).',
  },
  datePublished: '2026-11-19',
  dateModified: '2026-11-19',
};

export const FACT_SHEET_SECTION = {
  id: 'faktenblatt',
  eyebrow: 'Technisches & rechtliches Faktenblatt',
  title: 'Hosting, Zugriffsschutz und Datennutzung',
  intro: 'Die Angaben für Ihr Verarbeitungsverzeichnis und die Prüfung durch den Datenschutzbeauftragten.',
} as const;

/*
 * TODO(subprozessoren): Vor Veröffentlichung Region und Vertragsstatus jedes Subprozessors mit der
 * Subprozessor-Liste im AVV abgleichen (Supabase EU, Vercel, Azure EU, Resend). Insbesondere:
 *  - Vercel: Function-Region und Edge-Netz (Datenverarbeitung außerhalb der EU?)
 *  - Resend: Versandregion (EU-Region aktiviert?)
 *  - Abweichung zur Startseite klären: dort steht „Hosting in Deutschland (Frankfurt)“.
 */
export const FACT_SHEET: FactTable = {
  caption: 'Faktenblatt Datenschutz und Informationssicherheit Gefahrstoff-QR',
  columnLabels: ['Thema', 'Umsetzung'],
  rows: [
    {
      label: 'Hosting & Datenhaltung',
      values: [
        'EU-Rechenzentren. Datenbank und Dateiablage: Supabase (EU-Region). Dokumentenanalyse: Microsoft Azure (EU-Region).',
      ],
    },
    {
      label: 'Subprozessoren',
      values: ['Supabase (Datenbank, Speicher), Vercel (Anwendungs-Hosting), Microsoft Azure (Dokumentenanalyse), Resend (E-Mail-Versand). Vollständige Liste mit Sitz und Zweck im AVV.'],
    },
    {
      label: 'Übertragung',
      values: ['TLS-Verschlüsselung für alle Verbindungen zwischen Browser, Anwendung und Diensten.'],
    },
    {
      label: 'Mandantentrennung',
      values: ['Row Level Security (RLS) auf Datenbankebene: Jede Abfrage ist an den Mandanten des angemeldeten Kontos gebunden.'],
    },
    {
      label: 'Konto-Schutz',
      values: ['Zwei-Faktor-Authentifizierung pro Konto aktivierbar.'],
    },
    {
      label: 'Datennutzung',
      values: ['Keine Weitergabe an Dritte zu eigenen Zwecken, kein Training von KI-Modellen mit Kundendaten.'],
    },
    {
      label: 'Rechtsgrundlage',
      values: ['Auftragsverarbeitung nach Art. 28 DSGVO; AVV als PDF auf dieser Seite.'],
    },
    {
      label: 'Datenexport',
      values: ['Export von Katasterdaten und SDB-Archiv jederzeit möglich.'],
    },
  ],
};

export const AVV_SECTION = {
  id: 'avv',
  eyebrow: 'Auftragsverarbeitungsvertrag',
  title: 'AVV herunterladen, ohne Formular',
  intro: 'Für Datenschutzbeauftragte und Einkauf: das aktuelle Muster direkt als PDF.',
} as const;

/** Öffentlicher Pfad; die Datei liegt in public/downloads/. */
export const AVV_PDF_PUBLIC_PATH = '/downloads/gefahrstoff-qr-avv.pdf';

export const AVV_DOWNLOAD = {
  title: 'Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO',
  description: 'Inklusive technischer und organisatorischer Maßnahmen (TOM) und Subprozessor-Liste.',
  primaryLabel: 'AVV als PDF herunterladen',
  secondaryLabel: 'Unterzeichneten AVV für Ihre Akte anfordern',
  secondaryHref: buildCompanyMailto(COMPANY.procurementEmail, 'AVV-Anforderung Gefahrstoff-QR'),
  /** Angezeigt, solange public/downloads/gefahrstoff-qr-avv.pdf noch nicht hinterlegt ist. */
  pendingNotice:
    'Die PDF-Fassung wird gerade aktualisiert. Fordern Sie den AVV bis dahin per E-Mail an;',
} as const;

export const PROCUREMENT_SECTION = {
  id: 'einkauf',
  eyebrow: 'Einkauf & Buchhaltung',
  title: 'Ohne Kreditkarte bestellen',
  intro: 'Was Einkauf und Buchhaltung für die Anlage als Lieferant und die Freigabe brauchen.',
} as const;

export const PROCUREMENT_CHECKLIST: readonly ChecklistItem[] = [
  {
    title: 'Kauf auf Rechnung',
    description:
      'Für alle Jahreslizenzen (KMU Basis, KMU Pro, SiFa Multi-Mandant) und das schlüsselfertige Paket. Zahlung per Überweisung.',
  },
  {
    title: 'PO- / Bestellnummer auf Angebot und Rechnung',
    description: 'Ihre interne Bestellnummer wird auf beiden Dokumenten ausgewiesen.',
  },
  {
    title: 'Formelles PDF-Angebot innerhalb von 24 Stunden',
    description: 'An Werktagen, für Ihre interne Budgetfreigabe.',
  },
];

export const SUPPLIER_MASTER_DATA = {
  title: 'Lieferanten-Stammdaten',
  description: 'Für die Anlage im Kreditorenstamm. Einzeln oder gesammelt kopieren.',
  copyAllLabel: 'Alle Angaben kopieren',
  fields: [
    { label: 'Firma / Inhaber', value: `${COMPANY.legalName} (${COMPANY.brandName}), ${COMPANY.legalForm}` },
    { label: 'Anschrift', value: formatCompanyAddressLine() },
    { label: 'USt-IdNr.', value: COMPANY.vatId },
    { label: 'E-Mail Rechnungen & Rückfragen', value: COMPANY.procurementEmail },
  ],
} as const;
