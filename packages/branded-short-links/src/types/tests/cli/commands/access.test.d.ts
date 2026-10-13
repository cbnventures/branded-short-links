import type { validateConfig } from '../../../../cli/commands/validate.js';
import type {
  Lib_Schema_AppAccessUserConfig,
  Lib_Schema_Config,
} from '../../../lib/schema.d.ts';

/**
 * Tests - CLI - Commands - Access.
 *
 * @since 2.1.0
 */
export type Tests_Cli_Commands_Access_BaseConfig = Lib_Schema_Config & {};

/**
 * Tests - CLI - Commands - Access - Access Commands.
 *
 * @since 2.1.0
 */
export type Tests_Cli_Commands_Access_AccessCommands_TempDir = string | undefined;

export type Tests_Cli_Commands_Access_AccessCommands_ConfigPath = string | undefined;

export type Tests_Cli_Commands_Access_AccessCommands_OsTmpDir = string;

export type Tests_Cli_Commands_Access_AccessCommands_TempDirPath = string;

/**
 * Tests - CLI - Commands - Access - Access Commands - Adds And Normalizes An Access User.
 *
 * @since 2.1.0
 */
export type Tests_Cli_Commands_Access_AccessCommands_AddsAndNormalizesAnAccessUser_User = Lib_Schema_AppAccessUserConfig & {};

export type Tests_Cli_Commands_Access_AccessCommands_AddsAndNormalizesAnAccessUser_SavedConfig = Lib_Schema_Config & {};

/**
 * Tests - CLI - Commands - Access - Access Commands - Generates All Supported Key Formats.
 *
 * @since 2.1.0
 */
export type Tests_Cli_Commands_Access_AccessCommands_GeneratesAllSupportedKeyFormats_MemorableKey = string;

export type Tests_Cli_Commands_Access_AccessCommands_GeneratesAllSupportedKeyFormats_CompactKey = string;

export type Tests_Cli_Commands_Access_AccessCommands_GeneratesAllSupportedKeyFormats_RandomKey = string;

/**
 * Tests - CLI - Commands - Access - Access Commands - Rejects Duplicate Access Users.
 *
 * @since 2.1.0
 */
export type Tests_Cli_Commands_Access_AccessCommands_RejectsDuplicateAccessUsers_Returns = void;

/**
 * Tests - CLI - Commands - Access - Access Commands - Removes The App Access Section With The Last User.
 *
 * @since 2.1.0
 */
export type Tests_Cli_Commands_Access_AccessCommands_RemovesTheAppAccessSectionWithTheLastUser_SavedConfig = Lib_Schema_Config & {};

/**
 * Tests - CLI - Commands - Access - Access Commands - Rotates An Access Key.
 *
 * @since 2.1.0
 */
export type Tests_Cli_Commands_Access_AccessCommands_RotatesAnAccessKey_InitialUser = Lib_Schema_AppAccessUserConfig & {};

export type Tests_Cli_Commands_Access_AccessCommands_RotatesAnAccessKey_RotatedUser = Lib_Schema_AppAccessUserConfig & {};

export type Tests_Cli_Commands_Access_AccessCommands_RotatesAnAccessKey_SavedConfig = Lib_Schema_Config & {};

/**
 * Tests - CLI - Commands - Access - Access Commands - Validates Duplicate Users And The Reserved Shortcode.
 *
 * @since 2.1.0
 */
export type Tests_Cli_Commands_Access_AccessCommands_ValidatesDuplicateUsersAndTheReservedShortcode_InvalidConfig = Lib_Schema_Config & {};

export type Tests_Cli_Commands_Access_AccessCommands_ValidatesDuplicateUsersAndTheReservedShortcode_ConfigContent = string;

export type Tests_Cli_Commands_Access_AccessCommands_ValidatesDuplicateUsersAndTheReservedShortcode_Result = ReturnType<typeof validateConfig>;

/**
 * Tests - CLI - Commands - Access - Access Commands - Writes App Access To Wrangler Vars.
 *
 * @since 2.1.0
 */
export type Tests_Cli_Commands_Access_AccessCommands_WritesAppAccessToWranglerVars_OutputPath = string;

export type Tests_Cli_Commands_Access_AccessCommands_WritesAppAccessToWranglerVars_Output = string;
