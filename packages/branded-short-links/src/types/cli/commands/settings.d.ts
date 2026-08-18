import type { Lib_Schema_Config, Lib_Schema_SettingsConfig } from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Settings.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Settings_GetSettings_ConfigPath = string;

export type Cli_Commands_Settings_GetSettings_Returns = Lib_Schema_SettingsConfig;

export type Cli_Commands_Settings_GetSettings_Config_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_Settings_GetSettings_Config_Links = Lib_Schema_Config['links'];

export type Cli_Commands_Settings_GetSettings_Config_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_Settings_GetSettings_Config = {
  settings: Cli_Commands_Settings_GetSettings_Config_Settings;
  links: Cli_Commands_Settings_GetSettings_Config_Links;
  trackers: Cli_Commands_Settings_GetSettings_Config_Trackers;
};

/**
 * CLI - Commands - Settings.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Settings_UpdateSettings_ConfigPath = string;

export type Cli_Commands_Settings_UpdateSettings_Updates = Partial<Lib_Schema_SettingsConfig>;

export type Cli_Commands_Settings_UpdateSettings_Returns = void;

export type Cli_Commands_Settings_UpdateSettings_Config_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_Settings_UpdateSettings_Config_Links = Lib_Schema_Config['links'];

export type Cli_Commands_Settings_UpdateSettings_Config_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_Settings_UpdateSettings_Config = {
  settings: Cli_Commands_Settings_UpdateSettings_Config_Settings;
  links: Cli_Commands_Settings_UpdateSettings_Config_Links;
  trackers: Cli_Commands_Settings_UpdateSettings_Config_Trackers;
};
