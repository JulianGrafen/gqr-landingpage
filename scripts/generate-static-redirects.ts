/**
 * Schreibt alle Weiterleitungs-Stubs aus `config/static-redirects.ts` ins Repo-Root (GitHub Pages).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { STATIC_REDIRECTS } from '@/config/static-redirects';
import { renderRedirectStub } from '@/lib/static-html/render-redirect-stub';

for (const redirect of STATIC_REDIRECTS) {
  const file = resolve(process.cwd(), redirect.sourceFile);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, renderRedirectStub(redirect), 'utf8');
  console.log(`✓ ${redirect.sourceFile} → ${redirect.target}`);
}
