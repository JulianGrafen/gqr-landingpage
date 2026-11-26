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
  eyebrow: 'Excel vs. Gefahrstoff-QR',
  headline: 'Warum scheitern Excel-Listen bei der Gefahrstoffdokumentation?',
  intro:
    'Die Pflichtangaben nach § 6 GefStoffV lassen sich in Excel abbilden. Im Alltag scheitert es an drei Stellen: SDB-Versionen liegen verstreut in E-Mails und Ordnern, Aktualisierungen bleiben liegen, und im Ernstfall fehlt die Information am Regal.',
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
      criterion: 'Neues SDB per Knopfdruck beim Lieferanten anfordern',
      manualWorkflow: 'Getrennte E-Mails, Anrufe und Nachverfolgung in Listen',
      gefahrstoffQrWorkflow: 'Anforderung per Knopfdruck aus dem Stoffdatensatz mit hinterlegtem Lieferanten-Kontakt',
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
      gefahrstoffQrWorkflow: 'Klare Trennung zwischen Entwurf und fachlicher Freigabe durch SiFa / Arbeitgeber',
    },
  ] satisfies ExcelComparisonRow[],
} as const;
