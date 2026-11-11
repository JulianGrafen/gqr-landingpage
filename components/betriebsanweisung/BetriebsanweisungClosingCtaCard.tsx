'use client';

import Link from 'next/link';
import { useBetriebsanweisungSdbUpload } from '@/components/betriebsanweisung/betriebsanweisung-sdb-upload-context';
import { BA_CONTAINER, BA_PROSE } from '@/components/betriebsanweisung/ba-page-layout';
import { BETRIEBSANWEISUNG_CLOSING_REGISTER_CTA } from '@/config/legal/site-copy';
import { stickyCtaObstructProps } from '@/lib/marketing/sticky-header-cta';

type Props = {
  substanceName: string;
  registerUrl: string;
};

export function BetriebsanweisungClosingCtaCard({ substanceName, registerUrl }: Props) {
  const { scrollToDropzone } = useBetriebsanweisungSdbUpload();

  return (
    <section
      className="border-t border-white/[0.07] bg-[#0f1e35] px-4 py-14 sm:px-6 lg:px-8"
      {...stickyCtaObstructProps}
    >
      <div className={BA_CONTAINER}>
        <div
          className={`ba-contrast-panel mx-auto ${BA_PROSE} border-[#ff6b35]/25 bg-[#162340]/90 text-center`}
        >
        <h2 className="text-xl font-bold text-[#f0f6ff] sm:text-2xl">
          TRGS-555-Entwurf für {substanceName} im eigenen Arbeitsbereich prüfen
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#8fa4c0]">
          Laden Sie Ihre eigenen Sicherheitsdatenblätter hoch und strukturieren Sie Betriebsanweisungen sowie Ihr
          Gefahrstoffverzeichnis an einem Ort. Kostenlos für 5 Stoffe, ohne Kreditkarte und ohne Verkaufsgespräch.
        </p>
        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Link href={registerUrl} className="gqr-cta-primary gqr-cta-primary--md inline-flex justify-center">
            {BETRIEBSANWEISUNG_CLOSING_REGISTER_CTA}
          </Link>
          <button
            type="button"
            className="gqr-cta-secondary gqr-cta-secondary--md inline-flex justify-center"
            onClick={scrollToDropzone}
          >
            Nach oben zum SDB-Upload ↑
          </button>
        </div>
        </div>
      </div>
    </section>
  );
}
