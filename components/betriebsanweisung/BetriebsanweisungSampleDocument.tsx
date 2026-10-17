import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import { formatCasDisplay } from '@/config/betriebsanweisung/registry';
import { GhsPictogramGrid } from '@/components/betriebsanweisung/GhsPictogramGrid';

type Props = {
  entry: HazardousSubstanceSeoEntry;
};

/** Legacy-Vorschau — identisch zur öffentlichen Teaser-Logik (ohne Schutzdetailtexte). */
export function BetriebsanweisungSampleDocument({ entry }: Props) {
  const casLabel = formatCasDisplay(entry.casNumber);

  return (
    <article
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60"
      aria-label={`Muster-Betriebsanweisung ${entry.substanceName}`}
    >
      <header className="border-b-4 border-[#ff6b35] bg-gradient-to-r from-[#0f1e35] to-[#162340] px-5 py-5 text-[#f0f6ff] sm:px-6">
        <p className="text-xs font-bold uppercase tracking-wider text-teal-300">
          KI-gestützter Entwurf · TRGS 555 · Vorprüfung zur fachlichen Freigabe
        </p>
        <h2 className="mt-2 text-xl font-black sm:text-2xl">{entry.documentDisplayName}</h2>
        <p className="mt-1 text-sm text-[#8fa4c0]">
          CAS / Produkt: {casLabel} · Signalwort:{' '}
          <span className={entry.signalWord === 'Gefahr' ? 'font-bold text-red-400' : 'font-bold text-amber-300'}>
            {entry.signalWord}
          </span>
        </p>
        <div className="mt-4">
          <GhsPictogramGrid codes={entry.ghsPictograms} size="sm" />
        </div>
      </header>
      <section className="px-5 py-4 sm:px-6">
        <h3 className="text-xs font-bold uppercase tracking-wide text-[#ff6b35]">Anwendungsbereich</h3>
        <p className="mt-2 text-sm text-slate-700">{entry.applicationAreaWorkplace}</p>
      </section>
    </article>
  );
}
