import type { GhsPictogramCode } from '@/config/betriebsanweisung/types';

export type GhsAsset = {
  label: string;
  src: string;
};

export const GHS_ASSETS: Record<GhsPictogramCode, GhsAsset> = {
  GHS01: { label: 'Explosiv', src: '/images/ghs/ghs01.svg' },
  GHS02: { label: 'Entzündbar', src: '/images/ghs/ghs02.svg' },
  GHS03: { label: 'Oxidierend', src: '/images/ghs/ghs03.svg' },
  GHS04: { label: 'Gas unter Druck', src: '/images/ghs/ghs04.svg' },
  GHS05: { label: 'Ätzwirkung', src: '/images/ghs/ghs05.svg' },
  GHS06: { label: 'Akute Toxizität', src: '/images/ghs/ghs06.svg' },
  GHS07: { label: 'Ausrufezeichen', src: '/images/ghs/ghs07.svg' },
  GHS08: { label: 'Gesundheitsgefahr', src: '/images/ghs/ghs08.svg' },
  GHS09: { label: 'Umwelt', src: '/images/ghs/ghs09.svg' },
};

export function normalizeGhsCode(raw: string): GhsPictogramCode | null {
  const match = raw.match(/GHS0[1-9]/i);
  if (!match) return null;
  const code = match[0].toUpperCase() as GhsPictogramCode;
  return GHS_ASSETS[code] ? code : null;
}
