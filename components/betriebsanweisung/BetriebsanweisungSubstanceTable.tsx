import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import { formatCasDisplay } from '@/config/betriebsanweisung/registry';

type Props = {
  entry: HazardousSubstanceSeoEntry;
};

export function BetriebsanweisungSubstanceTable({ entry }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <caption className="sr-only">Stoffdaten {entry.substanceName}</caption>
        <tbody className="divide-y divide-slate-100 bg-white">
          <tr>
            <th scope="row" className="whitespace-nowrap bg-slate-50 px-4 py-3 font-semibold text-slate-700">
              Stoff / Produkt
            </th>
            <td className="px-4 py-3 text-slate-800">{entry.substanceName}</td>
          </tr>
          <tr>
            <th scope="row" className="whitespace-nowrap bg-slate-50 px-4 py-3 font-semibold text-slate-700">
              CAS / Gemisch
            </th>
            <td className="px-4 py-3 text-slate-800">{formatCasDisplay(entry.casNumber)}</td>
          </tr>
          <tr>
            <th scope="row" className="whitespace-nowrap bg-slate-50 px-4 py-3 font-semibold text-slate-700">
              Signalwort (typisch)
            </th>
            <td className="px-4 py-3 text-slate-800">{entry.signalWord}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
