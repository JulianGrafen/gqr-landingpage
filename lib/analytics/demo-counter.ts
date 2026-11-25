/**
 * Datenschutzfreundlicher Zähler für Live-Demo (ohne Dateinamen, ohne SDB-Inhalte, ohne Session-ID).
 * Nutzt denselben Endpunkt wie das bestehende Funnel-Tracking.
 */
import { APP_PUBLIC_API } from '@/config/app-endpoints';
import { isInternalTraffic } from '@/lib/analytics/internal-traffic';

export type DemoCounterEvent = 'dropzone_upload' | 'quick_example';

export type DemoCounterPayload = {
  event: DemoCounterEvent;
  page_path: string;
  occurred_at: string;
  is_internal: boolean;
};

function sendCounterPayload(payload: DemoCounterPayload): void {
  const url = APP_PUBLIC_API.funnelEvents;
  const body = JSON.stringify(payload);

  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' });
      if (navigator.sendBeacon(url, blob)) return;
    }
  } catch {
    // sendBeacon optional — fetch als Fallback.
  }

  try {
    if (typeof fetch === 'function') {
      void fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
        credentials: 'omit',
      }).catch(() => undefined);
    }
  } catch {
    // Tracking darf die Demo nie blockieren.
  }
}

export function trackDemoCounterEvent(event: DemoCounterEvent): void {
  if (typeof window === 'undefined') return;

  const payload: DemoCounterPayload = {
    event,
    page_path: window.location.pathname,
    occurred_at: new Date().toISOString(),
    is_internal: isInternalTraffic(),
  };

  sendCounterPayload(payload);
}