import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['scripts/roi-calculator-mount.ts'],
  bundle: true,
  outfile: 'scripts/roi-calculator.js',
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  minify: true,
  alias: {
    '@': process.cwd(),
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  logLevel: 'info',
});

console.log('✓ scripts/roi-calculator.js');
