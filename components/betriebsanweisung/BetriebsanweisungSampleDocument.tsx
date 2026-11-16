import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import { BetriebsanweisungTeaserDocument } from '@/components/betriebsanweisung/BetriebsanweisungTeaserDocument';

type Props = {
  entry: HazardousSubstanceSeoEntry;
};

/** Storybook/Demo: gleiche Muster-Vorschau wie auf den Slug-Landingpages (benötigt den Upload-Provider). */
export function BetriebsanweisungSampleDocument({ entry }: Props) {
  return <BetriebsanweisungTeaserDocument entry={entry} />;
}
