import type { z } from 'zod';

import type { Lib_Schema_Config } from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Validate.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Validate_ValidateConfig_ConfigPath = string;

export type Cli_Commands_Validate_ValidateConfig_Returns = Cli_Commands_Validate_ValidateConfig_Result;

export type Cli_Commands_Validate_ValidateConfig_Errors = string[];

export type Cli_Commands_Validate_ValidateConfig_Raw = unknown;

export type Cli_Commands_Validate_ValidateConfig_ParseResult = z.ZodSafeParseResult<Lib_Schema_Config>;

export type Cli_Commands_Validate_ValidateConfig_Config_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_Validate_ValidateConfig_Config_Links = Lib_Schema_Config['links'];

export type Cli_Commands_Validate_ValidateConfig_Config_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_Validate_ValidateConfig_Config = {
  settings: Cli_Commands_Validate_ValidateConfig_Config_Settings;
  links: Cli_Commands_Validate_ValidateConfig_Config_Links;
  trackers: Cli_Commands_Validate_ValidateConfig_Config_Trackers;
};

export type Cli_Commands_Validate_ValidateConfig_ShortcodeCounts = Map<string, number>;

export type Cli_Commands_Validate_ValidateConfig_Links = Lib_Schema_Config['links'];

export type Cli_Commands_Validate_ValidateConfig_Items = Lib_Schema_Config['links']['items'];

export type Cli_Commands_Validate_ValidateConfig_ExistingShortcodeCount = number | undefined;

export type Cli_Commands_Validate_ValidateConfig_NewShortcodeCount = number;

export type Cli_Commands_Validate_ValidateConfig_Shortcode = [string, number];

export type Cli_Commands_Validate_ValidateConfig_TrackerNameCounts = Map<string, number>;

export type Cli_Commands_Validate_ValidateConfig_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_Validate_ValidateConfig_ExistingTrackerCount = number | undefined;

export type Cli_Commands_Validate_ValidateConfig_NewTrackerCount = number;

export type Cli_Commands_Validate_ValidateConfig_Entry = [string, number];

export type Cli_Commands_Validate_ValidateConfig_Result_Valid = boolean;

export type Cli_Commands_Validate_ValidateConfig_Result_Errors = string[];

export type Cli_Commands_Validate_ValidateConfig_Result = {
  valid: Cli_Commands_Validate_ValidateConfig_Result_Valid;
  errors: Cli_Commands_Validate_ValidateConfig_Result_Errors;
};
