/**
 * Interne Landing-Tests von öffentlicher Zählung trennen (ohne Cookies von Drittanbietern).
 *
 * Intern gilt der Traffic u. a. bei localhost, GitHub-Pages-/Vercel-Preview,
 * `?internal=1` (setzt localStorage `gqr_internal`) oder Build-Flag `NEXT_PUBLIC_GQR_MARK_INTERNAL=true`.
 */

export const GQR_INTERNAL_STORAGE_KEY = 'gqr_internal';

const LOCAL_HOST = /^(?:localhost|127\.0\.0\.1|\[::1\])$/i;

const GITHUB_PAGES_HOST = /^[\w-]+\.github\.io$/i;

const VERCEL_PREVIEW_HOST = /^[\w][\w-]*(?:-[\w]+)*\.vercel\.app$/i;

export type InternalTrafficInput = {
  hostname: string;
  localStorageMarksInternal: boolean;
  buildMarksInternal: boolean;
};

function buildMarksInternalFromEnv(): boolean {
  const flag = process.env.NEXT_PUBLIC_GQR_MARK_INTERNAL;
  return typeof flag === 'string' && flag.trim().toLowerCase() === 'true';
}

export function resolveIsInternalTraffic(input: InternalTrafficInput): boolean {
  if (input.buildMarksInternal) return true;

  const host = input.hostname.trim().toLowerCase();
  if (LOCAL_HOST.test(host)) return true;
  if (GITHUB_PAGES_HOST.test(host)) return true;
  if (VERCEL_PREVIEW_HOST.test(host)) return true;
  if (input.localStorageMarksInternal) return true;

  return false;
}

function readInternalStorageFlag(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(GQR_INTERNAL_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

/** `?internal=1` setzt ein persistentes Flag im localStorage (nur Erstbesuch pro Tab-Session mit Parameter). */
export function bootstrapInternalTrafficFlag(): void {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('internal') === '1') {
      window.localStorage.setItem(GQR_INTERNAL_STORAGE_KEY, '1');
    }
  } catch {
    // localStorage gesperrt: ohne Flag weiterzählen wie extern (konservativ).
  }
}

export function isInternalTraffic(): boolean {
  if (typeof window === 'undefined') return false;
  return resolveIsInternalTraffic({
    hostname: window.location.hostname,
    localStorageMarksInternal: readInternalStorageFlag(),
    buildMarksInternal: buildMarksInternalFromEnv(),
  });
}