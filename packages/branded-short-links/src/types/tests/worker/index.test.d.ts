import type { vi } from 'vitest';

import type { LibSchemaConfig } from '../../lib/schema.d.ts';

/**
 * Tests - Worker - Index.
 *
 * @since 2.0.0
 */
export type TestsWorkerIndexConfig = LibSchemaConfig;

export type TestsWorkerIndexCtx = ExecutionContext;

export type TestsWorkerIndexMockFetch = ReturnType<typeof vi.fn>;

export type TestsWorkerIndexRequest = Request;

export type TestsWorkerIndexResponse = Response;

export type TestsWorkerIndexLocation = string | null;

export type TestsWorkerIndexNoFallbackConfig = LibSchemaConfig;

export type TestsWorkerIndexContentType = string | null;

export type TestsWorkerIndexBody = string;

export type TestsWorkerIndexJsonBody = Record<string, string>;

export type TestsWorkerIndexEnv = Record<string, string>;
