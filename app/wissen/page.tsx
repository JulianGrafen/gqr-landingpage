import type { Metadata } from 'next';
import { WissenHubPage } from '@/components/wissen/WissenHubPage';
import { WISSEN_HUB_GEMINI_CRO } from '@/config/seo/gemini-cro-2026-11-26';
import { getBlogPosts } from '@/lib/blog/getBlogPosts';
import { getAllDeepinfoSummaries } from '@/lib/wissen/deepinfo-loader';
import { buildMetadata } from '@/lib/seo/buildMetadata';

export const metadata: Metadata = buildMetadata({
  path: '/wissen/',
  title: WISSEN_HUB_GEMINI_CRO.title,
  description: WISSEN_HUB_GEMINI_CRO.description,
  ogImageAlt: 'Gefahrstoff-Wissen, Leitfäden und Blog für KMU und SiFa',
  ogType: 'website',
});

export default function WissenIndexPage() {
  const deepinfoPages = getAllDeepinfoSummaries();
  const blogPosts = getBlogPosts();

  return <WissenHubPage deepinfoPages={deepinfoPages} blogPosts={blogPosts} />;
}