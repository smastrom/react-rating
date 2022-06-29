import { appendFile, rm } from 'fs';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { terser } from 'rollup-plugin-terser';

import Package from './package.json';

export default defineConfig(({ command }) => ({
  define: {
    __DEV__: command !== 'build',
  },
  build: {
    minify: 'terser',
    lib: {
      name: Package.name,
      entry: 'src/index.ts',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') {
          return 'index.js';
        }
        return `index.${format}.js`;
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
          assetInfo.name === 'style.css' ? 'index.min.css' : (assetInfo.name as string),
      },
      plugins: [
        terser({
          compress: {
            defaults: true,
            drop_console: false,
          },
        }),
      ],
    },
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  plugins: [
    react({ jsxRuntime: 'classic' }),
    dts({
      outputDir: 'dist/types',
      include: ['src/exportedTypes.ts'],
      beforeWriteFile: (_, content) => {
        const cleanContent = content.replace('export {};', '');

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
}));
