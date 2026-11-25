/* eslint-disable @next/next/no-img-element -- statischer Export, kleine lokale Symbol-Assets */
import { QrCode } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  EMERGENCY_WARNING_SIGN,
  FIRST_AID_SIGN,
  type BaDocumentSymbol,
} from '@/config/betriebsanweisung/ba-document-symbols';
import { LIVE_PREVIEW_COPY as copy } from '@/config/betriebsanweisung/live-preview-copy';

/**
 * Gemeinsame Bausteine des HTML-BA-Blatts (Live-Vorschau + Muster-Vorschau).
 *
 * Raster & Farben 1:1 wie das BA-PDF im gqr-backend
 * (`BetriebsanweisungDocument`, `ba-pdf-styles`, `DEFAULT_BA_DESIGN_CONFIG.primaryColor = #DC2626`):
 * 3-pt-Rahmen, 1,25-pt-Rasterlinien, Kopf 25/50/25, Abschnittsbalken, Symbolspalte | Textspalte.
 */
export const BA_SHEET = {
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
export const REDACTED_VALUE_CLASS = 'select-none blur-[4px]';

/** Neutraler Platzhaltertext (kein Stoffbezug); dient nur der realistischen Zeilenlänge unter dem Blur. */
export const REDACTED_TEXT = {
  short: 'Sofort reichlich mit Wasser spülen, Arzt hinzuziehen.',
  long: 'Betroffenen Bereich räumen, Zündquellen fernhalten und für ausreichende Lüftung sorgen.',
} as const;

const RELEASE_FOOTER_LABELS = ['Datum der Freigabe', 'Nächste Überprüfung', 'Unterschrift'] as const;

/** „Stand“-Datum im BA-Kopf (heute, de-DE). */
export function formatBaIssueDate(): string {
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date());
}

/** Äußerer Rahmen des DIN-A4-Blatts. */
export function BaSheetFrame({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white p-3 sm:p-5">
      <div className={`${BA_SHEET.frame} bg-white text-[#111827]`}>{children}</div>
    </div>
  );
}

/** Kopf 25/50/25 wie `BaPdfHeader`; Metazeile mit Hersteller / Bereich / Stand. */
export function BaSheetHeader({
  manufacturer,
  applicationArea,
  issuedOn,
}: {
  manufacturer: ReactNode;
  applicationArea: ReactNode;
  issuedOn: ReactNode;
}) {
  const metaFields = [
    { label: copy.fields.manufacturer, value: manufacturer },
    { label: 'Bereich', value: applicationArea },
    { label: 'Stand', value: issuedOn },
  ];

  return (
    <header>
      <div className="grid grid-cols-[1fr_2fr_1fr]">
        <div className="flex items-center justify-center p-1.5">
          <p className="m-0 text-center text-[11px] font-black italic leading-none tracking-tight sm:text-[13px]" aria-label="Gefahrstoff-QR">
            <span className="text-[#ff6b35]">GEFAHRSTOFF</span>
            <br />
            <span className="text-[#0f1e35]">QR</span>
          </p>
        </div>
        <div className={`border-x-[1.25px] ${BA_SHEET.gridLine} p-1.5 text-center`}>
          <p className="m-0 text-[15px] font-bold leading-tight sm:text-[17px]">{copy.documentTitle}</p>
          <p className={`m-0 ${BA_SHEET.meta}`}>{copy.documentSubtitle}</p>
          <p className={`m-0 ${BA_SHEET.meta}`}>{copy.documentKicker}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-0.5 p-1.5 text-slate-400">
          <QrCode className="h-9 w-9 sm:h-11 sm:w-11" strokeWidth={1.5} aria-hidden />
          <span className="text-[9px] font-semibold leading-none">Notfall-QR</span>
        </div>
      </div>
      <div className={`grid grid-cols-[1fr_2fr_1fr] border-t-[1.25px] ${BA_SHEET.gridLine}`}>
        {metaFields.map((field, index) => (
          <p
            key={field.label}
            className={`m-0 p-1.5 ${BA_SHEET.meta} ${index === 1 ? `border-x-[1.25px] ${BA_SHEET.gridLine}` : ''}`}
          >
            <span className="font-bold text-[#111827]">{field.label}: </span>
            {field.value}
          </p>
        ))}
      </div>
    </header>
  );
}

export function BaSheetSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={`border-t-[1.25px] ${BA_SHEET.gridLine}`} aria-label={title}>
      <h3 className={BA_SHEET.sectionBar}>{title}</h3>
      {children}
    </section>
  );
}

