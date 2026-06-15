export { LandingPageWrapper } from '@/components/seo-silo/LandingPageWrapper';
export { LandingHeroSection } from '@/components/seo-silo/LandingHeroSection';
export { LandingHeroLeadMagnet } from '@/components/seo-silo/LandingHeroLeadMagnet';
export { LandingHeroWithMedia } from '@/components/seo-silo/LandingHeroWithMedia';
export { LandingRoiSection } from '@/components/seo-silo/LandingRoiSection';
export { LandingCtaLink } from '@/components/seo-silo/LandingCtaLink';
export { LandingFeatureGrid } from '@/components/seo-silo/LandingFeatureGrid';
export { LandingFaqSection } from '@/components/seo-silo/LandingFaqSection';
export { LandingCtaBand } from '@/components/seo-silo/LandingCtaBand';
export { LandingProseSection } from '@/components/seo-silo/LandingProseSection';
export { LandingSeoJsonLd } from '@/components/seo-silo/LandingSeoJsonLd';
export { ExcelVorlageSiloPage } from '@/components/seo-silo/pages/ExcelVorlageSiloPage';
export { GefahrstoffkatasterSoftwareSiloPage } from '@/components/seo-silo/pages/GefahrstoffkatasterSoftwareSiloPage';
export { GefahrstoffAppSiloPage } from '@/components/seo-silo/pages/GefahrstoffAppSiloPage';
export { GefahrstoffkatasterErstellenSiloPage } from '@/components/seo-silo/pages/GefahrstoffkatasterErstellenSiloPage';
export { LandingSplitMediaSection } from '@/components/seo-silo/LandingSplitMediaSection';
export { LandingStepsSection } from '@/components/seo-silo/LandingStepsSection';

export type {
  SeoSiloPageConfig,
  SeoSiloFaqItem,
  SeoSiloFeature,
  SeoSiloStep,
  SeoSiloHero,
  SeoSiloClosingCta,
  SeoSiloIntent,
  SeoSiloSchemaBundle,
  SoftwareApplicationSchemaConfig,
} from '@/config/seo-silo/types';

export {
  buildFaqPageSchema,
  buildSoftwareApplicationSchema,
  buildLandingSchemaBundle,
} from '@/lib/seo/build-landing-schema';

export { getSiloRegistry, getSiloBySlug, getSiloByPath } from '@/lib/seo/silo-registry';
