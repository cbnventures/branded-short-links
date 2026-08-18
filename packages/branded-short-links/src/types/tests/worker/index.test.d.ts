import type { vi } from 'vitest';

import type { Lib_Schema_Config } from '../../lib/schema.d.ts';

/**
 * Tests - Worker - Index.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_MockConfig_Settings = Lib_Schema_Config['settings'];

export type Tests_Worker_Index_MockConfig_Links = Lib_Schema_Config['links'];

export type Tests_Worker_Index_MockConfig_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Index_MockConfig = {
  settings: Tests_Worker_Index_MockConfig_Settings;
  links: Tests_Worker_Index_MockConfig_Links;
  trackers: Tests_Worker_Index_MockConfig_Trackers;
};

/**
 * Tests - Worker - Index - Create Mock Ctx.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_CreateMockCtx_Returns = ExecutionContext;

/**
 * Tests - Worker - Index - Worker Default Export Fetch - Returns 500 For Invalid Env.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_WorkerDefaultExportFetch_Returns500ForInvalidEnv_Request = Request;

export type Tests_Worker_Index_WorkerDefaultExportFetch_Returns500ForInvalidEnv_Env = Record<string, string>;

export type Tests_Worker_Index_WorkerDefaultExportFetch_Returns500ForInvalidEnv_Ctx = ExecutionContext;

export type Tests_Worker_Index_WorkerDefaultExportFetch_Returns500ForInvalidEnv_Response = Response;

export type Tests_Worker_Index_WorkerDefaultExportFetch_Returns500ForInvalidEnv_ContentType = string | null;

/**
 * Tests - Worker - Index - Worker Default Export Fetch - Returns Valid Response For Valid Env.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_WorkerDefaultExportFetch_ReturnsValidResponseForValidEnv_MockFetchFn = ReturnType<typeof vi.fn>;

export type Tests_Worker_Index_WorkerDefaultExportFetch_ReturnsValidResponseForValidEnv_Request = Request;

export type Tests_Worker_Index_WorkerDefaultExportFetch_ReturnsValidResponseForValidEnv_Env = Record<string, string>;

export type Tests_Worker_Index_WorkerDefaultExportFetch_ReturnsValidResponseForValidEnv_Ctx = ExecutionContext;

export type Tests_Worker_Index_WorkerDefaultExportFetch_ReturnsValidResponseForValidEnv_Response = Response;
