// / <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { join } from 'path';
import { defineConfig } from 'vite';
import vitePluginImport from 'vite-plugin-babel-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'classic' }),
    vitePluginImport([
      {
        libraryName: 'tezign-ui',
        libraryDirectory: 'es',
        style: (name) => `tezign-ui/es/${name}/style`,
        styleChangeCase: 'paramCase',
        ignoreStyles: [],
      },
    ]),
  ],
  css: { preprocessorOptions: { less: { javascriptEnabled: true } } },
  resolve: {
    alias: {
      '@': join(__dirname, './src'),
    },
  },
  test: {
    include: ['./utils/*'],
  },
});
