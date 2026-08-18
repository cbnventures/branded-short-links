import type { Command } from 'commander';

import type { Cli_Commands_Validate_ValidateConfig_Returns } from './commands/validate.d.ts';

/**
 * CLI - Index.
 *
 * @since 2.0.0
 */
export type Cli_Index_EnvDir = string | undefined;

export type Cli_Index_Program = Command;

/**
 * CLI - Index - Get Config File Path.
 *
 * @since 2.0.0
 */
export type Cli_Index_GetConfigFilePath_Returns = string;

export type Cli_Index_GetConfigFilePath_ConfigDir = string | undefined;

export type Cli_Index_GetConfigFilePath_DefaultDir = string;

export type Cli_Index_GetConfigFilePath_ConfigPath = string;

export type Cli_Index_GetConfigFilePath_SamplePath = string;

/**
 * CLI - Index - Main.
 *
 * @since 2.0.0
 */
export type Cli_Index_Main_Returns = Promise<void>;

export type Cli_Index_Main_ConfigDirs = string[];

export type Cli_Index_Main_ConfigPath = string;

export type Cli_Index_Main_LinksCommand = Command;

export type Cli_Index_Main_TypedShortcode = string;

export type Cli_Index_Main_TrackersCommand = Command;

export type Cli_Index_Main_TypedName = string;

export type Cli_Index_Main_Result_Valid = Cli_Commands_Validate_ValidateConfig_Returns['valid'];

export type Cli_Index_Main_Result_Errors = Cli_Commands_Validate_ValidateConfig_Returns['errors'];

export type Cli_Index_Main_Result = {
  valid: Cli_Index_Main_Result_Valid;
  errors: Cli_Index_Main_Result_Errors;
};
