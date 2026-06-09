import type { Metadata } from 'next';
import { VorlageLandingPage } from '@/components/lead-magnet/VorlageLandingPage';
import {
  VORLAGE_LANDING_PATH,
  VORLAGE_LANDING_SEO,
} from '@/config/vorlage-landing';
import { SITE_URL } from '@/config/site-seo';

const canonical = `${SITE_URL}${VORLAGE_LANDING_PATH}`;

export const metadata: Metadata = {
  title: VORLAGE_LANDING_SEO.title,
  description: VORLAGE_LANDING_SEO.description,
  alternates: { canonical },
  openGraph: {
    title: VORLAGE_LANDING_SEO.title,
    description: VORLAGE_LANDING_SEO.description,
    url: canonical,
    siteName: 'Gefahrstoff-QR',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: VORLAGE_LANDING_SEO.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: VORLAGE_LANDING_SEO.title,
    description: VORLAGE_LANDING_SEO.description,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function GefahrstoffverzeichnisExcelVorlagePage() {
  return <VorlageLandingPage />;
}
