/** Max. PDF-Seiten für Landing-Compact-Extraktion (Abschnitt 1–2). */
export const SDB_PREVIEW_EXTRACT_MAX_PAGES = 2;

/** Begrenzung für LLM-Kosten / Request-Größe. */
export const SDB_PREVIEW_EXTRACT_MAX_CHARS = 14_000;

export type PdfSectionExtractResult = {
  text: string;
  pageCount: number;
  pagesUsed: number;
};

/**
 * Liest die ersten Seiten eines SDB-PDFs im Browser (Abschn. 1–2 liegen typischerweise dort).
 * Wird an die App-API als `sectionExtract` übergeben, damit das Backend nicht das volle PDF parsen muss.
 */
export async function extractSdbSectionTextFromPdf(file: File): Promise<PdfSectionExtractResult | null> {
  if (typeof window === 'undefined') return null;

  try {
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';

    const data = new Uint8Array(await file.arrayBuffer());
    const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
    const pagesUsed = Math.min(SDB_PREVIEW_EXTRACT_MAX_PAGES, doc.numPages);
    const parts: string[] = [];

    for (let pageNum = 1; pageNum <= pagesUsed; pageNum += 1) {
      const page = await doc.getPage(pageNum);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item) => ('str' in item ? item.str : ''))
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (pageText) parts.push(pageText);
    }

    let text = trimToHazardSections(parts.join('\n\n'));
    if (text.length > SDB_PREVIEW_EXTRACT_MAX_CHARS) {
      text = text.slice(0, SDB_PREVIEW_EXTRACT_MAX_CHARS);
    }

    if (!text.trim()) return null;
    return { text, pageCount: doc.numPages, pagesUsed };
  } catch {
    return null;
  }
}

/** Versucht ab Abschnitt 1 / Section 1 zu starten und vor Abschnitt 3 abzuschneiden. */
function trimToHazardSections(raw: string): string {
  const normalized = raw.replace(/\r/g, '');
  const startPatterns = [
    /\b(?:ABSCHNITT|Abschnitt|SECTION|Section)\s*1\b/i,
    /\b1\s*\.\s*(?:Identifikation|Stoff|Produkt|Identification)/i,
  ];
  let start = 0;
  for (const pattern of startPatterns) {
    const match = pattern.exec(normalized);
    if (match && match.index !== undefined) {
      start = match.index;
      break;
    }
  }

  const endPatterns = [
    /\b(?:ABSCHNITT|Abschnitt|SECTION|Section)\s*3\b/i,
    /\b3\s*\.\s*(?:Zusammensetzung|Composition)/i,
  ];
  let end = normalized.length;
  for (const pattern of endPatterns) {
    const match = pattern.exec(normalized.slice(start + 1));
    if (match && match.index !== undefined) {
      end = start + 1 + match.index;
      break;
    }
  }

  return normalized.slice(start, end).trim();
}
