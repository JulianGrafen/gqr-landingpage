import type { Metadata } from 'next';
import { CeoGeminiClickPageMidCta } from '@/components/marketing/CeoGeminiClickPageMidCta';
import { PricingSectionClient } from '@/components/pricing/PricingSectionClient';
import { PRICING_PAGE_SEO } from '@/config/pricing-page-seo';
import { CEO_GEMINI_PRICING_PRE_PURCHASE_CTA } from '@/config/seo/ceo-gemini-cta-2026-11-27';
import { buildMetadata } from '@/lib/seo/buildMetadata';

export const metadata: Metadata = buildMetadata(PRICING_PAGE_SEO);

export default function PricingPage() {
  return (
    <div className="bg-[#0a1628] py-6 text-[#f0f6ff] antialiased">
      <CeoGeminiClickPageMidCta copy={CEO_GEMINI_PRICING_PRE_PURCHASE_CTA} />
      <PricingSectionClient />
    </div>
  );
}