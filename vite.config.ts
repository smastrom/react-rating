import { appendFile, copyFile, rm } from 'fs';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { terser } from 'rollup-plugin-terser';

import Package from './package.json';

export default defineConfig(({ command, mode }) => {
  if (mode === 'ci') {
    return {
      define: {
        __DEV__: true,
      },
      plugins: [react()],
    };
  }
  return {
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
      logOverride: { 'this-is-undefined-in-esm': command !== 'build' ? 'silent' : 'warning' },
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
          copyFile('dist/style.css', 'style.css', (err) => {
            if (err) {
              console.log(err);
            }
          });
        },
      }),
    ],
  };
});
