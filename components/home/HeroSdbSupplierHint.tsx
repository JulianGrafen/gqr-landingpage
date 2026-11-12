import { HERO_SDB_SUPPLIER_HINT } from '@/config/home-sections/hero-sdb-supplier-hint';

/** Typo-Hinweis unter #live-demo (keine geschützten Logos). */
export function HeroSdbSupplierHint() {
  const { intro, brands, brandsAriaLabel } = HERO_SDB_SUPPLIER_HINT;

  return (
    <aside className="sds-hero__sdb-suppliers" aria-label="SDB-Formatkompatibilität">
      <p className="sds-hero__sdb-suppliers-intro">{intro}</p>
      <p className="sds-hero__sdb-suppliers-brands" aria-label={brandsAriaLabel}>
        {brands.map((name, index) => (
          <span key={name}>
            {index > 0 ? (
              <span className="sds-hero__sdb-suppliers-dot" aria-hidden="true">
                {' · '}
              </span>
            ) : null}
            <span className="sds-hero__sdb-suppliers-name">{name}</span>
          </span>
        ))}
      </p>
    </aside>
  );
}
