import path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/oauth': {
        target: 'https://ngw.devices.sberbank.ru:9443/api/v2',
        changeOrigin: true,
        secure: false,
      },
      '^/(chat/completions|models|files)': {
        target: 'https://gigachat.devices.sberbank.ru/api/v1',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
