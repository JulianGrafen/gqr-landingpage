import type { Metadata } from 'next';
import { buildMetadata, withBrandSuffix } from '@/lib/seo/buildMetadata';
import { notFound } from 'next/navigation';
import { DeepinfoPageTemplate } from '@/components/deepinfo/DeepinfoPage';
import {
  getAllDeepinfoSlugs,
  getDeepinfoCanonicalPath,
  getDeepinfoPage,
  type DeepinfoSlug,
} from '@/lib/wissen/deepinfo-loader';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams(): { slug: DeepinfoSlug }[] {
  return getAllDeepinfoSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = getDeepinfoPage(params.slug);
  if (!page) return { title: 'Seite nicht gefunden' };

  return buildMetadata({
    path: getDeepinfoCanonicalPath(page.meta.slug as DeepinfoSlug),
    // documentTitle = exakter SERP-Title; sonst H1 + Marke (nur wenn ins Limit passend).
    title: page.meta.documentTitle ?? withBrandSuffix(page.meta.title),
    socialTitle: page.meta.title,
    description: page.meta.metaDescription,
    ogImageAlt: page.meta.title,
    ogType: 'article',
  });
}

export default function DeepinfoSlugPage({ params }: PageProps) {
  const page = getDeepinfoPage(params.slug);
  if (!page) notFound();

  return <DeepinfoPageTemplate page={page} />;
}
