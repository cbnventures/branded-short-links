import { describe, expect, it } from 'vitest';

import { configSchema } from '../../lib/schema.js';

import type {
  TestsLibSchemaGa4Input,
  TestsLibSchemaInput,
  TestsLibSchemaResult,
  TestsLibSchemaValidCodes,
  TestsLibSchemaWrongFieldsInput,
} from '../../types/tests/lib/schema.test.d.ts';

describe('configSchema', () => {
  it('validates a complete valid config', () => {
    const valid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [{
          shortcode: '/gh',
          http_response: 302,
          redirect_url: 'https://github.com/example',
        }],
      },
      trackers: [
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
      ],
    };

    const result: TestsLibSchemaResult = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('rejects missing base_domain in settings', () => {
    const invalid: TestsLibSchemaInput = {
      settings: {
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [],
      },
      trackers: [],
    };

    const result: TestsLibSchemaResult = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects empty base_domain in settings', () => {
    const invalid: TestsLibSchemaInput = {
      settings: {
        base_domain: '',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [],
      },
      trackers: [],
    };

    const result: TestsLibSchemaResult = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects link item missing shortcode', () => {
    const invalid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [{
          http_response: 302,
          redirect_url: 'https://github.com/example',
        }],
      },
      trackers: [],
    };

    const result: TestsLibSchemaResult = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('validates GA4 tracker config', () => {
    const valid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [],
      },
      trackers: [{
        name: 'ga4-tracker',
        type: 'ga4',
        measurement_id: 'G-XXXXXXXXXX',
        api_secret: 'secret123',
      }],
    };

    const result: TestsLibSchemaResult = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('validates Facebook tracker config', () => {
    const valid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [],
      },
      trackers: [{
        name: 'fb-tracker',
        type: 'facebook',
        pixel_id: '1234567890',
      }],
    };

    const result: TestsLibSchemaResult = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('validates ntfy tracker config', () => {
    const valid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [],
      },
      trackers: [{
        name: 'ntfy-tracker',
        type: 'ntfy',
        server: 'https://ntfy.example.com',
        topic: 'bsl-clicks',
        token: 'tk_abc123',
      }],
    };

    const result: TestsLibSchemaResult = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('validates ntfy-reverse-proxy tracker config', () => {
    const valid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [],
      },
      trackers: [{
        name: 'ntfy-reverse-proxy-tracker',
        type: 'ntfy-reverse-proxy',
        url: 'https://proxy.example.com/ntfy',
        token: 'my-secret-token',
      }],
    };

    const result: TestsLibSchemaResult = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('validates PostHog tracker config', () => {
    const valid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [],
      },
      trackers: [{
        name: 'posthog-tracker',
        type: 'posthog',
        host: 'https://app.posthog.com',
        api_key: 'phc_abc123',
      }],
    };

    const result: TestsLibSchemaResult = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('rejects unknown tracker type', () => {
    const invalid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [],
      },
      trackers: [{
        name: 'unknown-tracker',
        type: 'mixpanel',
        api_key: 'abc123',
      }],
    };

    const result: TestsLibSchemaResult = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects shortcode not starting with /', () => {
    const invalid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [{
          shortcode: 'gh',
          http_response: 302,
          redirect_url: 'https://github.com/example',
        }],
      },
      trackers: [],
    };

    const result: TestsLibSchemaResult = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects invalid HTTP response code', () => {
    const invalid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [{
          shortcode: '/gh',
          http_response: 200,
          redirect_url: 'https://github.com/example',
        }],
      },
      trackers: [],
    };

    const result: TestsLibSchemaResult = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects invalid redirect_url', () => {
    const invalid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [{
          shortcode: '/gh',
          http_response: 302,
          redirect_url: 'not-a-valid-url',
        }],
      },
      trackers: [],
    };

    const result: TestsLibSchemaResult = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects invalid fallback_url', () => {
    const invalid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'not-a-url',
        items: [],
      },
      trackers: [],
    };

    const result: TestsLibSchemaResult = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('validates discriminated union routes tracker types correctly', () => {
    const ga4Input: TestsLibSchemaGa4Input = {
      settings: {
        worker_name: 'test-worker', base_domain: 'bsl.example.com', show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com', items: [],
      },
      trackers: [{
        name: 'ga4', type: 'ga4', measurement_id: 'G-X', api_secret: 's',
      }],
    };

    const ga4Result: TestsLibSchemaResult = configSchema.safeParse(ga4Input);

    expect(ga4Result['success']).toBe(true);

    // GA4 with wrong fields should fail (e.g., pixel_id instead of measurement_id).
    const wrongFieldsInput: TestsLibSchemaWrongFieldsInput = {
      settings: {
        worker_name: 'test-worker', base_domain: 'bsl.example.com', show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com', items: [],
      },
      trackers: [{
        name: 'ga4', type: 'ga4', pixel_id: '123',
      }],
    };

    const wrongFieldsResult: TestsLibSchemaResult = configSchema.safeParse(wrongFieldsInput);

    expect(wrongFieldsResult['success']).toBe(false);

    return;
  });

  it('allows empty trackers array', () => {
    const valid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [],
      },
      trackers: [],
    };

    const result: TestsLibSchemaResult = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('allows empty items array', () => {
    const valid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [],
      },
      trackers: [{
        name: 'test-ga4',
        type: 'ga4',
        measurement_id: 'G-TEST',
        api_secret: 'secret',
      }],
    };

    const result: TestsLibSchemaResult = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('validates all valid HTTP response codes', () => {
    const validCodes: TestsLibSchemaValidCodes = [
      301,
      302,
      303,
      307,
      308,
    ];

    for (const code of validCodes) {
      const valid: TestsLibSchemaInput = {
        settings: {
          worker_name: 'test-worker', base_domain: 'bsl.example.com', show_response_output: false,
        },
        links: {
          fallback_url: 'https://example.com',
          items: [{
            shortcode: '/test', http_response: code, redirect_url: 'https://example.com',
          }],
        },
        trackers: [],
      };

      const result: TestsLibSchemaResult = configSchema.safeParse(valid);

      expect(result['success']).toBe(true);
    }

    return;
  });

  return;
});
