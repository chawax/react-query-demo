import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    define: {
      // To prevent warning "Top-level "this" will be replaced with undefined since this file is an ECMAScript module"
      this: 'window',
    },
  },
});
