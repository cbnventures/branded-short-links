import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

import { handleRequest } from '../../worker/handlers.js';

import type {
  Tests_Worker_Handlers_CreateMockCtx_Returns,
  Tests_Worker_Handlers_HandleRequest_CallsWaitUntilWithFireTrackersForValidShortcode_Ctx,
  Tests_Worker_Handlers_HandleRequest_CallsWaitUntilWithFireTrackersForValidShortcode_Request,
  Tests_Worker_Handlers_HandleRequest_MockFetchFn,
  Tests_Worker_Handlers_HandleRequest_RedirectsRootToFallbackUrlWhenFallbackIsSet_Ctx,
  Tests_Worker_Handlers_HandleRequest_RedirectsRootToFallbackUrlWhenFallbackIsSet_Location,
  Tests_Worker_Handlers_HandleRequest_RedirectsRootToFallbackUrlWhenFallbackIsSet_Request,
  Tests_Worker_Handlers_HandleRequest_RedirectsRootToFallbackUrlWhenFallbackIsSet_Response,
  Tests_Worker_Handlers_HandleRequest_RedirectsUnknownPathToFallbackUrlPreservingPathQueryHash_Ctx,
  Tests_Worker_Handlers_HandleRequest_RedirectsUnknownPathToFallbackUrlPreservingPathQueryHash_Location,
  Tests_Worker_Handlers_HandleRequest_RedirectsUnknownPathToFallbackUrlPreservingPathQueryHash_Request,
  Tests_Worker_Handlers_HandleRequest_RedirectsUnknownPathToFallbackUrlPreservingPathQueryHash_Response,
  Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_Body,
  Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_ContentType,
  Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_Ctx,
  Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_NoFallbackConfig,
  Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_Request,
  Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_Response,
  Tests_Worker_Handlers_HandleRequest_Returns405ForPOSTRequest_Body,
  Tests_Worker_Handlers_HandleRequest_Returns405ForPOSTRequest_ContentType,
  Tests_Worker_Handlers_HandleRequest_Returns405ForPOSTRequest_Ctx,
  Tests_Worker_Handlers_HandleRequest_Returns405ForPOSTRequest_Request,
  Tests_Worker_Handlers_HandleRequest_Returns405ForPOSTRequest_Response,
  Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_Body,
  Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_ContentType,
  Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_Ctx,
  Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_NoFallbackConfig,
  Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_Request,
  Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_Response,
  Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWith301ForDocsShortcode_Ctx,
  Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWith301ForDocsShortcode_Location,
  Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWith301ForDocsShortcode_Request,
  Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWith301ForDocsShortcode_Response,
  Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWithCorrectStatusCodeForValidShortcode_Ctx,
  Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWithCorrectStatusCodeForValidShortcode_Location,
  Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWithCorrectStatusCodeForValidShortcode_Request,
  Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWithCorrectStatusCodeForValidShortcode_Response,
  Tests_Worker_Handlers_HandleRequest_StripsTrailingSlashFromShortcodePath_Ctx,
  Tests_Worker_Handlers_HandleRequest_StripsTrailingSlashFromShortcodePath_Location,
  Tests_Worker_Handlers_HandleRequest_StripsTrailingSlashFromShortcodePath_Request,
  Tests_Worker_Handlers_HandleRequest_StripsTrailingSlashFromShortcodePath_Response,
  Tests_Worker_Handlers_MockConfig,
} from '../../types/tests/worker/handlers.test.d.ts';

