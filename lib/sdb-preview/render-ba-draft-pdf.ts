import type { PDFDocument, PDFFont, PDFImage, PDFPage, RGB } from 'pdf-lib';
import { BA_DRAFT_COMPLIANCE_LINE, BA_DRAFT_PDF_COPY } from '@/config/sdb-preview/ba-draft-lead-copy';
import type { BaDraftDocument, BaDraftSection } from '@/lib/sdb-preview/build-ba-draft-document';

/**
 * Rendert einen `BaDraftDocument` als A4-PDF (pdf-lib, Standard-Schriften, kein Server).
 * Bilder werden vorab als PNG-Bytes übergeben (`src` → Bytes), damit die Funktion ohne DOM testbar bleibt.
 */

export type BaDraftPdfInput = {
  document: BaDraftDocument;
  /** Register-URL für die Gratis-Konto-Box (klickbar). */
  accountUrl: string;
  /** PNG-Bytes je Symbol-`src`; fehlende Symbole werden nur als Text gezeigt. */
  symbolImages?: ReadonlyMap<string, Uint8Array>;
  createdAt?: Date;
};

const PAGE = { width: 595.28, height: 841.89, margin: 42, footerHeight: 46 } as const;
const SYMBOL_SIZE = 40;
const BODY_SIZE = 9.5;
const LINE_GAP = 3.5;

/** Hausfarben (tailwind `gqr`-Palette). */
const HEX = {
  navy: '#0a1628',
  accent: '#ff6b35',
  trust: '#2dd4bf',
  text: '#1e293b',
  muted: '#64748b',
  lockedBg: '#f1f5f9',
  watermark: '#e2e8f0',
} as const;

type PdfLib = typeof import('pdf-lib');

function hexToRgb(lib: PdfLib, hex: string): RGB {
  const value = Number.parseInt(hex.slice(1), 16);
  return lib.rgb(((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255);
}

const CHAR_REPLACEMENTS: Record<string, string> = {
  '\u2264': '<=',
  '\u2265': '>=',
  '\u2192': '->',
  '\u00a0': ' ',
  '\u2009': ' ',
  '\u202f': ' ',
  '\u2011': '-',
  '\u2212': '-',
};

/** Standard-Schriften kennen nur WinAnsi — unbekannte Zeichen werden ersetzt statt den Export abzubrechen. */
function createTextSanitizer(font: PDFFont): (text: string) => string {
  const supported = new Map<string, boolean>();
  const isSupported = (char: string): boolean => {
    const cached = supported.get(char);
    if (cached !== undefined) return cached;
    let ok = true;
    try {
      font.encodeText(char);
    } catch {
      ok = false;
    }
    supported.set(char, ok);
    return ok;
  };
  return (text) =>
    Array.from(text.replace(/[\r\t]/g, ' '))
      .map((char) => {
        const replaced = CHAR_REPLACEMENTS[char] ?? char;
        return Array.from(replaced).every(isSupported) ? replaced : '?';
      })
      .join('');
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split('\n')) {
    let current = '';
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const candidate = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        current = candidate;
        continue;
      }
      if (current) lines.push(current);
      current = word;
      // Überlange Einzelwörter (z. B. URLs) hart umbrechen.
      while (font.widthOfTextAtSize(current, size) > maxWidth && current.length > 1) {
        let cut = current.length - 1;
        while (cut > 1 && font.widthOfTextAtSize(current.slice(0, cut), size) > maxWidth) cut -= 1;
        lines.push(current.slice(0, cut));
        current = current.slice(cut);
      }
    }
    lines.push(current);
  }
  return lines;
}

/** Fortlaufender Layout-Cursor mit automatischem Seitenumbruch. */
class PdfFlow {
  page!: PDFPage;
  y = 0;
  readonly contentWidth = PAGE.width - PAGE.margin * 2;
  readonly pages: PDFPage[] = [];

  constructor(
    private readonly pdf: PDFDocument,
    private readonly onNewPage: (page: PDFPage) => void,
  ) {
    this.addPage();
  }

  addPage(): void {
    this.page = this.pdf.addPage([PAGE.width, PAGE.height]);
    this.pages.push(this.page);
    this.y = PAGE.height - PAGE.margin;
    this.onNewPage(this.page);
  }

