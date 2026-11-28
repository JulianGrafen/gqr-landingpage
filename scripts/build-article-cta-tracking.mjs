/**
 * Bundelt das CTA-Klick-Tracking für statische Blog-Artikel → `scripts/article-cta-tracking.js`.
 */
import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['scripts/article-cta-tracking-mount.ts'],
  bundle: true,
  minify: true,
  format: 'iife',
  outfile: 'scripts/article-cta-tracking.js',
  platform: 'browser',
  target: ['es2020'],
  absWorkingDir: process.cwd(),
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.NEXT_PUBLIC_APP_URL': JSON.stringify(process.env.NEXT_PUBLIC_APP_URL ?? ''),
  },
  logLevel: 'info',
});

console.log('✓ scripts/article-cta-tracking.js');
