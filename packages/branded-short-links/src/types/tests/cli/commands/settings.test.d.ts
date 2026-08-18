import type { Lib_Schema_Config } from '../../../lib/schema.d.ts';

/**
 * Tests - CLI - Commands - Settings.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Settings_ValidConfig = Lib_Schema_Config & {};

export type Tests_Cli_Commands_Settings_TempDir = string | undefined;

export type Tests_Cli_Commands_Settings_ConfigPath = string | undefined;

export type Tests_Cli_Commands_Settings_OsTmpDir = string;

export type Tests_Cli_Commands_Settings_TempDirPath = string;

export type Tests_Cli_Commands_Settings_ConfigContent = string;

/**
 * Tests - CLI - Commands - Settings - Get Settings - Returns Correct Base Domain.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Settings_GetSettings_ReturnsCorrectBaseDomain_Settings = Lib_Schema_Config['settings'];

/**
 * Tests - CLI - Commands - Settings - Get Settings - Returns Correct Show Response Output.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Settings_GetSettings_ReturnsCorrectShowResponseOutput_Settings = Lib_Schema_Config['settings'];

/**
 * Tests - CLI - Commands - Settings - Get Settings - Returns The Settings Object.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Settings_GetSettings_ReturnsTheSettingsObject_Settings = Lib_Schema_Config['settings'];

/**
 * Tests - CLI - Commands - Settings - Update Settings - Does Not Affect Other Config Sections.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Settings_UpdateSettings_DoesNotAffectOtherConfigSections_Config = Lib_Schema_Config & {};

/**
 * Tests - CLI - Commands - Settings - Update Settings - Merges Updates Into Settings.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Settings_UpdateSettings_MergesUpdatesIntoSettings_Settings = Lib_Schema_Config['settings'];

/**
 * Tests - CLI - Commands - Settings - Update Settings - Persists Changes To File.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Settings_UpdateSettings_PersistsChangesToFile_Config = Lib_Schema_Config & {};

/**
 * Tests - CLI - Commands - Settings - Update Settings - Updates Multiple Fields At Once.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Settings_UpdateSettings_UpdatesMultipleFieldsAtOnce_Settings = Lib_Schema_Config['settings'];
