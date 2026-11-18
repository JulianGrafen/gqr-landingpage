'use client';

/* eslint-disable @next/next/no-img-element -- statischer Export, kleine lokale Symbol-Assets */
import { LockKeyhole, QrCode } from 'lucide-react';
import type { ReactNode } from 'react';
import { BaUnlockCta } from '@/components/betriebsanweisung/BaUnlockCta';
import {
  EMERGENCY_WARNING_SIGN,
  FIRST_AID_SIGN,
  PROTECTIVE_EQUIPMENT_SIGNS,
  type BaDocumentSymbol,
} from '@/config/betriebsanweisung/ba-document-symbols';
import { LIVE_PREVIEW_COPY as copy } from '@/config/betriebsanweisung/live-preview-copy';
import { GHS_ASSETS, normalizeGhsCode } from '@/lib/ghs/ghs-assets';
import type { GhsPictogramCode } from '@/lib/ghs/ghs-types';
import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';

type Props = {
  teaser: SdbPreviewTeaser;
  /** Einsatzbereich aus der Seiten-Config (nicht aus dem SDB). */
  applicationArea: string;
  isDemo: boolean;
};

/**
 * Raster & Farben 1:1 wie das BA-PDF im gqr-backend
 * (`BetriebsanweisungDocument`, `ba-pdf-styles`, `DEFAULT_BA_DESIGN_CONFIG.primaryColor = #DC2626`):
 * 3-pt-Rahmen, 1,25-pt-Rasterlinien, Kopf 25/50/25, Abschnittsbalken, Symbolspalte | Textspalte.
 */
const BA = {
  frame: 'border-[3px] border-solid border-[#DC2626]',
  gridLine: 'border-0 border-solid border-[#DC2626]',
  sectionBar:
    'm-0 bg-[#DC2626] px-2 py-0.5 text-center text-[12px] font-bold uppercase tracking-wide text-white sm:text-[13px]',
  symbolColumn:
    'flex w-[5.5rem] shrink-0 flex-wrap content-start justify-center gap-1 border-0 border-r-[1.25px] border-solid border-[#DC2626] p-1 sm:w-[7rem]',
  textColumn: 'min-w-0 flex-1 break-words [overflow-wrap:anywhere] p-1.5 text-[12px] leading-[1.22] text-[#111827] sm:text-[13px]',
  symbolImage: 'h-10 w-10 object-contain sm:h-12 sm:w-12',
  meta: 'text-[11px] leading-[1.22] text-[#374151]',
} as const;

/** Werte im gesperrten Bereich: Layout bleibt scharf, nur Inhalte sind verdeckt. */
const REDACTED_VALUE_CLASS = 'select-none blur-[4px]';

/** Neutraler Platzhaltertext (kein Stoffbezug); dient nur der realistischen Zeilenlänge unter dem Blur. */
const REDACTED_TEXT = {
  short: 'Sofort reichlich mit Wasser spülen, Arzt hinzuziehen.',
  long: 'Betroffenen Bereich räumen, Zündquellen fernhalten und für ausreichende Lüftung sorgen.',
} as const;

const RELEASE_FOOTER_LABELS = ['Datum der Freigabe', 'Nächste Überprüfung', 'Unterschrift'] as const;

function DocumentSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={`border-t-[1.25px] ${BA.gridLine}`} aria-label={title}>
      <h3 className={BA.sectionBar}>{title}</h3>
      {children}
    </section>
  );
}

function SymbolTextRow({ symbols, children }: { symbols: readonly BaDocumentSymbol[]; children: ReactNode }) {
  return (
    <div className="flex">
      <div className={BA.symbolColumn}>
        {symbols.map((symbol) => (
          <img key={symbol.src} src={symbol.src} alt={symbol.label} className={BA.symbolImage} loading="lazy" />
        ))}
      </div>
      <div className={BA.textColumn}>{children}</div>
    </div>
  );
}

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

