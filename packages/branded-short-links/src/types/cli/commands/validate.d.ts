import type { z } from 'zod';

import type {
  LibSchemaConfig,
  LibSchemaConfigLinks,
  LibSchemaConfigTrackers,
  LibSchemaLinksConfigItems,
} from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Validate.
 *
 * @since 2.0.0
 */
export type CliCommandsValidateValidateConfigConfigPath = string;

export type CliCommandsValidateValidateConfigReturn = CliCommandsValidateValidateConfigResult;

export type CliCommandsValidateValidateConfigErrors = string[];

export type CliCommandsValidateValidateConfigRaw = unknown;

export type CliCommandsValidateValidateConfigParseResult = z.ZodSafeParseResult<LibSchemaConfig>;

export type CliCommandsValidateValidateConfigConfig = LibSchemaConfig;

export type CliCommandsValidateValidateConfigShortcodeCounts = Map<string, number>;

export type CliCommandsValidateValidateConfigLinks = LibSchemaConfigLinks;

export type CliCommandsValidateValidateConfigItems = LibSchemaLinksConfigItems;

export type CliCommandsValidateValidateConfigExistingShortcodeCount = number | undefined;

export type CliCommandsValidateValidateConfigNewShortcodeCount = number;

export type CliCommandsValidateValidateConfigShortcodeEntry = [string, number];

export type CliCommandsValidateValidateConfigTrackerNameCounts = Map<string, number>;

export type CliCommandsValidateValidateConfigTrackers = LibSchemaConfigTrackers;

export type CliCommandsValidateValidateConfigExistingTrackerCount = number | undefined;

export type CliCommandsValidateValidateConfigNewTrackerCount = number;

export type CliCommandsValidateValidateConfigTrackerEntry = [string, number];

export type CliCommandsValidateValidateConfigResultValid = boolean;

export type CliCommandsValidateValidateConfigResultErrors = string[];

export type CliCommandsValidateValidateConfigResult = {
  valid: CliCommandsValidateValidateConfigResultValid;
  errors: CliCommandsValidateValidateConfigResultErrors;
};
