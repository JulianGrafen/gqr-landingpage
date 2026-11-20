import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LandingProseSection } from '@/components/seo-silo/LandingProseSection';
import { LandingStepsSection } from '@/components/seo-silo/LandingStepsSection';
import { CaseStudyFactsCard } from '@/components/trust/CaseStudyFactsCard';
import { FactComparisonTable } from '@/components/trust/FactComparisonTable';
import { TrustPageShell } from '@/components/trust/TrustPageShell';
import {
  buildCaseStudyFacts,
  buildCaseStudyMetricsTable,
  buildCaseStudyPageConfig,
  buildCaseStudySteps,
  CASE_STUDY_SECTIONS,
  isCaseStudyIndexable,
} from '@/config/trust/case-study-page';
import { CASE_STUDIES, getCaseStudyBySlug } from '@/data/caseStudies';
import { buildTrustPageMetadata } from '@/lib/trust/build-trust-page-metadata';

type CaseStudyPageProps = {
  params: { slug: string };
};

/** Static Export: nur bekannte Slugs. Entwürfe werden gebaut (Review-Link), aber noindex. */
export const dynamicParams = false;

export function generateStaticParams(): CaseStudyPageProps['params'][] {
  return CASE_STUDIES.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export function generateMetadata({ params }: CaseStudyPageProps): Metadata {
  const caseStudy = getCaseStudyBySlug(params.slug);
  if (!caseStudy) return {};
  return buildTrustPageMetadata(buildCaseStudyPageConfig(caseStudy), {
    indexable: isCaseStudyIndexable(caseStudy),
  });
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = getCaseStudyBySlug(params.slug);
  if (!caseStudy) notFound();

  const config = buildCaseStudyPageConfig(caseStudy);

  return (
    <TrustPageShell
      config={config}
      pageId="praxisbeispiele"
      heroAside={<CaseStudyFactsCard facts={buildCaseStudyFacts(caseStudy)} isAnonymized={caseStudy.isAnonymized} />}
    >
      <LandingProseSection {...CASE_STUDY_SECTIONS.challenge} intro={caseStudy.challenge.summary}>
        <ul>
          {caseStudy.challenge.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </LandingProseSection>

      <LandingStepsSection {...CASE_STUDY_SECTIONS.solution} steps={buildCaseStudySteps(caseStudy)} />

      {caseStudy.beforeAfterMetrics.length > 0 ? (
        <LandingProseSection {...CASE_STUDY_SECTIONS.metrics} layout="blocks">
          <FactComparisonTable table={buildCaseStudyMetricsTable(caseStudy)} />
        </LandingProseSection>
      ) : null}

      {caseStudy.quote ? (
        <LandingProseSection {...CASE_STUDY_SECTIONS.quote} variant="raised">
          <figure className="m-0">
            <blockquote>
              <p>{caseStudy.quote.text}</p>
            </blockquote>
            <figcaption>
              {caseStudy.quote.authorName ? `${caseStudy.quote.authorName}, ` : ''}
              {caseStudy.quote.authorRole}
            </figcaption>
          </figure>
        </LandingProseSection>
      ) : null}
    </TrustPageShell>
  );
}
