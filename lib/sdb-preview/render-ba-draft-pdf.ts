import type { PDFDocument, PDFFont, PDFImage, PDFPage, RGB } from 'pdf-lib';
import { BA_DRAFT_COMPLIANCE_LINE, BA_DRAFT_PDF_COPY } from '@/config/sdb-preview/ba-draft-lead-copy';
import type { BaDraftDocument, BaDraftSection } from '@/lib/sdb-preview/build-ba-draft-document';

/**
 * Rendert einen `BaDraftDocument` als A4-PDF (pdf-lib, Standard-Schriften, kein Server).
 *
 * Optik 1:1 wie das BA-PDF der App (`BetriebsanweisungDocument`, Standard-Design):
 * roter Rahmen, Kopf im 25/50/25-Raster, farbige Abschnittsbalken, Symbolspalte links,
 * Freigabe-Zeile und TRGS-555-Fußzeile. Passt der Inhalt auf eine Seite, wird – wie in der App –
 * die größte passende Grundschrift gewählt und die Abschnitte füllen die Seite.
 *
 * Bilder werden vorab als PNG-Bytes übergeben (`src` → Bytes), damit die Funktion ohne DOM testbar bleibt.
 */

export type BaDraftPdfInput = {
  document: BaDraftDocument;
  /** Register-URL für Gratis-Konto-Verweise im PDF (klickbar). */
  accountUrl: string;
  /** PNG-Bytes je Symbol-`src`; fehlende Symbole werden nur als Text gezeigt. */
  symbolImages?: ReadonlyMap<string, Uint8Array>;
  createdAt?: Date;
};

const copy = BA_DRAFT_PDF_COPY;

/* --- Design-Tokens der App (DEFAULT_BA_DESIGN_CONFIG + ba-pdf-layout.ts) -------------------- */

const COLORS = {
  primary: '#DC2626',
  onPrimary: '#FFFFFF',
  text: '#111827',
  mutedText: '#374151',
  footerText: '#475569',
  footerRule: '#cbd5e1',
  watermark: '#64748b',
} as const;

const MM_TO_PT = 72 / 25.4;
const PAGE = { width: 595.28, height: 841.89 } as const;
const PAGE_MARGIN = 10 * MM_TO_PT;
const COMPLIANCE_FOOTER_RESERVE = 22;
const FRAME_BORDER = 3;
const GRID_LINE = 1.25;
const CELL_PADDING = 4;
const SYMBOLS_PER_ROW = 2;
const SYMBOL_GAP = 4;
const LINE_HEIGHT = 1.22;
const COMPLIANCE_FONT_SIZE = 5.5;
/** Grundschrift-Kandidaten (Design „normal“: 12 → 9 pt in 0,5er-Schritten). */
const BODY_FONT_CANDIDATES = [12, 11.5, 11, 10.5, 10, 9.5, 9] as const;

/** Abgeleitete Maße je Grundschrift – identisch zu `buildBaPdfLayout` der App. */
function buildLayout(bodyFontSize: number) {
  const symbolSize = Math.round(bodyFontSize * 4);
  return {
    bodyFontSize,
    blockGap: Math.round(bodyFontSize * 0.3 * 10) / 10,
    titleFontSize: bodyFontSize + 5,
    sectionTitleFontSize: bodyFontSize + 1.5,
    substanceNameFontSize: Math.min(bodyFontSize * 1.8, 26),
    metaFontSize: Math.max(bodyFontSize - 1.5, 8),
    symbolSize,
    iconColumnWidth: SYMBOLS_PER_ROW * symbolSize + (SYMBOLS_PER_ROW - 1) * SYMBOL_GAP + 2 * CELL_PADDING + 2,
    headerImageSize: Math.round(bodyFontSize * 4.2),
    signatureHeight: Math.round(bodyFontSize * 3),
  };
}

type Layout = ReturnType<typeof buildLayout>;

