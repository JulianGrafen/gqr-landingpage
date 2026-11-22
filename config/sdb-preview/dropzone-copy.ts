import { SDB_PREVIEW_EXAMPLES } from '@/config/sdb-preview-examples';

/** Erstes Beispiel (Bremsenreiniger) ist der 1-Klick-Default in der Dropzone. */
export const SDB_DROPZONE_QUICK_EXAMPLE_ID = SDB_PREVIEW_EXAMPLES[0].id;

export const SDB_DROPZONE_COPY = {
  pdfBadgeLabel: 'PDF',
  title: 'Sicherheitsdatenblatt hier ablegen',
  hint: 'PDF, max. 10 MB, ohne Login',
  hintLegal: 'KI-gestützter Entwurf (gemäß TRGS 555)',
  pickPdfLabel: 'PDF auswählen',
  quickExampleLink: 'Kein PDF zur Hand? Mit Beispiel-SDB testen',
} as const;
