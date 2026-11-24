import {
  HOME_PRICING_CARD_IDS,
  HOME_PRICING_RECOMMENDED_ID,
  HOME_PRICING_SECTION_MARKETING,
  getHomePricingPlan,
} from '@/config/home-sections/pricing';
import { HOME_PRICING_COMPARE_ROWS } from '@/config/home-sections/pricing-compare';
import { PRICING_STRIPE_CHECKOUT } from '@/config/pricing-stripe-checkout';
import { PricingCompareCellContent } from '@/components/home/PricingCompareCellContent';

export function PricingCompareTable() {
  return (
    <details className="pricing-compare group mt-10">
      <summary className="pricing-compare__toggle">Planvergleich anzeigen</summary>
      <div className="pricing-compare__panel">
        <div className="pricing-compare__scroll" tabIndex={0} role="region" aria-label="Paketvergleich als Tabelle">
          <table className="pricing-compare__table">
            <caption>Vergleich der Pakete KMU Basis, KMU Pro und SiFa Multi-Mandant</caption>
            <thead>
              <tr>
                <th scope="col">Vergleich</th>
                {HOME_PRICING_CARD_IDS.map((id) => {
                  const plan = getHomePricingPlan(id);
                  const highlight = id === HOME_PRICING_RECOMMENDED_ID ? ' pricing-compare__col--highlight' : '';
                  return (
                    <th key={id} scope="col" className={highlight.trim() || undefined}>
                      {plan.name}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Preis</th>
                {HOME_PRICING_CARD_IDS.map((id) => {
                  const plan = getHomePricingPlan(id);
                  const yearlyMonthly = plan.yearlyMonthlyPriceEur ?? plan.monthlyPriceEur;
                  const yearlyTotal = plan.yearlyTotalPriceEur ?? yearlyMonthly * 12;
                  const highlight = id === HOME_PRICING_RECOMMENDED_ID ? ' pricing-compare__col--highlight' : '';
                  return (
                    <td
                      key={id}
                      className={highlight.trim() || undefined}
                      data-pricing-compare-price
                      data-monthly={plan.monthlyPriceEur}
                      data-yearly={yearlyMonthly}
                      data-yearly-total={yearlyTotal}
                    >
                      {yearlyMonthly}&nbsp;&euro;/Monat
                    </td>
                  );
                })}
              </tr>
              {HOME_PRICING_COMPARE_ROWS.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {HOME_PRICING_CARD_IDS.map((id) => {
                    const highlight = id === HOME_PRICING_RECOMMENDED_ID ? ' pricing-compare__col--highlight' : '';
                    return (
                      <td key={id} className={highlight.trim() || undefined}>
                        <PricingCompareCellContent cell={row.cells[id]} />
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <th scope="row">Kostenlos testen</th>
                <td colSpan={HOME_PRICING_CARD_IDS.length}>
                  <a
                    href={HOME_PRICING_SECTION_MARKETING.trialHeadline.href}
                    className="font-semibold text-teal-300 underline-offset-2 hover:underline"
                  >
                    {HOME_PRICING_SECTION_MARKETING.trialHeadline.text}
                  </a>
                  {' — '}
                  {HOME_PRICING_SECTION_MARKETING.compareTrialFootnote}
                </td>
              </tr>
              <tr>
                <th scope="row">Industrie</th>
                <td colSpan={HOME_PRICING_CARD_IDS.length}>
                  {HOME_PRICING_SECTION_MARKETING.compareIndustryFootnote}{' '}
                  <a
                    className="font-semibold text-teal-300 underline-offset-2 hover:underline"
                    href={PRICING_STRIPE_CHECKOUT.industrie.yearly}
                    data-pricing-cta
                    data-pricing-plan="industrie"
                    rel="noopener noreferrer"
                  >
                    {HOME_PRICING_SECTION_MARKETING.industryBar.ctaLabel}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </details>
  );
}