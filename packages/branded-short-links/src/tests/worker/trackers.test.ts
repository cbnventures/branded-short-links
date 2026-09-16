import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

import { fireTrackers, normalizeNotificationValue } from '../../worker/trackers.js';

import type {
  Tests_Worker_Trackers_FireTrackers_CatchesTrackerErrorsWithoutCrashing_ResolveExpect,
  Tests_Worker_Trackers_FireTrackers_CatchesTrackerErrorsWithoutCrashing_Trackers,
  Tests_Worker_Trackers_FireTrackers_DoesNotCallFetchWhenTrackersArrayIsEmpty_Trackers,
  Tests_Worker_Trackers_FireTrackers_DoesNotLogWhenAllTrackersResolveSuccessfully_InfoSpy,
  Tests_Worker_Trackers_FireTrackers_DoesNotLogWhenAllTrackersResolveSuccessfully_Trackers,
  Tests_Worker_Trackers_FireTrackers_FiresAllTrackersInParallel_Trackers,
  Tests_Worker_Trackers_FireTrackers_FiresFacebookGETToCorrectEndpoint_Trackers,
  Tests_Worker_Trackers_FireTrackers_FiresFacebookGETToCorrectEndpoint_Url,
  Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Body,
  Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_BodyString,
  Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_EventParams,
  Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Events,
  Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Options,
  Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Trackers,
  Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Url,
  Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Body,
  Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_BodyString,
  Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Headers,
  Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Message,
  Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Options,
  Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Trackers,
  Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Url,
  Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Body,
  Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Headers,
  Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Options,
  Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Trackers,
  Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Url,
  Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Body,
  Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_BodyString,
  Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Options,
  Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Properties,
  Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Trackers,
  Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Url,
  Tests_Worker_Trackers_FireTrackers_LogsRejectedTrackerErrorsWithTrackerNameAndType_FirstArg,
  Tests_Worker_Trackers_FireTrackers_LogsRejectedTrackerErrorsWithTrackerNameAndType_InfoSpy,
  Tests_Worker_Trackers_FireTrackers_LogsRejectedTrackerErrorsWithTrackerNameAndType_Parsed,
  Tests_Worker_Trackers_FireTrackers_LogsRejectedTrackerErrorsWithTrackerNameAndType_Trackers,
  Tests_Worker_Trackers_FireTrackers_MockFetch,
  Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheFacebookPixelID_Trackers,
  Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheFacebookPixelID_Url,
  Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheGA4ApiSecret_Trackers,
  Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheGA4ApiSecret_Url,
  Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheGA4MeasurementID_Trackers,
  Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheGA4MeasurementID_Url,
  Tests_Worker_Trackers_MockRequest,
  Tests_Worker_Trackers_MockShortcode,
  Tests_Worker_Trackers_NormalizeNotificationValue_PreservesLiteralBackslashes_Input,
  Tests_Worker_Trackers_NormalizeNotificationValue_PreservesLiteralBackslashes_Result,
  Tests_Worker_Trackers_NormalizeNotificationValue_PreservesMarkdownPunctuation_Input,
  Tests_Worker_Trackers_NormalizeNotificationValue_PreservesMarkdownPunctuation_Result,
  Tests_Worker_Trackers_NormalizeNotificationValue_PreservesNormalNotificationText_Input,
  Tests_Worker_Trackers_NormalizeNotificationValue_PreservesNormalNotificationText_Result,
  Tests_Worker_Trackers_NormalizeNotificationValue_ReplacesCarriageReturnsAndNewlinesWithSpaces_Input,
  Tests_Worker_Trackers_NormalizeNotificationValue_ReplacesCarriageReturnsAndNewlinesWithSpaces_Result,
} from '../../types/tests/worker/trackers.test.d.ts';

const mockShortcode: Tests_Worker_Trackers_MockShortcode = {
  shortcode: '/gh',
  http_response: 302,
  redirect_url: 'https://github.com/example',
};

const mockRequest: Tests_Worker_Trackers_MockRequest = new Request('https://bsl.example.com/gh?source=ios_(app)', {
  method: 'GET',
  headers: {
    'cf-ray': 'abc123',
    'cf-connecting-ip': '1.2.3.4',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) Mobile\\Safari',
    'x-real-ip': '2001:db8::1',
  },
});

