import type { SdbPreviewConfig } from '@/lib/sdb-preview/api-contract';

const CONFIG_PATH = '/sdb-preview-config.json';

let cached: SdbPreviewConfig | null = null;

export async function loadSdbPreviewConfig(): Promise<SdbPreviewConfig> {
  if (cached) return cached;

  const fallback: SdbPreviewConfig = {
    apiBaseUrl: 'https://app.gefahrstoff-qr.de',
    useMock: true,
    registerBaseUrl: 'https://app.gefahrstoff-qr.de/register',
  };

  if (typeof window === 'undefined') return fallback;

  try {
    const res = await fetch(CONFIG_PATH, { cache: 'no-store' });
    if (!res.ok) {
      cached = fallback;
      return fallback;
    }
    const data = (await res.json()) as SdbPreviewConfig;
    cached = {
      ...fallback,
      ...data,
      apiBaseUrl: (data.apiBaseUrl ?? fallback.apiBaseUrl).replace(/\/$/, ''),
    };
    return cached;
  } catch {
    cached = fallback;
    return fallback;
  }
}
