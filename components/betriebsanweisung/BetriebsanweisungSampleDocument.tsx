import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import { formatCasDisplay } from '@/config/betriebsanweisung/registry';
import { GhsPictogramGrid } from '@/components/betriebsanweisung/GhsPictogramGrid';

type Props = {
  entry: HazardousSubstanceSeoEntry;
};

function hStatementBlock(entry: HazardousSubstanceSeoEntry): string {
  return entry.typicalHStatements.map((h) => `${h.code}: ${h.text}`).join('\n');
}

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
        <h2 className="mt-2 text-xl font-black sm:text-2xl">
          Betriebsanweisung — {entry.substanceName}
        </h2>
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

      <div className="divide-y divide-slate-200 text-sm leading-relaxed text-slate-800">
        <section className="px-5 py-4 sm:px-6">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#ff6b35]">
            1. Gefahren für Mensch und Umwelt
          </h3>
          <pre className="mt-2 whitespace-pre-wrap font-sans">{hStatementBlock(entry)}</pre>
          <p className="mt-2 text-xs text-slate-500">{entry.classificationBasis}</p>
        </section>

        <section className="px-5 py-4 sm:px-6">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#ff6b35]">
            2. Schutzmaßnahmen und Verhaltensregeln
          </h3>
          <p className="mt-2">{entry.specificPpeAdvice}</p>
          <p className="mt-2 text-slate-600">
            Nur in gut gelüfteten Bereichen arbeiten. Dampf/Nebel nicht einatmen. Behälter dicht
            halten. Von Hitze, heißen Oberflächen, Funken und offenen Flammen fernhalten — soweit
            für den Stoff relevant (SDB Abschnitt 7/8).
          </p>
        </section>

        <section className="px-5 py-4 sm:px-6">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#ff6b35]">
            3. Verhalten im Gefahrfall
          </h3>
          <p className="mt-2">
            Personen in Sicherheit bringen. Bei auslaufender Flüssigkeit: Absorbieren (unbrennbarer
            Stoff), nicht in Kanalisation. Bei Brand: geeignetes Löschmittel laut SDB — für{' '}
            {entry.substanceName} typischerweise {entry.ghsPictograms.includes('GHS02') ? 'Schaum, CO₂, Pulver (kein Wasserstrahl bei entzündbaren Flüssigkeiten)' : 'Löschmaßnahmen laut SDB Abschnitt 5'}.
          </p>
        </section>

        <section className="px-5 py-4 sm:px-6">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#ff6b35]">4. Erste Hilfe</h3>
          <p className="mt-2">
            Nach Hautkontakt: Sofort mit viel Wasser und Seife abwaschen, kontaminierte Kleidung
            ausziehen. Nach Augenkontakt: Einige Minuten bei geöffnetem Lidspalt ausspülen, ggf.
            Kontaktlinsen entfernen, Arzt konsultieren. Bei Einatmen: Frischluft, bei Beschwerden
            Arzt — exakte Formulierungen aus dem Hersteller-SDB Abschnitt 4 übernehmen.
          </p>
        </section>

        <section className="px-5 py-4 sm:px-6">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#ff6b35]">
            5. Sachgerechte Entsorgung
          </h3>
          <p className="mt-2">
            Reste und verunreinigtes Verpackungsmaterial gemäß SDB Abschnitt 13 entsorgen. Nicht in
            die Kanalisation gelangen lassen. EAK-Code und Entsorgungsweg vom Entsorgungsfachbetrieb
            bestätigen lassen.
          </p>
        </section>
      </div>
    </article>
  );
}
