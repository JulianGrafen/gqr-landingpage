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
  tone?: 'light' | 'dark';
};

/**
 * Responsive Vergleich — Desktop: Tabelle, schmale Viewports: horizontales Scrollen.
 */
export function ComparisonTable({
  leftColumnTitle,
  rightColumnTitle,
  rows,
  caption = 'Vergleich der Ansätze',
  tone = 'light',
}: ComparisonTableProps) {
  const isDark = tone === 'dark';
  const border = isDark ? 'border-white/10' : 'border-slate-200';
  const headBg = isDark ? 'bg-gqr-raised' : 'bg-slate-100';
  const headText = isDark ? 'text-gqr-text' : 'text-slate-800';
  const rowBg = isDark ? 'bg-gqr-surface/80' : 'bg-white';
  const rowText = isDark ? 'text-gqr-muted' : 'text-slate-600';
  const criterionText = isDark ? 'text-gqr-soft' : 'text-slate-800';
  const gqrBg = isDark ? 'bg-gqr-accent/12' : 'bg-gqr-accent/10';
  const gqrText = isDark ? 'text-gqr-text' : 'text-slate-700';

  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
      <table className="w-full min-w-[36rem] border-separate border-spacing-0 text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th
              scope="col"
              className={`rounded-tl-2xl border border-b-0 ${border} ${headBg} px-4 py-3.5 font-bold ${headText} sm:px-5`}
            >
              Kriterium
            </th>
            <th
              scope="col"
              className={`border border-b-0 border-l-0 ${border} ${headBg} px-4 py-3.5 font-bold ${headText} sm:px-5`}
            >
              {leftColumnTitle}
            </th>
            <th
              scope="col"
              className={`rounded-tr-2xl border border-b-0 border-l-0 ${border} ${gqrBg} px-4 py-3.5 font-bold ${headText} sm:px-5`}
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
                  className={`border ${border} ${rowBg} px-4 py-3.5 font-semibold ${criterionText} sm:px-5 ${roundedBL}`}
                >
                  {row.criterion}
                </th>
                <td className={`border border-l-0 ${border} ${rowBg} px-4 py-3.5 ${rowText} sm:px-5`}>
                  {row.excel}
                </td>
                <td
                  className={`border border-l-0 ${border} ${gqrBg} px-4 py-3.5 ${gqrText} sm:px-5 ${roundedBR}`}
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
