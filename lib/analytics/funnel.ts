/**
 * Schlankes, anonymes Funnel-Tracking (ohne Cookies, ohne personenbezogene Daten).
 *
 * - `session_id`: zufällige ID pro Browser-Tab-Session (`sessionStorage`)
 * - `device_type`: `mobile` (< md, 768 px) oder `desktop`
 * - Versand non-blocking per `fetch(..., { keepalive: true })`; Fehler werden verworfen.
 */
import { APP_PUBLIC_API } from '@/config/app-endpoints';

export type FunnelEventName =
  | 'landing_view'
  | 'dropzone_interaction'
  | 'overlay_cta_click'
  | 'mobile_lead_submitted'
  | 'ba_draft_lead_submitted';

export type FunnelEventMeta = Record<string, string | number | boolean | null>;

export type DeviceType = 'mobile' | 'desktop';

export type FunnelEventPayload = {
  event: FunnelEventName;
  session_id: string;
  device_type: DeviceType;
  page_path: string;
  occurred_at: string;
  meta?: FunnelEventMeta;
};

const SESSION_STORAGE_KEY = 'gqr_funnel_session_id';
/** Tailwind `md` (768 px): darunter gilt das Gerät als mobil. */
export const MOBILE_MAX_WIDTH_PX = 767;

let memorySessionId: string | null = null;
let lastLandingViewPath: string | null = null;

function createSessionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getFunnelSessionId(): string {
  try {
    const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) return existing;
    const created = createSessionId();
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, created);
    return created;
  } catch {
    // sessionStorage gesperrt (z. B. Privatmodus): ID nur für diese Seite.
    memorySessionId ??= createSessionId();
    return memorySessionId;
  }
}

export function getDeviceType(): DeviceType {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'desktop';
  return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`).matches ? 'mobile' : 'desktop';
}

export function trackFunnelEvent(event: FunnelEventName, meta?: FunnelEventMeta): void {
  if (typeof window === 'undefined' || typeof fetch !== 'function') return;

  const payload: FunnelEventPayload = {
    event,
    session_id: getFunnelSessionId(),
    device_type: getDeviceType(),
    page_path: window.location.pathname,
    occurred_at: new Date().toISOString(),
    ...(meta ? { meta } : {}),
  };

  try {
    void fetch(APP_PUBLIC_API.funnelEvents, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
      credentials: 'omit',
    }).catch(() => undefined);
  } catch {
    // Tracking darf den Funnel nie blockieren.
  }
}

/**
 * Genau einmal pro Seitenaufruf: mehrere Dropzone-Mounts auf einer statischen Seite teilen sich
 * das Modul; bei Next-Client-Navigation zählt jeder neue Pfad als eigener Aufruf.
 */
export function trackLandingViewOnce(): void {
  if (typeof window === 'undefined') return;
  const path = window.location.pathname;
  if (lastLandingViewPath === path) return;
  lastLandingViewPath = path;
  trackFunnelEvent('landing_view');
}
