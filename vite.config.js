import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  // Change '' to '/your-repo-name/' if deploying to GitHub Pages project site
  // e.g. base: '/my-website/'
  base: '/Website-Miz/',
  build: {
    outDir: 'dist',
  },
});
