/**
 * Erkennung von Chunk-Ladefehlern nach einem Deploy (GitHub Pages ersetzt `_next/static`).
 *
 * Ein Tab oder ein gecachtes HTML aus dem vorherigen Build verweist auf Chunks mit altem Hash.
 * Ein einmaliger Hard-Reload lädt das aktuelle HTML samt passender Chunks nach.
 */

const CHUNK_ERROR_PATTERN = /ChunkLoadError|Loading (CSS )?chunk [\w-]+ failed|Failed to fetch dynamically imported module|Importing a module script failed/i;

const RELOAD_GUARD_KEY = 'gqr_chunk_reload_at';

/** Mindestabstand zwischen zwei automatischen Reloads (verhindert Reload-Schleifen). */
const RELOAD_GUARD_WINDOW_MS = 60_000;

export function isChunkLoadError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return error.name === 'ChunkLoadError' || CHUNK_ERROR_PATTERN.test(error.message);
}

/**
 * Lädt die Seite einmalig neu, wenn der Fehler ein Chunk-Ladefehler ist.
 * @returns `true`, wenn ein Reload ausgelöst wurde.
 */
export function reloadOnceForChunkError(error: unknown): boolean {
  if (typeof window === 'undefined' || !isChunkLoadError(error)) return false;
  try {
    const lastReload = Number(window.sessionStorage.getItem(RELOAD_GUARD_KEY) ?? 0);
    if (Date.now() - lastReload < RELOAD_GUARD_WINDOW_MS) return false;
    window.sessionStorage.setItem(RELOAD_GUARD_KEY, String(Date.now()));
  } catch {
    // sessionStorage gesperrt (Privatmodus): ohne Guard nicht automatisch neu laden.
    return false;
  }
  window.location.reload();
  return true;
}
