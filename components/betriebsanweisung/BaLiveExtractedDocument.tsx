'use client';

import type { ReactNode } from 'react';
import { BaProtectiveEquipmentIcons } from '@/components/betriebsanweisung/BaProtectiveEquipmentIcons';
import { BaUnlockCta } from '@/components/betriebsanweisung/BaUnlockCta';
import { GhsPictogramGrid } from '@/components/betriebsanweisung/GhsPictogramGrid';
import { LIVE_PREVIEW_COPY as copy } from '@/config/betriebsanweisung/live-preview-copy';
import { normalizeGhsCode } from '@/lib/ghs/ghs-assets';
import type { GhsPictogramCode } from '@/lib/ghs/ghs-types';
import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';

type Props = {
  teaser: SdbPreviewTeaser;
  /** Einsatzbereich aus der Seiten-Config (nicht aus dem SDB). */
  applicationArea: string;
  isDemo: boolean;
};

/** Gesperrter Bereich: nur das untere Drittel wird verdeckt (Proof-of-Work bleibt lesbar). */
const LOCKED_CONTENT_CLASS = 'pointer-events-none select-none blur-[4px]';

/** Neutraler Blindtext für den verdeckten Bereich; echte Inhalte liegen erst nach Registrierung vor. */
const LOCKED_FILLER_LINES = [
  'Bei Freisetzung Bereich absperren, Zündquellen entfernen und für Lüftung sorgen.',
  'Aufnahme mit geeignetem Bindemittel, Behälter dicht verschließen und kennzeichnen.',
] as const;

function SectionBar({ children }: { children: ReactNode }) {
  return (
    <h3 className="m-0 bg-[#c62828] px-3 py-1.5 text-center text-xs font-bold uppercase tracking-wide text-white sm:text-sm">
      {children}
    </h3>
  );
}

function StatementList({ statements, remaining }: { statements: readonly string[]; remaining: number }) {
  return (
    <ul className="m-0 list-disc space-y-1 pl-4 text-sm leading-snug text-slate-800">
      {statements.map((statement) => (
        <li key={statement}>{statement}</li>
      ))}
      {remaining > 0 ? (
        <li className="list-none text-xs font-semibold text-slate-500">{copy.moreStatementsSuffix(remaining)}</li>
      ) : null}
    </ul>
  );
}

function toGhsCodes(raw: readonly string[]): GhsPictogramCode[] {
  return raw.map(normalizeGhsCode).filter((code): code is GhsPictogramCode => code !== null);
}

/**
 * Große DIN-A4-Vorschau aus der KI-Extraktion („Smart Unblur“):
 * Kopf, Abschnitt 1–3 (inkl. GHS, Signalwort, erste H-Sätze, PSA, erste P-Sätze) scharf,
 * Gefahrfall / Erste Hilfe / Entsorgung / Freigabe geblurrt mit Freischalt-Card.
 */
