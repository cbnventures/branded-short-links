import type { Lib_Schema_Config } from '../../../lib/schema.d.ts';

/**
 * Tests - CLI - Commands - Config IO.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_ConfigIo_ValidConfig = Lib_Schema_Config & {};

/**
 * Tests - CLI - Commands - Config IO - Load Config.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_ConfigIo_LoadConfig_TempDir = string | undefined;

export type Tests_Cli_Commands_ConfigIo_LoadConfig_ConfigPath = string | undefined;

export type Tests_Cli_Commands_ConfigIo_LoadConfig_OsTmpDir = string;

export type Tests_Cli_Commands_ConfigIo_LoadConfig_TempDirPath = string;

/**
 * Tests - CLI - Commands - Config IO - Load Config - Reads And Parses Valid JSON.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_ConfigIo_LoadConfig_ReadsAndParsesValidJSON_ConfigContent = string;

export type Tests_Cli_Commands_ConfigIo_LoadConfig_ReadsAndParsesValidJSON_Result = Lib_Schema_Config & {};

/**
 * Tests - CLI - Commands - Config IO - Load Config - Throws On Invalid JSON.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_ConfigIo_LoadConfig_ThrowsOnInvalidJSON_InvalidJson = string;

/**
 * Tests - CLI - Commands - Config IO - Load Config - Throws On Non Existent File.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_ConfigIo_LoadConfig_ThrowsOnNonExistentFile_MissingPath = string;

/**
 * Tests - CLI - Commands - Config IO - Save Config.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_ConfigIo_SaveConfig_TempDir = string | undefined;

export type Tests_Cli_Commands_ConfigIo_SaveConfig_ConfigPath = string | undefined;

export type Tests_Cli_Commands_ConfigIo_SaveConfig_OsTmpDir = string;

export type Tests_Cli_Commands_ConfigIo_SaveConfig_TempDirPath = string;

/**
 * Tests - CLI - Commands - Config IO - Save Config - Produces Output That Load Config Can Read Back.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_ConfigIo_SaveConfig_ProducesOutputThatLoadConfigCanReadBack_Result = Lib_Schema_Config & {};

/**
 * Tests - CLI - Commands - Config IO - Save Config - Writes Formatted JSON With 2 Space Indent.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_ConfigIo_SaveConfig_WritesFormattedJSONWith2SpaceIndent_Content = string;

export type Tests_Cli_Commands_ConfigIo_SaveConfig_WritesFormattedJSONWith2SpaceIndent_ExpectedContent = string;

/**
 * Tests - CLI - Commands - Config IO - Save Config - Writes JSON With Trailing Newline.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_ConfigIo_SaveConfig_WritesJSONWithTrailingNewline_Content = string;

export type Tests_Cli_Commands_ConfigIo_SaveConfig_WritesJSONWithTrailingNewline_EndsWithNewline = boolean;
