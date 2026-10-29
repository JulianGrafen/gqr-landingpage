'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useBetriebsanweisungSdbUpload } from '@/components/betriebsanweisung/betriebsanweisung-sdb-upload-context';
import { SdbLivePreviewDropzone, type SdbLivePreviewDropzoneHandle } from '@/components/sdb-preview';
import {
  BETRIEBSANWEISUNG_NO_PDF_STORAGE,
  DSGVO_HOSTING_BADGE,
} from '@/config/legal/site-copy';
import type { SdbPreviewPhase } from '@/lib/sdb-preview/useSdbPreview';

type Props = {
  substanceName: string;
  registerUrl: string;
};

export function BetriebsanweisungSdbSidebar({ substanceName, registerUrl }: Props) {
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
      {scanPhase === 'idle' ? (
        <p className="mt-4 text-center text-sm">
          <Link href={registerUrl} className="gqr-link font-semibold text-[#8fa4c0] hover:text-[#ff6b35]">
            Kein SDB-PDF zur Hand? → Direkt in der App registrieren
          </Link>
        </p>
      ) : null}
      {scanPhase === 'idle' ? (
        <div className="mt-4 flex flex-col gap-1.5 text-xs text-[#8fa4c0]" role="group" aria-label="Vertrauensmerkmale">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true">✓</span>
            {DSGVO_HOSTING_BADGE}
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true">✓</span>
            Keine Installation
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true">✓</span>
            Extraktion aus Ihrem SDB-PDF
          </span>
        </div>
      ) : null}
    </aside>
  );
}