describe('normalizeNotificationValue', () => {
  it('preserves normal notification text', () => {
    const input: Tests_Worker_Trackers_NormalizeNotificationValue_PreservesNormalNotificationText_Input = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X)';
    const result: Tests_Worker_Trackers_NormalizeNotificationValue_PreservesNormalNotificationText_Result = normalizeNotificationValue(input);

    expect(result).toBe(input);

    return;
  });

  it('preserves Markdown punctuation', () => {
    const input: Tests_Worker_Trackers_NormalizeNotificationValue_PreservesMarkdownPunctuation_Input = '![tracking pixel](https://example.com/pixel.png) [sign in](https://example.com) **bold**';
    const result: Tests_Worker_Trackers_NormalizeNotificationValue_PreservesMarkdownPunctuation_Result = normalizeNotificationValue(input);

    expect(result).toBe(input);

    return;
  });

  it('preserves literal backslashes', () => {
    const input: Tests_Worker_Trackers_NormalizeNotificationValue_PreservesLiteralBackslashes_Input = 'C:\\Program Files\\Browser';
    const result: Tests_Worker_Trackers_NormalizeNotificationValue_PreservesLiteralBackslashes_Result = normalizeNotificationValue(input);

    expect(result).toBe(input);

    return;
  });

  it('replaces carriage returns and newlines with spaces', () => {
    const input: Tests_Worker_Trackers_NormalizeNotificationValue_ReplacesCarriageReturnsAndNewlinesWithSpaces_Input = [
      'line one\r',
      'line two',
      'line three\rline four',
    ].join('\n');

    const result: Tests_Worker_Trackers_NormalizeNotificationValue_ReplacesCarriageReturnsAndNewlinesWithSpaces_Result = normalizeNotificationValue(input);

    expect(result).not.toContain('\n');

    expect(result).not.toContain('\r');

    expect(result).toBe('line one line two line three line four');

    return;
  });

  return;
});

