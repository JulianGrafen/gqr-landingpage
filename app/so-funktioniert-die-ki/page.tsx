import type { Metadata } from 'next';
import { LandingProseSection } from '@/components/seo-silo/LandingProseSection';
import { PipelineDiagram } from '@/components/trust/PipelineDiagram';
import { TrustChecklist } from '@/components/trust/TrustChecklist';
import { TrustPageShell } from '@/components/trust/TrustPageShell';
import {
  KI_BOUNDARIES,
  KI_BOUNDARIES_SECTION,
  KI_FAQ_TITLE,
  KI_PIPELINE_PAGE,
  KI_PIPELINE_SECTION,
  KI_PIPELINE_STAGES,
} from '@/config/trust/ki-pipeline';
import { buildPageMetadata } from '@/lib/seo/build-page-metadata';

export const metadata: Metadata = buildPageMetadata({
  path: KI_PIPELINE_PAGE.path,
  ...KI_PIPELINE_PAGE.seo,
});

export default function SoFunktioniertDieKiPage() {
  return (
    <TrustPageShell config={KI_PIPELINE_PAGE} pageId="ki-pipeline" faqTitle={KI_FAQ_TITLE}>
      <LandingProseSection {...KI_PIPELINE_SECTION} variant="raised" layout="blocks">
        <PipelineDiagram stages={KI_PIPELINE_STAGES} ariaLabel="Vier Stufen der KI-gestützten SDB-Prüfung" />
      </LandingProseSection>

      <LandingProseSection {...KI_BOUNDARIES_SECTION} layout="blocks">
        <div className="mx-auto max-w-3xl">
          <TrustChecklist items={KI_BOUNDARIES} tone="excluded" ariaLabel="Ausdrückliche Grenzen der KI" />
        </div>
      </LandingProseSection>
    </TrustPageShell>
  );
}
