import { SDB_PREVIEW_TOKEN_TTL_SECONDS } from '@/lib/sdb-preview/api-contract';

/**
 * Übergabe der SDB-Vorschau an die Registrierung (app.gefahrstoff-qr.de), damit nach dem Signup
 * kein erneuter Upload nötig ist. Kanonischer Kanal bleibt der URL-Parameter `previewToken`
 * (siehe `buildUnlockRegisterUrl`); Cookie + sessionStorage sind Fallbacks, falls Parameter
 * im Signup-Flow (z. B. OAuth-Redirect) verloren gehen.
 *
 * Gespeichert wird nur der Token (Redis-Prefill, TTL 72 h), nie SDB-Inhalte.
 */

export const PREVIEW_TOKEN_STORAGE_KEY = 'gqr_preview_token';

/** Registrierbare Domain von Landing und App. */
const SHARED_COOKIE_DOMAIN = 'gefahrstoff-qr.de';

function isSharedDomainHost(hostname: string): boolean {
  return hostname === SHARED_COOKIE_DOMAIN || hostname.endsWith(`.${SHARED_COOKIE_DOMAIN}`);
}

function writeSessionToken(token: string): void {
  try {
    sessionStorage.setItem(PREVIEW_TOKEN_STORAGE_KEY, token);
  } catch {
    /* Private Mode / Storage deaktiviert: URL-Parameter reicht. */
  }
}

/** Nach erfolgreicher Vorschau: Token für Reload/Navigation im selben Tab merken. */
export function persistPreviewToken(token: string): void {
  writeSessionToken(token);
}

export function readPersistedPreviewToken(): string | null {
  try {
    return sessionStorage.getItem(PREVIEW_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Beim Klick auf den Freischalt-CTA: Token zusätzlich als First-Party-Cookie auf `.gefahrstoff-qr.de`
 * ablegen (für die App-Subdomain lesbar). Nutzerinitiiert und funktional → kein Tracking-Cookie.
 */
export function handOffPreviewTokenToRegistration(token: string): void {
  writeSessionToken(token);
  if (typeof document === 'undefined' || !isSharedDomainHost(window.location.hostname)) return;

  const attributes = [
    `${PREVIEW_TOKEN_STORAGE_KEY}=${encodeURIComponent(token)}`,
    `Domain=.${SHARED_COOKIE_DOMAIN}`,
    'Path=/',
    `Max-Age=${SDB_PREVIEW_TOKEN_TTL_SECONDS}`,
    'SameSite=Lax',
    'Secure',
  ];
  document.cookie = attributes.join('; ');
}
