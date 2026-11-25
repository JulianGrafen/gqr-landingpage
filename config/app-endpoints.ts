/**
 * Öffentliche Endpunkte der App (gqr-backend) für Landingpage-Funnel.
 *
 * Basis-URL über `NEXT_PUBLIC_APP_URL` konfigurierbar (Next-Build und esbuild-Bundle
 * `scripts/sdb-preview.js` ersetzen den Wert zur Build-Zeit). Fallback: Produktion.
 */

const DEFAULT_APP_URL = 'https://app.gefahrstoff-qr.de';

function resolveAppUrl(): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL;
  const trimmed = typeof configured === 'string' ? configured.trim() : '';
  return (trimmed || DEFAULT_APP_URL).replace(/\/+$/, '');
}

export const APP_URL = resolveAppUrl();

export const APP_PUBLIC_API = {
  /** Übergabe eines geprüften Stoffs in den späteren Account (`?draft={token}`). */
  drafts: `${APP_URL}/api/public/drafts`,
  /** Muster-BA & Desktop-Link per E-Mail (mobiler Fallback). */
  mobileLead: `${APP_URL}/api/public/mobile-lead`,
  /** Anonyme Funnel-Events (Session-ID, Gerätetyp). */
  funnelEvents: `${APP_URL}/api/public/funnel-events`,
} as const;

/** Query-Parameter, mit dem die Registrierung den Entwurf übernimmt. */
export const DRAFT_QUERY_PARAM = 'draft';
