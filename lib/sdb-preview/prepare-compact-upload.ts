import {
  extractSdbSectionTextFromPdf,
  type PdfSectionExtractResult,
} from '@/lib/sdb-preview/extract-pdf-sdb-sections';
import { guessTradeNameFromSectionText } from '@/lib/sdb-preview/guess-trade-name';
import { trimPdfToCompactPreview, type TrimPdfCompactResult } from '@/lib/sdb-preview/trim-pdf-compact';

export type CompactUploadPayload = {
  uploadFile: File;
  sectionExtract: PdfSectionExtractResult | null;
  trim: TrimPdfCompactResult;
  earlyTradeName: string | null;
};

/** Client-Vorbereitung: Text Abschn. 1–2 + gekürztes PDF parallel. */
export async function prepareCompactUpload(file: File): Promise<CompactUploadPayload> {
  const [sectionExtract, trim] = await Promise.all([
    extractSdbSectionTextFromPdf(file),
    trimPdfToCompactPreview(file),
  ]);

  const earlyTradeName = sectionExtract?.text
    ? guessTradeNameFromSectionText(sectionExtract.text)
    : null;

  return {
    uploadFile: trim.file,
    sectionExtract,
    trim,
    earlyTradeName,
  };
}