export function BaLiveExtractedDocument({ teaser, applicationArea, isDemo }: Props) {
  const ghsCodes = toGhsCodes(teaser.ghsPictograms);
  const precautionary = teaser.precautionaryStatements ?? [];
  const counts = teaser.statementCounts;
  const remainingHazard = Math.max(0, (counts?.hazard ?? 0) - teaser.hazardStatements.length);
  const remainingPrecautionary = Math.max(0, (counts?.precautionary ?? 0) - precautionary.length);
  const lockedSections = [copy.sectionTitles.emergency, copy.sectionTitles.firstAid, copy.sectionTitles.disposal];

  return (
    <div className="bg-white p-3 text-slate-900 sm:p-5">
      <div className="border-2 border-[#c62828]">
        <header className="grid grid-cols-1 border-b-2 border-[#c62828] sm:grid-cols-[1fr_auto]">
          <div className="px-4 py-3 text-center sm:text-left">
            <p className="m-0 text-[10px] font-bold uppercase tracking-wider text-[#ff6b35]">{copy.documentKicker}</p>
            <p className="m-0 mt-0.5 text-lg font-black">{copy.documentTitle}</p>
            <p className="m-0 text-xs text-slate-600">{copy.documentSubtitle}</p>
          </div>
          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-t border-[#c62828]/40 px-4 py-3 text-xs sm:border-l sm:border-t-0">
            <dt className="font-bold">{copy.fields.manufacturer}:</dt>
            <dd className="m-0">{teaser.manufacturer}</dd>
            {teaser.casNumber ? (
              <>
                <dt className="font-bold">{copy.fields.casNumber}:</dt>
                <dd className="m-0 tabular-nums">{teaser.casNumber}</dd>
              </>
            ) : null}
            <dt className="font-bold">{copy.fields.applicationArea}:</dt>
            <dd className="m-0">{applicationArea}</dd>
          </dl>
        </header>

        <section aria-label={copy.sectionTitles.identification}>
          <SectionBar>{copy.sectionTitles.identification}</SectionBar>
          <p className="m-0 px-4 py-2 text-center text-xl font-black sm:text-2xl">
            <span className="sr-only">{copy.fields.substance}: </span>
            {teaser.tradeName}
          </p>
        </section>

        <section aria-label={copy.sectionTitles.hazards}>
          <SectionBar>{copy.sectionTitles.hazards}</SectionBar>
          <div className="grid grid-cols-1 gap-3 px-4 py-3 sm:grid-cols-[11.5rem_1fr]">
            {ghsCodes.length > 0 ? <GhsPictogramGrid codes={ghsCodes} size="sm" variant="light" /> : null}
            <div>
              {teaser.signalWord ? <p className="m-0 mb-1 text-base font-black">{teaser.signalWord}</p> : null}
              {teaser.hazardStatements.length > 0 ? (
                <StatementList statements={teaser.hazardStatements} remaining={remainingHazard} />
              ) : (
                <p className="m-0 text-sm text-slate-600">{copy.noHazardStatements}</p>
              )}
            </div>
          </div>
        </section>

        <section aria-label={copy.sectionTitles.protection}>
          <SectionBar>{copy.sectionTitles.protection}</SectionBar>
          <div className="grid grid-cols-1 gap-3 px-4 py-3 sm:grid-cols-[11.5rem_1fr]">
            <BaProtectiveEquipmentIcons items={teaser.protectiveEquipment ?? []} />
            {precautionary.length > 0 ? (
              <StatementList statements={precautionary} remaining={remainingPrecautionary} />
            ) : (
              <p className="m-0 text-sm text-slate-600">{copy.noPrecautionaryStatements}</p>
            )}
          </div>
        </section>

        <div className="relative">
          <div className={LOCKED_CONTENT_CLASS} aria-hidden="true">
            {lockedSections.map((title) => (
              <section key={title}>
                <SectionBar>{title}</SectionBar>
                <ul className="m-0 list-disc space-y-1 py-3 pl-8 pr-4 text-sm text-slate-700">
                  {LOCKED_FILLER_LINES.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </section>
            ))}
            <section className="grid grid-cols-3 border-t-2 border-[#c62828] text-xs">
              <p className="m-0 border-r border-[#c62828]/40 px-3 py-4 font-bold">Datum der Freigabe</p>
              <p className="m-0 border-r border-[#c62828]/40 px-3 py-4 font-bold">Nächste Überprüfung</p>
              <p className="m-0 px-3 py-4 font-bold">{copy.sectionTitles.approval}</p>
            </section>
          </div>

          <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
            <div
              className="w-full max-w-sm rounded-2xl border border-white/60 bg-white/75 p-5 text-center shadow-2xl shadow-slate-900/20 backdrop-blur-md"
              role="region"
              aria-label={isDemo ? copy.lockedOverlay.demoTitle : copy.lockedOverlay.uploadTitle}
            >
              <p className="m-0 text-base font-bold leading-snug text-slate-900">
                {isDemo ? copy.lockedOverlay.demoTitle : copy.lockedOverlay.uploadTitle}
              </p>
              <p className="m-0 mt-2 text-sm leading-relaxed text-slate-600">{copy.lockedOverlay.text}</p>
              <BaUnlockCta label={copy.lockedOverlay.cta} tone="light" className="mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
