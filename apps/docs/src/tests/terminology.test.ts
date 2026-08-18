import { join } from 'node:path';

import { registerTerminologySuite } from '@cbnventures/nova/rules/vitest';
import * as vitest from 'vitest';

/**
 * Tests - Terminology.
 *
 * This site self-checks its Terminology components THROUGH the published kit.
 * The suite logic lives in @cbnventures/nova/rules/vitest; this wrapper
 * supplies the configuration that reproduces this site's conventions.
 *
 * This site has no "docs/quickstart" category, so the terminology page lives
 * under "docs/reference" instead — the path and route below are overridden
 * to match, since the published kit's defaults assume the "quickstart" layout.
 *
 * @since UNRELEASED
 */
registerTerminologySuite({
  vitest,
  enable: 'all',
  terminologyPath: join(process.cwd(), 'docs', 'reference', 'terminology.mdx'),
  expectedBase: '/docs/reference/terminology',
});
