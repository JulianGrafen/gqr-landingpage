import type { Metadata } from 'next';
import { LandingProseSection } from '@/components/seo-silo/LandingProseSection';
import { AvvDownloadCard } from '@/components/trust/AvvDownloadCard';
import { FactComparisonTable } from '@/components/trust/FactComparisonTable';
import { SupplierMasterDataBox } from '@/components/trust/SupplierMasterDataBox';
import { TrustChecklist } from '@/components/trust/TrustChecklist';
import { TrustPageShell } from '@/components/trust/TrustPageShell';
import {
  AVV_DOWNLOAD,
  AVV_PDF_PUBLIC_PATH,
  AVV_SECTION,
  FACT_SHEET,
  FACT_SHEET_SECTION,
  PROCUREMENT_CHECKLIST,
  PROCUREMENT_SECTION,
  SICHERHEIT_AVV_PAGE,
  SUPPLIER_MASTER_DATA,
} from '@/config/trust/sicherheit-avv';
import { buildPageMetadata } from '@/lib/seo/build-page-metadata';
import { publicAssetExists } from '@/lib/static-export/public-asset-exists';

export const metadata: Metadata = buildPageMetadata({
  path: SICHERHEIT_AVV_PAGE.path,
  ...SICHERHEIT_AVV_PAGE.seo,
});

export default function SicherheitAvvPage() {
  return (
    <TrustPageShell config={SICHERHEIT_AVV_PAGE} pageId="sicherheit-avv">
      <LandingProseSection {...FACT_SHEET_SECTION} variant="raised" layout="blocks">
        <FactComparisonTable table={FACT_SHEET} />
      </LandingProseSection>

      <LandingProseSection {...AVV_SECTION} layout="blocks">
        <AvvDownloadCard
          {...AVV_DOWNLOAD}
          pdfHref={AVV_PDF_PUBLIC_PATH}
          isPdfAvailable={publicAssetExists(AVV_PDF_PUBLIC_PATH)}
        />
      </LandingProseSection>

      <LandingProseSection {...PROCUREMENT_SECTION} variant="raised" layout="blocks">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <TrustChecklist items={PROCUREMENT_CHECKLIST} tone="included" ariaLabel="Zusagen für Einkauf und Buchhaltung" />
          <SupplierMasterDataBox {...SUPPLIER_MASTER_DATA} />
        </div>
      </LandingProseSection>
    </TrustPageShell>
  );
}
