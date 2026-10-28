import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';

type Props = {
  entry: HazardousSubstanceSeoEntry;
};

/** Nur Identifikation — keine CAS oder Einstufungsdaten. */
export function BetriebsanweisungSubstanceTable({ entry }: Props) {
  return (
    <table className="w-full text-left text-sm">
      <tbody>
        <tr className="border-b border-slate-200">
          <th scope="row" className="px-4 py-3 font-semibold text-slate-600">
            Stoff / Produkt
          </th>
          <td className="px-4 py-3 text-slate-800">{entry.substanceName}</td>
        </tr>
        <tr>
          <th scope="row" className="px-4 py-3 font-semibold text-slate-600">
            Branchen (typisch)
          </th>
          <td className="px-4 py-3 text-slate-800">{entry.typicalIndustries.join(', ')}</td>
        </tr>
      </tbody>
    </table>
  );
}
