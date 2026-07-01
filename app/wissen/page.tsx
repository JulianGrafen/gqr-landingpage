import type { Metadata } from 'next';
import { WissenHubPage } from '@/components/wissen/WissenHubPage';
import { getBlogPosts } from '@/lib/blog/getBlogPosts';
import { getAllDeepinfoSummaries } from '@/lib/wissen/deepinfo-loader';
import { SITE_URL } from '@/config/site-seo';

const canonical = `${SITE_URL}/wissen/`;

export const metadata: Metadata = {
  title: 'Wissen: Blog & Gefahrstoff-Leitfäden',
  description:
    'Gefahrstoff-Wissen: Blog-Artikel, Deepinfo-Leitfäden zu GefStoffV, Sicherheitsdatenblatt, TRGS 510 und Gefahrstoffkataster Software — für SiFa und KMU.',
  alternates: { canonical },
  openGraph: {
    title: 'Wissen: Blog & Gefahrstoff-Leitfäden',
    description:
      'Gefahrstoff-Wissen: Blog-Artikel, Deepinfo-Leitfäden zu GefStoffV, Sicherheitsdatenblatt und digitalem Verzeichnis.',
    url: canonical,
    siteName: 'Gefahrstoff-QR',
    locale: 'de_DE',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function WissenIndexPage() {
  const deepinfoPages = getAllDeepinfoSummaries();
  const blogPosts = getBlogPosts();

  return <WissenHubPage deepinfoPages={deepinfoPages} blogPosts={blogPosts} />;
}
