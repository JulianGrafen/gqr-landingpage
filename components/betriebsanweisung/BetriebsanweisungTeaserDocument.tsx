'use client';

import { BaPseoStackedPdfPreview } from '@/components/betriebsanweisung/BaPseoStackedPdfPreview';
import { useBetriebsanweisungSdbUpload } from '@/components/betriebsanweisung/betriebsanweisung-sdb-upload-context';
import { SAMPLE_PREVIEW_COPY as copy } from '@/config/betriebsanweisung/sample-preview';
import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import { BETRIEBSANWEISUNG_OVERLAY_SDB_CTA } from '@/config/legal/site-copy';

type Props = {
  entry: HazardousSubstanceSeoEntry;
};

/**
 * Muster-Vorschau: PDF wie Landing (#ergebnis), Formular-Kopf scharf, Inhalt geblurrt + Overlay.
 */
export function BetriebsanweisungTeaserDocument({ entry }: Props) {
  const { requestSdbUploadFromOverlay, scrollToDropzone, isSamplePreviewActive } =
    useBetriebsanweisungSdbUpload();
  const embedTitle = `Vorschau: Beispiel-Betriebsanweisung (TRGS 555) — Muster für ${entry.substanceName}`;

  return (
    <article
      id={copy.anchorId}
      className={`scroll-mt-28 transition-shadow ${
        isSamplePreviewActive ? 'rounded-2xl ring-4 ring-teal-300/60' : ''
      }`}
      aria-label={`Muster-Vorschau Betriebsanweisung ${entry.substanceName}`}
    >
      <div className="ba-pseo-preview-stack overflow-hidden rounded-2xl border border-white/[0.12] bg-white shadow-2xl shadow-black/30">
        <p className="relative z-20 border-0 border-b border-amber-200/40 bg-amber-50 px-5 py-2 text-[11px] font-semibold leading-snug text-amber-950">
          {copy.sampleBadge}
        </p>

        <BaPseoStackedPdfPreview
          embedTitle={embedTitle}
          substanceName={entry.substanceName}
          overlay={
            <div
              className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center p-4 sm:p-6"
              role="presentation"
              onClick={requestSdbUploadFromOverlay}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  requestSdbUploadFromOverlay();
                }
              }}
            >
              <div
                className="max-w-sm cursor-default rounded-xl border border-slate-200/80 bg-white/95 p-5 text-center shadow-lg"
                role="dialog"
                aria-modal="false"
                aria-label={copy.lockedOverlayTitle}
                onClick={(event) => event.stopPropagation()}
              >
                <p className="text-base font-bold leading-snug text-slate-900">{copy.lockedOverlayTitle}</p>
                <button type="button" onClick={requestSdbUploadFromOverlay} className="ba-teaser-overlay-cta mt-4">
                  {BETRIEBSANWEISUNG_OVERLAY_SDB_CTA}
                </button>
                <button
                  type="button"
                  onClick={scrollToDropzone}
                  className="mt-3 text-sm font-semibold text-slate-700 underline underline-offset-2 hover:text-slate-900"
                >
                  {copy.lockedOverlaySecondaryLabel}
                </button>
              </div>
            </div>
          }
        />
      </div>

      <p className="mt-4 max-w-xl text-xs leading-snug text-gqr-muted">{copy.legalNotice}</p>
    </article>
  );
}