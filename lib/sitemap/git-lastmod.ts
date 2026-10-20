import { execSync } from 'node:child_process';

/** ISO date (YYYY-MM-DD) from last git commit touching `filePath`, or fallback. */
export function gitLastmodIsoDate(root: string, filePath: string, fallback: string): string {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      encoding: 'utf8',
      cwd: root,
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (out) return out.slice(0, 10);
  } catch {
    /* not in git or git unavailable */
  }
  return fallback;
}
