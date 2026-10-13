import type { z } from 'zod';

import type { Lib_Schema_Config } from '../lib/schema.d.ts';

/**
 * Worker - Index - Fetch.
 *
 * @since 2.0.0
 */
export type Worker_Index_Fetch_Request = Request;

export type Worker_Index_Fetch_Env = Record<string, string | undefined>;

export type Worker_Index_Fetch_Ctx = ExecutionContext;

export type Worker_Index_Fetch_Returns = Promise<Response>;

export type Worker_Index_Fetch_Settings = unknown;

export type Worker_Index_Fetch_Links = unknown;

export type Worker_Index_Fetch_Trackers = unknown;

export type Worker_Index_Fetch_AppAccess = unknown;

export type Worker_Index_Fetch_EnvSettingsAsString = string;

export type Worker_Index_Fetch_EnvSettingsAsUnknown = unknown;

export type Worker_Index_Fetch_EnvLinksAsString = string;

export type Worker_Index_Fetch_EnvLinksAsUnknown = unknown;

export type Worker_Index_Fetch_EnvTrackersAsString = string;

export type Worker_Index_Fetch_EnvTrackersAsUnknown = unknown;

export type Worker_Index_Fetch_EnvAppAccessAsUnknown = unknown;

export type Worker_Index_Fetch_Result = z.ZodSafeParseResult<Lib_Schema_Config>;
