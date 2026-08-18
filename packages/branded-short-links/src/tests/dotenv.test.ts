import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { registerDotenvSuite } from '@cbnventures/nova/rules/vitest';
import * as vitest from 'vitest';

/**
 * Tests - Dotenv.
 *
 * This package self-checks its `.env` quote conventions THROUGH the published
 * kit. The inspector rules live in @cbnventures/nova/rules/vitest; this wrapper
 * supplies the configuration that reproduces this package's conventions.
 *
 * The `.env` files live at the monorepo root, so `rootDir` resolves up from this
 * sub-workspace test file instead of relying on Vitest's working directory.
 *
 * @since 2.0.3
 */
registerDotenvSuite({
  vitest,
  enable: 'all',
  rootDir: join(dirname(fileURLToPath(import.meta.url)), '../../../..'),
  envPaths: [
    '.env',
    '.env.sample',
  ],
});
