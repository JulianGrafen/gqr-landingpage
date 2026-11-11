import { HeroBenefitBullets } from '@/components/home/HeroBenefitBullets';
import { HOME_HERO } from '@/config/home-sections/hero';

/** Nutzen-Bullets in der Hero-Linksspalte (neben ROI-Rechner). */
export function HeroInnerTrustSection() {
  return <HeroBenefitBullets bullets={HOME_HERO.benefitBullets} headingId="heroBenefitsTitle" />;
}
