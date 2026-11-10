'use client';

import { useEffect, useRef, useState } from 'react';
import { useBetriebsanweisungSdbUpload } from '@/components/betriebsanweisung/betriebsanweisung-sdb-upload-context';
import { SdbLivePreviewDropzone, type SdbLivePreviewDropzoneHandle } from '@/components/sdb-preview';
import { SdbTrustFeatureList } from '@/components/programmatic-seo/SdbTrustFeatureList';
import { BETRIEBSANWEISUNG_NO_PDF_STORAGE } from '@/config/legal/site-copy';
import type { SdbPreviewPhase } from '@/lib/sdb-preview/useSdbPreview';

type Props = {
  substanceName: string;
};

export function BetriebsanweisungSdbSidebar({ substanceName }: Props) {
  const [scanPhase, setScanPhase] = useState<SdbPreviewPhase>('idle');
  const dropzoneRef = useRef<SdbLivePreviewDropzoneHandle>(null);
  const { registerSdbUploadSurface } = useBetriebsanweisungSdbUpload();

  useEffect(() => {
    registerSdbUploadSurface({
      openFilePicker: () => dropzoneRef.current?.openFilePicker(),
      scrollToDropzone: () => dropzoneRef.current?.scrollToDropzone(),
    });
    return () => registerSdbUploadSurface(null);
  }, [registerSdbUploadSurface]);

  return (
    <aside
      id="ba-sdb-dropzone"
      className="scroll-mt-24 rounded-2xl border border-white/10 bg-[#162340]/80 p-5 shadow-xl shadow-black/20 sm:p-6 lg:sticky lg:top-8"
    >
      <h2 className="text-xl font-bold text-[#f0f6ff]">Lieferanten-SDB für {substanceName} hochladen</h2>
      {scanPhase === 'idle' ? (
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
      />
      {scanPhase === 'idle' ? (
        <p className="mt-3 text-center text-xs text-[#8fa4c0]">{BETRIEBSANWEISUNG_NO_PDF_STORAGE}</p>
      ) : null}
      {scanPhase === 'idle' ? <SdbTrustFeatureList /> : null}
    </aside>
  );
}
