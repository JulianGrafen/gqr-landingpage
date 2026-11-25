import { SDB_PREVIEW_EXAMPLES } from '@/config/sdb-preview-examples';

/** Erstes Beispiel (Bremsenreiniger) ist der 1-Klick-Default in der Dropzone. */
export const SDB_DROPZONE_QUICK_EXAMPLE_ID = SDB_PREVIEW_EXAMPLES[0].id;

export const SDB_DROPZONE_COPY = {
  pdfBadgeLabel: 'PDF',
  title: 'Sicherheitsdatenblatt hier ablegen',
  /** Reibungsarme Info-Zeile über dem Datei-Button (Legal-Hinweis steht im Hero-Subtext und im Ergebnis). */
  hint: 'PDF, max. 10 MB · Ohne Login · Keine dauerhafte Speicherung',
  pickPdfLabel: 'PDF auswählen',
  /** Micro-Label direkt über den 1-Klick-Beispiel-Buttons. */
  examplesLabel: 'Kein PDF zur Hand? Sofort mit 1 Klick testen:',
} as const;
