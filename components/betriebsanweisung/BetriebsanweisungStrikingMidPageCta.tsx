'use client';

import { StrikingDistanceMidPageCta } from '@/components/marketing/StrikingDistanceMidPageCta';
import { useBetriebsanweisungSdbUpload } from '@/components/betriebsanweisung/betriebsanweisung-sdb-upload-context';
import type { BetriebsanweisungStrikingOverride } from '@/config/seo/striking-distance-2026-11-23';

type Props = {
  override: BetriebsanweisungStrikingOverride;
};

export function BetriebsanweisungStrikingMidPageCta({ override }: Props) {
  const { scrollToDropzone } = useBetriebsanweisungSdbUpload();
  return (
    <StrikingDistanceMidPageCta
      copy={override.midPageCta}
      onScrollToDropzone={scrollToDropzone}
      variant="betriebsanweisung"
    />
  );
}