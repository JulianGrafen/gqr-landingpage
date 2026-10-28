import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import { BetriebsanweisungTeaserDocument } from '@/components/betriebsanweisung/BetriebsanweisungTeaserDocument';

type Props = {
  entry: HazardousSubstanceSeoEntry;
};

/** Storybook/Demo: gleiche Skeleton-Vorschau wie auf den Slug-Landingpages. */
export function BetriebsanweisungSampleDocument({ entry }: Props) {
  return <BetriebsanweisungTeaserDocument entry={entry} />;
}
