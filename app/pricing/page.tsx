import type { Metadata } from 'next';
import { PricingSection } from '@/components/pricing/PricingSection';
import { PRICING_PAGE_SEO } from '@/config/pricing-page-seo';
import { buildMetadata } from '@/lib/seo/buildMetadata';

export const metadata: Metadata = buildMetadata(PRICING_PAGE_SEO);

export default function PricingPage() {
  return (
    <div className="bg-[#0a1628] py-6 text-[#f0f6ff] antialiased">
      <PricingSection sectionId="preise" />
    </div>
  );
}