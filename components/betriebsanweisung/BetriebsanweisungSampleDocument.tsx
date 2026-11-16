import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import { BetriebsanweisungTeaserDocument } from '@/components/betriebsanweisung/BetriebsanweisungTeaserDocument';
import { SAMPLE_PREVIEW_COPY } from '@/config/betriebsanweisung/sample-preview';
import { buildBetriebsanweisungRegisterUrl } from '@/lib/betriebsanweisung/build-register-url';
import { resolveSubstanceCluster } from '@/lib/betriebsanweisung/resolve-substance-cluster';

type Props = {
  entry: HazardousSubstanceSeoEntry;
};

/** Storybook/Demo: gleiche Muster-Vorschau wie auf den Slug-Landingpages (benötigt den Upload-Provider). */
export function BetriebsanweisungSampleDocument({ entry }: Props) {
  return (
    <BetriebsanweisungTeaserDocument
      entry={entry}
      cluster={resolveSubstanceCluster(entry)}
      sampleRegisterUrl={buildBetriebsanweisungRegisterUrl(entry.slug, {
        utmContent: SAMPLE_PREVIEW_COPY.registerUtmContent,
      })}
    />
  );
}
