/** Beliebiges schema.org-Objekt (ein Block pro <script type="application/ld+json">). */
export type JsonLdObject = Record<string, unknown>;

/**
 * Serialisiert JSON-LD sicher für die Einbettung in HTML:
 * `<` wird escaped, damit Inhalte nie ein `</script>` erzeugen können.
 */
export function serializeJsonLd(data: JsonLdObject, indent?: number): string {
  return JSON.stringify(data, null, indent).replace(/</g, '\\u003c');
}
