import type {
  LibSchemaConfigTrackers,
  LibSchemaFacebookTrackerConfig,
  LibSchemaGa4TrackerConfig,
  LibSchemaLinkItemConfig,
  LibSchemaNtfyReverseProxyTrackerConfig,
  LibSchemaNtfyTrackerConfig,
  LibSchemaPlainTextTrackerConfig,
  LibSchemaPosthogTrackerConfig,
} from '../lib/schema.d.ts';

/**
 * Worker - Trackers - Fire Facebook.
 *
 * @since 2.0.0
 */
export type WorkerTrackersFireFacebookTracker = LibSchemaFacebookTrackerConfig;

export type WorkerTrackersFireFacebookReturn = Promise<Response>;

/**
 * Worker - Trackers - Fire GA4.
 *
 * @since 2.0.0
 */
export type WorkerTrackersFireGa4Tracker = LibSchemaGa4TrackerConfig;

export type WorkerTrackersFireGa4Request = Request;

export type WorkerTrackersFireGa4Shortcode = LibSchemaLinkItemConfig;

export type WorkerTrackersFireGa4Return = Promise<Response>;

export type WorkerTrackersFireGa4ClientId = string;

/**
 * Worker - Trackers - Fire Ntfy.
 *
 * @since 2.0.0
 */
export type WorkerTrackersFireNtfyTracker = LibSchemaNtfyTrackerConfig;

export type WorkerTrackersFireNtfyRequest = Request;

export type WorkerTrackersFireNtfyShortcode = LibSchemaLinkItemConfig;

export type WorkerTrackersFireNtfyReturn = Promise<Response>;

export type WorkerTrackersFireNtfyCfProperties = Record<string, unknown>;

export type WorkerTrackersFireNtfyCfAsUnknown = unknown;

export type WorkerTrackersFireNtfyCfShape = {
  cf?: WorkerTrackersFireNtfyCfProperties;
};

export type WorkerTrackersFireNtfyMessage = string;

/**
 * Worker - Trackers - Fire Ntfy Reverse Proxy.
 *
 * @since 2.0.0
 */
export type WorkerTrackersFireNtfyReverseProxyTracker = LibSchemaNtfyReverseProxyTrackerConfig;

export type WorkerTrackersFireNtfyReverseProxyRequest = Request;

export type WorkerTrackersFireNtfyReverseProxyShortcode = LibSchemaLinkItemConfig;

export type WorkerTrackersFireNtfyReverseProxyReturn = Promise<Response>;

export type WorkerTrackersFireNtfyReverseProxyHeaders = Record<string, string>;

export type WorkerTrackersFireNtfyReverseProxyCfProperties = Record<string, unknown>;

export type WorkerTrackersFireNtfyReverseProxyCfAsUnknown = unknown;

export type WorkerTrackersFireNtfyReverseProxyCfShape = {
  cf?: WorkerTrackersFireNtfyReverseProxyCfProperties;
};

export type WorkerTrackersFireNtfyReverseProxyMessage = string;

/**
 * Worker - Trackers - Fire Plain Text.
 *
 * @since 2.0.0
 */
export type WorkerTrackersFirePlainTextTracker = LibSchemaPlainTextTrackerConfig;

export type WorkerTrackersFirePlainTextRequest = Request;

export type WorkerTrackersFirePlainTextShortcode = LibSchemaLinkItemConfig;

export type WorkerTrackersFirePlainTextReturn = Promise<Response>;

export type WorkerTrackersFirePlainTextHeaders = Record<string, string>;

export type WorkerTrackersFirePlainTextCfProperties = Record<string, unknown>;

export type WorkerTrackersFirePlainTextCfAsUnknown = unknown;

export type WorkerTrackersFirePlainTextCfShape = {
  cf?: WorkerTrackersFirePlainTextCfProperties;
};

export type WorkerTrackersFirePlainTextMessage = string;

/**
 * Worker - Trackers - Fire PostHog.
 *
 * @since 2.0.0
 */
export type WorkerTrackersFirePosthogTracker = LibSchemaPosthogTrackerConfig;

export type WorkerTrackersFirePosthogRequest = Request;

export type WorkerTrackersFirePosthogShortcode = LibSchemaLinkItemConfig;

export type WorkerTrackersFirePosthogReturn = Promise<Response>;

export type WorkerTrackersFirePosthogDistinctId = string;

/**
 * Worker - Trackers - Fire Trackers.
 *
 * @since 2.0.0
 */
export type WorkerTrackersFireTrackersTrackers = LibSchemaConfigTrackers;

export type WorkerTrackersFireTrackersRequest = Request;

export type WorkerTrackersFireTrackersShortcode = LibSchemaLinkItemConfig;

export type WorkerTrackersFireTrackersReturn = Promise<void>;

export type WorkerTrackersFireTrackersPromises = (Promise<Response> | undefined)[];
