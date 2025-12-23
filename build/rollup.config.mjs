import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/rollup/vibecraft.enterprise.mjs',
    format: 'esm',
    sourcemap: true
  },
  plugins: [resolve(), commonjs(), json(), typescript({ tsconfig: './tsconfig.json' })]
};
