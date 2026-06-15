import type { Metadata } from 'next';
import { GefahrstoffAppSiloPage } from '@/components/seo-silo/pages/GefahrstoffAppSiloPage';
import {
  GEFAHrstoff_APP_SILO_CONFIG,
  GEFAHrstoff_APP_SILO_PATH,
} from '@/config/seo-silo/pages/gefahrstoff-app';
import { SITE_URL } from '@/config/site-seo';

const canonical = `${SITE_URL}${GEFAHrstoff_APP_SILO_PATH}`;

export const metadata: Metadata = {
  title: GEFAHrstoff_APP_SILO_CONFIG.seo.title,
  description: GEFAHrstoff_APP_SILO_CONFIG.seo.description,
  alternates: { canonical },
  openGraph: {
    title: GEFAHrstoff_APP_SILO_CONFIG.seo.title,
    description: GEFAHrstoff_APP_SILO_CONFIG.seo.description,
    url: canonical,
    siteName: 'Gefahrstoff-QR',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: GEFAHrstoff_APP_SILO_CONFIG.seo.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: GEFAHrstoff_APP_SILO_CONFIG.seo.title,
    description: GEFAHrstoff_APP_SILO_CONFIG.seo.description,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function GefahrstoffAppPage() {
  return <GefahrstoffAppSiloPage />;
}
