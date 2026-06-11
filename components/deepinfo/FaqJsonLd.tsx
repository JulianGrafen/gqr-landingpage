import type { DeepinfoFaqItem } from '@/lib/wissen/types';

type FaqJsonLdProps = {
  faq: DeepinfoFaqItem[];
};

export function FaqJsonLd({ faq }: FaqJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
