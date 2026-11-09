import { serializeJsonLd, type JsonLdObject } from '@/lib/seo/serialize-json-ld';

type JsonLdProps = {
  /** Ein schema.org-Objekt oder mehrere; jedes erhält einen eigenen Script-Block. */
  data: JsonLdObject | JsonLdObject[];
};

/** Zentrale, typsichere Ausgabe von strukturierten Daten (JSON-LD). */
export function JsonLd({ data }: JsonLdProps) {
  const blocks = Array.isArray(data) ? data : [data];

  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={`${String(block['@type'])}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(block) }}
        />
      ))}
    </>
  );
}
