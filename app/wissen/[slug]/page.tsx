import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DeepinfoPageTemplate } from '@/components/deepinfo/DeepinfoPage';
import { SITE_URL } from '@/config/site-seo';
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

  const canonical = `${SITE_URL}${getDeepinfoCanonicalPath(page.meta.slug as DeepinfoSlug)}`;

  return {
    title: page.meta.title,
    description: page.meta.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: page.meta.title,
      description: page.meta.metaDescription,
      url: canonical,
      siteName: 'Gefahrstoff-QR',
      locale: 'de_DE',
      type: 'article',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: page.meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.meta.title,
      description: page.meta.metaDescription,
      images: ['/og-image.png'],
    },
    robots: { index: true, follow: true },
  };
}

export default function DeepinfoSlugPage({ params }: PageProps) {
  const page = getDeepinfoPage(params.slug);
  if (!page) notFound();

  return <DeepinfoPageTemplate page={page} />;
}
