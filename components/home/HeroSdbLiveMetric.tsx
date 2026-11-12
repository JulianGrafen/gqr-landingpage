import { HERO_SDB_LIVE_METRIC } from '@/config/home-sections/hero-sdb-metric';

/** Harte Systemmetrik mit Count-up (gesteuert durch scripts/hero-sdb-metric-countup.js). */
export function HeroSdbLiveMetric() {
  const { prefix, count, suffix, suffixLabel, ariaLabel } = HERO_SDB_LIVE_METRIC;

  return (
    <p className="sds-hero__metric" aria-label={ariaLabel}>
      {prefix}{' '}
      <span
        className="sds-hero__metric-count"
        data-sdb-metric-count
        data-count-target={count}
        data-count-suffix={suffix}
      >
        0
      </span>
      {suffixLabel}
    </p>
  );
}
