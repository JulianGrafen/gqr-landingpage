import { SDB_PREVIEW_EXTRACT_MAX_PAGES } from '@/lib/sdb-preview/extract-pdf-sdb-sections';

export type TrimPdfCompactResult = {
  file: File;
  pageCount: number;
  pagesUsed: number;
  trimmed: boolean;
  originalBytes: number;
  uploadBytes: number;
};

/**
 * Erzeugt ein PDF mit max. den ersten N Seiten für die Landing-Compact-API.
 * Backend erhält so nicht mehr das volle SDB (typ. 8–30+ Seiten).
 */
export async function trimPdfToCompactPreview(
  file: File,
  maxPages: number = SDB_PREVIEW_EXTRACT_MAX_PAGES,
): Promise<TrimPdfCompactResult> {
  const originalBytes = file.size;
  const bytes = await file.arrayBuffer();

  try {
    const { PDFDocument } = await import('pdf-lib');
    const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const pageCount = src.getPageCount();
    const pagesUsed = Math.min(maxPages, pageCount);

    if (pagesUsed >= pageCount) {
      return {
        file,
        pageCount,
        pagesUsed: pageCount,
        trimmed: false,
        originalBytes,
        uploadBytes: originalBytes,
      };
    }

    const out = await PDFDocument.create();
    const copied = await out.copyPages(
      src,
      Array.from({ length: pagesUsed }, (_, i) => i),
    );
    copied.forEach((page) => out.addPage(page));
    const outBytes = await out.save();
    const blob = new Blob([new Uint8Array(outBytes)], { type: 'application/pdf' });
    const baseName = file.name.replace(/\.pdf$/i, '') || 'sdb';
    const trimmedFile = new File([blob], `${baseName}-compact.pdf`, { type: 'application/pdf' });

    return {
      file: trimmedFile,
      pageCount,
      pagesUsed,
      trimmed: true,
      originalBytes,
      uploadBytes: trimmedFile.size,
    };
  } catch {
    return {
      file,
      pageCount: 0,
      pagesUsed: 0,
      trimmed: false,
      originalBytes,
      uploadBytes: originalBytes,
    };
  }
}
