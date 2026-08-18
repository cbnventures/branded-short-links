import type { vi } from 'vitest';

import type { loadEnvToken, printLinksSummary, saveEnvToken } from '../../../../cli/commands/deploy.js';
import type { Lib_Schema_Config } from '../../../lib/schema.d.ts';

/**
 * Tests - CLI - Commands - Deploy.
 *
 * The "deploy.ts" module resolves its env file path from
 * "Bootstrap.getConfigDir()" once at import time, so these shared
 * fixtures redirect "XDG_CONFIG_HOME" to a temp directory before the
 * module is dynamically imported, keeping every test off the real
 * user config file.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_EnvTokenKey = string;

export type Tests_Cli_Commands_Deploy_OriginalXdgConfigHome = string | undefined;

export type Tests_Cli_Commands_Deploy_TempConfigHome = string | undefined;

export type Tests_Cli_Commands_Deploy_DeployModule_LoadEnvToken = typeof loadEnvToken;

export type Tests_Cli_Commands_Deploy_DeployModule_SaveEnvToken = typeof saveEnvToken;

export type Tests_Cli_Commands_Deploy_DeployModule_PrintLinksSummary = typeof printLinksSummary;

export type Tests_Cli_Commands_Deploy_DeployModule = {
  loadEnvToken: Tests_Cli_Commands_Deploy_DeployModule_LoadEnvToken;
  saveEnvToken: Tests_Cli_Commands_Deploy_DeployModule_SaveEnvToken;
  printLinksSummary: Tests_Cli_Commands_Deploy_DeployModule_PrintLinksSummary;
} | undefined;

export type Tests_Cli_Commands_Deploy_EnvFilePath = string | undefined;

export type Tests_Cli_Commands_Deploy_OsTmpDir = string;

export type Tests_Cli_Commands_Deploy_TempDirPath = string;

export type Tests_Cli_Commands_Deploy_ConfigDir = string;

/**
 * Tests - CLI - Commands - Deploy - Chalk.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_Chalk_ChalkDefault = Record<string, (input: string) => string>;

/**
 * Tests - CLI - Commands - Deploy - Chalk Identity.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_ChalkIdentity_S = string;

export type Tests_Cli_Commands_Deploy_ChalkIdentity_Returns = string;

/**
 * Tests - CLI - Commands - Deploy - Get Written Output.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_GetWrittenOutput_Returns = string;

export type Tests_Cli_Commands_Deploy_GetWrittenOutput_WriteUnknown = unknown;

export type Tests_Cli_Commands_Deploy_GetWrittenOutput_WriteSpy = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Commands_Deploy_GetWrittenOutput_Calls = Tests_Cli_Commands_Deploy_GetWrittenOutput_WriteSpy['mock']['calls'];

/**
 * Tests - CLI - Commands - Deploy - Load Env Token - Falls Through To The Env File When The Environment Variable Is An Empty String.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_LoadEnvToken_FallsThroughToTheEnvFileWhenTheEnvironmentVariableIsAnEmptyString_Result = ReturnType<typeof loadEnvToken>;

/**
 * Tests - CLI - Commands - Deploy - Load Env Token - Prefers The Environment Variable Over The Env File.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_LoadEnvToken_PrefersTheEnvironmentVariableOverTheEnvFile_Result = ReturnType<typeof loadEnvToken>;

/**
 * Tests - CLI - Commands - Deploy - Load Env Token - Reads Back A Token After The First Write.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_LoadEnvToken_ReadsBackATokenAfterTheFirstWrite_Result = ReturnType<typeof loadEnvToken>;

/**
 * Tests - CLI - Commands - Deploy - Load Env Token - Reads Back The Replaced Token After An Existing Key Is Overwritten.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_LoadEnvToken_ReadsBackTheReplacedTokenAfterAnExistingKeyIsOverwritten_Result = ReturnType<typeof loadEnvToken>;

/**
 * Tests - CLI - Commands - Deploy - Load Env Token - Returns Undefined When The Env File Does Not Exist.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_LoadEnvToken_ReturnsUndefinedWhenTheEnvFileDoesNotExist_Result = ReturnType<typeof loadEnvToken>;

/**
 * Tests - CLI - Commands - Deploy - Print Links Summary.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_PrintLinksSummary_TempDir = string | undefined;

export type Tests_Cli_Commands_Deploy_PrintLinksSummary_ConfigPath = string | undefined;

export type Tests_Cli_Commands_Deploy_PrintLinksSummary_OsTmpDir = string;

export type Tests_Cli_Commands_Deploy_PrintLinksSummary_TempDirPath = string;

/**
 * Tests - CLI - Commands - Deploy - Print Links Summary - Does Not Print Undefined When The Fallback URL Is Missing.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_PrintLinksSummary_DoesNotPrintUndefinedWhenTheFallbackURLIsMissing_NoFallbackConfig = Lib_Schema_Config & {};

export type Tests_Cli_Commands_Deploy_PrintLinksSummary_DoesNotPrintUndefinedWhenTheFallbackURLIsMissing_ConfigContent = string;

export type Tests_Cli_Commands_Deploy_PrintLinksSummary_DoesNotPrintUndefinedWhenTheFallbackURLIsMissing_Output = string;

/**
 * Tests - CLI - Commands - Deploy - Print Links Summary - Excludes Tracker Secret Fields From The Output.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_PrintLinksSummary_ExcludesTrackerSecretFieldsFromTheOutput_ValidConfig = Lib_Schema_Config & {};

export type Tests_Cli_Commands_Deploy_PrintLinksSummary_ExcludesTrackerSecretFieldsFromTheOutput_ConfigContent = string;

export type Tests_Cli_Commands_Deploy_PrintLinksSummary_ExcludesTrackerSecretFieldsFromTheOutput_Output = string;

/**
 * Tests - CLI - Commands - Deploy - Print Links Summary - Includes The Fallback URL In The Output.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheFallbackURLInTheOutput_ValidConfig = Lib_Schema_Config & {};

export type Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheFallbackURLInTheOutput_ConfigContent = string;

export type Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheFallbackURLInTheOutput_Output = string;

/**
 * Tests - CLI - Commands - Deploy - Print Links Summary - Includes The Link Shortcode And Redirect URL In The Output.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheLinkShortcodeAndRedirectURLInTheOutput_ValidConfig = Lib_Schema_Config & {};

export type Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheLinkShortcodeAndRedirectURLInTheOutput_ConfigContent = string;

export type Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheLinkShortcodeAndRedirectURLInTheOutput_Output = string;

/**
 * Tests - CLI - Commands - Deploy - Print Links Summary - Shows A Placeholder When No Shortcodes Are Configured.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoShortcodesAreConfigured_MinimalConfig = Lib_Schema_Config & {};

export type Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoShortcodesAreConfigured_ConfigContent = string;

export type Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoShortcodesAreConfigured_Output = string;

/**
 * Tests - CLI - Commands - Deploy - Print Links Summary - Shows A Placeholder When No Trackers Are Configured.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoTrackersAreConfigured_MinimalConfig = Lib_Schema_Config & {};

export type Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoTrackersAreConfigured_ConfigContent = string;

export type Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoTrackersAreConfigured_Output = string;

/**
 * Tests - CLI - Commands - Deploy - Save Env Token - Appends The Token When The File Exists Without The Key.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_SaveEnvToken_AppendsTheTokenWhenTheFileExistsWithoutTheKey_Content = string;

/**
 * Tests - CLI - Commands - Deploy - Save Env Token - Creates The Env File And Writes The Token When No File Exists.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_SaveEnvToken_CreatesTheEnvFileAndWritesTheTokenWhenNoFileExists_Content = string;

/**
 * Tests - CLI - Commands - Deploy - Save Env Token - Overwrites An Existing Token In The Env File.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_SaveEnvToken_OverwritesAnExistingTokenInTheEnvFile_Content = string;

/**
 * Tests - CLI - Commands - Deploy - Save Env Token - Preserves Other Lines When Overwriting An Existing Token.
 *
 * @since 2.0.3
 */
export type Tests_Cli_Commands_Deploy_SaveEnvToken_PreservesOtherLinesWhenOverwritingAnExistingToken_PreExistingLines = string[];

export type Tests_Cli_Commands_Deploy_SaveEnvToken_PreservesOtherLinesWhenOverwritingAnExistingToken_PreExistingContent = string;

export type Tests_Cli_Commands_Deploy_SaveEnvToken_PreservesOtherLinesWhenOverwritingAnExistingToken_Content = string;
