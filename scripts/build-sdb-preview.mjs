import * as esbuild from 'esbuild';
import { copyFileSync, existsSync } from 'node:fs';

if (existsSync('sdb-preview-config.json')) {
  copyFileSync('sdb-preview-config.json', 'public/sdb-preview-config.json');
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
