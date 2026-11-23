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

/** Herkunft der aktuellen Vorschau, steuert Badge-Text und Register-Übergabe. */
export type SdbPreviewSource =
  | { kind: 'upload'; fileName: string }
  | { kind: 'example'; exampleId: SdbPreviewExampleId }
  /** Clientseitige Demo ohne Server-Prefill (kein übertragbarer Token). */
  | { kind: 'demo'; label: string };

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

/** Persönliche Schutzausrüstung, die als Gebotszeichen in Abschnitt 3 erscheint. */
export type ProtectiveEquipmentId =
  | 'eye_protection'
  | 'hand_protection'
  | 'respiratory_protection'
  | 'protective_clothing';

export interface SdbPreviewStatementCounts {
  hazard: number;
  /** `null` = Server hat keine P-Sätze geliefert (Anzahl unbekannt). */
  precautionary: number | null;
}

export interface SdbPreviewTeaser {
  previewToken: string;
  tradeName: string;
  manufacturer: string;
  /** CAS-Nummer, falls im SDB-Abschnitt 1/3 erkannt. */
  casNumber?: string;
  /** Lagerklasse nach TRGS 510, falls im SDB erkannt (z. B. „3“ oder „LGK 3“). */
  storageClass?: string;
  signalWord: 'Gefahr' | 'Achtung' | null;
  ghsPictograms: string[];
  hazardStatements: string[];
  /** P-Sätze (Schutzmaßnahmen); optional, da ältere API-Antworten sie nicht liefern. */
  precautionaryStatements?: string[];
  /** Aus P-Sätzen / SDB 8.2 abgeleitete PSA (Gebotszeichen). */
  protectiveEquipment?: ProtectiveEquipmentId[];
  /** Gesamtzahl vor dem Kürzen für die öffentliche Vorschau. */
  statementCounts?: SdbPreviewStatementCounts;
  sections: Trgs555PreviewSection[];
  /** Placeholder QR image URL (locked in teaser) */
  qrPreviewUrl?: string;
}

export type SdbPreviewPostResponse =
  | { ok: true; teaser: SdbPreviewTeaser }
  | { ok: false; error: string; code?: 'rate_limit' | 'validation' | 'extraction' | 'network' };

export type SdbPreviewConfig = {
  apiBaseUrl: string;
  /** Optional: lokales gqr-backend (nur localhost / 127.0.0.1). */
  localApiBaseUrl?: string;
  /** Nur `true` = Mock in der Landingpage; `false` = POST an gqr-backend. */
  useMock?: boolean;
  registerBaseUrl?: string;
  stripeCheckoutUrl?: string;
};

export const SDB_PREVIEW_API_PATH = '/api/public/sdb-preview';

export const SDB_PREVIEW_COMPACT_SCOPE = 'landing_compact';

export const sdbPreviewTokenPath = (token: string) =>
  `${SDB_PREVIEW_API_PATH}/${encodeURIComponent(token)}` as const;

/** Lebensdauer des Prefills in Redis (siehe Kopfkommentar) — Basis für die Übergabe an die Registrierung. */
export const SDB_PREVIEW_TOKEN_TTL_SECONDS = 72 * 60 * 60;
