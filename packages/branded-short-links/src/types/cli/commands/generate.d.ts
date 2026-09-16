import type { Lib_Schema_Config } from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Generate.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Generate_ProjectRoot = string;

export type Cli_Commands_Generate_DefaultWranglerTomlPath = string;

/**
 * CLI - Commands - Generate.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Generate_GenerateWranglerToml_ConfigPath = string;

export type Cli_Commands_Generate_GenerateWranglerToml_OutputPath = string | undefined;

export type Cli_Commands_Generate_GenerateWranglerToml_AccountId = string;

export type Cli_Commands_Generate_GenerateWranglerToml_Returns = void;

export type Cli_Commands_Generate_GenerateWranglerToml_Config_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_Generate_GenerateWranglerToml_Config_Links = Lib_Schema_Config['links'];

export type Cli_Commands_Generate_GenerateWranglerToml_Config_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_Generate_GenerateWranglerToml_Config = {
  settings: Cli_Commands_Generate_GenerateWranglerToml_Config_Settings;
  links: Cli_Commands_Generate_GenerateWranglerToml_Config_Links;
  trackers: Cli_Commands_Generate_GenerateWranglerToml_Config_Trackers;
};

export type Cli_Commands_Generate_GenerateWranglerToml_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_Generate_GenerateWranglerToml_Links = Lib_Schema_Config['links'];

export type Cli_Commands_Generate_GenerateWranglerToml_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_Generate_GenerateWranglerToml_CompatibilityDate = string;

export type Cli_Commands_Generate_GenerateWranglerToml_OutputDir = string;

export type Cli_Commands_Generate_GenerateWranglerToml_WorkerEntryPath = string;

export type Cli_Commands_Generate_GenerateWranglerToml_WorkerEntryRelativePath = string;

export type Cli_Commands_Generate_GenerateWranglerToml_WorkerEntryConfigPath = string;

export type Cli_Commands_Generate_GenerateWranglerToml_WorkerEntryToml = string;

export type Cli_Commands_Generate_GenerateWranglerToml_SettingsAsString = string;

export type Cli_Commands_Generate_GenerateWranglerToml_LinksAsString = string;

export type Cli_Commands_Generate_GenerateWranglerToml_TrackersAsString = string;

export type Cli_Commands_Generate_GenerateWranglerToml_Lines = string[];
