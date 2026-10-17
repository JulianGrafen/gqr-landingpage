import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import { formatCasDisplay } from '@/config/betriebsanweisung/registry';
import { BetriebsanweisungFaqSection } from '@/components/betriebsanweisung/BetriebsanweisungFaqSection';
import { formatAgwField, formatExpertDataField } from '@/lib/betriebsanweisung/format-expert-field';

type Props = {
  entry: HazardousSubstanceSeoEntry;
};

export function BetriebsanweisungExpertSeoSection({ entry }: Props) {
  return (
    <div className="space-y-12">
      <section aria-labelledby="chem-data-heading">
        <h2 id="chem-data-heading" className="text-2xl font-bold text-[#f0f6ff]">
          Chemisch-physikalische Daten
        </h2>
        <p className="mt-2 text-sm text-[#8fa4c0]">
          Typische Literatur- bzw. SDB-Werte für {entry.substanceName}. {entry.classificationBasis}
        </p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <tbody className="divide-y divide-white/5 bg-[#162340]/40">
              <tr>
                <th scope="row" className="whitespace-nowrap bg-white/[0.03] px-4 py-3 font-semibold text-[#c8d4e6]">
                  CAS-Nummer
                </th>
                <td className="px-4 py-3 text-[#f0f6ff]">{formatCasDisplay(entry.casNumber)}</td>
              </tr>
              <tr>
                <th scope="row" className="whitespace-nowrap bg-white/[0.03] px-4 py-3 font-semibold text-[#c8d4e6]">
                  EG-Nummer
                </th>
                <td className="px-4 py-3 text-[#f0f6ff]">{formatExpertDataField(entry.ecNumber)}</td>
              </tr>
              {entry.chemicalFormula ? (
                <tr>
                  <th scope="row" className="whitespace-nowrap bg-white/[0.03] px-4 py-3 font-semibold text-[#c8d4e6]">
                    Summenformel
                  </th>
                  <td className="px-4 py-3 text-[#f0f6ff]">{entry.chemicalFormula}</td>
                </tr>
              ) : null}
              <tr>
                <th scope="row" className="whitespace-nowrap bg-white/[0.03] px-4 py-3 font-semibold text-[#c8d4e6]">
                  Flammpunkt
                </th>
                <td className="px-4 py-3 text-[#f0f6ff]">{formatExpertDataField(entry.flashPoint)}</td>
              </tr>
              <tr>
                <th scope="row" className="whitespace-nowrap bg-white/[0.03] px-4 py-3 font-semibold text-[#c8d4e6]">
                  Zündtemperatur
                </th>
                <td className="px-4 py-3 text-[#f0f6ff]">{formatExpertDataField(entry.ignitionTemperature)}</td>
              </tr>
              <tr>
                <th scope="row" className="whitespace-nowrap bg-white/[0.03] px-4 py-3 font-semibold text-[#c8d4e6]">
                  AGW (TRGS 900)
                </th>
                <td className="px-4 py-3 text-[#f0f6ff]">{formatAgwField(entry.agwTrgs900)}</td>
              </tr>
              <tr>
                <th scope="row" className="whitespace-nowrap bg-white/[0.03] px-4 py-3 font-semibold text-[#c8d4e6]">
                  Typische PSA (Auszug)
                </th>
                <td className="px-4 py-3 text-[#f0f6ff]">{entry.specificPpeAdvice}</td>
              </tr>
              <tr>
                <th scope="row" className="whitespace-nowrap bg-white/[0.03] px-4 py-3 font-semibold text-[#c8d4e6]">
                  Häufige PSA-Fehler
                </th>
                <td className="px-4 py-3 text-[#f0f6ff]">{entry.typicalPpeMistake}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="trgs510-heading">
        <h2 id="trgs510-heading" className="text-2xl font-bold text-[#f0f6ff]">
          Gefahrstofflagerung nach TRGS 510
        </h2>
        <p className="mt-2 text-sm text-[#8fa4c0]">
          Lagerklasse: <strong className="text-[#f0f6ff]">{entry.storageClassTrgs510}</strong>
        </p>
        <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-[#ff6b35]">
          Zusammenlagerungsverbote (Auszug)
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#c8d4e6]" role="list">
          {entry.trgs510Storage.zusammenlagerungsverbote.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-[#ff6b35]">
          Sicherheitsschränke &amp; Lagerung
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#c8d4e6]">{entry.trgs510Storage.safetyCabinetNotes}</p>
      </section>

      <section aria-labelledby="sifa-heading">
        <h2 id="sifa-heading" className="text-2xl font-bold text-[#f0f6ff]">
          Praxis-Leitfaden für SiFas &amp; Arbeitgeber
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#c8d4e6]">
          <p>
            Der KI-gestützte Entwurf (gemäß TRGS 555) für {entry.substanceName} unterstützt bei der
            Erstellung — ersetzt aber nicht die Pflicht, Gefährdungen am{' '}
            <strong className="text-[#f0f6ff]">konkreten Arbeitsplatz</strong> zu beurteilen, Maßnahmen
            festzulegen und die Betriebsanweisung betrieblich anzupassen (§ 14 GefStoffV).
          </p>
          <p>
            Universelle Vorlagen ohne Prüfung durch die{' '}
            <strong className="text-[#f0f6ff]">SiFa / den Arbeitgeber</strong> sind nicht zulässig: Verfahren,
            Mengen, Lüftung, Nachbarstoffe und SDB Ihres Lieferanten müssen eingehen. Die Vorprüfung zur
            fachlichen Freigabe dokumentieren Sie im Gefahrstoffverzeichnis (§ 6 Abs. 12 GefStoffV) und in
            der Unterweisung (§ 14 Abs. 2 GefStoffV).
          </p>
        </div>
      </section>

      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-bold text-[#f0f6ff]">
          Häufige Fragen zu {entry.substanceName}
        </h2>
        <div className="mt-6">
          <BetriebsanweisungFaqSection items={entry.faqItems} variant="dark" />
        </div>
      </section>
    </div>
  );
}
