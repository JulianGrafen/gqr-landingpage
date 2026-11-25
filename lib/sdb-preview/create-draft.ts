import { z } from 'zod';
import { APP_PUBLIC_API, DRAFT_QUERY_PARAM } from '@/config/app-endpoints';
import type { SdbPreviewSource, SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';

/**
 * Übergibt ein Vorschau-Ergebnis an die App (`POST /api/public/drafts`), damit der geprüfte Stoff
 * nach der Registrierung direkt im Account liegt. Antwort: `{ draft_token }` (Alias `draftToken`/`token`).
 *
 * Läuft im Hintergrund: Netzwerk-, CORS- oder Formatfehler liefern `null`, der Funnel läuft ohne
 * Draft-Parameter weiter.
 */

const DRAFT_REQUEST_TIMEOUT_MS = 8_000;

export type CreateDraftRequest = {
  /** Server-Prefill (Redis), `null` bei clientseitiger Demo. */
  previewToken: string | null;
  source: SdbPreviewSource;
  /** Öffentlich gekürzter Teaser (wie auf der Seite angezeigt). */
  teaser: SdbPreviewTeaser;
};

const tokenField = z.string().trim().min(8).max(512);

const draftResponseSchema = z
  .object({
    draft_token: tokenField.optional(),
    draftToken: tokenField.optional(),
    token: tokenField.optional(),
  })
  .transform((body) => body.draft_token ?? body.draftToken ?? body.token ?? null);

export async function createSdbDraft(request: CreateDraftRequest): Promise<string | null> {
  if (typeof fetch !== 'function') return null;
  const controller = typeof AbortController === 'function' ? new AbortController() : null;
  const timeout = controller ? setTimeout(() => controller.abort(), DRAFT_REQUEST_TIMEOUT_MS) : null;

  try {
    const response = await fetch(APP_PUBLIC_API.drafts, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(request),
      credentials: 'omit',
      signal: controller?.signal,
    });
    const isJson = response.headers.get('content-type')?.includes('application/json') ?? false;
    if (!response.ok || !isJson) return null;
    const parsed = draftResponseSchema.safeParse(await response.json());
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

/** Hängt `?draft={token}` an eine absolute Register-URL (Anker/relative Links bleiben unverändert). */
export function withDraftParam(href: string, draftToken: string | null | undefined): string {
  if (!draftToken || !/^https?:\/\//i.test(href)) return href;
  try {
    const url = new URL(href);
    url.searchParams.set(DRAFT_QUERY_PARAM, draftToken);
    return url.toString();
  } catch {
    return href;
  }
}
