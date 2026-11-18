'use client';

import { useEffect, useRef } from 'react';
import { BaLiveExtractedDocument } from '@/components/betriebsanweisung/BaLiveExtractedDocument';
import { BaSampleLockedDocument } from '@/components/betriebsanweisung/BaSampleLockedDocument';
import { useBetriebsanweisungSdbUpload } from '@/components/betriebsanweisung/betriebsanweisung-sdb-upload-context';
import { LIVE_PREVIEW_COPY } from '@/config/betriebsanweisung/live-preview-copy';
import { SAMPLE_PREVIEW_COPY as copy } from '@/config/betriebsanweisung/sample-preview';
import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import { BETRIEBSANWEISUNG_OVERLAY_SDB_CTA } from '@/config/legal/site-copy';
import { SDB_PREVIEW_EXAMPLES } from '@/config/sdb-preview-examples';
import { formatApplicationAreaField } from '@/lib/betriebsanweisung/format-workplace-context';
import type { SdbPreviewSource } from '@/lib/sdb-preview/useSdbPreview';

type Props = {
  entry: HazardousSubstanceSeoEntry;
  /** Einsatzbereich im Dokumentkopf der Live-Vorschau; Standard: Branchen des Eintrags. */
  applicationArea?: string;
};

function describeSource(source: SdbPreviewSource | null): string {
  if (!source) return '';
  switch (source.kind) {
    case 'upload':
      return source.fileName;
    case 'demo':
      return source.label;
    case 'example':
      return `Beispiel-SDB ${SDB_PREVIEW_EXAMPLES.find((example) => example.id === source.exampleId)?.label ?? source.exampleId}`;
  }
}

/**
 * Große DIN-A4-Hauptvorschau links:
 * - vor dem Upload: Muster-BA im selben HTML-Layout (Kopf + Stoffname scharf, Inhalt geblurrt + Overlay),
 * - nach der Extraktion: Live-Entwurf aus dem gemeinsamen Vorschau-State (Smart Unblur).
 */
export function BetriebsanweisungTeaserDocument({
  entry,
  applicationArea = formatApplicationAreaField(entry.typicalIndustries),
}: Props) {
  const { requestSdbUploadFromOverlay, scrollToDropzone, preview } = useBetriebsanweisungSdbUpload();
  const articleRef = useRef<HTMLElement>(null);
  const liveTeaser = preview.phase === 'ready' ? preview.teaser : null;

  useEffect(() => {
    if (!liveTeaser) return;
    const article = articleRef.current;
    if (!article) return;
    // Mobile: Vorschau liegt unter der Dropzone → nach Abschluss sichtbar machen.
    const isStackedLayout = !window.matchMedia('(min-width: 1024px)').matches;
    if (isStackedLayout) article.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [liveTeaser]);

  return (
    <article
      ref={articleRef}
      id={copy.anchorId}
      className={`scroll-mt-28 rounded-2xl transition-shadow duration-700 ${
        liveTeaser ? 'ring-4 ring-teal-300/60' : ''
      }`}
      aria-label={`${liveTeaser ? 'Live-Vorschau' : 'Muster-Vorschau'} Betriebsanweisung ${entry.substanceName}`}
      aria-live="polite"
    >
      <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-white shadow-2xl shadow-black/30">
        {liveTeaser ? (
          <div key={liveTeaser.previewToken} className="motion-safe:animate-[ba-live-preview-in_0.6s_ease-out]">
            <p className="relative z-20 m-0 flex items-center gap-1.5 truncate border-0 border-b border-teal-200 bg-teal-50 px-5 py-2 text-[11px] font-semibold leading-snug text-teal-900">
              {LIVE_PREVIEW_COPY.sourceBadgePrefix}{' '}
              <span className="truncate font-bold">{describeSource(preview.source)}</span>
            </p>
            <BaLiveExtractedDocument
              teaser={liveTeaser}
              applicationArea={applicationArea}
              isDemo={preview.source?.kind === 'demo'}
            />
          </div>
        ) : (
          <>
            <p className="relative z-20 border-0 border-b border-amber-200/40 bg-amber-50 px-5 py-2 text-[11px] font-semibold leading-snug text-amber-950">
              {copy.sampleBadge}
            </p>

            <BaSampleLockedDocument
              substanceName={entry.substanceName}
              applicationArea={applicationArea}
              overlay={
                <div
                  className="flex h-full cursor-pointer items-center justify-center p-4 sm:p-6"
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
                      className="mt-3 border-0 bg-transparent p-0 text-sm font-semibold text-slate-700 underline underline-offset-2 hover:text-slate-900"
                    >
                      {copy.lockedOverlaySecondaryLabel}
                    </button>
                  </div>
                </div>
              }
            />
          </>
        )}
      </div>

      <p className="mt-4 max-w-xl text-xs leading-snug text-gqr-muted">{copy.legalNotice}</p>
    </article>
  );
}
