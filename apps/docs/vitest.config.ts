import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

/**
 * Vitest Configuration.
 *
 * @since 0.15.0
 */
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFilePath);

export default defineConfig({
  resolve: {
    alias: {
      '@site': currentDirectory,
    },
  },
  test: {
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/tests/**/*.test.ts'],
    globals: false,
    testTimeout: 30000, // 30 seconds.
    sequence: {
      concurrent: false,
    },
  },
});
