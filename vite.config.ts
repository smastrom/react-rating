import { appendFile, rm } from 'fs';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    minify: 'terser',
    lib: {
      name: 'React Rating Input',
      entry: 'src/index.ts',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') {
          return 'index.js';
        }
        return `index.${format}.min.js`;
      },
    },
    rollupOptions: {
      external: ['react'],
      input: 'src/index.ts',
      output: {
        globals: {
          react: 'React',
        },
        assetFileNames: (assetInfo) =>
          assetInfo.name === 'style.css' ? 'index.min.css' : assetInfo.name,
      },
    },
  },
  plugins: [
    react({ jsxRuntime: 'classic' }),
    dts({
      outputDir: 'dist/types',
      include: ['src/types.ts', 'src/RatingInput.tsx', 'src/Rating.tsx'],
      beforeWriteFile: (_, content) => {
        const cleanContent = content
          .replace("import { RatingProps } from './types';", '')
          .replace('/// <reference types="vite/client" />', '')
          .replace('export {};', '');

        appendFile('dist/index.d.ts', cleanContent, (err: any) => {
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
