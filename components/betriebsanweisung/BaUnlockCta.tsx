'use client';

import { useBetriebsanweisungSdbUpload } from '@/components/betriebsanweisung/betriebsanweisung-sdb-upload-context';
import { BaUnlockCtaView, type BaUnlockCtaTone } from '@/components/betriebsanweisung/BaUnlockCtaView';

type Props = {
  label: string;
  /** `dark` = Sidebar (Navy), `light` = Overlay auf dem weißen DIN-A4-Dokument. */
  tone: BaUnlockCtaTone;
  className?: string;
};

/**
 * Freischalt-CTA mit Micro-Trust-Bullets. Href und Token-Übergabe kommen aus dem gemeinsamen
 * Vorschau-Kontext, damit alle CTAs dieselbe Registrierungs-URL nutzen.
 */
export function BaUnlockCta({ label, tone, className = '' }: Props) {
  const { unlockHref, handOffToRegistration } = useBetriebsanweisungSdbUpload();
  return (
    <BaUnlockCtaView
      label={label}
      tone={tone}
      className={className}
      href={unlockHref}
      onClick={handOffToRegistration}
    />
  );
}
