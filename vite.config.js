import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import paths from './config/paths';

const APP_DIR = paths.appSrc;

export default defineConfig({
  server: {
    open: true
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@assets': `${APP_DIR}/assets`,
      '@popup': `${APP_DIR}/popup`,
      '@utils': `${APP_DIR}/utils`,
    },
  },
  build: {
    rollupOptions: {
      input: {
        popup: path.resolve(APP_DIR, 'popup', 'index.html'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})
