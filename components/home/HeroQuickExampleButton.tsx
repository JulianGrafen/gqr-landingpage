import { HERO_QUICK_EXAMPLE_CTA_LABEL, LIVE_DEMO_ANCHOR_ID } from '@/config/home-sections/hero';

type Props = {
  anchorId?: string;
  className?: string;
};

/**
 * Hero: 1-Klick „Beispiel-SDB testen“ (statisches HTML; Klick in scripts/sdb-preview-mount).
 */
export function HeroQuickExampleButton({
  anchorId = LIVE_DEMO_ANCHOR_ID,
  className = 'btn-cta-orange sds-hero__quick-example',
}: Props) {
  return (
    <button
      type="button"
      className={className}
      data-hero-quick-example="true"
      data-hero-quick-example-anchor={anchorId}
    >
      {HERO_QUICK_EXAMPLE_CTA_LABEL}
    </button>
  );
}