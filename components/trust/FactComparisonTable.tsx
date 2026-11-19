import type { FactTable } from '@/config/trust/types';

type FactComparisonTableProps = {
  table: FactTable;
};

/**
 * Semantische Faktentabelle (Zeilenkopf + n Wertespalten), Optik wie ComparisonTable (tone="dark").
 * Für Faktenblätter (2 Spalten) und Vorher/Nachher-Vergleiche (3 Spalten).
 */
export function FactComparisonTable({ table }: FactComparisonTableProps) {
  const lastRowIndex = table.rows.length - 1;
  const lastColumnIndex = table.columnLabels.length - 1;

  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
      <table className="w-full min-w-[32rem] border-separate border-spacing-0 text-left text-sm">
        <caption className="sr-only">{table.caption}</caption>
        <thead>
          <tr>
            {table.columnLabels.map((label, columnIndex) => (
              <th
                key={label}
                scope="col"
                className={[
                  'border border-white/10 bg-gqr-raised px-4 py-3.5 font-bold text-gqr-text sm:px-5',
                  columnIndex > 0 ? 'border-l-0' : 'rounded-tl-2xl',
                  columnIndex === lastColumnIndex ? 'rounded-tr-2xl' : '',
                ].join(' ')}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => {
            const isLastRow = rowIndex === lastRowIndex;
            return (
              <tr key={row.label}>
                <th
                  scope="row"
                  className={[
                    'border border-t-0 border-white/10 bg-gqr-surface/80 px-4 py-3.5 align-top font-semibold text-gqr-text sm:px-5',
                    isLastRow ? 'rounded-bl-2xl' : '',
                  ].join(' ')}
                >
                  {row.label}
                </th>
                {row.values.map((value, valueIndex) => (
                  <td
                    key={`${row.label}-${valueIndex}`}
                    className={[
                      'border border-l-0 border-t-0 border-white/10 bg-gqr-surface/80 px-4 py-3.5 align-top leading-relaxed text-gqr-muted sm:px-5',
                      isLastRow && valueIndex === row.values.length - 1 ? 'rounded-br-2xl' : '',
                    ].join(' ')}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
