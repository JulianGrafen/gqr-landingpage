'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SdbLivePreviewDropzone } from '@/components/sdb-preview';
import {
  BETRIEBSANWEISUNG_NO_PDF_STORAGE,
  BETRIEBSANWEISUNG_REGISTER_CTA,
  DSGVO_HOSTING_BADGE,
} from '@/config/legal/site-copy';
import type { SdbPreviewPhase } from '@/lib/sdb-preview/useSdbPreview';

type Props = {
  substanceName: string;
  registerUrl: string;
};

export function BetriebsanweisungSdbSidebar({ substanceName, registerUrl }: Props) {
  const [scanPhase, setScanPhase] = useState<SdbPreviewPhase>('idle');

  return (
    <aside
      id="ba-sdb-dropzone"
      className="scroll-mt-24 rounded-2xl border border-white/10 bg-[#162340]/80 p-5 shadow-xl shadow-black/20 sm:p-6 lg:sticky lg:top-8"
    >
      <h2 className="text-xl font-bold text-[#f0f6ff]">
        Nutzen Sie {substanceName} eines bestimmten Herstellers?
      </h2>
      {scanPhase === 'idle' ? (
        <p className="mt-3 text-sm leading-relaxed text-[#8fa4c0]">
          Sicherheitsdatenblätter variieren je nach Lieferant und Konzentration. Laden Sie das PDF Ihres Lieferanten
          hoch — relevante Abschnitte können als Vorschlag in den TRGS-555-Entwurf übernommen werden.
        </p>
      ) : null}
      <SdbLivePreviewDropzone
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
        <Link href={registerUrl} className="gqr-cta-primary gqr-cta-primary--md mt-4 inline-flex w-full justify-center">
          {BETRIEBSANWEISUNG_REGISTER_CTA}
        </Link>
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
