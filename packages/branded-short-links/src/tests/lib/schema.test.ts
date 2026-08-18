import { describe, expect, it } from 'vitest';

import { configSchema } from '../../lib/schema.js';

import type {
  Tests_Lib_Schema_ConfigSchema_AllowsEmptyItemsArray_Result,
  Tests_Lib_Schema_ConfigSchema_AllowsEmptyItemsArray_Valid,
  Tests_Lib_Schema_ConfigSchema_AllowsEmptyTrackersArray_Result,
  Tests_Lib_Schema_ConfigSchema_AllowsEmptyTrackersArray_Valid,
  Tests_Lib_Schema_ConfigSchema_RejectsEmptyBaseDomainInSettings_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsEmptyBaseDomainInSettings_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsInvalidFallbackUrl_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsInvalidFallbackUrl_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsInvalidHTTPResponseCode_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsInvalidHTTPResponseCode_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsInvalidRedirectUrl_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsInvalidRedirectUrl_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsLinkItemMissingShortcode_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsLinkItemMissingShortcode_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsMissingBaseDomainInSettings_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsMissingBaseDomainInSettings_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsShortcodeNotStartingWith_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsShortcodeNotStartingWith_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsUnknownTrackerType_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsUnknownTrackerType_Result,
  Tests_Lib_Schema_ConfigSchema_ValidatesACompleteValidConfig_Result,
  Tests_Lib_Schema_ConfigSchema_ValidatesACompleteValidConfig_Valid,
  Tests_Lib_Schema_ConfigSchema_ValidatesAllValidHTTPResponseCodes_Result,
  Tests_Lib_Schema_ConfigSchema_ValidatesAllValidHTTPResponseCodes_Valid,
  Tests_Lib_Schema_ConfigSchema_ValidatesAllValidHTTPResponseCodes_ValidCodes,
  Tests_Lib_Schema_ConfigSchema_ValidatesDiscriminatedUnionRoutesTrackerTypesCorrectly_Ga4Input,
  Tests_Lib_Schema_ConfigSchema_ValidatesDiscriminatedUnionRoutesTrackerTypesCorrectly_Ga4Result,
  Tests_Lib_Schema_ConfigSchema_ValidatesDiscriminatedUnionRoutesTrackerTypesCorrectly_WrongFieldsInput,
  Tests_Lib_Schema_ConfigSchema_ValidatesDiscriminatedUnionRoutesTrackerTypesCorrectly_WrongFieldsResult,
  Tests_Lib_Schema_ConfigSchema_ValidatesFacebookTrackerConfig_Result,
  Tests_Lib_Schema_ConfigSchema_ValidatesFacebookTrackerConfig_Valid,
  Tests_Lib_Schema_ConfigSchema_ValidatesGA4TrackerConfig_Result,
  Tests_Lib_Schema_ConfigSchema_ValidatesGA4TrackerConfig_Valid,
  Tests_Lib_Schema_ConfigSchema_ValidatesNtfyReverseProxyTrackerConfig_Result,
  Tests_Lib_Schema_ConfigSchema_ValidatesNtfyReverseProxyTrackerConfig_Valid,
  Tests_Lib_Schema_ConfigSchema_ValidatesNtfyTrackerConfig_Result,
  Tests_Lib_Schema_ConfigSchema_ValidatesNtfyTrackerConfig_Valid,
  Tests_Lib_Schema_ConfigSchema_ValidatesPostHogTrackerConfig_Result,
  Tests_Lib_Schema_ConfigSchema_ValidatesPostHogTrackerConfig_Valid,
} from '../../types/tests/lib/schema.test.d.ts';

