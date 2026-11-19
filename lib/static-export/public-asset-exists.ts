import fs from 'node:fs';
import path from 'node:path';

/**
 * Prüft zur Build-Zeit (Static Export), ob eine Datei unter public/ liegt.
 * Erlaubt Fallback-UI für Downloads, die noch nicht hinterlegt sind, statt eines toten Links.
 * Nur in Server-Komponenten verwenden.
 */
export function publicAssetExists(publicPath: string): boolean {
  const relative = publicPath.replace(/^\/+/, '');
  return fs.existsSync(path.join(process.cwd(), 'public', relative));
}
