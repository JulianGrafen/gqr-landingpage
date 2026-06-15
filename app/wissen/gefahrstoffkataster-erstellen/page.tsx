import type { Metadata } from 'next';
import { GefahrstoffkatasterErstellenSiloPage } from '@/components/seo-silo/pages/GefahrstoffkatasterErstellenSiloPage';
import {
  KATASTER_ERSTELLEN_SILO_CONFIG,
  KATASTER_ERSTELLEN_SILO_PATH,
} from '@/config/seo-silo/pages/gefahrstoffkataster-erstellen';
import { SITE_URL } from '@/config/site-seo';

const canonical = `${SITE_URL}${KATASTER_ERSTELLEN_SILO_PATH}`;

export const metadata: Metadata = {
  title: KATASTER_ERSTELLEN_SILO_CONFIG.seo.title,
  description: KATASTER_ERSTELLEN_SILO_CONFIG.seo.description,
  alternates: { canonical },
  openGraph: {
    title: KATASTER_ERSTELLEN_SILO_CONFIG.seo.title,
    description: KATASTER_ERSTELLEN_SILO_CONFIG.seo.description,
    url: canonical,
    siteName: 'Gefahrstoff-QR',
    locale: 'de_DE',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: KATASTER_ERSTELLEN_SILO_CONFIG.seo.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: KATASTER_ERSTELLEN_SILO_CONFIG.seo.title,
    description: KATASTER_ERSTELLEN_SILO_CONFIG.seo.description,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function GefahrstoffkatasterErstellenPage() {
  return <GefahrstoffkatasterErstellenSiloPage />;
}
