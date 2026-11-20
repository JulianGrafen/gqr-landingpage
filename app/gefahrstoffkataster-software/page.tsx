import type { Metadata } from 'next';
import { buildSiloMetadata } from '@/lib/seo/build-silo-metadata';
import { GefahrstoffkatasterSoftwareSiloPage } from '@/components/seo-silo/pages/GefahrstoffkatasterSoftwareSiloPage';
import { KATASTER_SOFTWARE_SILO_CONFIG } from '@/config/seo-silo/pages/gefahrstoffkataster-software';

export const metadata: Metadata = buildSiloMetadata(KATASTER_SOFTWARE_SILO_CONFIG);

export default function GefahrstoffkatasterSoftwarePage() {
  return <GefahrstoffkatasterSoftwareSiloPage />;
}
