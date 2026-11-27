import { BA_DRAFT_PDF_COPY } from '@/config/sdb-preview/ba-draft-lead-copy';
import { PROTECTIVE_EQUIPMENT_SIGNS } from '@/config/betriebsanweisung/ba-document-symbols';
import { GHS_ASSETS, normalizeGhsCode } from '@/lib/ghs/ghs-assets';
import type { GhsPictogramCode } from '@/lib/ghs/ghs-types';
import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';
import { resolveStorageClassLabel } from '@/lib/sdb-preview/build-result-insight-badges';

/**
 * Reines Datenmodell des BA-Entwurfs (Download-PDF), unabhängig vom Rendering.
 * Enthält nur, was die öffentliche Vorschau ohnehin liefert; Abschnitte 4–6 bleiben dem Gratis-Konto vorbehalten.
 * Gliederung wie das BA-PDF der App: „Gefahrstoffbezeichnung“ (eigenes Layout) + fünf Raster-Abschnitte.
 */

export type BaDraftSymbol = { src: string; label: string };

export type BaDraftSection = {
  title: string;
  /** Aufzählungspunkte im Textfeld rechts. */
  lines: string[];
  /** Hervorgehobene Zeile vor den Aufzählungspunkten (Signalwort, wie in der App). */
  emphasis?: string;
  /** Symbolspalte links (GHS-Piktogramme, Gebotszeichen). */
  symbols: BaDraftSymbol[];
  /** `true` = Platzhalter, Inhalt erst im Gratis-Konto. */
  locked: boolean;
};

export type BaDraftDocument = {
  productName: string;
  manufacturer: string;
  /** Kleingedruckte Angaben unter dem Stoffnamen (Hersteller, CAS, Lagerklasse). */
  identificationDetails: string[];
  /** Abschnitte 2–6 im Symbol/Text-Raster. */
  sections: BaDraftSection[];
  fileName: string;
};

const copy = BA_DRAFT_PDF_COPY;

function ghsSymbols(codes: readonly string[]): BaDraftSymbol[] {
  const unique = new Set<GhsPictogramCode>();
  for (const raw of codes) {
    const code = normalizeGhsCode(raw);
    if (code) unique.add(code);
  }
  return [...unique].map((code) => ({ src: GHS_ASSETS[code].src, label: `${code} ${GHS_ASSETS[code].label}` }));
}

function remainingCount(total: number | null | undefined, shown: number): number {
  return typeof total === 'number' && total > shown ? total - shown : 0;
}

function lockedSection(title: string): BaDraftSection {
  return { title, lines: [copy.lockedSection], symbols: [], locked: true };
}

function slugifyFileName(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

export function buildBaDraftDocument(teaser: SdbPreviewTeaser): BaDraftDocument {
  const productName = teaser.tradeName.trim() || 'Gefahrstoff';
  const manufacturer = teaser.manufacturer.trim();

  const identificationDetails = [
    manufacturer ? `${copy.manufacturerPrefix}${manufacturer}` : null,
    teaser.casNumber ? `${copy.casPrefix}${teaser.casNumber}` : null,
    resolveStorageClassLabel(teaser),
  ].filter((line): line is string => Boolean(line));

  const hazardLines = teaser.hazardStatements.length > 0 ? [...teaser.hazardStatements] : [copy.noHazardStatements];
  const moreHazards = remainingCount(teaser.statementCounts?.hazard, teaser.hazardStatements.length);
  if (moreHazards > 0) hazardLines.push(copy.moreStatements(moreHazards, 'H'));

  const precautionary = teaser.precautionaryStatements ?? [];
  const protectiveSymbols = (teaser.protectiveEquipment ?? []).map((id) => PROTECTIVE_EQUIPMENT_SIGNS[id]);
  const morePrecautionary = remainingCount(teaser.statementCounts?.precautionary, precautionary.length);
  const protectiveLines = [
    ...protectiveSymbols.map((symbol) => symbol.label),
    ...precautionary,
    ...(morePrecautionary > 0 ? [copy.moreStatements(morePrecautionary, 'P')] : []),
  ];

  return {
    productName,
    manufacturer,
    identificationDetails,
    fileName: copy.fileName(slugifyFileName(productName)),
    sections: [
      {
        title: copy.sectionTitles.hazards,
        emphasis: teaser.signalWord?.trim() || undefined,
        lines: hazardLines,
        symbols: ghsSymbols(teaser.ghsPictograms),
        locked: false,
      },
      protectiveLines.length > 0
        ? { title: copy.sectionTitles.protectiveMeasures, lines: protectiveLines, symbols: protectiveSymbols, locked: false }
        : lockedSection(copy.sectionTitles.protectiveMeasures),
      lockedSection(copy.sectionTitles.emergency),
      lockedSection(copy.sectionTitles.firstAid),
      lockedSection(copy.sectionTitles.disposal),
    ],
  };
}
