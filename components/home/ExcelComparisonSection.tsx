import { HOME_SECTION_STYLES as styles } from '@/components/home/home-section-styles';
import { EXCEL_COMPARISON } from '@/config/home-sections/excel-comparison';

const HEADLINE_ID = 'excelComparisonHeadline';

/**
 * Maschinenlesbare Vergleichstabelle (echtes <table> mit <caption>, <th scope>) für AEO und CRO.
 * Nutzt die bestehenden pricing-compare-Klassen aus style.css.
 */
export function ExcelComparisonSection() {
  const { columnLabels } = EXCEL_COMPARISON;

  return (
    <section id={EXCEL_COMPARISON.sectionId} className={styles.section} aria-labelledby={HEADLINE_ID}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{EXCEL_COMPARISON.eyebrow}</p>
          <h2 id={HEADLINE_ID} className={styles.headline}>
            {EXCEL_COMPARISON.headline}
          </h2>
          <p className={styles.lead}>{EXCEL_COMPARISON.intro}</p>
        </header>

        <div className="pricing-compare__scroll" tabIndex={0} role="region" aria-labelledby={HEADLINE_ID}>
          <table className="pricing-compare__table">
            <caption>{EXCEL_COMPARISON.caption}</caption>
            <thead>
              <tr>
                <th scope="col">{columnLabels.criterion}</th>
                <th scope="col">{columnLabels.manualWorkflow}</th>
                <th scope="col" className="pricing-compare__col--highlight">
                  {columnLabels.gefahrstoffQrWorkflow}
                </th>
              </tr>
            </thead>
            <tbody>
              {EXCEL_COMPARISON.rows.map((row) => (
                <tr key={row.criterion}>
                  <th scope="row">{row.criterion}</th>
                  <td>{row.manualWorkflow}</td>
                  <td className="pricing-compare__col--highlight">{row.gefahrstoffQrWorkflow}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
