import { resolve } from 'path';
import { appendFile, rm } from 'fs';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    target: 'ES6',
    minify: 'terser',
    lib: {
      name: 'ReactRatingInput',
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => {
        if (format === 'es') {
          return 'index.js';
        }
        return `index.${format}.min.js`;
      },
    },
    rollupOptions: {
      external: ['react'],
      input: 'src/lib/index.ts',
      output: {
        globals: {
          react: 'React',
        },
        assetFileNames: (assetInfo) =>
          assetInfo.name == 'style.css' ? 'index.min.css' : assetInfo.name,
      },
    },
  },
  plugins: [
    react({ jsxRuntime: 'classic' }),
    dts({
      outputDir: 'dist/types',
      exclude: [
        'src/lib/constants.ts',
        'src/lib/defaultStyles.ts',
        'src/lib/getBreakpointRules.ts',
        'src/lib/getItemStyles.ts',
        'src/lib/RatingItem.tsx',
        'src/lib/utils.ts',
        'src/lib/index.ts',
      ],
      beforeWriteFile: (_, content) => {
        appendFile('dist/index.d.ts', content, (err: any) => {
          if (err) {
            console.log(err);
          }
        });
      },
      afterBuild: () => {
        rm('dist/types', { recursive: true }, (err: any) => {
          if (err) {
            console.log(err);
          }
        });
      },
    }),
  ],
});
