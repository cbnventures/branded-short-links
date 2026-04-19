import type { LibSchemaConfig } from '../../../lib/schema.d.ts';

/**
 * Tests - Worker - Landing - Page.
 *
 * @since 2.0.0
 */
export type TestsWorkerLandingPageConfig = LibSchemaConfig;

export type TestsWorkerLandingPageResponse = Response;

export type TestsWorkerLandingPageContentType = string | null;

export type TestsWorkerLandingPageBody = string;

export type TestsWorkerLandingPageDebugConfig = LibSchemaConfig;

export type TestsWorkerLandingPageMaskResult = string;

export type TestsWorkerLandingPageMasked = Record<string, unknown>;

export type TestsWorkerLandingPageMaskedLinksFallbackUrl = string;

export type TestsWorkerLandingPageMaskedLinksItemRedirectUrl = string;

export type TestsWorkerLandingPageMaskedLinksItem = {
  redirect_url: TestsWorkerLandingPageMaskedLinksItemRedirectUrl;
};

export type TestsWorkerLandingPageMaskedLinksItems = TestsWorkerLandingPageMaskedLinksItem[];

export type TestsWorkerLandingPageMaskedLinks = {
  fallback_url: TestsWorkerLandingPageMaskedLinksFallbackUrl;
  items: TestsWorkerLandingPageMaskedLinksItems;
};

export type TestsWorkerLandingPageMaskedTrackerMeasurementId = string;

export type TestsWorkerLandingPageMaskedTrackerApiSecret = string;

export type TestsWorkerLandingPageMaskedTracker = {
  measurement_id: TestsWorkerLandingPageMaskedTrackerMeasurementId;
  api_secret: TestsWorkerLandingPageMaskedTrackerApiSecret;
};

export type TestsWorkerLandingPageMaskedTrackers = TestsWorkerLandingPageMaskedTracker[];

export type TestsWorkerLandingPageMaskedSettingsBaseDomain = string;

export type TestsWorkerLandingPageMaskedSettings = {
  base_domain: TestsWorkerLandingPageMaskedSettingsBaseDomain;
};

export type TestsWorkerLandingPageNoFallbackConfig = LibSchemaConfig;

export type TestsWorkerLandingPageMaskedLinksRecord = Record<string, unknown>;
