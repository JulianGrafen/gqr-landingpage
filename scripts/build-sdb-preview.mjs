import * as esbuild from 'esbuild';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

if (existsSync('sdb-preview-config.json')) {
  copyFileSync('sdb-preview-config.json', 'public/sdb-preview-config.json');
}

const pdfWorkerSrc = path.join('node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs');
const pdfWorkerDest = path.join('public', 'pdfjs', 'pdf.worker.min.mjs');
if (existsSync(pdfWorkerSrc)) {
  mkdirSync(path.dirname(pdfWorkerDest), { recursive: true });
  copyFileSync(pdfWorkerSrc, pdfWorkerDest);
  console.log('✓ public/pdfjs/pdf.worker.min.mjs');
}

await esbuild.build({
  entryPoints: ['scripts/sdb-preview-mount.tsx'],
  bundle: true,
  outfile: 'scripts/sdb-preview.js',
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  minify: true,
  alias: {
    '@': process.cwd(),
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  logLevel: 'info',
});

console.log('✓ scripts/sdb-preview.js');
