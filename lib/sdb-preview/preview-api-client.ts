import {
  SDB_PREVIEW_API_PATH,
  SDB_PREVIEW_MAX_BYTES,
  sdbPreviewTokenPath,
  type SdbPreviewExampleId,
  type SdbPreviewPostResponse,
  type SdbPreviewTeaser,
} from '@/lib/sdb-preview/api-contract';
import { mapApiJsonToTeaser } from '@/lib/sdb-preview/map-teaser';
import { runMockPreview } from '@/lib/sdb-preview/mock-preview-service';

function validatePdfFile(file: File): string | null {
  if (file.type && file.type !== 'application/pdf') {
    return 'Bitte laden Sie eine PDF-Datei hoch.';
  }
  if (!file.name.toLowerCase().endsWith('.pdf')) {
    return 'Die Datei muss die Endung .pdf haben.';
  }
  if (file.size > SDB_PREVIEW_MAX_BYTES) {
    return 'Die PDF darf maximal 10 MB groß sein.';
  }
  if (file.size === 0) {
    return 'Die PDF-Datei ist leer.';
  }
  return null;
}

async function postPreview(
  apiBaseUrl: string,
  body: FormData,
): Promise<SdbPreviewPostResponse> {
  const url = `${apiBaseUrl.replace(/\/$/, '')}${SDB_PREVIEW_API_PATH}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      body,
      credentials: 'omit',
    });

    const json: unknown = await res.json().catch(() => null);

    if (res.status === 429) {
      // legal-copy:allow in-einer-minute-product
      return { ok: false, error: 'Zu viele Anfragen — bitte in einer Minute erneut versuchen.', code: 'rate_limit' };
    }

    if (!res.ok) {
      const message =
        json && typeof json === 'object' && 'error' in json
          ? String((json as { error: unknown }).error)
          : 'Extraktion fehlgeschlagen. Bitte erneut versuchen.';
      return { ok: false, error: message, code: 'extraction' };
    }

    const teaser = mapApiJsonToTeaser(json);
    if (!teaser) {
      return { ok: false, error: 'Ungültige Server-Antwort.', code: 'network' };
    }
    return { ok: true, teaser };
  } catch {
    return { ok: false, error: 'Netzwerkfehler — bitte Verbindung prüfen.', code: 'network' };
  }
}

export async function uploadPdfPreview(
  file: File,
  options: { apiBaseUrl: string; useMock: boolean },
): Promise<SdbPreviewPostResponse> {
  const validationError = validatePdfFile(file);
  if (validationError) {
    return { ok: false, error: validationError, code: 'validation' };
  }

  if (options.useMock) {
    return runMockPreview({ kind: 'file', fileName: file.name });
  }

  const form = new FormData();
  form.append('file', file, file.name);
  return postPreview(options.apiBaseUrl, form);
}

/** Token für Unlock-CTA nach erfolgreicher Preview (kein Auto-Restore beim Seitenaufruf). */
export async function fetchPreviewByToken(
  apiBaseUrl: string,
  previewToken: string,
): Promise<SdbPreviewPostResponse> {
  const url = `${apiBaseUrl.replace(/\/$/, '')}${sdbPreviewTokenPath(previewToken)}`;
  try {
    const res = await fetch(url, { method: 'GET', credentials: 'omit' });
    const json: unknown = await res.json().catch(() => null);

    if (res.status === 429) {
      // legal-copy:allow in-einer-minute-product
      return { ok: false, error: 'Zu viele Anfragen — bitte in einer Minute erneut versuchen.', code: 'rate_limit' };
    }
    if (!res.ok) {
      const message =
        json && typeof json === 'object' && 'error' in json
          ? String((json as { error: unknown }).error)
          : 'Vorschau abgelaufen oder nicht gefunden.';
      return { ok: false, error: message, code: 'network' };
    }

    const teaser = mapApiJsonToTeaser(json);
    if (!teaser) {
      return { ok: false, error: 'Ungültige Server-Antwort.', code: 'network' };
    }
    return { ok: true, teaser };
  } catch {
    return { ok: false, error: 'Netzwerkfehler — bitte Verbindung prüfen.', code: 'network' };
  }
}

export async function runExamplePreview(
  exampleId: SdbPreviewExampleId,
  options: { apiBaseUrl: string; useMock: boolean },
): Promise<SdbPreviewPostResponse> {
  if (options.useMock) {
    return runMockPreview({ kind: 'example', exampleId });
  }

  const form = new FormData();
  form.append('sampleKey', exampleId);
  return postPreview(options.apiBaseUrl, form);
}

export function persistPreviewToken(token: string): void {
  try {
    sessionStorage.setItem('gqr_preview_token', token);
  } catch {
    /* ignore */
  }
}

export function readPersistedPreviewToken(): string | null {
  try {
    return sessionStorage.getItem('gqr_preview_token');
  } catch {
    return null;
  }
}

export type { SdbPreviewTeaser };
