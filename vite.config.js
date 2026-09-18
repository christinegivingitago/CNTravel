import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        benefits: resolve(__dirname, 'benefits.html'),
        plan: resolve(__dirname, 'plan-my-trip.html'),
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
