import Link from 'next/link';
import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import {
  BETRIEBSANWEISUNG_REGISTER_CTA,
  BETRIEBSANWEISUNG_SDB_CTA,
} from '@/config/legal/site-copy';
import { buildBetriebsanweisungRegisterUrl } from '@/lib/betriebsanweisung/build-register-url';

type Props = {
  entry: HazardousSubstanceSeoEntry;
};

const SKELETON_SECTIONS = [
  '1. Anwendungsbereich & Arbeitsplatz',
  '2. Gefahren für Mensch und Umwelt',
  '3. Schutzmaßnahmen & PSA',
  '4. Verhalten im Gefahrfall',
  '5. Erste Hilfe',
  '6. Sachgerechte Entsorgung',
] as const;

function SkeletonBar({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-slate-200/90 ${className ?? 'h-3 w-full'}`} aria-hidden />;
}

export function BetriebsanweisungTeaserDocument({ entry }: Props) {
  const registerUrl = buildBetriebsanweisungRegisterUrl(entry.slug);

  return (
    <article
      className="relative mx-auto max-w-[520px] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/30"
      aria-label={`Muster-Struktur Betriebsanweisung ${entry.substanceName}`}
    >
      <div className="relative">
        <header className="border-b-4 border-[#ff6b35] bg-gradient-to-r from-[#0f1e35] to-[#162340] px-5 py-4 text-[#f0f6ff]">
          <p className="text-[11px] font-bold uppercase leading-snug tracking-wide text-teal-300">
            TRGS 555 · Muster-Struktur (ohne Lieferanten-SDB)
          </p>
          <h2 className="mt-2 text-lg font-black leading-snug sm:text-xl">
            Betriebsanweisung (Muster-Struktur) für {entry.substanceName}
          </h2>
        </header>

        <div className="space-y-0 bg-white px-5 py-4 text-slate-800">
          <div className="flex gap-2 pb-4" aria-hidden>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 w-12 animate-pulse rounded-lg bg-slate-200" />
            ))}
          </div>
          <SkeletonBar className="mb-2 h-4 w-3/4" />
          <SkeletonBar className="mb-6 h-3 w-full" />
          <SkeletonBar className="mb-2 h-3 w-5/6" />

          {SKELETON_SECTIONS.map((title) => (
            <section key={title} className="border-t border-slate-100 py-4" aria-hidden>
              <p className="text-xs font-bold uppercase tracking-wide text-[#ff6b35]">{title}</p>
              <div className="mt-3 space-y-2">
                <SkeletonBar className="h-3 w-full" />
                <SkeletonBar className="h-3 w-[92%]" />
                <SkeletonBar className="h-3 w-[78%]" />
              </div>
            </section>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-white/80 p-6 backdrop-blur-sm">
          <div className="max-w-sm text-center">
            <p className="text-lg font-bold text-slate-900">Wartet auf Ihr Sicherheitsdatenblatt</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Schutzmaßnahmen, GHS-Einstufung und Notfall-Regeln hängen zwingend von der Konzentration Ihres Lieferanten
              ab. Laden Sie Ihr SDB hoch, um die exakten Daten rechtssicher in diesen Entwurf zu extrahieren.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link href={registerUrl} className="gqr-cta-primary gqr-cta-primary--md inline-flex justify-center">
                {BETRIEBSANWEISUNG_REGISTER_CTA}
              </Link>
              <a href="#ba-sdb-dropzone" className="gqr-cta-secondary gqr-cta-secondary--md inline-flex justify-center">
                {BETRIEBSANWEISUNG_SDB_CTA}
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
