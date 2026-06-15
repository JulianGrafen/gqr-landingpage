import type { Metadata } from 'next';
import { ExcelVorlageSiloPage } from '@/components/seo-silo/pages/ExcelVorlageSiloPage';
import { EXCEL_VORLAGE_SILO_CONFIG } from '@/config/seo-silo/pages/gefahrstoffverzeichnis-excel-vorlage';
import { SITE_URL } from '@/config/site-seo';

const canonical = `${SITE_URL}${EXCEL_VORLAGE_SILO_CONFIG.seo.canonicalPath}`;

export const metadata: Metadata = {
  title: EXCEL_VORLAGE_SILO_CONFIG.seo.title,
  description: EXCEL_VORLAGE_SILO_CONFIG.seo.description,
  alternates: { canonical },
  openGraph: {
    title: EXCEL_VORLAGE_SILO_CONFIG.seo.title,
    description: EXCEL_VORLAGE_SILO_CONFIG.seo.description,
    url: canonical,
    siteName: 'Gefahrstoff-QR',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: EXCEL_VORLAGE_SILO_CONFIG.seo.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: EXCEL_VORLAGE_SILO_CONFIG.seo.title,
    description: EXCEL_VORLAGE_SILO_CONFIG.seo.description,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function GefahrstoffverzeichnisExcelVorlagePage() {
  return <ExcelVorlageSiloPage />;
}