function RedactedLine({ label, text }: { label?: string; text: string }) {
  return (
    <p className="m-0">
      {label ? <span className="font-bold">{label}: </span> : null}
      <span className={REDACTED_VALUE_CLASS}>{text}</span>
    </p>
  );
}

function toGhsSymbols(raw: readonly string[]): BaDocumentSymbol[] {
  return raw
    .map(normalizeGhsCode)
    .filter((code): code is GhsPictogramCode => code !== null)
    .map((code) => ({ src: GHS_ASSETS[code].src, label: `${code} ${GHS_ASSETS[code].label}` }));
}

function formatToday(): string {
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date());
}

/**
 * Große DIN-A4-Vorschau aus der KI-Extraktion im Layout des gqr-backend-PDFs („Smart Unblur“):
 * Kopf, Gefahrstoffbezeichnung, Gefahren, Schutzmaßnahmen scharf; Gefahrfall, Erste Hilfe,
 * Entsorgung und Freigabe mit sichtbarer Struktur, aber verdeckten Werten + Freischalt-Card.
 */
export function BaLiveExtractedDocument({ teaser, applicationArea, isDemo }: Props) {
  const ghsSymbols = toGhsSymbols(teaser.ghsPictograms);
  const protectiveSigns = (teaser.protectiveEquipment ?? []).map((id) => PROTECTIVE_EQUIPMENT_SIGNS[id]);
  const precautionary = teaser.precautionaryStatements ?? [];
  const counts = teaser.statementCounts;
  const remainingHazard = Math.max(0, (counts?.hazard ?? 0) - teaser.hazardStatements.length);
  const remainingPrecautionary = Math.max(0, (counts?.precautionary ?? 0) - precautionary.length);
  const overlayTitle = isDemo ? copy.lockedOverlay.demoTitle : copy.lockedOverlay.uploadTitle;

  return (
    <div className="bg-white p-3 sm:p-5">
      <div className={`${BA.frame} bg-white text-[#111827]`}>
        {/* Kopf: 25/50/25 wie BaPdfHeader */}
        <header>
          <div className="grid grid-cols-[1fr_2fr_1fr]">
            <div className="flex items-center justify-center p-1.5">
              <p className="m-0 text-center text-[11px] font-black italic leading-none tracking-tight sm:text-[13px]" aria-label="Gefahrstoff-QR">
                <span className="text-[#ff6b35]">GEFAHRSTOFF</span>
                <br />
                <span className="text-[#0f1e35]">QR</span>
              </p>
            </div>
            <div className={`border-x-[1.25px] ${BA.gridLine} p-1.5 text-center`}>
              <p className="m-0 text-[15px] font-bold leading-tight sm:text-[17px]">{copy.documentTitle}</p>
              <p className={`m-0 ${BA.meta}`}>{copy.documentSubtitle}</p>
              <p className={`m-0 ${BA.meta}`}>{copy.documentKicker}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-0.5 p-1.5 text-slate-400">
              <QrCode className="h-9 w-9 sm:h-11 sm:w-11" strokeWidth={1.5} aria-hidden />
              <span className="text-[9px] font-semibold leading-none">Notfall-QR</span>
            </div>
          </div>
          <div className={`grid grid-cols-[1fr_2fr_1fr] border-t-[1.25px] ${BA.gridLine}`}>
            <p className={`m-0 p-1.5 ${BA.meta}`}>
              <span className="font-bold text-[#111827]">{copy.fields.manufacturer}: </span>
              {teaser.manufacturer}
            </p>
            <p className={`m-0 border-x-[1.25px] ${BA.gridLine} p-1.5 ${BA.meta}`}>
              <span className="font-bold text-[#111827]">Bereich: </span>
              {applicationArea}
            </p>
            <p className={`m-0 p-1.5 ${BA.meta}`}>
              <span className="font-bold text-[#111827]">Stand: </span>
              {formatToday()}
            </p>
          </div>
        </header>

        <DocumentSection title={copy.sectionTitles.identification}>
          <div className="p-1.5 text-center">
            <p className="m-0 text-[20px] font-bold leading-tight sm:text-[24px]">{teaser.tradeName}</p>
            {teaser.casNumber ? (
              <p className={`m-0 mt-0.5 ${BA.meta}`}>
                {copy.fields.casNumber} {teaser.casNumber}
              </p>
            ) : null}
          </div>
        </DocumentSection>

        <DocumentSection title={copy.sectionTitles.hazards}>
          <SymbolTextRow symbols={ghsSymbols}>
            {teaser.signalWord ? <p className="m-0 mb-0.5 font-bold">{teaser.signalWord}</p> : null}
            {teaser.hazardStatements.length > 0 ? (
              <BulletList
                items={teaser.hazardStatements}
                footer={remainingHazard > 0 ? copy.moreStatementsSuffix(remainingHazard) : undefined}
              />
            ) : (
              <p className="m-0 text-slate-600">{copy.noHazardStatements}</p>
            )}
          </SymbolTextRow>
        </DocumentSection>

        <DocumentSection title={copy.sectionTitles.protection}>
          <SymbolTextRow symbols={protectiveSigns}>
            {precautionary.length > 0 ? (
              <BulletList
                items={precautionary}
                footer={remainingPrecautionary > 0 ? copy.moreStatementsSuffix(remainingPrecautionary) : undefined}
              />
            ) : (
              <p className="m-0 text-slate-600">{copy.noPrecautionaryStatements}</p>
            )}
          </SymbolTextRow>
        </DocumentSection>

        {/* Gesperrter Teil: Struktur & Symbole sichtbar, Werte verdeckt */}
        <div className="relative">
          <div aria-hidden="true" className="pointer-events-none">
            <DocumentSection title={copy.sectionTitles.emergency}>
              <SymbolTextRow symbols={[EMERGENCY_WARNING_SIGN]}>
                <RedactedLine text={REDACTED_TEXT.long} />
                <RedactedLine text={REDACTED_TEXT.short} />
                <RedactedLine text={REDACTED_TEXT.long} />
              </SymbolTextRow>
            </DocumentSection>
            <DocumentSection title={copy.sectionTitles.firstAid}>
              <SymbolTextRow symbols={[FIRST_AID_SIGN]}>
                <RedactedLine label="Nach Augenkontakt" text={REDACTED_TEXT.short} />
                <RedactedLine label="Nach Hautkontakt" text={REDACTED_TEXT.short} />
                <RedactedLine label="Nach Einatmen" text={REDACTED_TEXT.short} />
                <RedactedLine label="Nach Verschlucken" text={REDACTED_TEXT.short} />
                <RedactedLine label="Ersthelfer" text={REDACTED_TEXT.short} />
                <RedactedLine label="Notruf" text="112" />
              </SymbolTextRow>
            </DocumentSection>
            <DocumentSection title={copy.sectionTitles.disposal}>
              <SymbolTextRow symbols={[]}>
                <RedactedLine text={REDACTED_TEXT.long} />
                <RedactedLine text={REDACTED_TEXT.short} />
              </SymbolTextRow>
            </DocumentSection>
            <div className={`grid grid-cols-3 border-t-[1.25px] ${BA.gridLine}`}>
              {RELEASE_FOOTER_LABELS.map((label, index) => (
                <div
                  key={label}
                  className={`min-h-[3.25rem] p-1.5 ${index < RELEASE_FOOTER_LABELS.length - 1 ? `border-r-[1.25px] ${BA.gridLine}` : ''}`}
                >
                  <p className={`m-0 font-bold ${BA.meta}`}>{label}</p>
                </div>
              ))}
            </div>
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
              <BaUnlockCta label={copy.lockedOverlay.cta} tone="light" className="mt-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