  ensureSpace(height: number): void {
    if (this.y - height < PAGE.margin + PAGE.footerHeight) this.addPage();
  }
}

export async function renderBaDraftPdf({
  document: draft,
  accountUrl,
  symbolImages = new Map(),
  createdAt = new Date(),
}: BaDraftPdfInput): Promise<Uint8Array> {
  const lib: PdfLib = await import('pdf-lib');
  const { PDFDocument, StandardFonts, PDFString, degrees } = lib;
  const color = (hex: string) => hexToRgb(lib, hex);
  const copy = BA_DRAFT_PDF_COPY;

  const pdf = await PDFDocument.create();
  pdf.setTitle(`${copy.documentTitle} – ${draft.productName}`);
  pdf.setSubject(BA_DRAFT_COMPLIANCE_LINE);
  pdf.setProducer('gefahrstoff-qr.de');
  pdf.setCreator('gefahrstoff-qr.de');

  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const sanitize = createTextSanitizer(regular);

  const images = new Map<string, PDFImage>();
  for (const [src, bytes] of symbolImages) {
    try {
      images.set(src, await pdf.embedPng(bytes));
    } catch {
      // Defektes Bild: Symbol bleibt als Textzeile erhalten.
    }
  }

  const flow = new PdfFlow(pdf, (page) => {
    page.drawText(copy.watermark, {
      x: 120,
      y: 260,
      size: 110,
      font: bold,
      color: color(HEX.watermark),
      rotate: degrees(40),
      opacity: 0.55,
    });
  });

  const drawLines = (lines: string[], font: PDFFont, size: number, textColor: string, indent = 0) => {
    for (const line of lines) {
      flow.ensureSpace(size + LINE_GAP);
      flow.y -= size;
      flow.page.drawText(line, { x: PAGE.margin + indent, y: flow.y, size, font, color: color(textColor) });
      flow.y -= LINE_GAP;
    }
  };

  const drawParagraph = (text: string, font: PDFFont, size: number, textColor: string, indent = 0) =>
    drawLines(wrapText(sanitize(text), font, size, flow.contentWidth - indent * 2), font, size, textColor, indent);

  // Kopf
  const headerHeight = 58;
  flow.page.drawRectangle({
    x: PAGE.margin,
    y: flow.y - headerHeight,
    width: flow.contentWidth,
    height: headerHeight,
    color: color(HEX.navy),
  });
  flow.page.drawText(copy.documentTitle, {
    x: PAGE.margin + 14,
    y: flow.y - 26,
    size: 18,
    font: bold,
    color: color('#ffffff'),
  });
  flow.page.drawText(sanitize(copy.documentSubtitle), {
    x: PAGE.margin + 14,
    y: flow.y - 44,
    size: 9,
    font: regular,
    color: color(HEX.trust),
  });
  flow.y -= headerHeight + 14;

  drawParagraph(draft.productName, bold, 15, HEX.text);
  if (draft.manufacturer) drawParagraph(draft.manufacturer, regular, 9.5, HEX.muted);
  flow.y -= 8;

  const drawSymbols = (section: BaDraftSection) => {
    const drawable = section.symbols.filter((symbol) => images.has(symbol.src));
    if (drawable.length === 0) return;
    flow.ensureSpace(SYMBOL_SIZE + 8);
    flow.y -= SYMBOL_SIZE + 4;
    drawable.forEach((symbol, index) => {
      flow.page.drawImage(images.get(symbol.src)!, {
        x: PAGE.margin + 10 + index * (SYMBOL_SIZE + 8),
        y: flow.y,
        width: SYMBOL_SIZE,
        height: SYMBOL_SIZE,
      });
    });
    flow.y -= 6;
  };

  for (const section of draft.sections) {
    const barHeight = 20;
    flow.ensureSpace(barHeight + (section.locked ? 5 : 40));
    flow.page.drawRectangle({
      x: PAGE.margin,
      y: flow.y - barHeight,
      width: flow.contentWidth,
      height: barHeight,
      color: color(section.locked ? HEX.muted : HEX.accent),
    });
    flow.page.drawText(sanitize(section.title), {
      x: PAGE.margin + 10,
      y: flow.y - 14,
      size: 10.5,
      font: bold,
      color: color('#ffffff'),
    });
    if (section.locked) {
      // Kompakte Sperr-Zeile direkt im Balken, damit die Gratis-Konto-Box auf Seite 1 bleibt.
      const note = sanitize(copy.lockedSectionBadge);
      flow.page.drawText(note, {
        x: PAGE.margin + flow.contentWidth - 10 - regular.widthOfTextAtSize(note, 8.5),
        y: flow.y - 14,
        size: 8.5,
        font: regular,
        color: color('#ffffff'),
      });
      flow.y -= barHeight + 5;
      continue;
    }
    flow.y -= barHeight + 6;

    drawSymbols(section);
    if (section.emphasis) drawParagraph(section.emphasis, bold, 10.5, '#dc2626', 10);
    for (const line of section.lines) drawParagraph(line, regular, BODY_SIZE, HEX.text, 10);
    flow.y -= 10;
  }

  // Gratis-Konto-Box mit klickbarem Link
  const linkLabel = copy.accountBoxLinkLabel;
  const bodyLines = wrapText(sanitize(copy.accountBoxBody), regular, BODY_SIZE, flow.contentWidth - 28);
  const urlLines = wrapText(sanitize(accountUrl), regular, 8, flow.contentWidth - 28 - bold.widthOfTextAtSize(linkLabel, 9));
  const boxHeight = 30 + bodyLines.length * (BODY_SIZE + LINE_GAP) + 10 + urlLines.length * 11 + 10;
  flow.ensureSpace(boxHeight + 6);
  const boxTop = flow.y;
  flow.page.drawRectangle({
    x: PAGE.margin,
    y: boxTop - boxHeight,
    width: flow.contentWidth,
    height: boxHeight,
    borderColor: color(HEX.trust),
    borderWidth: 1.5,
    color: color('#f0fdfa'),
  });
  flow.y -= 8;
  drawParagraph(copy.accountBoxTitle, bold, 12, HEX.navy, 14);
  flow.y -= 2;
  drawLines(bodyLines, regular, BODY_SIZE, HEX.text, 14);
  flow.y -= 6;
  const linkTop = flow.y;
  flow.page.drawText(linkLabel, { x: PAGE.margin + 14, y: flow.y - 9, size: 9, font: bold, color: color(HEX.navy) });
  const urlX = PAGE.margin + 14 + bold.widthOfTextAtSize(linkLabel, 9);
  urlLines.forEach((line, index) => {
    flow.page.drawText(line, { x: urlX, y: flow.y - 9 - index * 11, size: 8, font: regular, color: color('#0f766e') });
  });
  const linkBottom = flow.y - 9 - (urlLines.length - 1) * 11 - 3;
  const linkAnnotation = pdf.context.register(
    pdf.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: [PAGE.margin + 10, linkBottom, PAGE.margin + flow.contentWidth - 10, linkTop + 2],
      Border: [0, 0, 0],
      A: { Type: 'Action', S: 'URI', URI: PDFString.of(accountUrl) },
    }),
  );
  flow.page.node.addAnnot(linkAnnotation);
  flow.y = boxTop - boxHeight;

  // Fußzeile auf allen Seiten
  const createdLine = copy.createdOn(createdAt.toLocaleDateString('de-DE'));
  const footerLines = wrapText(sanitize(BA_DRAFT_COMPLIANCE_LINE), regular, 7.5, flow.contentWidth);
  flow.pages.forEach((page, index) => {
    page.drawLine({
      start: { x: PAGE.margin, y: PAGE.margin + 34 },
      end: { x: PAGE.width - PAGE.margin, y: PAGE.margin + 34 },
      thickness: 0.5,
      color: color(HEX.muted),
    });
    footerLines.forEach((line, lineIndex) => {
      page.drawText(line, {
        x: PAGE.margin,
        y: PAGE.margin + 24 - lineIndex * 9,
        size: 7.5,
        font: lineIndex === 0 ? bold : regular,
        color: color(HEX.text),
      });
    });
    const pageLabel = `${sanitize(createdLine)} · Seite ${index + 1}/${flow.pages.length}`;
    page.drawText(pageLabel, {
      x: PAGE.margin,
      y: PAGE.margin + 24 - footerLines.length * 9,
      size: 7,
      font: regular,
      color: color(HEX.muted),
    });
  });

  return pdf.save();
}
