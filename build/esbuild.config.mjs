import { build } from 'esbuild';

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: 'browser',
  target: ['es2022'],
  outfile: 'dist/esbuild/vibecraft.enterprise.min.js'
});
