import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['scripts/pricing-section-mount.tsx'],
  bundle: true,
  outfile: 'scripts/pricing-section.js',
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  minify: true,
  alias: {
    '@': process.cwd(),
  },
  // Läuft auf statischen Seiten ohne Node-/Next-Runtime: jeden `process.env`-Zugriff abfangen.
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env': '{}',
  },
  logLevel: 'info',
});

console.log('✓ scripts/pricing-section.js');