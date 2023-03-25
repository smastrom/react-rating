import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import terser from '@rollup/plugin-terser'

import Package from './package.json'

const vitestOptions = {
   test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './tests/dom/setupTests.ts',
      exclude: ['**/vite/**', '**/node_modules/**', '**/dist/**', '**/ct/**'],
   },
}

export default defineConfig(({ command }) => ({
   ...vitestOptions,
   define: {
      __DEV__: command !== 'build',
   },
   build: {
      minify: 'terser',
      lib: {
         name: Package.name,
         entry: 'src/index.ts',
         formats: ['es', 'cjs'],
         fileName: 'index',
      },
      rollupOptions: {
         external: ['react', 'react/jsx-runtime'],
         output: {
            globals: {
               react: 'React',
               'react/jsx-runtime': 'React',
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
   plugins: [react()],
}))