/** Innenfläche des Rahmens (zwischen den 3-pt-Rahmenlinien). */
const FRAME = {
  left: PAGE_MARGIN,
  right: PAGE.width - PAGE_MARGIN,
  top: PAGE.height - PAGE_MARGIN,
  bottom: PAGE_MARGIN + COMPLIANCE_FOOTER_RESERVE,
} as const;
const INNER_LEFT = FRAME.left + FRAME_BORDER;
const INNER_WIDTH = FRAME.right - FRAME.left - FRAME_BORDER * 2;
const AVAILABLE_HEIGHT = FRAME.top - FRAME.bottom - FRAME_BORDER * 2;

/* --- Text-Hilfen -------------------------------------------------------------------------- */

type PdfLib = typeof import('pdf-lib');

function hexToRgb(lib: PdfLib, hex: string): RGB {
  const value = Number.parseInt(hex.slice(1), 16);
  return lib.rgb(((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255);
}

const CHAR_REPLACEMENTS: Record<string, string> = {
  '≤': '<=',
  '≥': '>=',
  '→': '->',
  ' ': ' ',
  ' ': ' ',
  ' ': ' ',
  '‑': '-',
  '−': '-',
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

/** Gemessener, positionierbarer Inhalt (Höhe vorab bekannt, Zeichnen relativ zur Oberkante). */
type Box = {
  height: number;
  draw: (page: PDFPage, x: number, top: number, width: number) => void;
};

type TextStyle = {
  font: PDFFont;
  size: number;
  color: string;
  align?: 'left' | 'center';
  lineHeight?: number;
  /** Klickbarer Bereich über dem gesamten Textblock. */
  linkUrl?: string;
};

type Canvas = {
  color: (hex: string) => RGB;
  sanitize: (text: string) => string;
  addLink: (page: PDFPage, rect: [number, number, number, number], url: string) => void;
};

function stackBoxes(boxes: Box[], gap: number): Box {
  const visible = boxes.filter((box) => box.height > 0);
  return {
    height: visible.reduce((sum, box) => sum + box.height, 0) + Math.max(visible.length - 1, 0) * gap,
    draw: (page, x, top, width) => {
      let y = top;
      for (const box of visible) {
        box.draw(page, x, y, width);
        y -= box.height + gap;
      }
    },
  };
}

function centeredIn(box: Box, height: number): (page: PDFPage, x: number, top: number, width: number) => void {
  return (page, x, top, width) => box.draw(page, x, top - Math.max(height - box.height, 0) / 2, width);
}

/* --- Renderer ----------------------------------------------------------------------------- */

type Row = {
  minHeight: number;
  /** Wächst bei Ein-Seiten-Layout mit (wie `flexGrow: 1` der App-Abschnitte). */
  grows: boolean;
  draw: (page: PDFPage, top: number, height: number) => void;
};

type Fonts = { regular: PDFFont; bold: PDFFont; italic: PDFFont };

function createRowBuilder(
  canvas: Canvas,
  fonts: Fonts,
  images: ReadonlyMap<string, PDFImage>,
  input: { draft: BaDraftDocument; accountUrl: string; createdAt: Date },
) {
  const { color, sanitize, addLink } = canvas;

  const text = (value: string, style: TextStyle, width: number): Box => {
    const lineHeight = style.size * (style.lineHeight ?? LINE_HEIGHT);
    const lines = wrapText(sanitize(value), style.font, style.size, width);
    return {
      height: lines.length * lineHeight,
      draw: (page, x, top, boxWidth) => {
        lines.forEach((line, index) => {
          const lineWidth = style.font.widthOfTextAtSize(line, style.size);
          const lineX = style.align === 'center' ? x + (boxWidth - lineWidth) / 2 : x;
          const baseline = top - index * lineHeight - (lineHeight - style.size) / 2 - style.size * 0.8;
          page.drawText(line, { x: lineX, y: baseline, size: style.size, font: style.font, color: color(style.color) });
        });
        if (style.linkUrl) addLink(page, [x, top - lines.length * lineHeight, x + boxWidth, top], style.linkUrl);
      },
    };
  };

  /** „Label: Wert“ in einer Zeile, Label fett (MetaLine der App). */
  const labeled = (label: string, value: string, size: number): Box => {
    const labelText = sanitize(`${label}: `);
    const valueText = sanitize(value || copy.emptyValue);
    const lineHeight = size * LINE_HEIGHT;
    return {
      height: lineHeight,
      draw: (page, x, top) => {
        const baseline = top - (lineHeight - size) / 2 - size * 0.8;
        page.drawText(labelText, { x, y: baseline, size, font: fonts.bold, color: color(COLORS.text) });
        page.drawText(valueText, {
          x: x + fonts.bold.widthOfTextAtSize(labelText, size),
          y: baseline,
          size,
          font: fonts.regular,
          color: color(COLORS.text),
        });
      },
    };
  };

  const hLine = (page: PDFPage, y: number) =>
    page.drawLine({
      start: { x: INNER_LEFT, y },
      end: { x: INNER_LEFT + INNER_WIDTH, y },
      thickness: GRID_LINE,
      color: color(COLORS.primary),
    });

  const vLine = (page: PDFPage, x: number, top: number, bottom: number) =>
    page.drawLine({ start: { x, y: top }, end: { x, y: bottom }, thickness: GRID_LINE, color: color(COLORS.primary) });

  /** Drei Zellen 25/50/25 mit Trennlinien und Unterkante (Kopfzeilen der App). */
  const headerGridRow = (cells: [Box, Box, Box]): Row => {
    const widths = [INNER_WIDTH * 0.25, INNER_WIDTH * 0.5, INNER_WIDTH * 0.25];
    const contentHeight = Math.max(...cells.map((cell) => cell.height));
    const height = contentHeight + CELL_PADDING * 2 + GRID_LINE;
    return {
      minHeight: height,
      grows: false,
      draw: (page, top) => {
        let x = INNER_LEFT;
        cells.forEach((cell, index) => {
          cell.draw(page, x + CELL_PADDING, top - CELL_PADDING - (contentHeight - cell.height) / 2, widths[index] - CELL_PADDING * 2);
          x += widths[index];
        });
        vLine(page, INNER_LEFT + widths[0], top, top - height);
        vLine(page, INNER_LEFT + widths[0] + widths[1], top, top - height);
        hLine(page, top - height + GRID_LINE / 2);
      },
    };
  };

  /** Platzhalter für den Notfall-QR-Code (in der App rechts im Kopf). */
  const qrPlaceholder = (layout: Layout): Box => {
    const size = layout.headerImageSize;
    const label = copy.qrPlaceholder.map((line) => sanitize(line));
    // Größte Schrift (max. Meta-Größe), bei der jede Zeile mit Innenabstand in das Quadrat passt.
    const widestAtOnePt = Math.max(...label.map((line) => fonts.regular.widthOfTextAtSize(line, 1)));
    const fontSize = Math.min(layout.metaFontSize - 1, (size - 6) / widestAtOnePt);
    return {
      height: size,
      draw: (page, x, top, width) => {
        const boxX = x + (width - size) / 2;
        page.drawRectangle({
          x: boxX,
          y: top - size,
          width: size,
          height: size,
          borderColor: color(COLORS.watermark),
          borderWidth: 0.75,
          borderDashArray: [2, 2],
        });
        label.forEach((line, index) => {
          const lineWidth = fonts.regular.widthOfTextAtSize(line, fontSize);
          page.drawText(line, {
            x: boxX + (size - lineWidth) / 2,
            y: top - size / 2 - fontSize * 0.35 - (index - (label.length - 1) / 2) * fontSize * 1.25,
            size: fontSize,
            font: fonts.regular,
            color: color(COLORS.mutedText),
          });
        });
        addLink(page, [boxX, top - size, boxX + size, top], input.accountUrl);
      },
    };
  };

  const sectionTitle = (layout: Layout, title: string): Box => {
    const style: TextStyle = { font: fonts.bold, size: layout.sectionTitleFontSize, color: COLORS.onPrimary, align: 'center' };
    const label = text(title.toLocaleUpperCase('de-DE'), style, INNER_WIDTH - CELL_PADDING * 2);
    const height = label.height + 6;
    return {
      height,
      draw: (page, _x, top) => {
        page.drawRectangle({ x: INNER_LEFT, y: top - height, width: INNER_WIDTH, height, color: color(COLORS.primary) });
        label.draw(page, INNER_LEFT + CELL_PADDING, top - 3, INNER_WIDTH - CELL_PADDING * 2);
      },
    };
  };

  /** Abschnitt mit Titelbalken; Inhalt vertikal zentriert, Unterkante als Rasterlinie. */
  const sectionRow = (layout: Layout, title: string, body: { height: number; draw: (page: PDFPage, top: number, height: number) => void }): Row => {
    const titleBox = sectionTitle(layout, title);
    return {
      minHeight: titleBox.height + body.height + GRID_LINE,
      grows: true,
      draw: (page, top, height) => {
        titleBox.draw(page, INNER_LEFT, top, INNER_WIDTH);
        body.draw(page, top - titleBox.height, height - titleBox.height - GRID_LINE);
        hLine(page, top - height + GRID_LINE / 2);
      },
    };
  };

  const symbolColumn = (layout: Layout, section: BaDraftSection): Box => {
    const drawable = section.symbols.map((symbol) => images.get(symbol.src)).filter((image): image is PDFImage => Boolean(image));
    const rows: PDFImage[][] = [];
    for (let index = 0; index < drawable.length; index += SYMBOLS_PER_ROW) rows.push(drawable.slice(index, index + SYMBOLS_PER_ROW));
    const height = rows.length * layout.symbolSize + Math.max(rows.length - 1, 0) * SYMBOL_GAP;
    return {
      height,
      draw: (page, x, top, width) => {
        rows.forEach((row, rowIndex) => {
          const rowWidth = row.length * layout.symbolSize + (row.length - 1) * SYMBOL_GAP;
          row.forEach((image, index) => {
            page.drawImage(image, {
              x: x + (width - rowWidth) / 2 + index * (layout.symbolSize + SYMBOL_GAP),
              y: top - rowIndex * (layout.symbolSize + SYMBOL_GAP) - layout.symbolSize,
              width: layout.symbolSize,
              height: layout.symbolSize,
            });
          });
        });
      },
    };
  };

  const bullet = (layout: Layout, value: string, width: number): Box => {
    const markWidth = layout.bodyFontSize * 0.9;
    const style: TextStyle = { font: fonts.regular, size: layout.bodyFontSize, color: COLORS.text };
    const body = text(value, style, width - markWidth);
    const mark = text('•', style, markWidth);
    return {
      height: body.height,
      draw: (page, x, top, boxWidth) => {
        mark.draw(page, x, top, markWidth);
        body.draw(page, x + markWidth, top, boxWidth - markWidth);
      },
    };
  };

  const sectionTextBlocks = (layout: Layout, section: BaDraftSection, width: number): Box => {
    if (section.locked) {
      return stackBoxes(
        [
          text(copy.lockedSection, { font: fonts.italic, size: layout.bodyFontSize, color: COLORS.mutedText }, width),
          text(
            copy.lockedSectionCta,
            { font: fonts.bold, size: layout.bodyFontSize, color: COLORS.primary, linkUrl: input.accountUrl },
            width,
          ),
        ],
        layout.blockGap,
      );
    }
    return stackBoxes(
      [
        ...(section.emphasis ? [text(section.emphasis, { font: fonts.bold, size: layout.bodyFontSize, color: COLORS.text }, width)] : []),
        ...section.lines.map((line) => bullet(layout, line, width)),
      ],
      layout.blockGap,
    );
  };

  const gridSectionRow = (layout: Layout, section: BaDraftSection): Row => {
    const symbolWidth = layout.iconColumnWidth - CELL_PADDING * 2;
    const textWidth = INNER_WIDTH - layout.iconColumnWidth - CELL_PADDING * 2;
    const symbols = symbolColumn(layout, section);
    const blocks = sectionTextBlocks(layout, section, textWidth);
    const contentHeight = Math.max(symbols.height, blocks.height) + CELL_PADDING * 2;
    return sectionRow(layout, section.title, {
      height: contentHeight,
      draw: (page, top, height) => {
        const inner = height - CELL_PADDING * 2;
        centeredIn(symbols, inner)(page, INNER_LEFT + CELL_PADDING, top - CELL_PADDING, symbolWidth);
        centeredIn(blocks, inner)(page, INNER_LEFT + layout.iconColumnWidth + CELL_PADDING, top - CELL_PADDING, textWidth);
        vLine(page, INNER_LEFT + layout.iconColumnWidth, top, top - height);
      },
    });
  };

  /** Teilt Abschnitte, die höher als eine Seite wären, in mehrere Zeilen (Symbole/Signalwort nur im ersten Teil). */
  const gridSectionRows = (layout: Layout, section: BaDraftSection): Row[] => {
    const rows: Row[] = [];
    let rest = section;
    while (true) {
      const full = gridSectionRow(layout, rest);
      if (full.minHeight <= AVAILABLE_HEIGHT || rest.lines.length <= 1) return [...rows, full];
      let count = 1;
      while (count < rest.lines.length && gridSectionRow(layout, { ...rest, lines: rest.lines.slice(0, count + 1) }).minHeight <= AVAILABLE_HEIGHT) {
        count += 1;
      }
      rows.push(gridSectionRow(layout, { ...rest, lines: rest.lines.slice(0, count) }));
      rest = { ...rest, lines: rest.lines.slice(count), symbols: [], emphasis: undefined };
    }
  };

  const substanceRow = (layout: Layout): Row => {
    const width = INNER_WIDTH - CELL_PADDING * 2;
    const content = stackBoxes(
      [
        text(input.draft.productName, { font: fonts.bold, size: layout.substanceNameFontSize, color: COLORS.text, align: 'center', lineHeight: 1.15 }, width),
        ...input.draft.identificationDetails.map((line) =>
          text(line, { font: fonts.regular, size: layout.metaFontSize, color: COLORS.mutedText, align: 'center' }, width),
        ),
      ],
      2,
    );
    return sectionRow(layout, copy.sectionTitles.identification, {
      height: content.height + CELL_PADDING * 2,
      draw: (page, top, height) => centeredIn(content, height - CELL_PADDING * 2)(page, INNER_LEFT + CELL_PADDING, top - CELL_PADDING, width),
    });
  };

  const releaseRow = (layout: Layout): Row => {
    const cellWidth = INNER_WIDTH / 3;
    const size = layout.metaFontSize;
    const cell = (label: string, value: string | null, signature = false): Box =>
      stackBoxes(
        [
          text(label, { font: fonts.bold, size, color: COLORS.text }, cellWidth - CELL_PADDING * 2),
          ...(value !== null ? [text(value, { font: fonts.regular, size, color: COLORS.text }, cellWidth - CELL_PADDING * 2)] : []),
          ...(signature
            ? [
                { height: layout.signatureHeight, draw: () => undefined },
                text(copy.release.signatory, { font: fonts.regular, size, color: COLORS.text }, cellWidth - CELL_PADDING * 2),
              ]
            : []),
        ],
        0,
      );
    const cells = [cell(copy.release.date, copy.emptyValue), cell(copy.release.nextReview, copy.emptyValue), cell(copy.release.signature, null, true)];
    const height = Math.max(...cells.map((box) => box.height)) + CELL_PADDING * 2;
    return {
      minHeight: height,
      grows: false,
      draw: (page, top) => {
        cells.forEach((box, index) => box.draw(page, INNER_LEFT + index * cellWidth + CELL_PADDING, top - CELL_PADDING, cellWidth - CELL_PADDING * 2));
        vLine(page, INNER_LEFT + cellWidth, top, top - height);
        vLine(page, INNER_LEFT + cellWidth * 2, top, top - height);
      },
    };
  };

  return function buildRows(bodyFontSize: number): Row[] {
    const layout = buildLayout(bodyFontSize);
    const centerWidth = INNER_WIDTH * 0.5 - CELL_PADDING * 2;
    const titleBlock = stackBoxes(
      [
        text(copy.documentTitle, { font: fonts.bold, size: layout.titleFontSize, color: COLORS.text, align: 'center', lineHeight: 1.15 }, centerWidth),
        text(copy.legalBasis, { font: fonts.regular, size: layout.bodyFontSize, color: COLORS.text, align: 'center' }, centerWidth),
        text(copy.draftLabel, { font: fonts.regular, size: layout.metaFontSize, color: COLORS.mutedText, align: 'center' }, centerWidth),
      ],
      0,
    );
    // Logo-Zelle bleibt leer wie in der App ohne hinterlegtes Firmenlogo.
    const emptyLogoCell: Box = { height: layout.headerImageSize, draw: () => undefined };

    return [
      headerGridRow([emptyLogoCell, titleBlock, qrPlaceholder(layout)]),
      headerGridRow([
        labeled(copy.meta.responsible, '', layout.metaFontSize),
        labeled(copy.meta.area, '', layout.metaFontSize),
        labeled(copy.meta.revision, input.createdAt.toLocaleDateString('de-DE'), layout.metaFontSize),
      ]),
      substanceRow(layout),
      ...input.draft.sections.flatMap((section) => gridSectionRows(layout, section)),
      releaseRow(layout),
    ];
  };
}

/** Größte Grundschrift, bei der alles auf eine Seite passt; sonst Mindestschrift mit Seitenumbruch. */
function fitRows(buildRows: (bodyFontSize: number) => Row[]): { rows: Row[]; onePage: boolean } {
  for (const size of BODY_FONT_CANDIDATES) {
    const rows = buildRows(size);
    if (rows.reduce((sum, row) => sum + row.minHeight, 0) <= AVAILABLE_HEIGHT) return { rows, onePage: true };
  }
  return { rows: buildRows(BODY_FONT_CANDIDATES[BODY_FONT_CANDIDATES.length - 1]), onePage: false };
}

/** Zeilen auf Seiten verteilen; jede Seite bekommt Rahmen, Wasserzeichen und Fußzeile. */
function paginate(rows: Row[], onePage: boolean): Array<Array<{ row: Row; height: number }>> {
  if (onePage) {
    const growing = rows.filter((row) => row.grows).length;
    const extra = AVAILABLE_HEIGHT - rows.reduce((sum, row) => sum + row.minHeight, 0);
    return [rows.map((row) => ({ row, height: row.minHeight + (row.grows && growing > 0 ? extra / growing : 0) }))];
  }
  const pages: Array<Array<{ row: Row; height: number }>> = [[]];
  let used = 0;
  for (const row of rows) {
    if (used + row.minHeight > AVAILABLE_HEIGHT && pages[pages.length - 1].length > 0) {
      pages.push([]);
      used = 0;
    }
    pages[pages.length - 1].push({ row, height: row.minHeight });
    used += row.minHeight;
  }
  return pages;
}

export async function renderBaDraftPdf({
  document: draft,
  accountUrl,
  symbolImages = new Map(),
  createdAt = new Date(),
}: BaDraftPdfInput): Promise<Uint8Array> {
  const lib: PdfLib = await import('pdf-lib');
  const { PDFDocument, StandardFonts, PDFString, degrees } = lib;

  const pdf: PDFDocument = await PDFDocument.create();
  pdf.setTitle(`${copy.documentTitle} - ${draft.productName}`);
  pdf.setSubject(BA_DRAFT_COMPLIANCE_LINE);
  pdf.setProducer('gefahrstoff-qr.de');
  pdf.setCreator('gefahrstoff-qr.de');

  const fonts: Fonts = {
    regular: await pdf.embedFont(StandardFonts.Helvetica),
    bold: await pdf.embedFont(StandardFonts.HelveticaBold),
    italic: await pdf.embedFont(StandardFonts.HelveticaOblique),
  };

  const images = new Map<string, PDFImage>();
  for (const [src, bytes] of symbolImages) {
    try {
      images.set(src, await pdf.embedPng(bytes));
    } catch {
      // Defektes Bild: Symbolspalte bleibt leer, Text bleibt erhalten.
    }
  }

  const canvas: Canvas = {
    color: (hex) => hexToRgb(lib, hex),
    sanitize: createTextSanitizer(fonts.regular),
    addLink: (page, [x1, y1, x2, y2], url) => {
      const annotation = pdf.context.register(
        pdf.context.obj({
          Type: 'Annot',
          Subtype: 'Link',
          Rect: [x1, y1, x2, y2],
          Border: [0, 0, 0],
          A: { Type: 'Action', S: 'URI', URI: PDFString.of(url) },
        }),
      );
      page.node.addAnnot(annotation);
    },
  };
  const { color, sanitize } = canvas;

  const buildRows = createRowBuilder(canvas, fonts, images, { draft, accountUrl, createdAt });
  const { rows, onePage } = fitRows(buildRows);
  const pages = paginate(rows, onePage);

  const disclaimerLines = wrapText(sanitize(BA_DRAFT_COMPLIANCE_LINE), fonts.regular, COMPLIANCE_FONT_SIZE, PAGE.width - 20);
  const watermarkSize = 52;
  const watermarkWidth = fonts.bold.widthOfTextAtSize(copy.watermark, watermarkSize);
  const watermarkAngle = (32 * Math.PI) / 180;

  pages.forEach((pageRows, pageIndex) => {
    const page = pdf.addPage([PAGE.width, PAGE.height]);

    // Wasserzeichen wie die Website-Demo der App (diagonal, halbtransparent).
    page.drawText(copy.watermark, {
      x: PAGE.width / 2 - (Math.cos(watermarkAngle) * watermarkWidth) / 2,
      y: PAGE.height / 2 - (Math.sin(watermarkAngle) * watermarkWidth) / 2,
      size: watermarkSize,
      font: fonts.bold,
      color: color(COLORS.watermark),
      rotate: degrees(32),
      opacity: 0.28,
    });

    let top = FRAME.top - FRAME_BORDER;
    for (const { row, height } of pageRows) {
      row.draw(page, top, height);
      top -= height;
    }

    // Rahmen um den belegten Bereich (Rahmenlinie liegt komplett innerhalb des Seitenrands).
    const frameBottom = top - FRAME_BORDER;
    page.drawRectangle({
      x: FRAME.left + FRAME_BORDER / 2,
      y: frameBottom + FRAME_BORDER / 2,
      width: FRAME.right - FRAME.left - FRAME_BORDER,
      height: FRAME.top - frameBottom - FRAME_BORDER,
      borderColor: color(COLORS.primary),
      borderWidth: FRAME_BORDER,
    });

    // TRGS-555-Fußzeile (BaTrgs555PdfFooter der App) + Erstellungsdatum/Seitenzahl.
    const footerLineHeight = COMPLIANCE_FONT_SIZE * 1.15;
    const footerLines = [
      ...disclaimerLines,
      `${copy.release.line}   ·   ${sanitize(copy.createdOn(createdAt.toLocaleDateString('de-DE')))}   ·   ${copy.pageLabel(pageIndex + 1, pages.length)}`,
    ];
    const footerTop = 4 + footerLines.length * footerLineHeight + 4;
    page.drawLine({
      start: { x: 10, y: footerTop },
      end: { x: PAGE.width - 10, y: footerTop },
      thickness: 0.5,
      color: color(COLORS.footerRule),
    });
    footerLines.forEach((line, index) => {
      page.drawText(sanitize(line), {
        x: 10,
        y: footerTop - 4 - (index + 1) * footerLineHeight + COMPLIANCE_FONT_SIZE * 0.2,
        size: COMPLIANCE_FONT_SIZE,
        font: fonts.regular,
        color: color(COLORS.footerText),
      });
    });
  });

  return pdf.save();
}
