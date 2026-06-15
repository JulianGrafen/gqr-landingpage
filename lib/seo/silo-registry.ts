import registry from '@/config/seo-silo/silo-registry.json';
import type { SeoSiloRegistryEntry } from '@/config/seo-silo/types';

type SiloRegistryFile = {
  silo: SeoSiloRegistryEntry[];
};

const { silo } = registry as SiloRegistryFile;

export function getSiloRegistry(): SeoSiloRegistryEntry[] {
  return silo;
}

export function getSiloBySlug(slug: string): SeoSiloRegistryEntry | undefined {
  return silo.find((entry) => entry.slug === slug);
}

export function getSiloByPath(path: string): SeoSiloRegistryEntry | undefined {
  const normalized = path.endsWith('/') ? path : `${path}/`;
  return silo.find((entry) => entry.path === normalized);
}
