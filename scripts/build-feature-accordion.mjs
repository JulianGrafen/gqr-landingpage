import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['scripts/feature-accordion-mount.tsx'],
  bundle: true,
  outfile: 'scripts/feature-accordion.js',
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  minify: true,
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  logLevel: 'info',
});

console.log('✓ scripts/feature-accordion.js');
