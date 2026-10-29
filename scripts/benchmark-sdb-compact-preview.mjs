#!/usr/bin/env node
/**
 * Misst Client-Vorbereitung für Landing-Compact-SDB-Upload (Text + PDF-Trim).
 * Ausgabe für PR-Dokumentation (Vorher: volles PDF; Nachher: Trim + sectionExtract).
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const SAMPLE = path.join(ROOT, 'public/samples/sdb/aceton.pdf');

async function loadSampleBytes() {
  if (fs.existsSync(SAMPLE)) {
    return { bytes: fs.readFileSync(SAMPLE), label: 'public/samples/sdb/aceton.pdf' };
  }
  const { PDFDocument, StandardFonts } = await import('pdf-lib');
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (let i = 0; i < 12; i += 1) {
    const page = doc.addPage();
    page.drawText(`SDB Benchmark Seite ${i + 1} — Abschnitt 1 Identifikation`, { x: 50, y: 700, size: 12, font });
  }
  return { bytes: Buffer.from(await doc.save()), label: 'synthetic-12-page-sdb.pdf' };
}

async function main() {
  const { bytes, label } = await loadSampleBytes();
  const originalBytes = bytes.length;

  const { PDFDocument } = await import('pdf-lib');
  const t0 = performance.now();
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = src.getPageCount();
  const pagesUsed = Math.min(2, pageCount);
  const out = await PDFDocument.create();
  const copied = await out.copyPages(
    src,
    Array.from({ length: pagesUsed }, (_, i) => i),
  );
  copied.forEach((p) => out.addPage(p));
  const trimmed = await out.save();
  const trimMs = Math.round(performance.now() - t0);
  const uploadBytes = trimmed.length;

  console.log(JSON.stringify({
    sample: label,
    pageCount,
    pagesUploaded: pagesUsed,
    originalBytes,
    uploadBytes,
    uploadBytesSaved: originalBytes - uploadBytes,
    uploadBytesSavedPercent: Math.round((1 - uploadBytes / originalBytes) * 100),
    pdfTrimMs: trimMs,
    note: 'API-Latenz dominiert End-to-End; Upload-Größe und serverseitiges Parsing skalieren mit PDF-Seitenzahl.',
  }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
