import type { Lib_Schema_Config } from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Config IO.
 *
 * @since 2.0.0
 */
export type Cli_Commands_ConfigIo_LoadConfig_ConfigPath = string;

export type Cli_Commands_ConfigIo_LoadConfig_Returns = unknown;

export type Cli_Commands_ConfigIo_LoadConfig_RawContent = string;

export type Cli_Commands_ConfigIo_LoadConfig_Parsed = unknown;

/**
 * CLI - Commands - Config IO.
 *
 * @since 2.0.0
 */
export type Cli_Commands_ConfigIo_NormalizeConfig_Config = Lib_Schema_Config;

export type Cli_Commands_ConfigIo_NormalizeConfig_Returns = Lib_Schema_Config;

export type Cli_Commands_ConfigIo_NormalizeConfig_Links = Lib_Schema_Config['links'];

export type Cli_Commands_ConfigIo_NormalizeConfig_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_ConfigIo_NormalizeConfig_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_ConfigIo_NormalizeConfig_SortedItems = Lib_Schema_Config['links']['items'];

export type Cli_Commands_ConfigIo_NormalizeConfig_NormalizedLinks = Lib_Schema_Config['links'];

export type Cli_Commands_ConfigIo_NormalizeConfig_NormalizedTrackers = Lib_Schema_Config['trackers'];

/**
 * CLI - Commands - Config IO.
 *
 * @since 2.0.0
 */
export type Cli_Commands_ConfigIo_SaveConfig_ConfigPath = string;

export type Cli_Commands_ConfigIo_SaveConfig_Config = Lib_Schema_Config;

export type Cli_Commands_ConfigIo_SaveConfig_Returns = void;

export type Cli_Commands_ConfigIo_SaveConfig_NormalizedConfig_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_ConfigIo_SaveConfig_NormalizedConfig_Links = Lib_Schema_Config['links'];

export type Cli_Commands_ConfigIo_SaveConfig_NormalizedConfig_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_ConfigIo_SaveConfig_NormalizedConfig = {
  settings: Cli_Commands_ConfigIo_SaveConfig_NormalizedConfig_Settings;
  links: Cli_Commands_ConfigIo_SaveConfig_NormalizedConfig_Links;
  trackers: Cli_Commands_ConfigIo_SaveConfig_NormalizedConfig_Trackers;
};
