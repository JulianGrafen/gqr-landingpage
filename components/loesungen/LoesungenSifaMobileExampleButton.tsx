'use client';

import { LIVE_DEMO_ANCHOR_ID } from '@/config/home-sections/hero';

type Props = {
  /** Container-ID der Dropzone (Default: Startseiten-Anker live-demo). */
  anchorId?: string;
};

/** Nur Mobile: scrollt zur Dropzone und startet den vorhandenen 1-Klick-Beispiel-SDB-Flow. */
export function LoesungenSifaMobileExampleButton({ anchorId = LIVE_DEMO_ANCHOR_ID }: Props) {
  return (
    <button
      type="button"
      className="gqr-cta-secondary gqr-cta-secondary--md inline-flex w-full justify-center md:hidden"
      onClick={() => {
        const root = document.getElementById(anchorId);
        root?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const quickBtn = root?.querySelector<HTMLButtonElement>('[data-sdb-mobile-quick-example]');
        quickBtn?.click();
      }}
    >
      Beispiel-SDB testen
    </button>
  );
}