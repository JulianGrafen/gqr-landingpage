'use client';

import { useEffect, useRef, useState } from 'react';
import { useBetriebsanweisungSdbUpload } from '@/components/betriebsanweisung/betriebsanweisung-sdb-upload-context';
import { SdbLivePreviewDropzone, type SdbLivePreviewDropzoneHandle } from '@/components/sdb-preview';
import { SdbTrustFeatureList } from '@/components/programmatic-seo/SdbTrustFeatureList';
import { MOBILE_UPLOAD_FALLBACK, SUPPLIER_COMPATIBILITY_HINTS } from '@/config/betriebsanweisung/conversion-copy';
import { buildSampleButtonLabel } from '@/config/betriebsanweisung/sample-preview';
import type { SubstanceClusterId } from '@/config/betriebsanweisung/substance-clusters';
import { BETRIEBSANWEISUNG_NO_PDF_STORAGE } from '@/config/legal/site-copy';
import type { SdbPreviewPhase } from '@/lib/sdb-preview/useSdbPreview';

type Props = {
  substanceName: string;
  cluster: SubstanceClusterId;
  /** Register-Link mit utm_content für den Mobile-Fallback. */
  mobileRegisterUrl: string;
};

/** 1-Klick-Einstieg ohne PDF: blendet die statische Muster-Vorschau ein (0 API-Calls). */
function SamplePreviewButton({ substanceName }: { substanceName: string }) {
  const { showSamplePreview } = useBetriebsanweisungSdbUpload();

  return (
    <div className="mt-4" aria-label="Beispiel-SDBs mit 1 Klick testen">
      <button
        type="button"
        onClick={showSamplePreview}
        className="w-full rounded-xl border border-teal-400/40 bg-teal-400/10 px-4 py-3 text-left text-sm font-semibold text-[#f0f6ff] transition hover:border-teal-400/70 hover:bg-teal-400/15"
      >
        {buildSampleButtonLabel(substanceName)}
      </button>
    </div>
  );
}

export function BetriebsanweisungSdbSidebar({ substanceName, cluster, mobileRegisterUrl }: Props) {
  const { registerSdbUploadSurface } = useBetriebsanweisungSdbUpload();
  const [scanPhase, setScanPhase] = useState<SdbPreviewPhase>('idle');
  const dropzoneRef = useRef<SdbLivePreviewDropzoneHandle>(null);

  useEffect(() => {
    registerSdbUploadSurface({
      openFilePicker: () => dropzoneRef.current?.openFilePicker(),
      scrollToDropzone: () => dropzoneRef.current?.scrollToDropzone(),
    });
    return () => registerSdbUploadSurface(null);
  }, [registerSdbUploadSurface]);

  const isScanActive = scanPhase !== 'idle';

  return (
    <aside
      id="ba-sdb-dropzone"
      className="scroll-mt-24 rounded-2xl border border-white/10 bg-[#162340]/80 p-5 shadow-xl shadow-black/20 sm:p-6 lg:sticky lg:top-8"
    >
      <h2 className="text-xl font-bold text-[#f0f6ff]">Lieferanten-SDB für {substanceName} hochladen</h2>
      {!isScanActive ? (
        <p className="mt-3 text-sm leading-relaxed text-[#8fa4c0]">
          Die Live-Vorschau liest im Browser erste Basisangaben (Abschnitt 1 &amp; 2) aus Ihrem PDF aus. Die
          vollständige Bearbeitung und fachliche Vorprüfung erfolgt im Account.
        </p>
      ) : null}
      <SdbLivePreviewDropzone
        ref={dropzoneRef}
        variant="next"
        embedded
        omitPublishedHazardData
        className="mt-4"
        onPhaseChange={setScanPhase}
        exampleSlot={<SamplePreviewButton substanceName={substanceName} />}
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
