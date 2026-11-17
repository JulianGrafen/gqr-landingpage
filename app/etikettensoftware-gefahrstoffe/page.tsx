import type { Metadata } from 'next';
import { EtikettensoftwareSiloPage } from '@/components/seo-silo/pages/EtikettensoftwareSiloPage';
import {
  ETIKETTEN_SILO_CONFIG,
  ETIKETTEN_SILO_PATH,
} from '@/config/seo-silo/pages/etikettensoftware-gefahrstoffe';
import { SITE_URL } from '@/config/site-seo';

const canonical = `${SITE_URL}${ETIKETTEN_SILO_PATH}`;

export const metadata: Metadata = {
  title: ETIKETTEN_SILO_CONFIG.seo.title,
  description: ETIKETTEN_SILO_CONFIG.seo.description,
  alternates: { canonical },
  openGraph: {
    title: ETIKETTEN_SILO_CONFIG.seo.title,
    description: ETIKETTEN_SILO_CONFIG.seo.description,
    url: canonical,
    siteName: 'Gefahrstoff-QR',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: ETIKETTEN_SILO_CONFIG.seo.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: ETIKETTEN_SILO_CONFIG.seo.title,
    description: ETIKETTEN_SILO_CONFIG.seo.description,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function EtikettensoftwareGefahrstoffePage() {
  return <EtikettensoftwareSiloPage />;
}
