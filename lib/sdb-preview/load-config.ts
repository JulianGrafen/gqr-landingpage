import type { SdbPreviewConfig } from '@/lib/sdb-preview/api-contract';

const PRODUCTION_DEFAULTS: SdbPreviewConfig = {
  apiBaseUrl: 'https://app.gefahrstoff-qr.de',
  useMock: false,
  registerBaseUrl: 'https://app.gefahrstoff-qr.de/register',
};

let cached: SdbPreviewConfig | null = null;

function configUrl(): string {
  if (typeof window === 'undefined') return '/sdb-preview-config.json';
  return `${window.location.origin}/sdb-preview-config.json`;
}

export async function loadSdbPreviewConfig(): Promise<SdbPreviewConfig> {
  if (cached) return cached;

  if (typeof window === 'undefined') return PRODUCTION_DEFAULTS;

  const hostname = window.location.hostname;
  const isLocalDev = hostname === 'localhost' || hostname === '127.0.0.1';

  try {
    const res = await fetch(configUrl(), { cache: 'no-store' });
    if (!res.ok) {
      cached = { ...PRODUCTION_DEFAULTS, useMock: isLocalDev };
      return cached;
    }
    const data = (await res.json()) as SdbPreviewConfig;
    cached = {
      ...PRODUCTION_DEFAULTS,
      ...data,
      apiBaseUrl: (data.apiBaseUrl ?? PRODUCTION_DEFAULTS.apiBaseUrl).replace(/\/$/, ''),
      useMock: isLocalDev ? true : Boolean(data.useMock),
    };
    return cached;
  } catch {
    cached = { ...PRODUCTION_DEFAULTS, useMock: isLocalDev };
    return cached;
  }
}
