import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Relative base so the built site also works from a sub-path (e.g. GitHub Pages).
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        android: resolve(import.meta.dirname, 'android.html'),
        emulators: resolve(import.meta.dirname, 'emulators.html'),
        pc: resolve(import.meta.dirname, 'gaming-computers.html'),
      },
    },
  },
});