const mockConfig: Tests_Worker_Handlers_MockConfig = {
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

function createMockCtx(): Tests_Worker_Handlers_CreateMockCtx_Returns {
  return {
    waitUntil: vi.fn(),
    passThroughOnException: vi.fn(),
    props: {},
  } as Tests_Worker_Handlers_CreateMockCtx_Returns;
}

describe('handleRequest', () => {
  beforeEach(() => {
    const mockFetchFn: Tests_Worker_Handlers_HandleRequest_MockFetchFn = vi.fn().mockResolvedValue(new Response('ok'));

    vi.stubGlobal('fetch', mockFetchFn);

    return;
  });

  afterEach(() => {
    vi.restoreAllMocks();

    return;
  });

  it('returns redirect with correct status code for valid shortcode', async () => {
    const request: Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWithCorrectStatusCodeForValidShortcode_Request = new Request('https://bsl.example.com/gh', { method: 'GET' });
    const ctx: Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWithCorrectStatusCodeForValidShortcode_Ctx = createMockCtx();

    const response: Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWithCorrectStatusCodeForValidShortcode_Response = await handleRequest(request, mockConfig, ctx);

    expect(response['status']).toBe(302);

    const location: Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWithCorrectStatusCodeForValidShortcode_Location = response['headers'].get('Location');

    expect(location).toBe('https://github.com/example');

    return;
  });

  it('returns redirect with 301 for /docs shortcode', async () => {
    const request: Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWith301ForDocsShortcode_Request = new Request('https://bsl.example.com/docs', { method: 'GET' });
    const ctx: Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWith301ForDocsShortcode_Ctx = createMockCtx();

    const response: Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWith301ForDocsShortcode_Response = await handleRequest(request, mockConfig, ctx);

    expect(response['status']).toBe(301);

    const location: Tests_Worker_Handlers_HandleRequest_ReturnsRedirectWith301ForDocsShortcode_Location = response['headers'].get('Location');

    expect(location).toBe('https://docs.example.com/');

    return;
  });

  it('redirects unknown path to fallback_url preserving path/query/hash', async () => {
    const request: Tests_Worker_Handlers_HandleRequest_RedirectsUnknownPathToFallbackUrlPreservingPathQueryHash_Request = new Request('https://bsl.example.com/unknown/path?foo=bar', { method: 'GET' });
    const ctx: Tests_Worker_Handlers_HandleRequest_RedirectsUnknownPathToFallbackUrlPreservingPathQueryHash_Ctx = createMockCtx();

    const response: Tests_Worker_Handlers_HandleRequest_RedirectsUnknownPathToFallbackUrlPreservingPathQueryHash_Response = await handleRequest(request, mockConfig, ctx);

    expect(response['status']).toBe(301);

    const location: Tests_Worker_Handlers_HandleRequest_RedirectsUnknownPathToFallbackUrlPreservingPathQueryHash_Location = response['headers'].get('Location');

    expect(location).toBe('https://example.com/unknown/path?foo=bar');

    return;
  });

  it('redirects root to fallback_url when fallback is set', async () => {
    const request: Tests_Worker_Handlers_HandleRequest_RedirectsRootToFallbackUrlWhenFallbackIsSet_Request = new Request('https://bsl.example.com/', { method: 'GET' });
    const ctx: Tests_Worker_Handlers_HandleRequest_RedirectsRootToFallbackUrlWhenFallbackIsSet_Ctx = createMockCtx();

    const response: Tests_Worker_Handlers_HandleRequest_RedirectsRootToFallbackUrlWhenFallbackIsSet_Response = await handleRequest(request, mockConfig, ctx);

    expect(response['status']).toBe(301);

    const location: Tests_Worker_Handlers_HandleRequest_RedirectsRootToFallbackUrlWhenFallbackIsSet_Location = response['headers'].get('Location');

    expect(location).toBe('https://example.com/');

    return;
  });

  it('returns landing page HTML for GET to root when no fallback_url', async () => {
    const noFallbackConfig: Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_NoFallbackConfig = {
      ...mockConfig,
      links: { items: mockConfig['links']['items'] },
    };
    const request: Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_Request = new Request('https://bsl.example.com/', { method: 'GET' });
    const ctx: Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_Ctx = createMockCtx();

    const response: Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_Response = await handleRequest(request, noFallbackConfig, ctx);

    expect(response['status']).toBe(200);

    const contentType: Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_ContentType = response['headers'].get('Content-Type');

    expect(contentType).toBe('text/html; charset=utf-8');

    const body: Tests_Worker_Handlers_HandleRequest_ReturnsLandingPageHTMLForGETToRootWhenNoFallbackUrl_Body = await response.text();

    expect(body).toContain('Branded Short Links');

    return;
  });

  it('returns 404 not found page for unknown path when no fallback_url', async () => {
    const noFallbackConfig: Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_NoFallbackConfig = {
      ...mockConfig,
      links: { items: mockConfig['links']['items'] },
    };
    const request: Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_Request = new Request('https://bsl.example.com/unknown', { method: 'GET' });
    const ctx: Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_Ctx = createMockCtx();

    const response: Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_Response = await handleRequest(request, noFallbackConfig, ctx);

    expect(response['status']).toBe(404);

    const contentType: Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_ContentType = response['headers'].get('Content-Type');

    expect(contentType).toBe('text/html; charset=utf-8');

    const body: Tests_Worker_Handlers_HandleRequest_Returns404NotFoundPageForUnknownPathWhenNoFallbackUrl_Body = await response.text();

    expect(body).toContain('Shortcode Not Found');

    return;
  });

  it('returns 405 for POST request', async () => {
    const request: Tests_Worker_Handlers_HandleRequest_Returns405ForPOSTRequest_Request = new Request('https://bsl.example.com/gh', { method: 'POST' });
    const ctx: Tests_Worker_Handlers_HandleRequest_Returns405ForPOSTRequest_Ctx = createMockCtx();

    const response: Tests_Worker_Handlers_HandleRequest_Returns405ForPOSTRequest_Response = await handleRequest(request, mockConfig, ctx);

    expect(response['status']).toBe(405);

    const contentType: Tests_Worker_Handlers_HandleRequest_Returns405ForPOSTRequest_ContentType = response['headers'].get('Content-Type');

    expect(contentType).toBe('application/json');

    const body: Tests_Worker_Handlers_HandleRequest_Returns405ForPOSTRequest_Body = await response.json();

    expect(body['status']).toBe('error');

    expect(body['message']).toBe('Method not allowed');

    return;
  });

  it('calls waitUntil with fireTrackers for valid shortcode', async () => {
    const request: Tests_Worker_Handlers_HandleRequest_CallsWaitUntilWithFireTrackersForValidShortcode_Request = new Request('https://bsl.example.com/gh', { method: 'GET' });
    const ctx: Tests_Worker_Handlers_HandleRequest_CallsWaitUntilWithFireTrackersForValidShortcode_Ctx = createMockCtx();

    await handleRequest(request, mockConfig, ctx);

    expect(ctx['waitUntil']).toHaveBeenCalledOnce();

    return;
  });

  it('strips trailing slash from shortcode path', async () => {
    const request: Tests_Worker_Handlers_HandleRequest_StripsTrailingSlashFromShortcodePath_Request = new Request('https://bsl.example.com/gh/', { method: 'GET' });
    const ctx: Tests_Worker_Handlers_HandleRequest_StripsTrailingSlashFromShortcodePath_Ctx = createMockCtx();

    const response: Tests_Worker_Handlers_HandleRequest_StripsTrailingSlashFromShortcodePath_Response = await handleRequest(request, mockConfig, ctx);

    expect(response['status']).toBe(302);

    const location: Tests_Worker_Handlers_HandleRequest_StripsTrailingSlashFromShortcodePath_Location = response['headers'].get('Location');

    expect(location).toBe('https://github.com/example');

    return;
  });

  return;
});
