import type { Metadata } from 'next';
import { buildSiloMetadata } from '@/lib/seo/build-silo-metadata';
import { EtikettensoftwareSiloPage } from '@/components/seo-silo/pages/EtikettensoftwareSiloPage';
import { ETIKETTEN_SILO_CONFIG } from '@/config/seo-silo/pages/etikettensoftware-gefahrstoffe';

export const metadata: Metadata = buildSiloMetadata(ETIKETTEN_SILO_CONFIG);

export default function EtikettensoftwareGefahrstoffePage() {
  return <EtikettensoftwareSiloPage />;
}
