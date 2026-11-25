'use client';

import { LIVE_DEMO_ANCHOR_ID } from '@/config/home-sections/hero';
import { triggerHeroQuickExample } from '@/lib/sdb-preview/trigger-hero-quick-example';

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
      onClick={() => triggerHeroQuickExample(anchorId)}
    >
      Beispiel-SDB testen
    </button>
  );
}