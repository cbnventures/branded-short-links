import type {
  LibSchemaConfig,
  LibSchemaTrackerConfig,
} from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Trackers.
 *
 * @since 2.0.0
 */
export type CliCommandsTrackersAddTrackerConfigPath = string;

export type CliCommandsTrackersAddTrackerTracker = LibSchemaTrackerConfig;

export type CliCommandsTrackersAddTrackerReturn = void;

export type CliCommandsTrackersAddTrackerConfig = LibSchemaConfig;

/**
 * CLI - Commands - Trackers.
 *
 * @since 2.0.0
 */
export type CliCommandsTrackersEditTrackerConfigPath = string;

export type CliCommandsTrackersEditTrackerName = string;

export type CliCommandsTrackersEditTrackerUpdates = Partial<LibSchemaTrackerConfig>;

export type CliCommandsTrackersEditTrackerReturn = void;

export type CliCommandsTrackersEditTrackerConfig = LibSchemaConfig;

export type CliCommandsTrackersEditTrackerIndex = number;

/**
 * CLI - Commands - Trackers.
 *
 * @since 2.0.0
 */
export type CliCommandsTrackersListTrackersConfigPath = string;

export type CliCommandsTrackersListTrackersReturn = LibSchemaTrackerConfig[];

export type CliCommandsTrackersListTrackersConfig = LibSchemaConfig;

/**
 * CLI - Commands - Trackers.
 *
 * @since 2.0.0
 */
export type CliCommandsTrackersRemoveTrackerConfigPath = string;

export type CliCommandsTrackersRemoveTrackerName = string;

export type CliCommandsTrackersRemoveTrackerReturn = void;

export type CliCommandsTrackersRemoveTrackerConfig = LibSchemaConfig;

export type CliCommandsTrackersRemoveTrackerFiltered = LibSchemaTrackerConfig[];
