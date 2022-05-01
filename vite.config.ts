import { resolve } from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'classic' }),
    dts({
      outputDir: 'dist/types',
    }),
  ],
  build: {
    lib: {
      name: 'ReactRatingInput',
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['cjs', 'es', 'umd'],
      fileName: (format) => `${format}/index.js`,
    },
    rollupOptions: {
      external: Object.keys(globals),
      input: 'src/lib/index.ts',
      output: {
        globals,
      },
    },
  },
});
