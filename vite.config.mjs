import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * Vite config.
 *
 * @type {import('vite').UserConfig}
 *
 * @since 1.0.0
 */
const viteConfig = {
  base: './',
  build: {
    emptyOutDir: false,
    outDir: '../../linkgen',
  },
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  root: './src/linkgen',
};

export default viteConfig;
