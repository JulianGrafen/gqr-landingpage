import { HeroBenefitBullets } from '@/components/home/HeroBenefitBullets';
import { PSEO_HERO_USP_SECTION_CLASS } from '@/components/programmatic-seo/slug-page-layout';

type SlugHeroUspSectionProps = {
  bullets: readonly string[];
  headingId: string;
  title?: string;
  className?: string;
};

/** Gestapelte USP-Checkliste im Hero (Startseiten-Stil). */
export function SlugHeroUspSection({
  bullets,
  headingId,
  title = 'Zentrale Vorteile',
  className,
}: SlugHeroUspSectionProps) {
  const sectionClass = [PSEO_HERO_USP_SECTION_CLASS, className].filter(Boolean).join(' ');

  return (
    <HeroBenefitBullets bullets={bullets} headingId={headingId} title={title} className={sectionClass} />
  );
}
