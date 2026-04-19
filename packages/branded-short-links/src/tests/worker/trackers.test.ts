import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

import { fireTrackers } from '../../worker/trackers.js';

import type {
  TestsWorkerTrackersBody,
  TestsWorkerTrackersBodyString,
  TestsWorkerTrackersEventParams,
  TestsWorkerTrackersEvents,
  TestsWorkerTrackersHeaders,
  TestsWorkerTrackersMockFetch,
  TestsWorkerTrackersOptions,
  TestsWorkerTrackersProperties,
  TestsWorkerTrackersRequest,
  TestsWorkerTrackersResolveExpect,
  TestsWorkerTrackersShortcode,
  TestsWorkerTrackersTrackers,
  TestsWorkerTrackersUrl,
} from '../../types/tests/worker/trackers.test.d.ts';

const mockShortcode: TestsWorkerTrackersShortcode = {
  shortcode: '/gh',
  http_response: 302,
  redirect_url: 'https://github.com/example',
};

const mockRequest: TestsWorkerTrackersRequest = new Request('https://bsl.example.com/gh', {
  method: 'GET',
  headers: {
    'cf-ray': 'abc123',
    'cf-connecting-ip': '1.2.3.4',
  },
});

describe('fireTrackers', () => {
  let mockFetch: TestsWorkerTrackersMockFetch = undefined;

  beforeEach(() => {
    mockFetch = vi.fn().mockResolvedValue(new Response('ok'));

    vi.stubGlobal('fetch', mockFetch);

    return;
  });

  afterEach(() => {
    vi.restoreAllMocks();

    return;
  });

  it('fires GA4 POST to correct endpoint with correct body', async () => {
    const trackers: TestsWorkerTrackersTrackers = [{
      name: 'ga4',
      type: 'ga4',
      measurement_id: 'G-XXXXXXXXXX',
      api_secret: 'secret123',
    }];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(mockFetch).toHaveBeenCalledOnce();

    const url: TestsWorkerTrackersUrl = mockFetch!['mock']['calls'][0]![0] as TestsWorkerTrackersUrl;

    const options: TestsWorkerTrackersOptions = mockFetch!['mock']['calls'][0]![1] as TestsWorkerTrackersOptions;

    expect(url).toBe('https://www.google-analytics.com/mp/collect?measurement_id=G-XXXXXXXXXX&api_secret=secret123');

    expect(options['method']).toBe('POST');

    const bodyString: TestsWorkerTrackersBodyString = options['body'] as TestsWorkerTrackersBodyString;

    const body: TestsWorkerTrackersBody = JSON.parse(bodyString) as TestsWorkerTrackersBody;

    expect(body['client_id']).toBe('abc123');

    const events: TestsWorkerTrackersEvents = body['events'] as TestsWorkerTrackersEvents;

    const eventParams: TestsWorkerTrackersEventParams = events[0]!['params'] as TestsWorkerTrackersEventParams;

    expect(events[0]!['name']).toBe('select_content');

    expect(eventParams['content_type']).toBe('short_link');

    expect(eventParams['content_id']).toBe('/gh');

    expect(eventParams['link_url']).toBe('https://github.com/example');

    return;
  });

  it('fires Facebook GET to correct endpoint', async () => {
    const trackers: TestsWorkerTrackersTrackers = [{
      name: 'facebook',
      type: 'facebook',
      pixel_id: '1234567890',
    }];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(mockFetch).toHaveBeenCalledOnce();

    const url: TestsWorkerTrackersUrl = mockFetch!['mock']['calls'][0]![0] as TestsWorkerTrackersUrl;

    expect(url).toBe('https://www.facebook.com/tr?id=1234567890&ev=PageView&noscript=1');

    return;
  });

  it('fires ntfy POST with Bearer auth header', async () => {
    const trackers: TestsWorkerTrackersTrackers = [{
      name: 'ntfy',
      type: 'ntfy',
      server: 'https://ntfy.example.com',
      topic: 'bsl-clicks',
      token: 'tk_abc123',
    }];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(mockFetch).toHaveBeenCalledOnce();

    const url: TestsWorkerTrackersUrl = mockFetch!['mock']['calls'][0]![0] as TestsWorkerTrackersUrl;

    const options: TestsWorkerTrackersOptions = mockFetch!['mock']['calls'][0]![1] as TestsWorkerTrackersOptions;

    expect(url).toBe('https://ntfy.example.com');

    expect(options['method']).toBe('POST');

    const headers: TestsWorkerTrackersHeaders = options['headers'] as TestsWorkerTrackersHeaders;

    expect(headers['Authorization']).toBe('Bearer tk_abc123');

    expect(headers['Content-Type']).toBe('application/json');

    const bodyString: TestsWorkerTrackersBodyString = options['body'] as TestsWorkerTrackersBodyString;

    const body: TestsWorkerTrackersBody = JSON.parse(bodyString) as TestsWorkerTrackersBody;

    expect(body['topic']).toBe('bsl-clicks');

    expect(body['title']).toBe('User Request Received');

    expect(body['markdown']).toBe(true);

    expect(body['priority']).toBe(2);

    const message: TestsWorkerTrackersBodyString = body['message'] as TestsWorkerTrackersBodyString;

    expect(message).toContain('/gh');

    expect(message).toContain('https://github.com/example');

    return;
  });

  it('fires PostHog POST with API key in body', async () => {
    const trackers: TestsWorkerTrackersTrackers = [{
      name: 'posthog',
      type: 'posthog',
      host: 'https://app.posthog.com',
      api_key: 'phc_abc123',
    }];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(mockFetch).toHaveBeenCalledOnce();

    const url: TestsWorkerTrackersUrl = mockFetch!['mock']['calls'][0]![0] as TestsWorkerTrackersUrl;

    const options: TestsWorkerTrackersOptions = mockFetch!['mock']['calls'][0]![1] as TestsWorkerTrackersOptions;

    expect(url).toBe('https://app.posthog.com/i/v0/e/');

    expect(options['method']).toBe('POST');

    const bodyString: TestsWorkerTrackersBodyString = options['body'] as TestsWorkerTrackersBodyString;

    const body: TestsWorkerTrackersBody = JSON.parse(bodyString) as TestsWorkerTrackersBody;

    expect(body['api_key']).toBe('phc_abc123');

    expect(body['event']).toBe('User Request Captured');

    expect(body['distinct_id']).toBe('abc123');

    const properties: TestsWorkerTrackersProperties = body['properties'] as TestsWorkerTrackersProperties;

    expect(properties['shortcode']).toBe('/gh');

    expect(properties['redirect_url']).toBe('https://github.com/example');

    return;
  });

  it('fires ntfy-reverse-proxy POST with ntfy headers to custom URL', async () => {
    const trackers: TestsWorkerTrackersTrackers = [{
      name: 'ntfy-reverse-proxy',
      type: 'ntfy-reverse-proxy',
      url: 'https://proxy.example.com/ntfy',
      token: 'my-secret-token',
    }];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(mockFetch).toHaveBeenCalledOnce();

    const url: TestsWorkerTrackersUrl = mockFetch!['mock']['calls'][0]![0] as TestsWorkerTrackersUrl;

    const options: TestsWorkerTrackersOptions = mockFetch!['mock']['calls'][0]![1] as TestsWorkerTrackersOptions;

    expect(url).toBe('https://proxy.example.com/ntfy');

    expect(options['method']).toBe('POST');

    const headers: TestsWorkerTrackersHeaders = options['headers'] as TestsWorkerTrackersHeaders;

    expect(headers['Authorization']).toBe('Bearer my-secret-token');

    expect(headers['Content-Type']).toBe('text/plain');

    expect(headers['Title']).toBe('User Request Received');

    expect(headers['Markdown']).toBe('yes');

    const body: TestsWorkerTrackersBodyString = options['body'] as TestsWorkerTrackersBodyString;

    expect(body).toContain('/gh');

    expect(body).toContain('https://github.com/example');

    return;
  });

  it('does not call fetch when trackers array is empty', async () => {
    const trackers: TestsWorkerTrackersTrackers = [];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(mockFetch).not.toHaveBeenCalled();

    return;
  });

  it('catches tracker errors without crashing', async () => {
    mockFetch!.mockRejectedValue(new Error('Network error'));

    const trackers: TestsWorkerTrackersTrackers = [{
      name: 'ga4',
      type: 'ga4',
      measurement_id: 'G-XXXXXXXXXX',
      api_secret: 'secret123',
    }];

    // Should not throw.
    const resolveExpect: TestsWorkerTrackersResolveExpect = fireTrackers(trackers, mockRequest, mockShortcode);

    await expect(resolveExpect).resolves.toBeUndefined();

    return;
  });

  it('fires all trackers in parallel', async () => {
    const trackers: TestsWorkerTrackersTrackers = [
      {
        name: 'ga4',
        type: 'ga4',
        measurement_id: 'G-XXXXXXXXXX',
        api_secret: 'secret123',
      },
      {
        name: 'facebook',
        type: 'facebook',
        pixel_id: '1234567890',
      },
      {
        name: 'ntfy',
        type: 'ntfy',
        server: 'https://ntfy.example.com',
        topic: 'bsl-clicks',
        token: 'tk_abc123',
      },
      {
        name: 'ntfy-reverse-proxy',
        type: 'ntfy-reverse-proxy',
        url: 'https://proxy.example.com/ntfy',
        token: 'my-secret-token',
      },
      {
        name: 'posthog',
        type: 'posthog',
        host: 'https://app.posthog.com',
        api_key: 'phc_abc123',
      },
    ];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(mockFetch).toHaveBeenCalledTimes(5);

    return;
  });

  return;
});
