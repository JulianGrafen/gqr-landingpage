'use client';

import { LockKeyhole } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  BaSheetFrame,
  BaSheetHeader,
  BaSheetIdentification,
  BaSheetLockedTail,
  BaSheetSection,
  BaSheetSymbolTextRow,
  formatBaIssueDate,
} from '@/components/betriebsanweisung/ba-document-sheet';
import { PROTECTIVE_EQUIPMENT_SIGNS, type BaDocumentSymbol } from '@/config/betriebsanweisung/ba-document-symbols';
import { LIVE_PREVIEW_COPY as copy } from '@/config/betriebsanweisung/live-preview-copy';
import { GHS_ASSETS, normalizeGhsCode } from '@/lib/ghs/ghs-assets';
import type { GhsPictogramCode } from '@/lib/ghs/ghs-types';
import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';

type Props = {
  teaser: SdbPreviewTeaser;
  /** Einsatzbereich aus der Seiten-Config (nicht aus dem SDB). */
  applicationArea: string;
  isDemo: boolean;
  /** Overlay-CTA (pSEO: `BaUnlockCta`, Hero: kontextfreie Register-CTA). */
  unlockCta: ReactNode;
};

function BulletList({ items, footer }: { items: readonly string[]; footer?: string }) {
  return (
    <ul className="m-0 list-none space-y-0.5 p-0">
      {items.map((item) => (
        <li key={item} className="m-0 flex gap-1.5">
          <span aria-hidden="true">•</span>
          <span>{item}</span>
        </li>
      ))}
      {footer ? <li className="m-0 pl-3 text-[11px] font-semibold text-slate-500">{footer}</li> : null}
    </ul>
  );
}

function toGhsSymbols(raw: readonly string[]): BaDocumentSymbol[] {
  return raw
    .map(normalizeGhsCode)
    .filter((code): code is GhsPictogramCode => code !== null)
    .map((code) => ({ src: GHS_ASSETS[code].src, label: `${code} ${GHS_ASSETS[code].label}` }));
}

/**
 * Große DIN-A4-Vorschau aus der KI-Extraktion im Layout des gqr-backend-PDFs („Smart Unblur“):
 * Kopf, Gefahrstoffbezeichnung, Gefahren, Schutzmaßnahmen scharf; Gefahrfall, Erste Hilfe,
 * Entsorgung und Freigabe mit sichtbarer Struktur, aber verdeckten Werten + Freischalt-Card.
 */
export function BaLiveExtractedDocument({ teaser, applicationArea, isDemo, unlockCta }: Props) {
  const ghsSymbols = toGhsSymbols(teaser.ghsPictograms);
  const protectiveSigns = (teaser.protectiveEquipment ?? [])
    .map((id) => PROTECTIVE_EQUIPMENT_SIGNS[id])
    .filter((sign): sign is BaDocumentSymbol => Boolean(sign));
  const precautionary = teaser.precautionaryStatements ?? [];
  const counts = teaser.statementCounts;
  const remainingHazard = Math.max(0, (counts?.hazard ?? 0) - teaser.hazardStatements.length);
  const remainingPrecautionary = Math.max(0, (counts?.precautionary ?? 0) - precautionary.length);
  const overlayTitle = isDemo ? copy.lockedOverlay.demoTitle : copy.lockedOverlay.uploadTitle;

  return (
    <BaSheetFrame>
      <BaSheetHeader manufacturer={teaser.manufacturer} applicationArea={applicationArea} issuedOn={formatBaIssueDate()} />
      <BaSheetIdentification tradeName={teaser.tradeName} casNumber={teaser.casNumber} />

      <BaSheetSection title={copy.sectionTitles.hazards}>
        <BaSheetSymbolTextRow symbols={ghsSymbols}>
          {teaser.signalWord ? <p className="m-0 mb-0.5 font-bold">{teaser.signalWord}</p> : null}
          {teaser.hazardStatements.length > 0 ? (
            <BulletList
              items={teaser.hazardStatements}
              footer={remainingHazard > 0 ? copy.moreStatementsSuffix(remainingHazard) : undefined}
            />
          ) : (
            <p className="m-0 text-slate-600">{copy.noHazardStatements}</p>
          )}
        </BaSheetSymbolTextRow>
      </BaSheetSection>

      <BaSheetSection title={copy.sectionTitles.protection}>
        <BaSheetSymbolTextRow symbols={protectiveSigns}>
          {precautionary.length > 0 ? (
            <BulletList
              items={precautionary}
              footer={remainingPrecautionary > 0 ? copy.moreStatementsSuffix(remainingPrecautionary) : undefined}
            />
          ) : (
            <p className="m-0 text-slate-600">{copy.noPrecautionaryStatements}</p>
          )}
        </BaSheetSymbolTextRow>
      </BaSheetSection>

      {/* Gesperrter Teil: Struktur & Symbole sichtbar, Werte verdeckt */}
      <div className="relative">
        <div aria-hidden="true" className="pointer-events-none">
          <BaSheetLockedTail />
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-white/0 via-white/35 to-white/70 p-3 sm:p-4">
          <div
            className="w-full max-w-[22rem] rounded-2xl border border-solid border-slate-200 bg-white px-4 py-4 text-center shadow-2xl shadow-slate-900/20"
            role="region"
            aria-label={overlayTitle}
          >
            <p className="m-0 flex items-center justify-center gap-2 text-[15px] font-bold leading-snug text-slate-900">
              <LockKeyhole className="h-4 w-4 shrink-0 text-teal-600" strokeWidth={2.5} aria-hidden />
              {overlayTitle}
            </p>
            <p className="m-0 mt-1.5 text-[13px] leading-snug text-slate-600">{copy.lockedOverlay.text}</p>
            {unlockCta}
          </div>
        </div>
      </div>
    </BaSheetFrame>
  );
}
