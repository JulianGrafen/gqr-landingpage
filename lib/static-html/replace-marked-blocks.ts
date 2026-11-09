/**
 * Ersetzt generierte Blöcke in statischem HTML zwischen Kommentar-Markern:
 *   <!--AEO:NAME--> … <!--/AEO:NAME-->
 * Ein Marker darf mehrfach vorkommen; jedes Vorkommen erhält denselben Inhalt.
 */

export type MarkedBlockRenderers = Record<string, () => string>;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function openMarker(name: string): string {
  return `<!--AEO:${name}-->`;
}

export function closeMarker(name: string): string {
  return `<!--/AEO:${name}-->`;
}

/** Liefert das aktualisierte HTML; wirft, wenn ein Marker fehlt (Schutz vor stillem Drift). */
export function replaceMarkedBlocks(html: string, renderers: MarkedBlockRenderers): string {
  return Object.entries(renderers).reduce((currentHtml, [name, render]) => {
    const pattern = new RegExp(`${escapeRegExp(openMarker(name))}[\\s\\S]*?${escapeRegExp(closeMarker(name))}`, 'g');
    if (!pattern.test(currentHtml)) {
      throw new Error(`Marker ${openMarker(name)} nicht gefunden.`);
    }
    const replacement = `${openMarker(name)}\n${render()}\n${closeMarker(name)}`;
    return currentHtml.replace(pattern, () => replacement);
  }, html);
}
