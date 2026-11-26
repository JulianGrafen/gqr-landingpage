import type { BaDraftDocument } from '@/lib/sdb-preview/build-ba-draft-document';

/**
 * Lädt alle Symbole eines BA-Entwurfs als PNG-Bytes (Browser).
 * SVG (GHS) und PNG (ISO 7010) werden einheitlich über ein Canvas gerastert; Fehler → Symbol fehlt nur im PDF.
 */

const RASTER_SIZE_PX = 192;

function rasterizeToPng(src: string): Promise<Uint8Array | null> {
  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = RASTER_SIZE_PX;
      canvas.height = RASTER_SIZE_PX;
      const context = canvas.getContext('2d');
      if (!context) return resolve(null);
      context.drawImage(image, 0, 0, RASTER_SIZE_PX, RASTER_SIZE_PX);
      canvas.toBlob(async (blob) => {
        resolve(blob ? new Uint8Array(await blob.arrayBuffer()) : null);
      }, 'image/png');
    };
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

export async function loadBaDraftSymbolImages(document: BaDraftDocument): Promise<Map<string, Uint8Array>> {
  const sources = [...new Set(document.sections.flatMap((section) => section.symbols.map((symbol) => symbol.src)))];
  const entries = await Promise.all(sources.map(async (src) => [src, await rasterizeToPng(src)] as const));
  return new Map(entries.filter((entry): entry is readonly [string, Uint8Array] => entry[1] !== null));
}
