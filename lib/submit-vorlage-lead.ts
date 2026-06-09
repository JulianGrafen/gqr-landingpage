export type VorlageLeadPayload = {
  email: string;
  source?: string;
  page?: string;
  submittedAt?: string;
};

export type VorlageLeadConfig = {
  /** Google Apps Script Web-App-URL oder eigene POST-API */
  endpoint?: string;
};

const CONFIG_PATH = '/vorlage-lead-config.json';
const DEFAULT_SOURCE = 'gefahrstoffverzeichnis-excel-vorlage';

let cachedEndpoint: string | undefined;

async function loadEndpoint(): Promise<string | undefined> {
  if (cachedEndpoint !== undefined) return cachedEndpoint;

  try {
    const res = await fetch(CONFIG_PATH, { cache: 'no-store' });
    if (!res.ok) {
      cachedEndpoint = '';
      return undefined;
    }
    const data = (await res.json()) as VorlageLeadConfig;
    cachedEndpoint = data.endpoint?.trim() ?? '';
    return cachedEndpoint || undefined;
  } catch {
    cachedEndpoint = '';
    return undefined;
  }
}

/**
 * Sendet Lead-Daten an den konfigurierten Endpoint (Google Sheets / eigene API).
 * Fehler werden geloggt, aber nicht an den Nutzer durchgereicht — Download bleibt unabhängig.
 */
export async function submitVorlageLead(
  email: string,
  options?: { source?: string; page?: string },
): Promise<void> {
  const endpoint = await loadEndpoint();
  if (!endpoint) return;

  const payload: VorlageLeadPayload = {
    email,
    source: options?.source ?? DEFAULT_SOURCE,
    page: options?.page ?? (typeof window !== 'undefined' ? window.location.href : ''),
    submittedAt: new Date().toISOString(),
  };

  try {
    await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.warn('[GQR] Vorlagen-Lead konnte nicht gespeichert werden:', error);
  }
}
