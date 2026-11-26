import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';
import { buildBaDraftDocument } from '@/lib/sdb-preview/build-ba-draft-document';
import { loadBaDraftSymbolImages } from '@/lib/sdb-preview/load-ba-draft-symbol-images';
import { renderBaDraftPdf } from '@/lib/sdb-preview/render-ba-draft-pdf';

export type BaDraftPdfFile = { bytes: Uint8Array; fileName: string };

/** Orchestriert Datenmodell → Symbole laden → PDF rendern (Browser). */
export async function createBaDraftPdf(teaser: SdbPreviewTeaser, accountUrl: string): Promise<BaDraftPdfFile> {
  const document = buildBaDraftDocument(teaser);
  const symbolImages = await loadBaDraftSymbolImages(document);
  const bytes = await renderBaDraftPdf({ document, accountUrl, symbolImages });
  return { bytes, fileName: document.fileName };
}
