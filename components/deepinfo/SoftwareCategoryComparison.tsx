import { SOFTWARE_CATEGORY_COMPARISON as comparison } from '@/config/wissen/software-category-comparison';

const CELL = 'border-b border-white/10 px-4 py-3 align-top text-sm leading-relaxed';
const HIGHLIGHT = 'bg-[#ff6b35]/10 text-[#f0f6ff]';

/** Semantische Vergleichstabelle der drei Software-Kategorien (zitierfähig für KI-Suchmaschinen). */
export function SoftwareCategoryComparison() {
  const { columnLabels } = comparison;

  return (
    <section className="gqr-post-section" aria-labelledby={comparison.headingId}>
      <p className="gqr-kicker">Vergleich</p>
      <h2 id={comparison.headingId} className="gqr-post-section-title">
        {comparison.headline}
      </h2>
      <p className="gqr-post-section-sub">{comparison.intro}</p>

      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" tabIndex={0} role="region" aria-label={comparison.caption}>
        <table className="w-full min-w-[44rem] border-collapse text-left text-[#c8d4e6]">
          <caption className="sr-only">{comparison.caption}</caption>
          <thead className="bg-[#162340] text-[#f0f6ff]">
            <tr>
              <th scope="col" className={`${CELL} font-bold`}>
                {columnLabels.criterion}
              </th>
              <th scope="col" className={`${CELL} font-bold`}>
                {columnLabels.manual}
              </th>
              <th scope="col" className={`${CELL} font-bold`}>
                {columnLabels.enterpriseEhs}
              </th>
              <th scope="col" className={`${CELL} font-bold ${HIGHLIGHT}`}>
                {columnLabels.gefahrstoffQr}
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.criterion}>
                <th scope="row" className={`${CELL} font-semibold text-[#f0f6ff]`}>
                  {row.criterion}
                </th>
                <td className={CELL}>{row.manual}</td>
                <td className={CELL}>{row.enterpriseEhs}</td>
                <td className={`${CELL} ${HIGHLIGHT}`}>{row.gefahrstoffQr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