describe('configSchema', () => {
  it('validates a complete valid config', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_ValidatesACompleteValidConfig_Valid = {
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

    const result: Tests_Lib_Schema_ConfigSchema_ValidatesACompleteValidConfig_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('rejects missing base_domain in settings', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsMissingBaseDomainInSettings_Invalid = {
      settings: {
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [],
      },
      trackers: [],
    };

    const result: Tests_Lib_Schema_ConfigSchema_RejectsMissingBaseDomainInSettings_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects empty base_domain in settings', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsEmptyBaseDomainInSettings_Invalid = {
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

    const result: Tests_Lib_Schema_ConfigSchema_RejectsEmptyBaseDomainInSettings_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects link item missing shortcode', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsLinkItemMissingShortcode_Invalid = {
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

    const result: Tests_Lib_Schema_ConfigSchema_RejectsLinkItemMissingShortcode_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('validates GA4 tracker config', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_ValidatesGA4TrackerConfig_Valid = {
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

    const result: Tests_Lib_Schema_ConfigSchema_ValidatesGA4TrackerConfig_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('validates Facebook tracker config', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_ValidatesFacebookTrackerConfig_Valid = {
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

    const result: Tests_Lib_Schema_ConfigSchema_ValidatesFacebookTrackerConfig_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('validates ntfy tracker config', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_ValidatesNtfyTrackerConfig_Valid = {
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

    const result: Tests_Lib_Schema_ConfigSchema_ValidatesNtfyTrackerConfig_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('validates ntfy-reverse-proxy tracker config', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_ValidatesNtfyReverseProxyTrackerConfig_Valid = {
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

    const result: Tests_Lib_Schema_ConfigSchema_ValidatesNtfyReverseProxyTrackerConfig_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('validates PostHog tracker config', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_ValidatesPostHogTrackerConfig_Valid = {
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

    const result: Tests_Lib_Schema_ConfigSchema_ValidatesPostHogTrackerConfig_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('rejects unknown tracker type', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsUnknownTrackerType_Invalid = {
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

    const result: Tests_Lib_Schema_ConfigSchema_RejectsUnknownTrackerType_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects shortcode not starting with /', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsShortcodeNotStartingWith_Invalid = {
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

    const result: Tests_Lib_Schema_ConfigSchema_RejectsShortcodeNotStartingWith_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects invalid HTTP response code', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsInvalidHTTPResponseCode_Invalid = {
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

    const result: Tests_Lib_Schema_ConfigSchema_RejectsInvalidHTTPResponseCode_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects invalid redirect_url', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsInvalidRedirectUrl_Invalid = {
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

    const result: Tests_Lib_Schema_ConfigSchema_RejectsInvalidRedirectUrl_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects invalid fallback_url', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsInvalidFallbackUrl_Invalid = {
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

    const result: Tests_Lib_Schema_ConfigSchema_RejectsInvalidFallbackUrl_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('validates discriminated union routes tracker types correctly', () => {
    const ga4Input: Tests_Lib_Schema_ConfigSchema_ValidatesDiscriminatedUnionRoutesTrackerTypesCorrectly_Ga4Input = {
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
        name: 'ga4',
        type: 'ga4',
        measurement_id: 'G-X',
        api_secret: 's',
      }],
    };

    const ga4Result: Tests_Lib_Schema_ConfigSchema_ValidatesDiscriminatedUnionRoutesTrackerTypesCorrectly_Ga4Result = configSchema.safeParse(ga4Input);

    expect(ga4Result['success']).toBe(true);

    // GA4 with wrong fields should fail (e.g., pixel_id instead of measurement_id).
    const wrongFieldsInput: Tests_Lib_Schema_ConfigSchema_ValidatesDiscriminatedUnionRoutesTrackerTypesCorrectly_WrongFieldsInput = {
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
        name: 'ga4',
        type: 'ga4',
        pixel_id: '123',
      }],
    };

    const wrongFieldsResult: Tests_Lib_Schema_ConfigSchema_ValidatesDiscriminatedUnionRoutesTrackerTypesCorrectly_WrongFieldsResult = configSchema.safeParse(wrongFieldsInput);

    expect(wrongFieldsResult['success']).toBe(false);

    return;
  });

  it('allows empty trackers array', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_AllowsEmptyTrackersArray_Valid = {
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

    const result: Tests_Lib_Schema_ConfigSchema_AllowsEmptyTrackersArray_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('allows empty items array', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_AllowsEmptyItemsArray_Valid = {
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

    const result: Tests_Lib_Schema_ConfigSchema_AllowsEmptyItemsArray_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('validates all valid HTTP response codes', () => {
    const validCodes: Tests_Lib_Schema_ConfigSchema_ValidatesAllValidHTTPResponseCodes_ValidCodes = [
      301,
      302,
      303,
      307,
      308,
    ];

    for (const code of validCodes) {
      const valid: Tests_Lib_Schema_ConfigSchema_ValidatesAllValidHTTPResponseCodes_Valid = {
        settings: {
          worker_name: 'test-worker',
          base_domain: 'bsl.example.com',
          show_response_output: false,
        },
        links: {
          fallback_url: 'https://example.com',
          items: [{
            shortcode: '/test',
            http_response: code,
            redirect_url: 'https://example.com',
          }],
        },
        trackers: [],
      };

      const result: Tests_Lib_Schema_ConfigSchema_ValidatesAllValidHTTPResponseCodes_Result = configSchema.safeParse(valid);

      expect(result['success']).toBe(true);
    }

    return;
  });

  return;
});
