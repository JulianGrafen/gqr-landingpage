/** Muster-BA im Abschnitt #ergebnis (<OutputPreviewSection>). */

import { SAMPLE_BA_ENTWURF_PDF } from '@/config/sample-downloads';

export interface OutputPreviewDownloadCta {
  label: string;
  href: string;
  download?: string;
}

export interface OutputPreviewPdfEmbed {
  href: string;
  title: string;
}

export const OUTPUT_PREVIEW = {
  sectionId: 'ergebnis',
  baSpotlight: {
    sectionAnchorId: 'ergebnis-ba',
    kicker: 'TRGS 555',
    title: 'Sparen Sie sich das Abtippen.',
    lead:
      'KI-gestützter Entwurf nach TRGS 555 zur fachlichen Freigabe durch die SiFa bzw. den Arbeitgeber — als druckfertiges A4-PDF mit Firmenlogo.',
    points: [
      'Gliederung in die sechs Abschnitte nach TRGS 555',
      'Eigenes Firmenlogo und anpassbare Rahmenfarbe',
      'Schriftgröße passt sich dem Inhalt für den Aushang an',
    ],
    pdfEmbed: {
      href: SAMPLE_BA_ENTWURF_PDF.href,
      title: 'Vorschau: Beispiel-Betriebsanweisung als PDF-Entwurf (TRGS 555)',
    },
    downloadCta: {
      label: 'Beispiel BA herunterladen',
      href: SAMPLE_BA_ENTWURF_PDF.href,
      download: SAMPLE_BA_ENTWURF_PDF.downloadFilename,
    },
  },
} as const;
