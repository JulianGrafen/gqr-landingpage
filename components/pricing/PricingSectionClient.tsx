'use client';

import dynamic from 'next/dynamic';
import { HOME_SECTION_STYLES as styles } from '@/components/home/home-section-styles';

const PricingSection = dynamic(
  () => import('@/components/pricing/PricingSection').then((m) => m.PricingSection),
  {
    ssr: false,
    loading: () => (
      <section
        id="preise"
        data-pricing-section
        data-billing-mode="yearly"
        className={[styles.sectionRaised, 'mt-8 min-h-[28rem]'].join(' ')}
        aria-busy="true"
        aria-label="Preise werden geladen"
      />
    ),
  },
);

/** /pricing/: Client-only Mount verhindert React-Hydration-Mismatch bei ?tab=sifa. */
export function PricingSectionClient() {
  return <PricingSection sectionId="preise" />;
}