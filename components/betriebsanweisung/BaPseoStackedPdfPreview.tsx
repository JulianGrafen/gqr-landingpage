'use client';

import { type ReactNode } from 'react';
import { BA_SAMPLE_PDF_EMBED_SRC } from '@/components/ui/ba-sample-pdf-embed-src';

type Props = {
  embedTitle: string;
  substanceName: string;
  overlay: ReactNode;
};

/**
 * pSEO: Kopf = scharfer PDF-Ausschnitt wie #ergebnis (echtes TRGS-555-Formular), Stoffname im Produktfeld.
 */
export function BaPseoStackedPdfPreview({ embedTitle, substanceName, overlay }: Props) {
  return (
    <div className="ba-pseo-preview-stack__media w-full">
      <header className="ba-pseo-pdf-pane ba-pseo-pdf-pane--head">
        <iframe
          src={BA_SAMPLE_PDF_EMBED_SRC}
          title=""
          className="ba-pseo-pdf-crop__frame ba-pseo-pdf-crop__frame--head"
          loading="lazy"
          tabIndex={-1}
        />
        <div className="ba-pseo-pdf-pane__product-slot">
          <h2 className="ba-pseo-pdf-pane__product-title">{substanceName}</h2>
        </div>
      </header>

      <div className="ba-pseo-pdf-pane ba-pseo-pdf-pane--body relative" aria-label={embedTitle}>
        <div className="ba-pseo-pdf-blur-layer" aria-hidden="true">
          <iframe
            src={BA_SAMPLE_PDF_EMBED_SRC}
            title=""
            className="ba-pseo-pdf-crop__frame ba-pseo-pdf-crop__frame--body"
            loading="lazy"
            tabIndex={-1}
          />
        </div>
        {overlay}
      </div>
    </div>
  );
}