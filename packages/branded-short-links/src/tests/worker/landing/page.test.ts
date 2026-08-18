import { describe, expect, it } from 'vitest';

import {
  landingPage, maskConfig, maskValue, notFoundPage,
} from '../../../worker/landing/page.js';

import type {
  Tests_Worker_Landing_Page_LandingPage_ContainsBrandedShortLinksText_Body,
  Tests_Worker_Landing_Page_LandingPage_ContainsBrandedShortLinksText_Response,
  Tests_Worker_Landing_Page_LandingPage_ContainsGitHubLink_Body,
  Tests_Worker_Landing_Page_LandingPage_ContainsGitHubLink_Response,
  Tests_Worker_Landing_Page_LandingPage_DoesNotShowConfigInNonDebugMode_Body,
  Tests_Worker_Landing_Page_LandingPage_DoesNotShowConfigInNonDebugMode_Response,
  Tests_Worker_Landing_Page_LandingPage_ReturnsHTMLResponseWithCorrectContentType_ContentType,
  Tests_Worker_Landing_Page_LandingPage_ReturnsHTMLResponseWithCorrectContentType_Response,
  Tests_Worker_Landing_Page_LandingPage_ShowsMaskedConfigInDebugMode_Body,
  Tests_Worker_Landing_Page_LandingPage_ShowsMaskedConfigInDebugMode_DebugConfig,
  Tests_Worker_Landing_Page_LandingPage_ShowsMaskedConfigInDebugMode_Response,
  Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_FacebookConfig,
  Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_Masked,
  Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_Trackers,
  Tests_Worker_Landing_Page_MaskConfig_MasksGa4TrackerSecrets_Masked,
  Tests_Worker_Landing_Page_MaskConfig_MasksGa4TrackerSecrets_Trackers,
  Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_Masked,
  Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_NtfyReverseProxyConfig,
  Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_Trackers,
  Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_Masked,
  Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_NtfyReverseProxyNoTokenConfig,
  Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_Trackers,
  Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_Masked,
  Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_NtfyConfig,
  Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_Trackers,
  Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_Masked,
  Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_PlainTextConfig,
  Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_Trackers,
  Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_Masked,
  Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_PlainTextNoTokenConfig,
  Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_Trackers,
  Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_Masked,
  Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_PosthogConfig,
  Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_Trackers,
  Tests_Worker_Landing_Page_MaskConfig_MasksRedirectUrlInLinkItems_Links,
  Tests_Worker_Landing_Page_MaskConfig_MasksRedirectUrlInLinkItems_Masked,
  Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_Links,
  Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_Masked,
  Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_NoFallbackConfig,
  Tests_Worker_Landing_Page_MaskConfig_PreservesFallbackUrlUnmasked_Links,
  Tests_Worker_Landing_Page_MaskConfig_PreservesFallbackUrlUnmasked_Masked,
  Tests_Worker_Landing_Page_MaskConfig_PreservesSettingsUnmasked_Masked,
  Tests_Worker_Landing_Page_MaskConfig_PreservesSettingsUnmasked_Settings,
  Tests_Worker_Landing_Page_MaskValue_FullyMasksAllValues_MaskedAbc,
  Tests_Worker_Landing_Page_MaskValue_FullyMasksAllValues_MaskedMeasurementId,
  Tests_Worker_Landing_Page_MaskValue_FullyMasksAllValues_MaskedSecret,
  Tests_Worker_Landing_Page_MockConfig,
  Tests_Worker_Landing_Page_NotFoundPage_Contains404Badge_Body,
  Tests_Worker_Landing_Page_NotFoundPage_Contains404Badge_Response,
  Tests_Worker_Landing_Page_NotFoundPage_ContainsShortcodeNotFoundText_Body,
  Tests_Worker_Landing_Page_NotFoundPage_ContainsShortcodeNotFoundText_Response,
  Tests_Worker_Landing_Page_NotFoundPage_Returns404WithCorrectContentType_ContentType,
  Tests_Worker_Landing_Page_NotFoundPage_Returns404WithCorrectContentType_Response,
} from '../../../types/tests/worker/landing/page.test.d.ts';

