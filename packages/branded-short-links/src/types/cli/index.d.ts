import type { Command } from 'commander';

import type { CliCommandsValidateValidateConfigReturn } from './commands/validate.d.ts';

/**
 * CLI - Env Dir.
 *
 * @since 2.0.0
 */
export type CliEnvDir = string | undefined;

/**
 * CLI - Get Config File Path.
 *
 * @since 2.0.0
 */
export type CliGetConfigFilePathReturn = string;

export type CliConfigDir = string | undefined;

export type CliConfigPath = string;

export type CliSamplePath = string;

/**
 * CLI - Main.
 *
 * @since 2.0.0
 */
export type CliMainReturn = Promise<void>;

export type CliMainConfigDirs = string[];

export type CliMainConfigPath = string;

export type CliMainLinksCommand = Command;

export type CliMainLinksRemoveShortcode = string;

export type CliMainTrackersCommand = Command;

export type CliMainTrackersRemoveName = string;

export type CliMainValidateResult = CliCommandsValidateValidateConfigReturn;

export type CliMainCatchError = unknown;

/**
 * CLI - Program.
 *
 * @since 2.0.0
 */
export type CliIndexProgram = Command;
