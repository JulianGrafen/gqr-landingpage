import type { PricingCompareCell } from '@/config/home-sections/pricing-compare';

export function PricingCompareCellContent({ cell }: { cell: PricingCompareCell }) {
  if (cell.kind === 'dash') {
    return (
      <span className="pricing-compare__dash" aria-hidden="true">
        &ndash;
      </span>
    );
  }
  if (cell.kind === 'yes') {
    return (
      <span className="pricing-compare__yes" aria-label={cell.ariaLabel ?? 'Ja'}>
        &#10003;
      </span>
    );
  }
  if (cell.kind === 'no') {
    return (
      <>
        <span className="pricing-compare__no" aria-label={cell.ariaLabel ?? 'Nein'}>
          &#10007;
        </span>
        {cell.suffix ? ` ${cell.suffix}` : null}
      </>
    );
  }
  return <>{cell.value}</>;
}