import { HeroBenefitBullets } from '@/components/home/HeroBenefitBullets';

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
  return (
    <HeroBenefitBullets bullets={bullets} headingId={headingId} title={title} className={className} />
  );
}