/** Abschnitt „Gefahrstoffbezeichnung“: Handelsname groß, optional CAS. */
export function BaSheetIdentification({
  tradeName,
  casNumber,
  storageClassLabel,
}: {
  tradeName: string;
  casNumber?: string | null;
  /** Bereits normalisiert, z. B. „LGK 3“ (aus dem SDB erkannt). */
  storageClassLabel?: string | null;
}) {
  const metaParts = [
    casNumber ? `${copy.fields.casNumber} ${casNumber}` : null,
    storageClassLabel ? `${copy.fields.storageClass}: ${storageClassLabel}` : null,
  ].filter((part): part is string => part !== null);

  return (
    <BaSheetSection title={copy.sectionTitles.identification}>
      <div className="p-1.5 text-center">
        <p className="m-0 text-[20px] font-bold leading-tight sm:text-[24px]">{tradeName}</p>
        {metaParts.length > 0 ? <p className={`m-0 mt-0.5 ${BA_SHEET.meta}`}>{metaParts.join(' · ')}</p> : null}
      </div>
    </BaSheetSection>
  );
}

export function BaSheetSymbolTextRow({ symbols, children }: { symbols: readonly BaDocumentSymbol[]; children: ReactNode }) {
  return (
    <div className="flex">
      <div className={BA_SHEET.symbolColumn}>
        {symbols.map((symbol) => (
          <img key={symbol.src} src={symbol.src} alt={symbol.label} className={BA_SHEET.symbolImage} loading="lazy" />
        ))}
      </div>
      <div className={BA_SHEET.textColumn}>{children}</div>
    </div>
  );
}

export function BaSheetRedactedLine({ label, text }: { label?: string; text: string }) {
  return (
    <p className="m-0">
      {label ? <span className="font-bold">{label}: </span> : null}
      <span className={REDACTED_VALUE_CLASS}>{text}</span>
    </p>
  );
}

/** Abschnitte Gefahrfall, Erste Hilfe, Entsorgung + Freigabezeile — Struktur sichtbar, Werte verdeckt. */
export function BaSheetLockedTail() {
  return (
    <>
      <BaSheetSection title={copy.sectionTitles.emergency}>
        <BaSheetSymbolTextRow symbols={[EMERGENCY_WARNING_SIGN]}>
          <BaSheetRedactedLine text={REDACTED_TEXT.long} />
          <BaSheetRedactedLine text={REDACTED_TEXT.short} />
          <BaSheetRedactedLine text={REDACTED_TEXT.long} />
        </BaSheetSymbolTextRow>
      </BaSheetSection>
      <BaSheetSection title={copy.sectionTitles.firstAid}>
        <BaSheetSymbolTextRow symbols={[FIRST_AID_SIGN]}>
          <BaSheetRedactedLine label="Nach Augenkontakt" text={REDACTED_TEXT.short} />
          <BaSheetRedactedLine label="Nach Hautkontakt" text={REDACTED_TEXT.short} />
          <BaSheetRedactedLine label="Nach Einatmen" text={REDACTED_TEXT.short} />
          <BaSheetRedactedLine label="Nach Verschlucken" text={REDACTED_TEXT.short} />
          <BaSheetRedactedLine label="Ersthelfer" text={REDACTED_TEXT.short} />
          <BaSheetRedactedLine label="Notruf" text="112" />
        </BaSheetSymbolTextRow>
      </BaSheetSection>
      <BaSheetSection title={copy.sectionTitles.disposal}>
        <BaSheetSymbolTextRow symbols={[]}>
          <BaSheetRedactedLine text={REDACTED_TEXT.long} />
          <BaSheetRedactedLine text={REDACTED_TEXT.short} />
        </BaSheetSymbolTextRow>
      </BaSheetSection>
      <div className={`grid grid-cols-3 border-t-[1.25px] ${BA_SHEET.gridLine}`}>
        {RELEASE_FOOTER_LABELS.map((label, index) => (
          <div
            key={label}
            className={`min-h-[3.25rem] p-1.5 ${index < RELEASE_FOOTER_LABELS.length - 1 ? `border-r-[1.25px] ${BA_SHEET.gridLine}` : ''}`}
          >
            <p className={`m-0 font-bold ${BA_SHEET.meta}`}>{label}</p>
          </div>
        ))}
      </div>
    </>
  );
}
