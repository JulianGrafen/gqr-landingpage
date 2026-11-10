import type { SdbPreviewConfig } from '@/lib/sdb-preview/api-contract';

const PRODUCTION_DEFAULTS: SdbPreviewConfig = {
  apiBaseUrl: 'https://app.gefahrstoff-qr.de',
  useMock: false,
  registerBaseUrl: 'https://app.gefahrstoff-qr.de/register',
};

function resolveApiBaseUrl(data: SdbPreviewConfig, isLocalDev: boolean): string {
  const fallback = (data.apiBaseUrl ?? PRODUCTION_DEFAULTS.apiBaseUrl).replace(/\/$/, '');
  if (isLocalDev && data.localApiBaseUrl?.trim()) {
    return data.localApiBaseUrl.trim().replace(/\/$/, '');
  }
  return fallback;
}

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
      cached = {
        ...PRODUCTION_DEFAULTS,
        apiBaseUrl: resolveApiBaseUrl(PRODUCTION_DEFAULTS, isLocalDev),
        useMock: false,
      };
      return cached;
    }
    const data = (await res.json()) as SdbPreviewConfig;
    const useMock = data.useMock === true;
    cached = {
      ...PRODUCTION_DEFAULTS,
      ...data,
      apiBaseUrl: resolveApiBaseUrl(data, isLocalDev),
      useMock,
    };
    return cached;
  } catch {
    cached = {
      ...PRODUCTION_DEFAULTS,
      apiBaseUrl: resolveApiBaseUrl(PRODUCTION_DEFAULTS, isLocalDev),
      useMock: false,
    };
    return cached;
  }
}
