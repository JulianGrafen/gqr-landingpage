export type ComparisonRow = {
  criterion: string;
  excel: string;
  extraction: string;
};

type ComparisonTableProps = {
  leftColumnTitle: string;
  rightColumnTitle: string;
  rows: ComparisonRow[];
  caption?: string;
};

/**
 * Responsive Vergleich — Desktop: Tabelle, schmale Viewports: horizontales Scrollen.
 */
export function ComparisonTable({
  leftColumnTitle,
  rightColumnTitle,
  rows,
  caption = 'Vergleich der Ansätze',
}: ComparisonTableProps) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
      <table className="w-full min-w-[36rem] border-separate border-spacing-0 text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="rounded-tl-2xl border border-b-0 border-slate-200 bg-slate-100 px-4 py-3.5 font-bold text-slate-800 sm:px-5"
            >
              Kriterium
            </th>
            <th
              scope="col"
              className="border border-b-0 border-l-0 border-slate-200 bg-slate-100 px-4 py-3.5 font-bold text-slate-800 sm:px-5"
            >
              {leftColumnTitle}
            </th>
            <th
              scope="col"
              className="rounded-tr-2xl border border-b-0 border-l-0 border-slate-200 bg-[#ff6b35]/10 px-4 py-3.5 font-bold text-slate-900 sm:px-5"
            >
              {rightColumnTitle}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isLast = i === rows.length - 1;
            const roundedBL = isLast ? 'rounded-bl-2xl' : '';
            const roundedBR = isLast ? 'rounded-br-2xl' : '';
            return (
              <tr key={row.criterion}>
                <th
                  scope="row"
                  className={`border border-slate-200 bg-white px-4 py-3.5 font-semibold text-slate-800 sm:px-5 ${roundedBL}`}
                >
                  {row.criterion}
                </th>
                <td className="border border-l-0 border-slate-200 bg-white px-4 py-3.5 text-slate-600 sm:px-5">
                  {row.excel}
                </td>
                <td
                  className={`border border-l-0 border-slate-200 bg-slate-50/80 px-4 py-3.5 text-slate-700 sm:px-5 ${roundedBR}`}
                >
                  {row.extraction}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
