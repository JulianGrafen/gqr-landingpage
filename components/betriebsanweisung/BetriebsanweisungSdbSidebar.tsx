'use client';

import { SdbLivePreviewDropzone } from '@/components/sdb-preview';
import { DSGVO_HOSTING_BADGE } from '@/config/legal/site-copy';

type Props = {
  substanceName: string;
};

export function BetriebsanweisungSdbSidebar({ substanceName }: Props) {
  return (
    <aside
      id="ba-sdb-dropzone"
      className="scroll-mt-24 rounded-2xl border border-white/10 bg-[#162340]/80 p-5 shadow-xl shadow-black/20 sm:p-6 lg:sticky lg:top-8"
    >
      <h2 className="text-xl font-bold text-[#f0f6ff]">
        Nutzen Sie {substanceName} eines bestimmten Herstellers?
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#8fa4c0]">
        Sicherheitsdatenblätter variieren je nach Lieferant und Konzentration. Laden Sie das PDF Ihres
        Lieferanten hoch, um die exakten Werte automatisch einzusetzen.
      </p>
      <SdbLivePreviewDropzone variant="next" embedded className="mt-4" />
      <ul className="mt-4 space-y-1 text-xs text-[#8fa4c0]" role="list">
        <li>✓ {DSGVO_HOSTING_BADGE}</li>
        <li>✓ Keine Installation</li>
        <li>✓ Extraktion aus Ihrem SDB-PDF</li>
      </ul>
    </aside>
  );
}
