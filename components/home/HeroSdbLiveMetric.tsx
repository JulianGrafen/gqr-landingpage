import { HERO_SDB_LIVE_METRIC } from '@/config/home-sections/hero-sdb-metric';

/** Proof-Zeile über der Hero-SDB-Dropzone. */
export function HeroSdbLiveMetric() {
  return <p className="sds-hero__metric">{HERO_SDB_LIVE_METRIC.label}</p>;
}
