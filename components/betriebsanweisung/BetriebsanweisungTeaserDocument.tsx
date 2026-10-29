'use client';

import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import { useBetriebsanweisungSdbUpload } from '@/components/betriebsanweisung/betriebsanweisung-sdb-upload-context';
import { BETRIEBSANWEISUNG_OVERLAY_SDB_CTA } from '@/config/legal/site-copy';

type Props = {
  entry: HazardousSubstanceSeoEntry;
};

const SKELETON_SECTIONS = [
  {
    title: '1. Anwendungsbereich & Arbeitsplatz',
    placeholder: '[Zuordnung aus SDB Abschnitt 1.2 & betrieblicher Arbeitsbereich]',
  },
  {
    title: '2. Gefahren für Mensch und Umwelt',
    placeholder: '[Zuordnung aus SDB Abschnitt 2: Einstufung & Kennzeichnung]',
  },
  {
    title: '3. Schutzmaßnahmen & Verhaltensregeln',
    placeholder: '[Zuordnung aus SDB Abschnitt 7 & 8: Handhabung & Expositionsbegrenzung]',
  },
  {
    title: '4. Verhalten im Gefahrfall',
    placeholder: '[Zuordnung aus SDB Abschnitt 5 & 6: Maßnahmen bei Brand / Freisetzung]',
  },
  {
    title: '5. Erste Hilfe',
    placeholder: '[Zuordnung aus SDB Abschnitt 4: Erste-Hilfe-Maßnahmen]',
  },
  {
    title: '6. Sachgerechte Entsorgung',
    placeholder: '[Zuordnung aus SDB Abschnitt 13: Hinweise zur Entsorgung]',
  },
] as const;

export function BetriebsanweisungTeaserDocument({ entry }: Props) {
  const { requestSdbUploadFromOverlay } = useBetriebsanweisungSdbUpload();

  return (
    <article
      className="relative mx-auto max-w-[520px] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/30"
      aria-label={`Struktur-Vorschau Betriebsanweisung ${entry.substanceName}`}
    >
      <div className="relative">
        <header className="border-b-4 border-[#ff6b35] bg-gradient-to-r from-[#0f1e35] to-[#162340] px-5 py-4 text-[#f0f6ff]">
          <p className="text-[11px] font-bold uppercase leading-snug tracking-wide text-teal-300">
            TRGS 555 · Struktur-Vorschau für {entry.substanceName}
          </p>
        </header>

        <div className="space-y-0 bg-white px-5 py-4 text-slate-800">
          {SKELETON_SECTIONS.map(({ title, placeholder }) => (
            <section key={title} className="border-t border-slate-100 py-4 first:border-t-0">
              <p className="text-xs font-bold uppercase tracking-wide text-[#ff6b35]">{title}</p>
              <p className="mt-2 text-sm italic leading-relaxed text-slate-500">{placeholder}</p>
            </section>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-white/80 p-6 backdrop-blur-sm">
          <div className="max-w-sm text-center">
            <p className="text-lg font-bold text-slate-900">
              Wartet auf Ihr Lieferanten-SDB für {entry.substanceName}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Angaben zu Einstufung, Schutzmaßnahmen und Notfallverhalten hängen vom konkreten Produkt Ihres Herstellers
              ab. Laden Sie Ihr PDF in der Dropzone hoch, um eine Live-Vorschau (Abschnitt 1 &amp; 2) zu generieren, oder
              bearbeiten Sie den gesamten Entwurf in der App.
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="gqr-cta-secondary gqr-cta-secondary--md inline-flex w-full justify-center"
                onClick={requestSdbUploadFromOverlay}
              >
                {BETRIEBSANWEISUNG_OVERLAY_SDB_CTA}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