const mockConfig: Tests_Worker_Landing_Page_MockConfig = {
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

describe('landingPage', () => {
  it('returns HTML response with correct content type', () => {
    const response: Tests_Worker_Landing_Page_LandingPage_ReturnsHTMLResponseWithCorrectContentType_Response = landingPage(mockConfig);

    expect(response['status']).toBe(200);

    const contentType: Tests_Worker_Landing_Page_LandingPage_ReturnsHTMLResponseWithCorrectContentType_ContentType = response['headers'].get('Content-Type');

    expect(contentType).toBe('text/html; charset=utf-8');

    return;
  });

  it('contains "Branded Short Links" text', async () => {
    const response: Tests_Worker_Landing_Page_LandingPage_ContainsBrandedShortLinksText_Response = landingPage(mockConfig);
    const body: Tests_Worker_Landing_Page_LandingPage_ContainsBrandedShortLinksText_Body = await response.text();

    expect(body).toContain('Branded Short Links');

    return;
  });

  it('contains GitHub link', async () => {
    const response: Tests_Worker_Landing_Page_LandingPage_ContainsGitHubLink_Response = landingPage(mockConfig);
    const body: Tests_Worker_Landing_Page_LandingPage_ContainsGitHubLink_Body = await response.text();

    expect(body).toContain('https://github.com/cbnventures/branded-short-links');

    return;
  });

  it('shows masked config in debug mode', async () => {
    const debugConfig: Tests_Worker_Landing_Page_LandingPage_ShowsMaskedConfigInDebugMode_DebugConfig = {
      ...mockConfig,
      settings: {
        ...mockConfig['settings'],
        show_response_output: true,
      },
    };

    const response: Tests_Worker_Landing_Page_LandingPage_ShowsMaskedConfigInDebugMode_Response = landingPage(debugConfig);
    const body: Tests_Worker_Landing_Page_LandingPage_ShowsMaskedConfigInDebugMode_Body = await response.text();

    expect(body).toContain('class="debug"');

    expect(body).toContain('bsl.example.com');

    expect(body).not.toContain('https://github.com/example');

    expect(body).not.toContain('secret123');

    return;
  });

  it('does not show config in non-debug mode', async () => {
    const response: Tests_Worker_Landing_Page_LandingPage_DoesNotShowConfigInNonDebugMode_Response = landingPage(mockConfig);
    const body: Tests_Worker_Landing_Page_LandingPage_DoesNotShowConfigInNonDebugMode_Body = await response.text();

    expect(body).not.toContain('class="debug"');

    expect(body).not.toContain('bsl.example.com');

    return;
  });

  return;
});

describe('notFoundPage', () => {
  it('returns 404 with correct content type', () => {
    const response: Tests_Worker_Landing_Page_NotFoundPage_Returns404WithCorrectContentType_Response = notFoundPage(mockConfig);

    expect(response['status']).toBe(404);

    const contentType: Tests_Worker_Landing_Page_NotFoundPage_Returns404WithCorrectContentType_ContentType = response['headers'].get('Content-Type');

    expect(contentType).toBe('text/html; charset=utf-8');

    return;
  });

  it('contains "Shortcode Not Found" text', async () => {
    const response: Tests_Worker_Landing_Page_NotFoundPage_ContainsShortcodeNotFoundText_Response = notFoundPage(mockConfig);
    const body: Tests_Worker_Landing_Page_NotFoundPage_ContainsShortcodeNotFoundText_Body = await response.text();

    expect(body).toContain('Shortcode Not Found');

    return;
  });

  it('contains 404 badge', async () => {
    const response: Tests_Worker_Landing_Page_NotFoundPage_Contains404Badge_Response = notFoundPage(mockConfig);
    const body: Tests_Worker_Landing_Page_NotFoundPage_Contains404Badge_Body = await response.text();

    expect(body).toContain('404');

    return;
  });

  return;
});

describe('maskValue', () => {
  it('fully masks all values', () => {
    const maskedAbc: Tests_Worker_Landing_Page_MaskValue_FullyMasksAllValues_MaskedAbc = maskValue('abc');

    expect(maskedAbc).toBe('\u2022\u2022\u2022\u2022\u2022\u2022');

    const maskedSecret: Tests_Worker_Landing_Page_MaskValue_FullyMasksAllValues_MaskedSecret = maskValue('secret123');

    expect(maskedSecret).toBe('\u2022\u2022\u2022\u2022\u2022\u2022');

    const maskedMeasurementId: Tests_Worker_Landing_Page_MaskValue_FullyMasksAllValues_MaskedMeasurementId = maskValue('G-XXXXXXXXXX');

    expect(maskedMeasurementId).toBe('\u2022\u2022\u2022\u2022\u2022\u2022');

    return;
  });

  return;
});

describe('maskConfig', () => {
  it('masks redirect_url in link items', () => {
    const masked: Tests_Worker_Landing_Page_MaskConfig_MasksRedirectUrlInLinkItems_Masked = maskConfig(mockConfig);
    const links: Tests_Worker_Landing_Page_MaskConfig_MasksRedirectUrlInLinkItems_Links = masked['links'] as Tests_Worker_Landing_Page_MaskConfig_MasksRedirectUrlInLinkItems_Links;

    expect(links['items'][0]!['redirect_url']).not.toBe('https://github.com/example');

    expect(links['items'][0]!['redirect_url']).toContain('\u2022');

    return;
  });

  it('masks ga4 tracker secrets', () => {
    const masked: Tests_Worker_Landing_Page_MaskConfig_MasksGa4TrackerSecrets_Masked = maskConfig(mockConfig);
    const trackers: Tests_Worker_Landing_Page_MaskConfig_MasksGa4TrackerSecrets_Trackers = masked['trackers'] as Tests_Worker_Landing_Page_MaskConfig_MasksGa4TrackerSecrets_Trackers;

    expect(trackers[0]!['measurement_id']).not.toBe('G-XXXXXXXXXX');

    expect(trackers[0]!['api_secret']).not.toBe('secret123');

    return;
  });

  it('masks facebook tracker secrets', () => {
    const facebookConfig: Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_FacebookConfig = {
      ...mockConfig,
      trackers: [{
        name: 'facebook',
        type: 'facebook',
        pixel_id: '1234567890',
      }],
    };
    const masked: Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_Masked = maskConfig(facebookConfig);
    const trackers: Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_Trackers = masked['trackers'] as Tests_Worker_Landing_Page_MaskConfig_MasksFacebookTrackerSecrets_Trackers;

    expect(trackers[0]!['pixel_id']).not.toBe('1234567890');

    return;
  });

  it('masks ntfy tracker secrets', () => {
    const ntfyConfig: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_NtfyConfig = {
      ...mockConfig,
      trackers: [{
        name: 'ntfy',
        type: 'ntfy',
        server: 'https://ntfy.example.com',
        topic: 'alerts',
        token: 'tk_abc123',
      }],
    };
    const masked: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_Masked = maskConfig(ntfyConfig);
    const trackers: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_Trackers = masked['trackers'] as Tests_Worker_Landing_Page_MaskConfig_MasksNtfyTrackerSecrets_Trackers;

    expect(trackers[0]!['server']).not.toBe('https://ntfy.example.com');

    expect(trackers[0]!['token']).not.toBe('tk_abc123');

    return;
  });

  it('masks ntfy-reverse-proxy tracker secrets', () => {
    const ntfyReverseProxyConfig: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_NtfyReverseProxyConfig = {
      ...mockConfig,
      trackers: [{
        name: 'ntfy-reverse-proxy',
        type: 'ntfy-reverse-proxy',
        url: 'https://ntfy-proxy.example.com',
        token: 'proxytoken123',
      }],
    };
    const masked: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_Masked = maskConfig(ntfyReverseProxyConfig);
    const trackers: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_Trackers = masked['trackers'] as Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecrets_Trackers;

    expect(trackers[0]!['url']).not.toBe('https://ntfy-proxy.example.com');

    expect(trackers[0]!['token']).not.toBe('proxytoken123');

    return;
  });

  it('masks ntfy-reverse-proxy tracker secrets without token', () => {
    const ntfyReverseProxyNoTokenConfig: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_NtfyReverseProxyNoTokenConfig = {
      ...mockConfig,
      trackers: [{
        name: 'ntfy-reverse-proxy',
        type: 'ntfy-reverse-proxy',
        url: 'https://ntfy-proxy.example.com',
      }],
    };
    const masked: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_Masked = maskConfig(ntfyReverseProxyNoTokenConfig);
    const trackers: Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_Trackers = masked['trackers'] as Tests_Worker_Landing_Page_MaskConfig_MasksNtfyReverseProxyTrackerSecretsWithoutToken_Trackers;

    expect(trackers[0]!['url']).not.toBe('https://ntfy-proxy.example.com');

    expect('token' in trackers[0]!).toBe(false);

    return;
  });

  it('masks posthog tracker secrets', () => {
    const posthogConfig: Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_PosthogConfig = {
      ...mockConfig,
      trackers: [{
        name: 'posthog',
        type: 'posthog',
        host: 'https://posthog.example.com',
        api_key: 'phc_abc123',
      }],
    };
    const masked: Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_Masked = maskConfig(posthogConfig);
    const trackers: Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_Trackers = masked['trackers'] as Tests_Worker_Landing_Page_MaskConfig_MasksPosthogTrackerSecrets_Trackers;

    expect(trackers[0]!['host']).not.toBe('https://posthog.example.com');

    expect(trackers[0]!['api_key']).not.toBe('phc_abc123');

    return;
  });

  it('masks plain-text tracker secrets', () => {
    const plainTextConfig: Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_PlainTextConfig = {
      ...mockConfig,
      trackers: [{
        name: 'plain-text',
        type: 'plain-text',
        url: 'https://webhook.example.com',
        token: 'webhooktoken123',
      }],
    };
    const masked: Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_Masked = maskConfig(plainTextConfig);
    const trackers: Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_Trackers = masked['trackers'] as Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecrets_Trackers;

    expect(trackers[0]!['url']).not.toBe('https://webhook.example.com');

    expect(trackers[0]!['token']).not.toBe('webhooktoken123');

    return;
  });

  it('masks plain-text tracker secrets without token', () => {
    const plainTextNoTokenConfig: Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_PlainTextNoTokenConfig = {
      ...mockConfig,
      trackers: [{
        name: 'plain-text',
        type: 'plain-text',
        url: 'https://webhook.example.com',
      }],
    };
    const masked: Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_Masked = maskConfig(plainTextNoTokenConfig);
    const trackers: Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_Trackers = masked['trackers'] as Tests_Worker_Landing_Page_MaskConfig_MasksPlainTextTrackerSecretsWithoutToken_Trackers;

    expect(trackers[0]!['url']).not.toBe('https://webhook.example.com');

    expect('token' in trackers[0]!).toBe(false);

    return;
  });

  it('preserves settings unmasked', () => {
    const masked: Tests_Worker_Landing_Page_MaskConfig_PreservesSettingsUnmasked_Masked = maskConfig(mockConfig);
    const settings: Tests_Worker_Landing_Page_MaskConfig_PreservesSettingsUnmasked_Settings = masked['settings'] as Tests_Worker_Landing_Page_MaskConfig_PreservesSettingsUnmasked_Settings;

    expect(settings['base_domain']).toBe('bsl.example.com');

    return;
  });

  it('preserves fallback_url unmasked', () => {
    const masked: Tests_Worker_Landing_Page_MaskConfig_PreservesFallbackUrlUnmasked_Masked = maskConfig(mockConfig);
    const links: Tests_Worker_Landing_Page_MaskConfig_PreservesFallbackUrlUnmasked_Links = masked['links'] as Tests_Worker_Landing_Page_MaskConfig_PreservesFallbackUrlUnmasked_Links;

    expect(links['fallback_url']).toBe('••••••');

    return;
  });

  it('omits fallback_url when undefined', () => {
    const noFallbackConfig: Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_NoFallbackConfig = {
      ...mockConfig,
      links: { items: mockConfig['links']['items'] },
    };
    const masked: Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_Masked = maskConfig(noFallbackConfig);
    const links: Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_Links = masked['links'] as Tests_Worker_Landing_Page_MaskConfig_OmitsFallbackUrlWhenUndefined_Links;

    expect(links['fallback_url']).toBeUndefined();

    return;
  });

  return;
});
