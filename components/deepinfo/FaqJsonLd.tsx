import { JsonLd } from '@/components/seo/JsonLd';
import type { DeepinfoFaqItem } from '@/lib/wissen/types';
import { buildFaqPageSchema } from '@/lib/seo/build-faq-page-schema';

type FaqJsonLdProps = {
  faq: DeepinfoFaqItem[];
};

/** FAQPage JSON-LD für Wissensartikel, gekoppelt an die sichtbaren FAQ-Einträge. */
export function FaqJsonLd({ faq }: FaqJsonLdProps) {
  return <JsonLd data={buildFaqPageSchema(faq)} />;
}
