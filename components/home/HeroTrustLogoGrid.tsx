import { SecurityTrustBadgeList } from '@/components/home/SecurityTrustBadgeList';
import { HOME_HERO } from '@/config/home-sections/hero';

/** Sicherheits-Badges unter Live-Demo (Regelwerk: `HeroRegelwerkStrip` unter ROI). */
export function HeroTrustLogoGrid() {
  return (
    <SecurityTrustBadgeList
      badges={HOME_HERO.trustBadges}
      className="sds-hero__trust sds-hero__trust--above-logos"
    />
  );
}