describe('fireTrackers', () => {
  let mockFetch: Tests_Worker_Trackers_FireTrackers_MockFetch = undefined;

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
    const trackers: Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Trackers = [{
      name: 'ga4',
      type: 'ga4',
      measurement_id: 'G-XXXXXXXXXX',
      api_secret: 'secret123',
    }];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(mockFetch).toHaveBeenCalledOnce();

    const url: Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Url = mockFetch!['mock']['calls'][0]![0] as Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Url;

    const options: Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Options = mockFetch!['mock']['calls'][0]![1] as Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Options;

    expect(url).toBe('https://www.google-analytics.com/mp/collect?measurement_id=G-XXXXXXXXXX&api_secret=secret123');

    expect(options['method']).toBe('POST');

    const bodyString: Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_BodyString = options['body'] as Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_BodyString;

    const body: Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Body = JSON.parse(bodyString) as Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Body;

    expect(body['client_id']).toBe('abc123');

    const events: Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Events = body['events'] as Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Events;

    const eventParams: Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_EventParams = events[0]!['params'] as Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_EventParams;

    expect(events[0]!['name']).toBe('select_content');

    expect(eventParams['content_type']).toBe('short_link');

    expect(eventParams['content_id']).toBe('/gh');

    expect(eventParams['link_url']).toBe('https://github.com/example');

    return;
  });

  it('percent-encodes an ampersand in the GA4 measurement ID', async () => {
    const trackers: Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheGA4MeasurementID_Trackers = [{
      name: 'ga4',
      type: 'ga4',
      measurement_id: 'G-TEST&ID',
      api_secret: 'secret123',
    }];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(mockFetch).toHaveBeenCalledOnce();

    const url: Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheGA4MeasurementID_Url = mockFetch!['mock']['calls'][0]![0] as Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheGA4MeasurementID_Url;

    expect(url).toBe('https://www.google-analytics.com/mp/collect?measurement_id=G-TEST%26ID&api_secret=secret123');

    return;
  });

  it('percent-encodes an ampersand in the GA4 api secret', async () => {
    const trackers: Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheGA4ApiSecret_Trackers = [{
      name: 'ga4',
      type: 'ga4',
      measurement_id: 'G-XXXXXXXXXX',
      api_secret: 'secret&123',
    }];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(mockFetch).toHaveBeenCalledOnce();

    const url: Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheGA4ApiSecret_Url = mockFetch!['mock']['calls'][0]![0] as Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheGA4ApiSecret_Url;

    expect(url).toContain('secret%26123');

    return;
  });

  it('fires Facebook GET to correct endpoint', async () => {
    const trackers: Tests_Worker_Trackers_FireTrackers_FiresFacebookGETToCorrectEndpoint_Trackers = [{
      name: 'facebook',
      type: 'facebook',
      pixel_id: '1234567890',
    }];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(mockFetch).toHaveBeenCalledOnce();

    const url: Tests_Worker_Trackers_FireTrackers_FiresFacebookGETToCorrectEndpoint_Url = mockFetch!['mock']['calls'][0]![0] as Tests_Worker_Trackers_FireTrackers_FiresFacebookGETToCorrectEndpoint_Url;

    expect(url).toBe('https://www.facebook.com/tr?id=1234567890&ev=PageView&noscript=1');

    return;
  });

  it('percent-encodes an ampersand in the Facebook pixel ID', async () => {
    const trackers: Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheFacebookPixelID_Trackers = [{
      name: 'facebook',
      type: 'facebook',
      pixel_id: '123&456',
    }];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(mockFetch).toHaveBeenCalledOnce();

    const url: Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheFacebookPixelID_Url = mockFetch!['mock']['calls'][0]![0] as Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheFacebookPixelID_Url;

    expect(url).toContain('123%26456');

    return;
  });

  it('fires ntfy POST with Bearer auth header', async () => {
    const trackers: Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Trackers = [{
      name: 'ntfy',
      type: 'ntfy',
      server: 'https://ntfy.example.com',
      topic: 'bsl-clicks',
      token: 'tk_abc123',
    }];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(mockFetch).toHaveBeenCalledOnce();

    const url: Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Url = mockFetch!['mock']['calls'][0]![0] as Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Url;

    const options: Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Options = mockFetch!['mock']['calls'][0]![1] as Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Options;

    expect(url).toBe('https://ntfy.example.com');

    expect(options['method']).toBe('POST');

    const headers: Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Headers = options['headers'] as Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Headers;

    expect(headers['Authorization']).toBe('Bearer tk_abc123');

    expect(headers['Content-Type']).toBe('application/json');

    const bodyString: Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_BodyString = options['body'] as Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_BodyString;

    const body: Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Body = JSON.parse(bodyString) as Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Body;

    expect(body['topic']).toBe('bsl-clicks');

    expect(body['title']).toBe('User Request Received');

    expect(body['markdown']).toBe(true);

    expect(body['priority']).toBe(2);

    const message: Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Message = body['message'] as Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Message;

    expect(message).toContain('/gh');

    expect(message).toContain('https://github.com/example');

    expect(message).toContain('__Request URL:__ https://bsl.example.com/gh?source=ios_(app)');

    expect(message).toContain('__User-Agent:__ Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) Mobile\\Safari');

    expect(message).toContain('__X-Real-IP:__ 2001:db8::1');

    return;
  });

  it('fires PostHog POST with API key in body', async () => {
    const trackers: Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Trackers = [{
      name: 'posthog',
      type: 'posthog',
      host: 'https://app.posthog.com',
      api_key: 'phc_abc123',
    }];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(mockFetch).toHaveBeenCalledOnce();

    const url: Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Url = mockFetch!['mock']['calls'][0]![0] as Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Url;

    const options: Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Options = mockFetch!['mock']['calls'][0]![1] as Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Options;

    expect(url).toBe('https://app.posthog.com/i/v0/e/');

    expect(options['method']).toBe('POST');

    const bodyString: Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_BodyString = options['body'] as Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_BodyString;

    const body: Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Body = JSON.parse(bodyString) as Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Body;

    expect(body['api_key']).toBe('phc_abc123');

    expect(body['event']).toBe('User Request Captured');

    expect(body['distinct_id']).toBe('abc123');

    const properties: Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Properties = body['properties'] as Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Properties;

    expect(properties['shortcode']).toBe('/gh');

    expect(properties['redirect_url']).toBe('https://github.com/example');

    return;
  });

  it('fires ntfy-reverse-proxy POST with ntfy headers to custom URL', async () => {
    const trackers: Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Trackers = [{
      name: 'ntfy-reverse-proxy',
      type: 'ntfy-reverse-proxy',
      url: 'https://proxy.example.com/ntfy',
      token: 'my-secret-token',
    }];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(mockFetch).toHaveBeenCalledOnce();

    const url: Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Url = mockFetch!['mock']['calls'][0]![0] as Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Url;

    const options: Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Options = mockFetch!['mock']['calls'][0]![1] as Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Options;

    expect(url).toBe('https://proxy.example.com/ntfy');

    expect(options['method']).toBe('POST');

    const headers: Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Headers = options['headers'] as Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Headers;

    expect(headers['Authorization']).toBe('Bearer my-secret-token');

    expect(headers['Content-Type']).toBe('text/plain');

    expect(headers['Title']).toBe('User Request Received');

    expect(headers['Markdown']).toBe('yes');

    const body: Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Body = options['body'] as Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Body;

    expect(body).toContain('/gh');

    expect(body).toContain('https://github.com/example');

    expect(body).toContain('__Request URL:__ https://bsl.example.com/gh?source=ios_(app)');

    expect(body).toContain('__User-Agent:__ Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) Mobile\\Safari');

    expect(body).toContain('__X-Real-IP:__ 2001:db8::1');

    return;
  });

  it('does not call fetch when trackers array is empty', async () => {
    const trackers: Tests_Worker_Trackers_FireTrackers_DoesNotCallFetchWhenTrackersArrayIsEmpty_Trackers = [];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(mockFetch).not.toHaveBeenCalled();

    return;
  });

  it('catches tracker errors without crashing', async () => {
    mockFetch!.mockRejectedValue(new Error('Network error'));

    const trackers: Tests_Worker_Trackers_FireTrackers_CatchesTrackerErrorsWithoutCrashing_Trackers = [{
      name: 'ga4',
      type: 'ga4',
      measurement_id: 'G-XXXXXXXXXX',
      api_secret: 'secret123',
    }];

    // Should not throw.
    const resolveExpect: Tests_Worker_Trackers_FireTrackers_CatchesTrackerErrorsWithoutCrashing_ResolveExpect = fireTrackers(trackers, mockRequest, mockShortcode);

    await expect(resolveExpect).resolves.toBeUndefined();

    return;
  });

  it('fires all trackers in parallel', async () => {
    const trackers: Tests_Worker_Trackers_FireTrackers_FiresAllTrackersInParallel_Trackers = [
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

  it('logs rejected tracker errors with tracker name and type', async () => {
    const infoSpy: Tests_Worker_Trackers_FireTrackers_LogsRejectedTrackerErrorsWithTrackerNameAndType_InfoSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);

    mockFetch = vi.fn().mockRejectedValue(new Error('Network error'));

    vi.stubGlobal('fetch', mockFetch);

    const trackers: Tests_Worker_Trackers_FireTrackers_LogsRejectedTrackerErrorsWithTrackerNameAndType_Trackers = [{
      name: 'ga4',
      type: 'ga4',
      measurement_id: 'G-XXXXXXXXXX',
      api_secret: 'secret123',
    }];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(infoSpy).toHaveBeenCalledOnce();

    const firstArg: Tests_Worker_Trackers_FireTrackers_LogsRejectedTrackerErrorsWithTrackerNameAndType_FirstArg = infoSpy['mock']['calls'][0]![0] as Tests_Worker_Trackers_FireTrackers_LogsRejectedTrackerErrorsWithTrackerNameAndType_FirstArg;

    const parsed: Tests_Worker_Trackers_FireTrackers_LogsRejectedTrackerErrorsWithTrackerNameAndType_Parsed = JSON.parse(firstArg) as Tests_Worker_Trackers_FireTrackers_LogsRejectedTrackerErrorsWithTrackerNameAndType_Parsed;

    expect(parsed['tracker']).toBe('ga4');

    expect(parsed['type']).toBe('ga4');

    expect(parsed['error']).toContain('Network error');

    infoSpy.mockRestore();

    return;
  });

  it('does not log when all trackers resolve successfully', async () => {
    const infoSpy: Tests_Worker_Trackers_FireTrackers_DoesNotLogWhenAllTrackersResolveSuccessfully_InfoSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);

    const trackers: Tests_Worker_Trackers_FireTrackers_DoesNotLogWhenAllTrackersResolveSuccessfully_Trackers = [{
      name: 'ga4',
      type: 'ga4',
      measurement_id: 'G-XXXXXXXXXX',
      api_secret: 'secret123',
    }];

    await fireTrackers(trackers, mockRequest, mockShortcode);

    expect(infoSpy).not.toHaveBeenCalled();

    infoSpy.mockRestore();

    return;
  });

  return;
});
