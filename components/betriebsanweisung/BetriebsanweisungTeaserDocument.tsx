'use client';

import { useBetriebsanweisungSdbUpload } from '@/components/betriebsanweisung/betriebsanweisung-sdb-upload-context';
import {
  BA_PREVIEW_SECTIONS,
  CLUSTER_SAMPLE_COPY,
  fillSubstancePlaceholder,
  SAMPLE_PREVIEW_COPY as copy,
} from '@/config/betriebsanweisung/sample-preview';
import type { SubstanceClusterId } from '@/config/betriebsanweisung/substance-clusters';
import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import { BETRIEBSANWEISUNG_OVERLAY_SDB_CTA } from '@/config/legal/site-copy';

type Props = {
  entry: HazardousSubstanceSeoEntry;
  cluster: SubstanceClusterId;
  /** Register-Link mit utm_content der Muster-Vorschau. */
  sampleRegisterUrl: string;
};

const ACCENT = '#ff6b35';
const QR_PLACEHOLDER_CELLS = Array.from({ length: 25 }, (_, index) => index);
/** Deterministisches Muster für den QR-Platzhalter (rein dekorativ). */
const QR_FILLED_CELLS = new Set([0, 1, 3, 4, 5, 9, 12, 15, 19, 20, 21, 23, 24, 7, 17]);

function QrPlaceholder() {
  return (
    <div
      className="grid h-12 w-12 shrink-0 grid-cols-5 gap-px rounded bg-white p-1"
      role="img"
      aria-label={copy.qrPlaceholderLabel}
    >
      {QR_PLACEHOLDER_CELLS.map((cell) => (
        <span key={cell} className={QR_FILLED_CELLS.has(cell) ? 'bg-slate-900' : 'bg-white'} />
      ))}
    </div>
  );
}

/** Feld, dessen Wert im echten Entwurf aus dem Lieferanten-SDB kommt (bewusst ohne Musterwert). */
function SdbSourcedField({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-xs">
      <span className="font-semibold text-slate-700">{label}</span>
      <span className="text-slate-500">{copy.fromSdbValue}</span>
    </div>
  );
}

function GhsDiamondPlaceholder() {
  return (
    <span
      className="inline-block h-7 w-7 rotate-45 rounded-[3px] border-2 border-solid border-red-600 bg-white"
      aria-hidden="true"
    />
  );
}

function SkeletonLines() {
  return (
    <div className="mt-2 space-y-1.5" aria-hidden="true">
      <span className="block h-2 w-full rounded bg-slate-200" />
      <span className="block h-2 w-5/6 rounded bg-slate-200" />
      <span className="block h-2 w-2/3 rounded bg-slate-200" />
    </div>
  );
}

function SectionHeading({ title, sdbSource }: { title: string; sdbSource: string }) {
  return (
    <h3
      className="flex items-center justify-between gap-2 rounded-sm px-2 py-1 text-xs font-bold uppercase tracking-wide text-white"
      style={{ backgroundColor: ACCENT }}
    >
      <span>{title}</span>
      <span className="shrink-0 font-semibold normal-case opacity-90">{sdbSource}</span>
    </h3>
  );
}

/**
 * Muster-Vorschau einer Betriebsanweisung im TRGS-555-Rahmenlook.
 * Abschnitt 1 und 2 zeigen stoffneutrale Mustertexte des Branchen-Clusters, Abschnitt 3 bis 6
 * sind angedeutet und mit einem Conversion-Overlay versehen. Keine API-Calls.
 */
export function BetriebsanweisungTeaserDocument({ entry, cluster, sampleRegisterUrl }: Props) {
  const { requestSdbUploadFromOverlay, isSamplePreviewActive } = useBetriebsanweisungSdbUpload();
  const sample = CLUSTER_SAMPLE_COPY[cluster];
  const [sectionApplication, sectionHazards, ...lockedSections] = BA_PREVIEW_SECTIONS;
  const [sectionProtection] = lockedSections;

  return (
    <article
      id={copy.anchorId}
      className={`relative mx-auto max-w-[560px] scroll-mt-28 overflow-hidden rounded-2xl border-4 border-solid bg-white shadow-2xl shadow-black/30 transition-shadow ${
        isSamplePreviewActive ? 'ring-4 ring-teal-300/60' : ''
      }`}
      style={{ borderColor: ACCENT }}
      aria-label={`Struktur-Vorschau Betriebsanweisung ${entry.substanceName} (Muster)`}
    >
      <header className="flex items-start justify-between gap-4 px-5 py-4" style={{ backgroundColor: ACCENT }}>
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wider text-white/90">{copy.headerKicker}</p>
          <p className="mt-1 text-xl font-black leading-tight text-white">{entry.substanceName}</p>
          <p className="mt-2 inline-block rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold leading-snug text-slate-800">
            {copy.formatBadge}
          </p>
        </div>
        <QrPlaceholder />
      </header>

      <p className="border-0 border-b border-solid border-amber-200 bg-amber-50 px-5 py-2 text-[11px] font-semibold leading-snug text-amber-900">
        {copy.sampleBadge}
      </p>

      <div className="space-y-4 px-5 py-4 text-slate-800">
        <section aria-label={sectionApplication.title}>
          <SectionHeading {...sectionApplication} />
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {fillSubstancePlaceholder(sample.applicationArea, entry.substanceName)}
          </p>
        </section>

        <section aria-label={sectionHazards.title}>
          <SectionHeading {...sectionHazards} />
          <div className="mt-2 flex items-center gap-3">
            <GhsDiamondPlaceholder />
            <GhsDiamondPlaceholder />
            <span className="text-xs text-slate-500">
              {copy.pictogramsField}: {copy.fromSdbValue}
            </span>
          </div>
          <div className="mt-3 grid gap-2">
            <SdbSourcedField label={copy.signalWordField} />
            <SdbSourcedField label={copy.hazardStatementsField} />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{sample.hazardContext}</p>
        </section>

        <div className="relative">
          <div className="space-y-4 select-none" aria-hidden="true">
            <section>
              <SectionHeading {...sectionProtection} />
              <ul className="mt-2 flex list-none flex-wrap gap-2 p-0">
                {sample.typicalProtectiveEquipment.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white"
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-white" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-1 text-[10px] text-slate-500">{copy.protectiveEquipmentNote}</p>
              <SkeletonLines />
            </section>
            {lockedSections.slice(1).map((section) => (
              <section key={section.title}>
                <SectionHeading {...section} />
                <SkeletonLines />
              </section>
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-white/70 p-5 backdrop-blur-[2px]">
            <div className="max-w-sm rounded-xl border border-solid border-slate-200 bg-white/95 p-5 text-center shadow-lg">
              <p className="text-base font-bold leading-snug text-slate-900">{copy.lockedOverlayTitle}</p>
              <button type="button" onClick={requestSdbUploadFromOverlay} className="ba-teaser-overlay-cta mt-4">
                {BETRIEBSANWEISUNG_OVERLAY_SDB_CTA}
              </button>
              <a
                href={sampleRegisterUrl}
                className="mt-3 inline-block text-sm font-semibold text-slate-700 underline underline-offset-2 hover:text-slate-900"
              >
                {copy.lockedOverlaySecondaryLabel}
              </a>
            </div>
          </div>
        </div>

        <p className="border-0 border-t border-solid border-slate-100 pt-3 text-[11px] leading-snug text-slate-500">{copy.legalNotice}</p>
      </div>
    </article>
  );
}

