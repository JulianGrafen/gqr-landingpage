import {
  SDB_PREVIEW_API_PATH,
  SDB_PREVIEW_COMPACT_SCOPE,
  SDB_PREVIEW_MAX_BYTES,
  sdbPreviewTokenPath,
  type SdbPreviewExampleId,
  type SdbPreviewPostResponse,
  type SdbPreviewTeaser,
} from '@/lib/sdb-preview/api-contract';
import { mapApiJsonToTeaser } from '@/lib/sdb-preview/map-teaser';
import { prepareCompactUpload, type CompactUploadPayload } from '@/lib/sdb-preview/prepare-compact-upload';
import { runMockPreview } from '@/lib/sdb-preview/mock-preview-service';
import { sanitizePublicTeaser } from '@/lib/sdb-preview/sanitize-public-teaser';

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

function networkErrorMessage(cause: unknown): string {
  const msg = cause instanceof Error ? cause.message : String(cause);
  if (/failed to fetch|networkerror|load failed/i.test(msg)) {
    return 'Netzwerkfehler — Verbindung zur Extraktions-API fehlgeschlagen. Bitte Seite neu laden, Werbeblocker prüfen oder später erneut versuchen.';
  }
  return 'Netzwerkfehler — bitte Verbindung prüfen.';
}

function appendCompactScope(form: FormData): void {
  form.append('previewScope', SDB_PREVIEW_COMPACT_SCOPE);
}

async function postPreview(
  apiBaseUrl: string,
  body: FormData,
  attempt = 0,
): Promise<SdbPreviewPostResponse> {
  const url = `${apiBaseUrl.replace(/\/$/, '')}${SDB_PREVIEW_API_PATH}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      body,
      credentials: 'omit',
      mode: 'cors',
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
    return { ok: true, teaser: sanitizePublicTeaser(teaser) };
  } catch (cause) {
    if (attempt === 0) {
      await new Promise((r) => setTimeout(r, 400));
      return postPreview(apiBaseUrl, body, 1);
    }
    return { ok: false, error: networkErrorMessage(cause), code: 'network' };
  }
}

function appendCompactUploadFields(form: FormData, prepared: CompactUploadPayload, originalFileName: string): void {
  form.append('file', prepared.uploadFile, prepared.uploadFile.name);
  appendCompactScope(form);
  form.append('originalFileName', originalFileName);
  form.append(
    'compactUploadMeta',
    JSON.stringify({
      originalBytes: prepared.trim.originalBytes,
      uploadBytes: prepared.trim.uploadBytes,
      pdfTrimmed: prepared.trim.trimmed,
      pdfPageCount: prepared.trim.pageCount,
      pdfPagesUploaded: prepared.trim.pagesUsed,
    }),
  );

  if (prepared.sectionExtract?.text) {
    form.append('sectionExtract', prepared.sectionExtract.text);
    form.append(
      'sectionExtractMeta',
      JSON.stringify({
        pagesUsed: prepared.sectionExtract.pagesUsed,
        pageCount: prepared.sectionExtract.pageCount,
        charCount: prepared.sectionExtract.text.length,
      }),
    );
  }
}

export async function uploadPdfPreview(
  file: File,
  options: { apiBaseUrl: string; useMock: boolean },
  prepared?: CompactUploadPayload,
): Promise<SdbPreviewPostResponse> {
  const validationError = validatePdfFile(file);
  if (validationError) {
    return { ok: false, error: validationError, code: 'validation' };
  }

  if (options.useMock) {
    const res = await runMockPreview({ kind: 'file', fileName: file.name });
    if (res.ok && res.teaser) {
      return { ok: true, teaser: sanitizePublicTeaser(res.teaser) };
    }
    return res;
  }

  const payload = prepared ?? (await prepareCompactUpload(file));
  const form = new FormData();
  appendCompactUploadFields(form, payload, file.name);

  return postPreview(options.apiBaseUrl, form);
}

/** Für UI: Vorbereitung + Upload-Metriken (Größe/Dauer messbar). */
export { prepareCompactUpload, type CompactUploadPayload };

/** Token für Unlock-CTA nach erfolgreicher Preview (kein Auto-Restore beim Seitenaufruf). */
export async function fetchPreviewByToken(
  apiBaseUrl: string,
  previewToken: string,
): Promise<SdbPreviewPostResponse> {
  const url = `${apiBaseUrl.replace(/\/$/, '')}${sdbPreviewTokenPath(previewToken)}`;
  try {
    const res = await fetch(url, { method: 'GET', credentials: 'omit', mode: 'cors' });
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
    return { ok: true, teaser: sanitizePublicTeaser(teaser) };
  } catch (cause) {
    return { ok: false, error: networkErrorMessage(cause), code: 'network' };
  }
}

export async function runExamplePreview(
  exampleId: SdbPreviewExampleId,
  options: { apiBaseUrl: string; useMock: boolean },
): Promise<SdbPreviewPostResponse> {
  if (options.useMock) {
    const res = await runMockPreview({ kind: 'example', exampleId });
    if (res.ok && res.teaser) {
      return { ok: true, teaser: sanitizePublicTeaser(res.teaser) };
    }
    return res;
  }

  const form = new FormData();
  form.append('sampleKey', exampleId);
  appendCompactScope(form);
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
