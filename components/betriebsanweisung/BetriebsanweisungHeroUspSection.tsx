import { SlugHeroUspSection } from '@/components/programmatic-seo/SlugHeroUspSection';
import { BETRIEBSANWEISUNG_HERO_USP_BULLETS } from '@/config/betriebsanweisung/hero-copy';

/** USP-Checkliste im Hero (1:1 Stil wie Startseite `HeroInnerTrustSection`). */
export function BetriebsanweisungHeroUspSection({ className }: { className?: string }) {
  return (
    <SlugHeroUspSection
      bullets={BETRIEBSANWEISUNG_HERO_USP_BULLETS}
      headingId="ba-hero-benefits-title"
      title="Vorteile für Betriebsanweisungen"
      className={className}
    />
  );
}
