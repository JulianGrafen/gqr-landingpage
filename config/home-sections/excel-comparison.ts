/**
 * Vergleich Excel-Gefahrstoffliste vs. Gefahrstoff-QR.
 * Konsumenten: <ExcelComparisonSection> (Startseite, semantische <table>) und /llms.txt.
 */

export interface ExcelComparisonRow {
  criterion: string;
  manualWorkflow: string;
  gefahrstoffQrWorkflow: string;
}

export const EXCEL_COMPARISON = {
  sectionId: 'vergleich-excel',
  eyebrow: 'Vergleich',
  headline: 'Vergleich: Klassische Excel-Gefahrstoffliste vs. Gefahrstoff-QR',
  intro:
    'Die Pflichtangaben nach § 6 GefStoffV lassen sich in Excel abbilden. Der Unterschied liegt im Aufwand für Erfassung, Aktualisierung und Nachweis gegenüber der Betriebsprüfung.',
  caption: 'Manuelle Pflege in Excel und Word im Vergleich zum digitalen Workflow mit Gefahrstoff-QR',
  columnLabels: {
    criterion: 'Kriterium',
    manualWorkflow: 'Manuelle Pflege (Excel & Word)',
    gefahrstoffQrWorkflow: 'Digitaler Workflow mit Gefahrstoff-QR',
  },
  rows: [
    {
      criterion: 'Datenerfassung aus SDB',
      manualWorkflow: 'Manuelles Suchen und Abtippen aus 16 SDB-Abschnitten',
      gefahrstoffQrWorkflow: 'KI-gestütztes Auslesen mit direkter SDB-Abschnittsreferenz (z. B. SDB 1.1, 2.2, 8.2)',
    },
    {
      criterion: 'Fehlende SDBs / Mengenangaben bei Begehung',
      manualWorkflow: 'Unübersichtliche Lücken in Tabellen',
      gefahrstoffQrWorkflow: 'Vorab-Erfassung ohne SDB möglich; fehlende Angaben werden im PDF und Excel rot markiert',
    },
    {
      criterion: 'GHS-Piktogramme im Export',
      manualWorkflow: 'Mühsames manuelles Einfügen von Bilddateien',
      gefahrstoffQrWorkflow: 'Originalgetreue GHS-Piktogramme direkt im Gefahrstoffverzeichnis-PDF und Excel-Export',
    },
    {
      criterion: 'Mehrere Kunden / Standorte (für SiFas)',
      manualWorkflow: 'Dutzende getrennte Excel-Dateien und Ordner',
      gefahrstoffQrWorkflow: 'Zentrale Multi-Mandanten-Verwaltung mit Unterteilung nach Mandant, Werk und Tätigkeit',
    },
    {
      criterion: 'Zugriff am Arbeitsplatz (§ 14 GefStoffV)',
      manualWorkflow: 'Statische Papierordner, oft veraltet',
      gefahrstoffQrWorkflow: 'Smartphone-Abruf von Erste-Hilfe- und Schutzmaßnahmen per QR-Code am Gebinde',
    },
    {
      criterion: 'Fachliche Freigabe',
      manualWorkflow: 'Keine strukturierte Status-Verfolgung',
      gefahrstoffQrWorkflow: 'Klare Trennung zwischen KI-gestütztem Entwurf und fachlicher Freigabe durch SiFa / Arbeitgeber',
    },
  ] satisfies ExcelComparisonRow[],
} as const;
