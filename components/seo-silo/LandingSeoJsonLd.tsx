import type { SeoSiloSchemaBundle } from '@/config/seo-silo/types';

type LandingSeoJsonLdProps = {
  schema: SeoSiloSchemaBundle;
};

/**
 * Rendert FAQPage + SoftwareApplication als getrennte JSON-LD-Skripte.
 * Google empfiehlt ein Schema pro @type-Block bei gemischten Entitäten.
 */
export function LandingSeoJsonLd({ schema }: LandingSeoJsonLdProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.softwareApplication) }}
      />
    </>
  );
}
