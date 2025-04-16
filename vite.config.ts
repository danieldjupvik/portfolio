import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export const viteConfig = defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  server: {
    port: 4500,
    proxy: {
      '/api': {
        target: 'http://localhost:4501',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'build',
  },
  assetsInclude: [
    '**/*.PNG',
    '**/*.png',
    '**/*.JPG',
    '**/*.jpg',
    '**/*.JPEG',
    '**/*.jpeg',
    '**/*.GIF',
    '**/*.gif',
    '**/*.SVG',
    '**/*.svg',
  ],
});

export default viteConfig;
