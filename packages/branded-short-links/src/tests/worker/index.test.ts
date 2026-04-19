import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

import { handleRequest } from '../../worker/handlers.js';
import workerDefault from '../../worker/index.js';

import type {
  TestsWorkerIndexBody,
  TestsWorkerIndexConfig,
  TestsWorkerIndexContentType,
  TestsWorkerIndexCtx,
  TestsWorkerIndexEnv,
  TestsWorkerIndexJsonBody,
  TestsWorkerIndexLocation,
  TestsWorkerIndexMockFetch,
  TestsWorkerIndexNoFallbackConfig,
  TestsWorkerIndexRequest,
  TestsWorkerIndexResponse,
} from '../../types/tests/worker/index.test.d.ts';

const mockConfig: TestsWorkerIndexConfig = {
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

function createMockCtx(): TestsWorkerIndexCtx {
  return {
    waitUntil: vi.fn(),
    passThroughOnException: vi.fn(),
    props: {},
  } as TestsWorkerIndexCtx;
}

describe('handleRequest', () => {
  beforeEach(() => {
    const mockFetchFn: TestsWorkerIndexMockFetch = vi.fn().mockResolvedValue(new Response('ok'));

    vi.stubGlobal('fetch', mockFetchFn);

    return;
  });

  afterEach(() => {
    vi.restoreAllMocks();

    return;
  });

  it('returns redirect with correct status code for valid shortcode', async () => {
    const request: TestsWorkerIndexRequest = new Request('https://bsl.example.com/gh', { method: 'GET' });
    const ctx: TestsWorkerIndexCtx = createMockCtx();

    const response: TestsWorkerIndexResponse = await handleRequest(request, mockConfig, ctx);

    expect(response['status']).toBe(302);

    const location: TestsWorkerIndexLocation = response['headers'].get('Location');

    expect(location).toBe('https://github.com/example');

    return;
  });

  it('returns redirect with 301 for /docs shortcode', async () => {
    const request: TestsWorkerIndexRequest = new Request('https://bsl.example.com/docs', { method: 'GET' });
    const ctx: TestsWorkerIndexCtx = createMockCtx();

    const response: TestsWorkerIndexResponse = await handleRequest(request, mockConfig, ctx);

    expect(response['status']).toBe(301);

    const location: TestsWorkerIndexLocation = response['headers'].get('Location');

    expect(location).toBe('https://docs.example.com/');

    return;
  });

  it('redirects unknown path to fallback_url preserving path/query/hash', async () => {
    const request: TestsWorkerIndexRequest = new Request('https://bsl.example.com/unknown/path?foo=bar#section', { method: 'GET' });
    const ctx: TestsWorkerIndexCtx = createMockCtx();

    const response: TestsWorkerIndexResponse = await handleRequest(request, mockConfig, ctx);

    expect(response['status']).toBe(301);

    const location: TestsWorkerIndexLocation = response['headers'].get('Location');

    expect(location).toBe('https://example.com/unknown/path?foo=bar#section');

    return;
  });

  it('redirects root to fallback_url when fallback is set', async () => {
    const request: TestsWorkerIndexRequest = new Request('https://bsl.example.com/', { method: 'GET' });
    const ctx: TestsWorkerIndexCtx = createMockCtx();

    const response: TestsWorkerIndexResponse = await handleRequest(request, mockConfig, ctx);

    expect(response['status']).toBe(301);

    const location: TestsWorkerIndexLocation = response['headers'].get('Location');

    expect(location).toBe('https://example.com/');

    return;
  });

  it('returns landing page HTML for GET to root when no fallback_url', async () => {
    const noFallbackConfig: TestsWorkerIndexNoFallbackConfig = {
      ...mockConfig,
      links: { items: mockConfig['links']['items'] },
    };
    const request: TestsWorkerIndexRequest = new Request('https://bsl.example.com/', { method: 'GET' });
    const ctx: TestsWorkerIndexCtx = createMockCtx();

    const response: TestsWorkerIndexResponse = await handleRequest(request, noFallbackConfig, ctx);

    expect(response['status']).toBe(200);

    const contentType: TestsWorkerIndexContentType = response['headers'].get('Content-Type');

    expect(contentType).toBe('text/html; charset=utf-8');

    const body: TestsWorkerIndexBody = await response.text();

    expect(body).toContain('Branded Short Links');

    return;
  });

  it('returns 404 not found page for unknown path when no fallback_url', async () => {
    const noFallbackConfig: TestsWorkerIndexNoFallbackConfig = {
      ...mockConfig,
      links: { items: mockConfig['links']['items'] },
    };
    const request: TestsWorkerIndexRequest = new Request('https://bsl.example.com/unknown', { method: 'GET' });
    const ctx: TestsWorkerIndexCtx = createMockCtx();

    const response: TestsWorkerIndexResponse = await handleRequest(request, noFallbackConfig, ctx);

    expect(response['status']).toBe(404);

    const contentType: TestsWorkerIndexContentType = response['headers'].get('Content-Type');

    expect(contentType).toBe('text/html; charset=utf-8');

    const body: TestsWorkerIndexBody = await response.text();

    expect(body).toContain('Shortcode Not Found');

    return;
  });

  it('returns 405 for POST request', async () => {
    const request: TestsWorkerIndexRequest = new Request('https://bsl.example.com/gh', { method: 'POST' });
    const ctx: TestsWorkerIndexCtx = createMockCtx();

    const response: TestsWorkerIndexResponse = await handleRequest(request, mockConfig, ctx);

    expect(response['status']).toBe(405);

    const contentType: TestsWorkerIndexContentType = response['headers'].get('Content-Type');

    expect(contentType).toBe('application/json');

    const body: TestsWorkerIndexJsonBody = await response.json();

    expect(body['status']).toBe('error');

    expect(body['message']).toBe('Method not allowed');

    return;
  });

  it('calls waitUntil with fireTrackers for valid shortcode', async () => {
    const request: TestsWorkerIndexRequest = new Request('https://bsl.example.com/gh', { method: 'GET' });
    const ctx: TestsWorkerIndexCtx = createMockCtx();

    await handleRequest(request, mockConfig, ctx);

    expect(ctx['waitUntil']).toHaveBeenCalledOnce();

    return;
  });

  it('strips trailing slash from shortcode path', async () => {
    const request: TestsWorkerIndexRequest = new Request('https://bsl.example.com/gh/', { method: 'GET' });
    const ctx: TestsWorkerIndexCtx = createMockCtx();

    const response: TestsWorkerIndexResponse = await handleRequest(request, mockConfig, ctx);

    expect(response['status']).toBe(302);

    const location: TestsWorkerIndexLocation = response['headers'].get('Location');

    expect(location).toBe('https://github.com/example');

    return;
  });

  return;
});

describe('worker default export fetch', () => {
  afterEach(() => {
    vi.restoreAllMocks();

    return;
  });

  it('returns 500 for invalid env', async () => {
    const request: TestsWorkerIndexRequest = new Request('https://bsl.example.com/', { method: 'GET' });
    const env: TestsWorkerIndexEnv = {
      SETTINGS: 'invalid-json',
      LINKS: '{}',
      TRACKERS: '[]',
    };
    const ctx: TestsWorkerIndexCtx = createMockCtx();

    const response: TestsWorkerIndexResponse = await workerDefault.fetch(request, env, ctx);

    expect(response['status']).toBe(500);

    const contentType: TestsWorkerIndexContentType = response['headers'].get('Content-Type');

    expect(contentType).toBe('application/json');

    return;
  });

  it('returns valid response for valid env', async () => {
    const mockFetchFn: TestsWorkerIndexMockFetch = vi.fn().mockResolvedValue(new Response('ok'));

    vi.stubGlobal('fetch', mockFetchFn);

    const request: TestsWorkerIndexRequest = new Request('https://bsl.example.com/', { method: 'GET' });
    const env: TestsWorkerIndexEnv = {
      SETTINGS: JSON.stringify(mockConfig['settings']),
      LINKS: JSON.stringify(mockConfig['links']),
      TRACKERS: JSON.stringify(mockConfig['trackers']),
    };
    const ctx: TestsWorkerIndexCtx = createMockCtx();

    const response: TestsWorkerIndexResponse = await workerDefault.fetch(request, env, ctx);

    expect(response['status']).toBe(301);

    return;
  });

  return;
});
