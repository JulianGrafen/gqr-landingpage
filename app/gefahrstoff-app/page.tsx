import type { Metadata } from 'next';
import { buildSiloMetadata } from '@/lib/seo/build-silo-metadata';
import { GefahrstoffAppSiloPage } from '@/components/seo-silo/pages/GefahrstoffAppSiloPage';
import { GEFAHrstoff_APP_SILO_CONFIG } from '@/config/seo-silo/pages/gefahrstoff-app';

export const metadata: Metadata = buildSiloMetadata(GEFAHrstoff_APP_SILO_CONFIG);

export default function GefahrstoffAppPage() {
  return <GefahrstoffAppSiloPage />;
}
