import type {
  Lib_Schema_Config_Trackers,
  Lib_Schema_FacebookTrackerConfig,
  Lib_Schema_Ga4TrackerConfig,
  Lib_Schema_LinkItemConfig,
  Lib_Schema_NtfyReverseProxyTrackerConfig,
  Lib_Schema_NtfyTrackerConfig,
  Lib_Schema_PlainTextTrackerConfig,
  Lib_Schema_PosthogTrackerConfig,
} from '../lib/schema.d.ts';

/**
 * Worker - Trackers - Markdown Control Characters Global Pattern.
 *
 * @since 2.0.3
 */
export type Worker_Trackers_MarkdownControlCharactersGlobalPattern = RegExp;

/**
 * Worker - Trackers - Newline Global Pattern.
 *
 * @since 2.0.3
 */
export type Worker_Trackers_NewlineGlobalPattern = RegExp;

/**
 * Worker - Trackers - Escape Markdown.
 *
 * @since 2.0.3
 */
export type Worker_Trackers_EscapeMarkdown_Value = string;

export type Worker_Trackers_EscapeMarkdown_Returns = string;

/**
 * Worker - Trackers - Fire Facebook.
 *
 * @since 2.0.3
 */
export type Worker_Trackers_FireFacebook_Tracker = Lib_Schema_FacebookTrackerConfig;

export type Worker_Trackers_FireFacebook_Returns = Promise<Response>;

/**
 * Worker - Trackers - Fire GA4.
 *
 * @since 2.0.3
 */
export type Worker_Trackers_FireGa4_Tracker = Lib_Schema_Ga4TrackerConfig;

export type Worker_Trackers_FireGa4_Request = Request;

export type Worker_Trackers_FireGa4_Shortcode = Lib_Schema_LinkItemConfig;

export type Worker_Trackers_FireGa4_Returns = Promise<Response>;

export type Worker_Trackers_FireGa4_ClientId = string;

/**
 * Worker - Trackers - Fire Ntfy.
 *
 * @since 2.0.3
 */
export type Worker_Trackers_FireNtfy_Tracker = Lib_Schema_NtfyTrackerConfig;

export type Worker_Trackers_FireNtfy_Request = Request;

export type Worker_Trackers_FireNtfy_Shortcode = Lib_Schema_LinkItemConfig;

export type Worker_Trackers_FireNtfy_Returns = Promise<Response>;

export type Worker_Trackers_FireNtfy_Cf = Record<string, unknown>;

export type Worker_Trackers_FireNtfy_CfShape_Cf = Record<string, unknown>;

export type Worker_Trackers_FireNtfy_CfAsUnknown = unknown;

export type Worker_Trackers_FireNtfy_CfShape = {
  cf?: Worker_Trackers_FireNtfy_CfShape_Cf;
};

export type Worker_Trackers_FireNtfy_Message = string;

/**
 * Worker - Trackers - Fire Ntfy Reverse Proxy.
 *
 * @since 2.0.3
 */
export type Worker_Trackers_FireNtfyReverseProxy_Tracker = Lib_Schema_NtfyReverseProxyTrackerConfig;

export type Worker_Trackers_FireNtfyReverseProxy_Request = Request;

export type Worker_Trackers_FireNtfyReverseProxy_Shortcode = Lib_Schema_LinkItemConfig;

export type Worker_Trackers_FireNtfyReverseProxy_Returns = Promise<Response>;

export type Worker_Trackers_FireNtfyReverseProxy_Headers = Record<string, string>;

export type Worker_Trackers_FireNtfyReverseProxy_Cf = Record<string, unknown>;

export type Worker_Trackers_FireNtfyReverseProxy_CfShape_Cf = Record<string, unknown>;

export type Worker_Trackers_FireNtfyReverseProxy_CfAsUnknown = unknown;

export type Worker_Trackers_FireNtfyReverseProxy_CfShape = {
  cf?: Worker_Trackers_FireNtfyReverseProxy_CfShape_Cf;
};

export type Worker_Trackers_FireNtfyReverseProxy_Message = string;

/**
 * Worker - Trackers - Fire Plain Text.
 *
 * @since 2.0.0
 */
export type Worker_Trackers_FirePlainText_Tracker = Lib_Schema_PlainTextTrackerConfig;

export type Worker_Trackers_FirePlainText_Request = Request;

export type Worker_Trackers_FirePlainText_Shortcode = Lib_Schema_LinkItemConfig;

export type Worker_Trackers_FirePlainText_Returns = Promise<Response>;

export type Worker_Trackers_FirePlainText_Headers = Record<string, string>;

export type Worker_Trackers_FirePlainText_Cf = Record<string, unknown>;

export type Worker_Trackers_FirePlainText_CfShape_Cf = Record<string, unknown>;

export type Worker_Trackers_FirePlainText_CfAsUnknown = unknown;

export type Worker_Trackers_FirePlainText_CfShape = {
  cf?: Worker_Trackers_FirePlainText_CfShape_Cf;
};

export type Worker_Trackers_FirePlainText_Message = string;

/**
 * Worker - Trackers - Fire PostHog.
 *
 * @since 2.0.0
 */
export type Worker_Trackers_FirePosthog_Tracker = Lib_Schema_PosthogTrackerConfig;

export type Worker_Trackers_FirePosthog_Request = Request;

export type Worker_Trackers_FirePosthog_Shortcode = Lib_Schema_LinkItemConfig;

export type Worker_Trackers_FirePosthog_Returns = Promise<Response>;

export type Worker_Trackers_FirePosthog_DistinctId = string;

/**
 * Worker - Trackers - Fire Trackers.
 *
 * @since 2.0.3
 */
export type Worker_Trackers_FireTrackers_Trackers = Lib_Schema_Config_Trackers;

export type Worker_Trackers_FireTrackers_Request = Request;

export type Worker_Trackers_FireTrackers_Shortcode = Lib_Schema_LinkItemConfig;

export type Worker_Trackers_FireTrackers_Returns = Promise<void>;

export type Worker_Trackers_FireTrackers_Promises = (Promise<Response> | undefined)[];

export type Worker_Trackers_FireTrackers_Results = PromiseSettledResult<Response | undefined>[];

export type Worker_Trackers_FireTrackers_Index = number;

export type Worker_Trackers_FireTrackers_Result = PromiseSettledResult<Response | undefined> | undefined;

export type Worker_Trackers_FireTrackers_Tracker = Lib_Schema_Config_Trackers[number] | undefined;
