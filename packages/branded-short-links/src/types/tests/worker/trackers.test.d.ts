import type { vi } from 'vitest';

import type {
  LibSchemaConfigTrackers,
  LibSchemaLinkItemConfig,
} from '../../lib/schema.d.ts';

/**
 * Tests - Worker - Trackers.
 *
 * @since 2.0.0
 */
export type TestsWorkerTrackersShortcode = LibSchemaLinkItemConfig;

export type TestsWorkerTrackersRequest = Request;

export type TestsWorkerTrackersMockFetch = ReturnType<typeof vi.fn> | undefined;

export type TestsWorkerTrackersTrackers = LibSchemaConfigTrackers;

export type TestsWorkerTrackersUrl = string;

export type TestsWorkerTrackersOptions = Record<string, Record<string, string> | string>;

export type TestsWorkerTrackersBodyString = string;

export type TestsWorkerTrackersBody = Record<string, unknown>;

export type TestsWorkerTrackersEvents = Record<string, unknown>[];

export type TestsWorkerTrackersEventParams = Record<string, unknown>;

export type TestsWorkerTrackersHeaders = Record<string, string>;

export type TestsWorkerTrackersProperties = Record<string, unknown>;

export type TestsWorkerTrackersResolveExpect = Promise<void>;
