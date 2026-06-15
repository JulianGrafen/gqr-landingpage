import type { Metadata } from 'next';
import { GefahrstoffkatasterSoftwareSiloPage } from '@/components/seo-silo/pages/GefahrstoffkatasterSoftwareSiloPage';
import {
  KATASTER_SOFTWARE_SILO_CONFIG,
  KATASTER_SOFTWARE_SILO_PATH,
} from '@/config/seo-silo/pages/gefahrstoffkataster-software';
import { SITE_URL } from '@/config/site-seo';

const canonical = `${SITE_URL}${KATASTER_SOFTWARE_SILO_PATH}`;

export const metadata: Metadata = {
  title: KATASTER_SOFTWARE_SILO_CONFIG.seo.title,
  description: KATASTER_SOFTWARE_SILO_CONFIG.seo.description,
  alternates: { canonical },
  openGraph: {
    title: KATASTER_SOFTWARE_SILO_CONFIG.seo.title,
    description: KATASTER_SOFTWARE_SILO_CONFIG.seo.description,
    url: canonical,
    siteName: 'Gefahrstoff-QR',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: KATASTER_SOFTWARE_SILO_CONFIG.seo.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: KATASTER_SOFTWARE_SILO_CONFIG.seo.title,
    description: KATASTER_SOFTWARE_SILO_CONFIG.seo.description,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function GefahrstoffkatasterSoftwarePage() {
  return <GefahrstoffkatasterSoftwareSiloPage />;
}
