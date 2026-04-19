import type { z } from 'zod';

import type {
  LibSchemaConfig,
  LibSchemaLinkItemConfig,
} from '../lib/schema.d.ts';

/**
 * Worker - Index - Fetch.
 *
 * @since 2.0.0
 */
export type WorkerIndexFetchRequest = Request;

export type WorkerIndexFetchEnv = Record<string, string>;

export type WorkerIndexFetchCtx = ExecutionContext;

export type WorkerIndexFetchReturn = Promise<Response>;

export type WorkerIndexFetchSettings = unknown;

export type WorkerIndexFetchLinks = unknown;

export type WorkerIndexFetchTrackers = unknown;

export type WorkerIndexFetchEnvSettingsAsString = string;

export type WorkerIndexFetchEnvSettingsAsUnknown = unknown;

export type WorkerIndexFetchEnvLinksAsString = string;

export type WorkerIndexFetchEnvLinksAsUnknown = unknown;

export type WorkerIndexFetchEnvTrackersAsString = string;

export type WorkerIndexFetchEnvTrackersAsUnknown = unknown;

export type WorkerIndexFetchResult = z.ZodSafeParseResult<LibSchemaConfig>;

/**
 * Worker - Index - Handle Request.
 *
 * @since 2.0.0
 */
export type WorkerIndexHandleRequestRequest = Request;

export type WorkerIndexHandleRequestConfig = LibSchemaConfig;

export type WorkerIndexHandleRequestCtx = ExecutionContext;

export type WorkerIndexHandleRequestReturn = Promise<Response>;

export type WorkerIndexHandleRequestRequestUrl = URL;

export type WorkerIndexHandleRequestPathname = string;

export type WorkerIndexHandleRequestShortcode = LibSchemaLinkItemConfig | undefined;

export type WorkerIndexHandleRequestFallbackUrl = URL;

export type WorkerIndexHandleRequestRootResponse = Response;

export type WorkerIndexHandleRequestRootLogPayload = string;

export type WorkerIndexHandleRequestFallbackResponse = Response;

export type WorkerIndexHandleRequestFallbackLogPayload = string;

export type WorkerIndexHandleRequestFireTrackersPromise = Promise<void>;

export type WorkerIndexHandleRequestRedirectResponse = Response;

export type WorkerIndexHandleRequestRedirectLogPayload = string;
