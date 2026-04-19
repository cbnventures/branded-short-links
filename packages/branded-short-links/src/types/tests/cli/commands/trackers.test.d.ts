import type {
  LibSchemaConfig,
  LibSchemaFacebookTrackerConfig,
  LibSchemaGa4TrackerConfig,
  LibSchemaNtfyTrackerConfig,
  LibSchemaPosthogTrackerConfig,
  LibSchemaTrackerConfig,
} from '../../../lib/schema.d.ts';

/**
 * Tests - CLI - Commands - Trackers.
 *
 * @since 2.0.0
 */
export type TestsCliCommandsTrackersValidConfig = LibSchemaConfig;

export type TestsCliCommandsTrackersTempDir = string | undefined;

export type TestsCliCommandsTrackersConfigPath = string | undefined;

export type TestsCliCommandsTrackersTempDirPath = string;

export type TestsCliCommandsTrackersTrackers = LibSchemaTrackerConfig[];

export type TestsCliCommandsTrackersEmptyConfig = LibSchemaConfig;

export type TestsCliCommandsTrackersConfigJson = string;

export type TestsCliCommandsTrackersNewNtfyTracker = LibSchemaNtfyTrackerConfig;

export type TestsCliCommandsTrackersNewPosthogTracker = LibSchemaPosthogTrackerConfig;

export type TestsCliCommandsTrackersConfig = LibSchemaConfig;

export type TestsCliCommandsTrackersGa4Tracker = LibSchemaGa4TrackerConfig | undefined;

export type TestsCliCommandsTrackersUnknown = unknown;

export type TestsCliCommandsTrackersGa4Record = Record<string, string>;

export type TestsCliCommandsTrackersGa4ApiSecret = string;

export type TestsCliCommandsTrackersFbTracker = LibSchemaFacebookTrackerConfig;
