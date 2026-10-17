/**
 * SDB-Live-Preview auf der Marketing-Landingpage (gefahrstoff-qr.de).
 *
 * UI, Teaser und Paywall laufen ausschließlich im Landing-Repo (React-Island / Next-Silos).
 * gqr-backend stellt nur die Extraktions-API bereit (gleiche Azure-Pipeline wie in der App):
 *
 * - POST `/api/public/sdb-preview` — multipart `file` oder `sampleKey`, PDF ≤ 10 MB, CORS für gefahrstoff-qr.de
 * - GET  `/api/public/sdb-preview/:token` — Teaser erneut laden (optional, z. B. nach Reload)
 * - Response: `{ ok: true, previewToken, teaser }` (Prefill in Redis, TTL 72h)
 *
 * `apiBaseUrl` zeigt auf die App-Origin (z. B. https://app.gefahrstoff-qr.de), nicht auf die Landing-Domain.
 *
 * @see gqr-backend/src/domain/schemas/sdb-scan.ts (SdbPrefillData)
 */

export const SDB_PREVIEW_MAX_BYTES = 10 * 1024 * 1024;

export type SdbPreviewExampleId = 'bremsenreiniger' | 'aceton' | 'epoxidharz2k';

export type Trgs555SectionKey =
  | 'identification'
  | 'hazards'
  | 'protective_measures'
  | 'emergency'
  | 'first_aid'
  | 'disposal'
  | 'emergency_qr';

export interface Trgs555PreviewSection {
  key: Trgs555SectionKey;
  title: string;
  /** true = sharp teaser; false = blurred paywall block */
  unlocked: boolean;
  body: string;
}

export interface SdbPreviewTeaser {
  previewToken: string;
  tradeName: string;
  manufacturer: string;
  signalWord: 'Gefahr' | 'Achtung' | null;
  ghsPictograms: string[];
  hazardStatements: string[];
  sections: Trgs555PreviewSection[];
  /** Placeholder QR image URL (locked in teaser) */
  qrPreviewUrl?: string;
}

export type SdbPreviewPostResponse =
  | { ok: true; teaser: SdbPreviewTeaser }
  | { ok: false; error: string; code?: 'rate_limit' | 'validation' | 'extraction' | 'network' };

export type SdbPreviewConfig = {
  apiBaseUrl: string;
  useMock?: boolean;
  registerBaseUrl?: string;
  stripeCheckoutUrl?: string;
};

export const SDB_PREVIEW_API_PATH = '/api/public/sdb-preview';

export const sdbPreviewTokenPath = (token: string) =>
  `${SDB_PREVIEW_API_PATH}/${encodeURIComponent(token)}` as const;

export const PROCESSING_STEP_LABELS = [
  'Lese Abschnitt 2: Einstufung & Kennzeichnung …',
  'Extrahiere H- und P-Sätze …',
  'Generiere KI-gestützten TRGS-555-Entwurf …',
] as const;
