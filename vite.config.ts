import { resolve } from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const globals = {
  react: 'React',
};

export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'classic' }),
    dts({
      outputDir: 'dist/types',
    }),
  ],
  build: {
    target: 'ES6',
    minify: 'terser',
    lib: {
      name: 'ReactRatingInput',
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['cjs', 'es', 'umd'],
      fileName: (format) => `index.${format}${format === 'es' ? '' : '.min'}.js`,
    },
    rollupOptions: {
      external: Object.keys(globals),
      input: 'src/lib/index.ts',
      output: {
        globals,
        assetFileNames: (assetInfo) =>
          assetInfo.name == 'style.css' ? 'index.css' : assetInfo.name,
      },
    },
  },
});
