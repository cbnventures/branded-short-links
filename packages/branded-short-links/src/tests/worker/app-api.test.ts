import {
  describe, expect, it, vi,
} from 'vitest';

import { handleAppLinksRequest } from '../../worker/app-api.js';
import { handleRequest } from '../../worker/handlers.js';

import type {
  Tests_Worker_AppApi_CreateMockCtx_Opaque,
  Tests_Worker_AppApi_CreateMockCtx_Returns,
  Tests_Worker_AppApi_HandleAppLinksRequest_HidesLoginCredentialsWhileReturningDeploymentConfig_Body,
  Tests_Worker_AppApi_HandleAppLinksRequest_HidesLoginCredentialsWhileReturningDeploymentConfig_Json,
  Tests_Worker_AppApi_HandleAppLinksRequest_HidesLoginCredentialsWhileReturningDeploymentConfig_Request,
  Tests_Worker_AppApi_HandleAppLinksRequest_HidesLoginCredentialsWhileReturningDeploymentConfig_Response,
  Tests_Worker_AppApi_HandleAppLinksRequest_Returns404WhenAppAccessIsDisabled_DisabledConfig,
  Tests_Worker_AppApi_HandleAppLinksRequest_Returns404WhenAppAccessIsDisabled_Request,
  Tests_Worker_AppApi_HandleAppLinksRequest_Returns404WhenAppAccessIsDisabled_Response,
  Tests_Worker_AppApi_HandleAppLinksRequest_Returns405ForWriteMethods_Request,
  Tests_Worker_AppApi_HandleAppLinksRequest_Returns405ForWriteMethods_Response,
  Tests_Worker_AppApi_HandleAppLinksRequest_ReturnsAnEmptyBodyForHEAD_Request,
  Tests_Worker_AppApi_HandleAppLinksRequest_ReturnsAnEmptyBodyForHEAD_Response,
  Tests_Worker_AppApi_HandleAppLinksRequest_ReturnsAnEmptyBodyForHEAD_Text,
  Tests_Worker_AppApi_HandleAppLinksRequest_UsesAGenericAuthenticationFailure_Request,
  Tests_Worker_AppApi_HandleAppLinksRequest_UsesAGenericAuthenticationFailure_Response,
  Tests_Worker_AppApi_MockConfig,
} from '../../types/tests/worker/app-api.test.d.ts';

const mockConfig: Tests_Worker_AppApi_MockConfig = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'go.example.com',
    show_response_output: false,
  },
  links: {
    fallback_url: 'https://example.com',
    items: [{
      shortcode: '/docs',
      http_response: 302,
      redirect_url: 'https://docs.example.com/private',
    }],
  },
  trackers: [{
    name: 'analytics',
    type: 'ga4',
    measurement_id: 'G-XXXXXXXXXX',
    api_secret: 'tracker-secret',
  }],
  app_access: {
    users: [{
      username: 'mobile',
      access_key: 'alpha-bravo-charlie-delta-echo',
    }],
  },
};

function createMockCtx(): Tests_Worker_AppApi_CreateMockCtx_Returns {
  return {
    waitUntil: vi.fn(),
    passThroughOnException: vi.fn(),
    props: {},
    tracing: { enterSpan: vi.fn() },
  } as Tests_Worker_AppApi_CreateMockCtx_Opaque as Tests_Worker_AppApi_CreateMockCtx_Returns;
}

describe('handleAppLinksRequest', () => {
  it('hides login credentials while returning deployment config', async () => {
    const request: Tests_Worker_AppApi_HandleAppLinksRequest_HidesLoginCredentialsWhileReturningDeploymentConfig_Request = new Request('https://go.example.com/__bsl/links', {
      headers: {
        Authorization: `Basic ${btoa('mobile:alpha-bravo-charlie-delta-echo')}`,
      },
    });
    const response: Tests_Worker_AppApi_HandleAppLinksRequest_HidesLoginCredentialsWhileReturningDeploymentConfig_Response = await handleRequest(request, mockConfig, createMockCtx());
    const body: Tests_Worker_AppApi_HandleAppLinksRequest_HidesLoginCredentialsWhileReturningDeploymentConfig_Body = await response.text();
    const json: Tests_Worker_AppApi_HandleAppLinksRequest_HidesLoginCredentialsWhileReturningDeploymentConfig_Json = JSON.parse(body);

    expect(response['status']).toBe(200);

    expect(response['headers'].get('Cache-Control')).toBe('private, no-store');

    expect(json['links'][0]).toEqual({
      shortcode: '/docs',
      http_response: 302,
      redirect_url: 'https://docs.example.com/private',
      branded_url: 'https://go.example.com/docs',
    });

    expect(json['trackers']).toEqual(mockConfig['trackers']);

    expect(body).not.toContain('app_access');

    expect(body).not.toContain('alpha-bravo-charlie-delta-echo');

    expect(body).not.toContain('mobile');

    return;
  });

  it('uses a generic authentication failure', () => {
    const request: Tests_Worker_AppApi_HandleAppLinksRequest_UsesAGenericAuthenticationFailure_Request = new Request('https://go.example.com/__bsl/links', {
      headers: {
        Authorization: `Basic ${btoa('mobile:wrong-key')}`,
      },
    });
    const response: Tests_Worker_AppApi_HandleAppLinksRequest_UsesAGenericAuthenticationFailure_Response = handleAppLinksRequest(request, mockConfig);

    expect(response['status']).toBe(401);

    expect(response['headers'].get('WWW-Authenticate')).toContain('Basic');

    return;
  });

  it('returns an empty body for HEAD', async () => {
    const request: Tests_Worker_AppApi_HandleAppLinksRequest_ReturnsAnEmptyBodyForHEAD_Request = new Request('https://go.example.com/__bsl/links', {
      method: 'HEAD',
      headers: {
        Authorization: `Basic ${btoa('mobile:alpha-bravo-charlie-delta-echo')}`,
      },
    });
    const response: Tests_Worker_AppApi_HandleAppLinksRequest_ReturnsAnEmptyBodyForHEAD_Response = handleAppLinksRequest(request, mockConfig);
    const text: Tests_Worker_AppApi_HandleAppLinksRequest_ReturnsAnEmptyBodyForHEAD_Text = await response.text();

    expect(response['status']).toBe(200);

    expect(text).toBe('');

    return;
  });

  it('returns 405 for write methods', () => {
    const request: Tests_Worker_AppApi_HandleAppLinksRequest_Returns405ForWriteMethods_Request = new Request('https://go.example.com/__bsl/links', { method: 'POST' });
    const response: Tests_Worker_AppApi_HandleAppLinksRequest_Returns405ForWriteMethods_Response = handleAppLinksRequest(request, mockConfig);

    expect(response['status']).toBe(405);

    expect(response['headers'].get('Allow')).toBe('GET, HEAD');

    return;
  });

  it('returns 404 when app access is disabled', () => {
    const disabledConfig: Tests_Worker_AppApi_HandleAppLinksRequest_Returns404WhenAppAccessIsDisabled_DisabledConfig = {
      ...mockConfig,
      app_access: { users: [] },
    };
    const request: Tests_Worker_AppApi_HandleAppLinksRequest_Returns404WhenAppAccessIsDisabled_Request = new Request('https://go.example.com/__bsl/links');
    const response: Tests_Worker_AppApi_HandleAppLinksRequest_Returns404WhenAppAccessIsDisabled_Response = handleAppLinksRequest(request, disabledConfig);

    expect(response['status']).toBe(404);

    return;
  });

  return;
});
