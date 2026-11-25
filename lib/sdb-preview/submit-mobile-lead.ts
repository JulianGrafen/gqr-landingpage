import { z } from 'zod';
import { APP_PUBLIC_API } from '@/config/app-endpoints';
import { getFunnelSessionId } from '@/lib/analytics/funnel';

/**
 * Mobiler E-Mail-Fallback: `POST ${NEXT_PUBLIC_APP_URL}/api/public/mobile-lead`.
 * Erfolg nur bei JSON-Antwort mit `ok !== false`, damit eine fehlende Route (HTML-Fallback der App)
 * nicht fälschlich als „gesendet“ angezeigt wird.
 */

export const mobileLeadEmailSchema = z.string().trim().toLowerCase().email().max(254);

export type MobileLeadRequest = {
  email: string;
  /** Draft aus `POST /api/public/drafts`, falls bereits ein SDB getestet wurde. */
  draftToken?: string | null;
  previewToken?: string | null;
};

const responseSchema = z.object({ ok: z.boolean().optional() }).passthrough();

export type MobileLeadResult = { ok: true } | { ok: false; reason: 'invalid_email' | 'request_failed' };

export async function submitMobileLead(request: MobileLeadRequest): Promise<MobileLeadResult> {
  const email = mobileLeadEmailSchema.safeParse(request.email);
  if (!email.success) return { ok: false, reason: 'invalid_email' };

  try {
    const response = await fetch(APP_PUBLIC_API.mobileLead, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'omit',
      body: JSON.stringify({
        email: email.data,
        draft_token: request.draftToken ?? null,
        preview_token: request.previewToken ?? null,
        session_id: getFunnelSessionId(),
        page_path: window.location.pathname,
      }),
    });
    const isJson = response.headers.get('content-type')?.includes('application/json') ?? false;
    if (!response.ok || !isJson) return { ok: false, reason: 'request_failed' };
    const parsed = responseSchema.safeParse(await response.json());
    return parsed.success && parsed.data.ok !== false ? { ok: true } : { ok: false, reason: 'request_failed' };
  } catch {
    return { ok: false, reason: 'request_failed' };
  }
}
