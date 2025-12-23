import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, '../src/index.ts'),
      name: 'VibeCraftEnterprise',
      formats: ['es', 'umd'],
      fileName: (format) => `vibecraft.enterprise.${format}.js`
    },
    outDir: path.resolve(__dirname, '../dist/vite')
  }
});
