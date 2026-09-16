import type { MockInstance, vi } from 'vitest';

import type { Lib_Schema_Config } from '../../lib/schema.d.ts';

/**
 * Tests - Worker - Trackers.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Trackers_MockShortcode = Lib_Schema_Config['links']['items'][number];

export type Tests_Worker_Trackers_MockRequest = Request;

/**
 * Tests - Worker - Trackers - Fire Trackers.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Trackers_FireTrackers_MockFetch = ReturnType<typeof vi.fn> | undefined;

/**
 * Tests - Worker - Trackers - Fire Trackers - Catches Tracker Errors Without Crashing.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Trackers_FireTrackers_CatchesTrackerErrorsWithoutCrashing_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Trackers_FireTrackers_CatchesTrackerErrorsWithoutCrashing_ResolveExpect = Promise<void>;

/**
 * Tests - Worker - Trackers - Fire Trackers - Does Not Call Fetch When Trackers Array Is Empty.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Trackers_FireTrackers_DoesNotCallFetchWhenTrackersArrayIsEmpty_Trackers = Lib_Schema_Config['trackers'];

/**
 * Tests - Worker - Trackers - Fire Trackers - Does Not Log When All Trackers Resolve Successfully.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Trackers_FireTrackers_DoesNotLogWhenAllTrackersResolveSuccessfully_InfoSpy = MockInstance;

export type Tests_Worker_Trackers_FireTrackers_DoesNotLogWhenAllTrackersResolveSuccessfully_Trackers = Lib_Schema_Config['trackers'];

/**
 * Tests - Worker - Trackers - Fire Trackers - Fires All Trackers In Parallel.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Trackers_FireTrackers_FiresAllTrackersInParallel_Trackers = Lib_Schema_Config['trackers'];

/**
 * Tests - Worker - Trackers - Fire Trackers - Fires Facebook GET To Correct Endpoint.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Trackers_FireTrackers_FiresFacebookGETToCorrectEndpoint_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Trackers_FireTrackers_FiresFacebookGETToCorrectEndpoint_Url = string;

/**
 * Tests - Worker - Trackers - Fire Trackers - Fires GA4 POST To Correct Endpoint With Correct Body.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Url = string;

export type Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Options = Record<string, Record<string, string> | string>;

export type Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_BodyString = string;

export type Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Body = Record<string, unknown>;

export type Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_Events = Record<string, unknown>[];

export type Tests_Worker_Trackers_FireTrackers_FiresGA4POSTToCorrectEndpointWithCorrectBody_EventParams = Record<string, unknown>;

/**
 * Tests - Worker - Trackers - Fire Trackers - Fires Ntfy POST With Bearer Auth Header.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Url = string;

export type Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Options = Record<string, Record<string, string> | string>;

export type Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Headers = Record<string, string>;

export type Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_BodyString = string;

export type Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Body = Record<string, unknown>;

export type Tests_Worker_Trackers_FireTrackers_FiresNtfyPOSTWithBearerAuthHeader_Message = string;

/**
 * Tests - Worker - Trackers - Fire Trackers - Fires Ntfy Reverse Proxy POST With Ntfy Headers To Custom URL.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Url = string;

export type Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Options = Record<string, Record<string, string> | string>;

export type Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Headers = Record<string, string>;

export type Tests_Worker_Trackers_FireTrackers_FiresNtfyReverseProxyPOSTWithNtfyHeadersToCustomURL_Body = string;

/**
 * Tests - Worker - Trackers - Fire Trackers - Fires PostHog POST With API Key In Body.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Url = string;

export type Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Options = Record<string, Record<string, string> | string>;

export type Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_BodyString = string;

export type Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Body = Record<string, unknown>;

export type Tests_Worker_Trackers_FireTrackers_FiresPostHogPOSTWithAPIKeyInBody_Properties = Record<string, unknown>;

/**
 * Tests - Worker - Trackers - Fire Trackers - Logs Rejected Tracker Errors With Tracker Name And Type.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Trackers_FireTrackers_LogsRejectedTrackerErrorsWithTrackerNameAndType_InfoSpy = MockInstance;

export type Tests_Worker_Trackers_FireTrackers_LogsRejectedTrackerErrorsWithTrackerNameAndType_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Trackers_FireTrackers_LogsRejectedTrackerErrorsWithTrackerNameAndType_FirstArg = string;

export type Tests_Worker_Trackers_FireTrackers_LogsRejectedTrackerErrorsWithTrackerNameAndType_Parsed = Record<string, unknown>;

/**
 * Tests - Worker - Trackers - Fire Trackers - Percent Encodes An Ampersand In The Facebook Pixel ID.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheFacebookPixelID_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheFacebookPixelID_Url = string;

/**
 * Tests - Worker - Trackers - Fire Trackers - Percent Encodes An Ampersand In The GA4 Api Secret.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheGA4ApiSecret_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheGA4ApiSecret_Url = string;

/**
 * Tests - Worker - Trackers - Fire Trackers - Percent Encodes An Ampersand In The GA4 Measurement ID.
 *
 * @since 2.0.3
 */
export type Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheGA4MeasurementID_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Worker_Trackers_FireTrackers_PercentEncodesAnAmpersandInTheGA4MeasurementID_Url = string;

/**
 * Tests - Worker - Trackers - Normalize Notification Value - Preserves Literal Backslashes.
 *
 * @since 2.0.7
 */
export type Tests_Worker_Trackers_NormalizeNotificationValue_PreservesLiteralBackslashes_Input = string;

export type Tests_Worker_Trackers_NormalizeNotificationValue_PreservesLiteralBackslashes_Result = string;

/**
 * Tests - Worker - Trackers - Normalize Notification Value - Preserves Markdown Punctuation.
 *
 * @since 2.0.7
 */
export type Tests_Worker_Trackers_NormalizeNotificationValue_PreservesMarkdownPunctuation_Input = string;

export type Tests_Worker_Trackers_NormalizeNotificationValue_PreservesMarkdownPunctuation_Result = string;

/**
 * Tests - Worker - Trackers - Normalize Notification Value - Preserves Normal Notification Text.
 *
 * @since 2.0.7
 */
export type Tests_Worker_Trackers_NormalizeNotificationValue_PreservesNormalNotificationText_Input = string;

export type Tests_Worker_Trackers_NormalizeNotificationValue_PreservesNormalNotificationText_Result = string;

/**
 * Tests - Worker - Trackers - Normalize Notification Value - Replaces Carriage Returns And Newlines With Spaces.
 *
 * @since 2.0.7
 */
export type Tests_Worker_Trackers_NormalizeNotificationValue_ReplacesCarriageReturnsAndNewlinesWithSpaces_Input = string;

export type Tests_Worker_Trackers_NormalizeNotificationValue_ReplacesCarriageReturnsAndNewlinesWithSpaces_Result = string;
