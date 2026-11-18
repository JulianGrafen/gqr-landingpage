'use client';

import { useCallback, useEffect, useRef } from 'react';
import { BaExtractionCheckCard } from '@/components/betriebsanweisung/BaExtractionCheckCard';
import { useBetriebsanweisungSdbUpload } from '@/components/betriebsanweisung/betriebsanweisung-sdb-upload-context';
import { SdbLivePreviewDropzoneView, type SdbLivePreviewDropzoneHandle } from '@/components/sdb-preview';
import { SdbTrustFeatureList } from '@/components/programmatic-seo/SdbTrustFeatureList';
import { MOBILE_UPLOAD_FALLBACK, SUPPLIER_COMPATIBILITY_HINTS } from '@/config/betriebsanweisung/conversion-copy';
import { buildDemoExtractionLinkLabel } from '@/config/betriebsanweisung/live-preview-copy';
import type { SubstanceClusterId } from '@/config/betriebsanweisung/substance-clusters';
import { BETRIEBSANWEISUNG_NO_PDF_STORAGE } from '@/config/legal/site-copy';
import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';

type Props = {
  substanceName: string;
  cluster: SubstanceClusterId;
  /** Register-Link mit utm_content für den Mobile-Fallback. */
  mobileRegisterUrl: string;
};

/** 1-Klick-Demo ohne eigenes PDF: gleicher Extraktions-Durchlauf mit dem Beispiel-SDB des Slugs. */
function DemoExtractionLink({ substanceName }: { substanceName: string }) {
  const { startDemoExtraction, preview } = useBetriebsanweisungSdbUpload();

  return (
    <button
      type="button"
      onClick={startDemoExtraction}
      disabled={preview.phase === 'processing'}
      className="mt-3 w-full border-0 bg-transparent p-0 text-left text-sm font-semibold text-teal-300 underline-offset-2 transition hover:underline disabled:opacity-60"
    >
      {buildDemoExtractionLinkLabel(substanceName)}
    </button>
  );
}

export function BetriebsanweisungSdbSidebar({ substanceName, cluster, mobileRegisterUrl }: Props) {
  const { registerSdbUploadSurface, preview } = useBetriebsanweisungSdbUpload();
  const dropzoneRef = useRef<SdbLivePreviewDropzoneHandle>(null);

  useEffect(() => {
    registerSdbUploadSurface({
      openFilePicker: () => dropzoneRef.current?.openFilePicker(),
      scrollToDropzone: () => dropzoneRef.current?.scrollToDropzone(),
    });
    return () => registerSdbUploadSurface(null);
  }, [registerSdbUploadSurface]);

  const isDemo = preview.source?.kind === 'demo';
  const renderCheckCard = useCallback(
    (teaser: SdbPreviewTeaser) => (
      <BaExtractionCheckCard
        teaser={teaser}
        isDemo={isDemo}
        onTestAnotherPdf={() => dropzoneRef.current?.openFilePicker()}
      />
    ),
    [isDemo],
  );

  const isScanActive = preview.phase !== 'idle';

  return (
    <aside
      id="ba-sdb-dropzone"
      className="scroll-mt-24 rounded-2xl border border-white/10 bg-[#162340]/80 p-5 shadow-xl shadow-black/20 sm:p-6 lg:sticky lg:top-8"
    >
      <h2 className="text-xl font-bold text-[#f0f6ff]">Lieferanten-SDB für {substanceName} hochladen</h2>
      {!isScanActive ? (
        <p className="mt-3 text-sm leading-relaxed text-[#8fa4c0]">
          Die Live-Vorschau liest Basisangaben (Abschnitt 1 bis 3 &amp; 8) aus Ihrem PDF aus und baut links den
          Entwurf auf. Die vollständige Bearbeitung und fachliche Vorprüfung erfolgt im Account.
        </p>
      ) : null}
      <SdbLivePreviewDropzoneView
        ref={dropzoneRef}
        controller={preview}
        variant="next"
        embedded
        className="mt-4"
        exampleSlot={<DemoExtractionLink substanceName={substanceName} />}
        renderReadyState={renderCheckCard}
      />
      {!isScanActive ? (
        <>
          <a
            href={mobileRegisterUrl}
            className="mt-3 block text-center text-sm font-semibold text-teal-300 underline-offset-2 hover:underline md:hidden"
          >
            {MOBILE_UPLOAD_FALLBACK.label}
          </a>
          <p className="mt-3 text-center text-xs text-[#8fa4c0]">{BETRIEBSANWEISUNG_NO_PDF_STORAGE}</p>
          <SdbTrustFeatureList />
          <p className="mt-3 text-xs leading-relaxed text-[#8fa4c0]">{SUPPLIER_COMPATIBILITY_HINTS[cluster]}</p>
        </>
      ) : null}
    </aside>
  );
}
