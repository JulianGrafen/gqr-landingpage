import { buildPricingMarkdown } from '@/lib/aeo/build-pricing-markdown';
import { MARKDOWN_CONTENT_TYPE, textResponse } from '@/lib/aeo/text-response';

export const dynamic = 'force-static';

/** /pricing.md: Pakete, Limits und Leistungen maschinenlesbar (statisch exportiert). */
export function GET(): Response {
  return textResponse(buildPricingMarkdown(), MARKDOWN_CONTENT_TYPE);
}
