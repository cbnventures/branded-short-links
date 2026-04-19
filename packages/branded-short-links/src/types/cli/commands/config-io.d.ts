import type {
  LibSchemaConfig,
  LibSchemaLinksConfig,
  LibSchemaLinksConfigItems,
  LibSchemaSettingsConfig,
  LibSchemaTrackerConfig,
} from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Config IO.
 *
 * @since 2.0.0
 */
export type CliCommandsConfigIoLoadConfigConfigPath = string;

export type CliCommandsConfigIoLoadConfigReturn = unknown;

export type CliCommandsConfigIoLoadConfigRawContent = string;

export type CliCommandsConfigIoLoadConfigParsed = unknown;

/**
 * CLI - Commands - Config IO.
 *
 * @since 2.0.0
 */
export type CliCommandsConfigIoNormalizeConfigConfig = LibSchemaConfig;

export type CliCommandsConfigIoNormalizeConfigReturn = LibSchemaConfig;

export type CliCommandsConfigIoNormalizeConfigLinks = LibSchemaLinksConfig;

export type CliCommandsConfigIoNormalizeConfigTrackers = LibSchemaTrackerConfig[];

export type CliCommandsConfigIoNormalizeConfigSettings = LibSchemaSettingsConfig;

export type CliCommandsConfigIoNormalizeConfigSortedItems = LibSchemaLinksConfigItems;

export type CliCommandsConfigIoNormalizeConfigNormalizedLinks = LibSchemaLinksConfig;

export type CliCommandsConfigIoNormalizeConfigNormalizedTrackers = LibSchemaTrackerConfig[];

/**
 * CLI - Commands - Config IO.
 *
 * @since 2.0.0
 */
export type CliCommandsConfigIoSaveConfigConfigPath = string;

export type CliCommandsConfigIoSaveConfigConfig = LibSchemaConfig;

export type CliCommandsConfigIoSaveConfigReturn = void;

export type CliCommandsConfigIoSaveConfigNormalizedConfig = LibSchemaConfig;
