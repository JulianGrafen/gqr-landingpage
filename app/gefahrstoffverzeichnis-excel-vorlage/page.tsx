import type { Metadata } from 'next';
import { buildSiloMetadata } from '@/lib/seo/build-silo-metadata';
import { ExcelVorlageSiloPage } from '@/components/seo-silo/pages/ExcelVorlageSiloPage';
import { EXCEL_VORLAGE_SILO_CONFIG } from '@/config/seo-silo/pages/gefahrstoffverzeichnis-excel-vorlage';

export const metadata: Metadata = buildSiloMetadata(EXCEL_VORLAGE_SILO_CONFIG);

export default function GefahrstoffverzeichnisExcelVorlagePage() {
  return <ExcelVorlageSiloPage />;
}
