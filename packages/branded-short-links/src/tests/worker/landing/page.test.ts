import { describe, expect, it } from 'vitest';

import {
  landingPage, maskConfig, maskValue, notFoundPage,
} from '../../../worker/landing/page.js';

import type {
  TestsWorkerLandingPageBody,
  TestsWorkerLandingPageConfig,
  TestsWorkerLandingPageContentType,
  TestsWorkerLandingPageDebugConfig,
  TestsWorkerLandingPageMasked,
  TestsWorkerLandingPageMaskedLinks,
  TestsWorkerLandingPageMaskedLinksRecord,
  TestsWorkerLandingPageMaskedSettings,
  TestsWorkerLandingPageMaskedTrackers,
  TestsWorkerLandingPageMaskResult,
  TestsWorkerLandingPageNoFallbackConfig,
  TestsWorkerLandingPageResponse,
} from '../../../types/tests/worker/landing/page.test.d.ts';

const mockConfig: TestsWorkerLandingPageConfig = {
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
    const response: TestsWorkerLandingPageResponse = landingPage(mockConfig);

    expect(response['status']).toBe(200);

    const contentType: TestsWorkerLandingPageContentType = response['headers'].get('Content-Type');

    expect(contentType).toBe('text/html; charset=utf-8');

    return;
  });

  it('contains "Branded Short Links" text', async () => {
    const response: TestsWorkerLandingPageResponse = landingPage(mockConfig);
    const body: TestsWorkerLandingPageBody = await response.text();

    expect(body).toContain('Branded Short Links');

    return;
  });

  it('contains GitHub link', async () => {
    const response: TestsWorkerLandingPageResponse = landingPage(mockConfig);
    const body: TestsWorkerLandingPageBody = await response.text();

    expect(body).toContain('https://github.com/cbnventures/branded-short-links');

    return;
  });

  it('shows masked config in debug mode', async () => {
    const debugConfig: TestsWorkerLandingPageDebugConfig = {
      ...mockConfig,
      settings: {
        ...mockConfig['settings'], show_response_output: true,
      },
    };

    const response: TestsWorkerLandingPageResponse = landingPage(debugConfig);
    const body: TestsWorkerLandingPageBody = await response.text();

    expect(body).toContain('class="debug"');

    expect(body).toContain('bsl.example.com');

    expect(body).not.toContain('https://github.com/example');

    expect(body).not.toContain('secret123');

    return;
  });

  it('does not show config in non-debug mode', async () => {
    const response: TestsWorkerLandingPageResponse = landingPage(mockConfig);
    const body: TestsWorkerLandingPageBody = await response.text();

    expect(body).not.toContain('class="debug"');

    expect(body).not.toContain('bsl.example.com');

    return;
  });

  return;
});

describe('notFoundPage', () => {
  it('returns 404 with correct content type', () => {
    const response: TestsWorkerLandingPageResponse = notFoundPage(mockConfig);

    expect(response['status']).toBe(404);

    const contentType: TestsWorkerLandingPageContentType = response['headers'].get('Content-Type');

    expect(contentType).toBe('text/html; charset=utf-8');

    return;
  });

  it('contains "Shortcode Not Found" text', async () => {
    const response: TestsWorkerLandingPageResponse = notFoundPage(mockConfig);
    const body: TestsWorkerLandingPageBody = await response.text();

    expect(body).toContain('Shortcode Not Found');

    return;
  });

  it('contains 404 badge', async () => {
    const response: TestsWorkerLandingPageResponse = notFoundPage(mockConfig);
    const body: TestsWorkerLandingPageBody = await response.text();

    expect(body).toContain('404');

    return;
  });

  return;
});

describe('maskValue', () => {
  it('fully masks all values', () => {
    const maskedAbc: TestsWorkerLandingPageMaskResult = maskValue('abc');

    expect(maskedAbc).toBe('\u2022\u2022\u2022\u2022\u2022\u2022');

    const maskedSecret: TestsWorkerLandingPageMaskResult = maskValue('secret123');

    expect(maskedSecret).toBe('\u2022\u2022\u2022\u2022\u2022\u2022');

    const maskedMeasurementId: TestsWorkerLandingPageMaskResult = maskValue('G-XXXXXXXXXX');

    expect(maskedMeasurementId).toBe('\u2022\u2022\u2022\u2022\u2022\u2022');

    return;
  });

  return;
});

describe('maskConfig', () => {
  it('masks redirect_url in link items', () => {
    const masked: TestsWorkerLandingPageMasked = maskConfig(mockConfig);
    const links: TestsWorkerLandingPageMaskedLinks = masked['links'] as TestsWorkerLandingPageMaskedLinks;

    expect(links['items'][0]!['redirect_url']).not.toBe('https://github.com/example');

    expect(links['items'][0]!['redirect_url']).toContain('\u2022');

    return;
  });

  it('masks ga4 tracker secrets', () => {
    const masked: TestsWorkerLandingPageMasked = maskConfig(mockConfig);
    const trackers: TestsWorkerLandingPageMaskedTrackers = masked['trackers'] as TestsWorkerLandingPageMaskedTrackers;

    expect(trackers[0]!['measurement_id']).not.toBe('G-XXXXXXXXXX');

    expect(trackers[0]!['api_secret']).not.toBe('secret123');

    return;
  });

  it('preserves settings unmasked', () => {
    const masked: TestsWorkerLandingPageMasked = maskConfig(mockConfig);
    const settings: TestsWorkerLandingPageMaskedSettings = masked['settings'] as TestsWorkerLandingPageMaskedSettings;

    expect(settings['base_domain']).toBe('bsl.example.com');

    return;
  });

  it('preserves fallback_url unmasked', () => {
    const masked: TestsWorkerLandingPageMasked = maskConfig(mockConfig);
    const links: TestsWorkerLandingPageMaskedLinks = masked['links'] as TestsWorkerLandingPageMaskedLinks;

    expect(links['fallback_url']).toBe('https://example.com');

    return;
  });

  it('omits fallback_url when undefined', () => {
    const noFallbackConfig: TestsWorkerLandingPageNoFallbackConfig = {
      ...mockConfig,
      links: { items: mockConfig['links']['items'] },
    };
    const masked: TestsWorkerLandingPageMasked = maskConfig(noFallbackConfig);
    const links: TestsWorkerLandingPageMaskedLinksRecord = masked['links'] as TestsWorkerLandingPageMaskedLinksRecord;

    expect(links['fallback_url']).toBeUndefined();

    return;
  });

  return;
});
