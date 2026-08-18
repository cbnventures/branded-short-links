import {
  afterEach, describe, expect, it, vi,
} from 'vitest';

import workerDefault from '../../worker/index.js';

import type {
  Tests_Worker_Index_CreateMockCtx_Returns,
  Tests_Worker_Index_MockConfig,
  Tests_Worker_Index_WorkerDefaultExportFetch_Returns500ForInvalidEnv_ContentType,
  Tests_Worker_Index_WorkerDefaultExportFetch_Returns500ForInvalidEnv_Ctx,
  Tests_Worker_Index_WorkerDefaultExportFetch_Returns500ForInvalidEnv_Env,
  Tests_Worker_Index_WorkerDefaultExportFetch_Returns500ForInvalidEnv_Request,
  Tests_Worker_Index_WorkerDefaultExportFetch_Returns500ForInvalidEnv_Response,
  Tests_Worker_Index_WorkerDefaultExportFetch_ReturnsValidResponseForValidEnv_Ctx,
  Tests_Worker_Index_WorkerDefaultExportFetch_ReturnsValidResponseForValidEnv_Env,
  Tests_Worker_Index_WorkerDefaultExportFetch_ReturnsValidResponseForValidEnv_MockFetchFn,
  Tests_Worker_Index_WorkerDefaultExportFetch_ReturnsValidResponseForValidEnv_Request,
  Tests_Worker_Index_WorkerDefaultExportFetch_ReturnsValidResponseForValidEnv_Response,
} from '../../types/tests/worker/index.test.d.ts';

const mockConfig: Tests_Worker_Index_MockConfig = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'bsl.example.com',
    show_response_output: false,
  },
  links: {
    fallback_url: 'https://example.com',
    items: [
      {
        shortcode: '/gh',
        http_response: 302,
        redirect_url: 'https://github.com/example',
      },
      {
        shortcode: '/docs',
        http_response: 301,
        redirect_url: 'https://docs.example.com',
      },
    ],
  },
  trackers: [{
    name: 'ga4',
    type: 'ga4',
    measurement_id: 'G-XXXXXXXXXX',
    api_secret: 'secret123',
  }],
};

function createMockCtx(): Tests_Worker_Index_CreateMockCtx_Returns {
  return {
    waitUntil: vi.fn(),
    passThroughOnException: vi.fn(),
    props: {},
  } as Tests_Worker_Index_CreateMockCtx_Returns;
}

describe('worker default export fetch', () => {
  afterEach(() => {
    vi.restoreAllMocks();

    return;
  });

  it('returns 500 for invalid env', async () => {
    const request: Tests_Worker_Index_WorkerDefaultExportFetch_Returns500ForInvalidEnv_Request = new Request('https://bsl.example.com/', { method: 'GET' });
    const env: Tests_Worker_Index_WorkerDefaultExportFetch_Returns500ForInvalidEnv_Env = {
      SETTINGS: 'invalid-json',
      LINKS: '{}',
      TRACKERS: '[]',
    };
    const ctx: Tests_Worker_Index_WorkerDefaultExportFetch_Returns500ForInvalidEnv_Ctx = createMockCtx();

    const response: Tests_Worker_Index_WorkerDefaultExportFetch_Returns500ForInvalidEnv_Response = await workerDefault.fetch(request, env, ctx);

    expect(response['status']).toBe(500);

    const contentType: Tests_Worker_Index_WorkerDefaultExportFetch_Returns500ForInvalidEnv_ContentType = response['headers'].get('Content-Type');

    expect(contentType).toBe('application/json');

    return;
  });

  it('returns valid response for valid env', async () => {
    const mockFetchFn: Tests_Worker_Index_WorkerDefaultExportFetch_ReturnsValidResponseForValidEnv_MockFetchFn = vi.fn().mockResolvedValue(new Response('ok'));

    vi.stubGlobal('fetch', mockFetchFn);

    const request: Tests_Worker_Index_WorkerDefaultExportFetch_ReturnsValidResponseForValidEnv_Request = new Request('https://bsl.example.com/', { method: 'GET' });
    const env: Tests_Worker_Index_WorkerDefaultExportFetch_ReturnsValidResponseForValidEnv_Env = {
      SETTINGS: JSON.stringify(mockConfig['settings']),
      LINKS: JSON.stringify(mockConfig['links']),
      TRACKERS: JSON.stringify(mockConfig['trackers']),
    };
    const ctx: Tests_Worker_Index_WorkerDefaultExportFetch_ReturnsValidResponseForValidEnv_Ctx = createMockCtx();

    const response: Tests_Worker_Index_WorkerDefaultExportFetch_ReturnsValidResponseForValidEnv_Response = await workerDefault.fetch(request, env, ctx);

    expect(response['status']).toBe(301);

    return;
  });

  return;
});
