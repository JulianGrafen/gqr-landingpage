import type { ExcelVsQrComparisonCopy } from '@/config/blog-cro/types';
import { ArticleCtaButton } from './ArticleCtaButton';

type ExcelVsQrComparisonProps = {
  copy: ExcelVsQrComparisonCopy;
};

/**
 * Vergleichstabelle für statische Blog-Artikel. Ab 640 px echte Tabelle; darunter stapelt CSS
 * jede Zeile als Karte, Spaltennamen kommen aus `data-label` (kein horizontales Scrollen).
 */
export function ExcelVsQrComparison({ copy }: ExcelVsQrComparisonProps) {
  return (
    <section className="article-compare" aria-label={copy.heading}>
      <h3>{copy.heading}</h3>
      <div className="article-compare__frame">
        <table className="article-compare__table">
          <caption className="article-compare__caption">{copy.caption}</caption>
          <thead>
            <tr>
              <th scope="col">Kriterium</th>
              <th scope="col">{copy.excelColumnTitle}</th>
              <th scope="col" className="article-compare__col--highlight">
                {copy.qrColumnTitle}
              </th>
            </tr>
          </thead>
          <tbody>
            {copy.rows.map((row) => (
              <tr key={row.criterion}>
                <th scope="row">{row.criterion}</th>
                <td data-label={copy.excelColumnTitle}>{row.excel}</td>
                <td data-label={copy.qrColumnTitle} className="article-compare__col--highlight">
                  {row.extraction}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {copy.cta ? (
        <div className="article-cta__actions">
          <ArticleCtaButton cta={copy.cta} variant="primary" />
        </div>
      ) : null}
    </section>
  );
}
