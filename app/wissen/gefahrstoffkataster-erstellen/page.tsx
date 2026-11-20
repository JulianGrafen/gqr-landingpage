import type { Metadata } from 'next';
import { buildSiloMetadata } from '@/lib/seo/build-silo-metadata';
import { GefahrstoffkatasterErstellenSiloPage } from '@/components/seo-silo/pages/GefahrstoffkatasterErstellenSiloPage';
import { KATASTER_ERSTELLEN_SILO_CONFIG } from '@/config/seo-silo/pages/gefahrstoffkataster-erstellen';

export const metadata: Metadata = buildSiloMetadata(KATASTER_ERSTELLEN_SILO_CONFIG);

export default function GefahrstoffkatasterErstellenPage() {
  return <GefahrstoffkatasterErstellenSiloPage />;
}
