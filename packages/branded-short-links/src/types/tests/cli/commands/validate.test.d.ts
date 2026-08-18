import type { validateConfig } from '../../../../cli/commands/validate.js';

/**
 * Tests - CLI - Commands - Validate - Validate Config.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Validate_ValidateConfig_TempDir = string | undefined;

export type Tests_Cli_Commands_Validate_ValidateConfig_ConfigPath = string | undefined;

export type Tests_Cli_Commands_Validate_ValidateConfig_OsTmpDir = string;

export type Tests_Cli_Commands_Validate_ValidateConfig_TempDirPath = string;

/**
 * Tests - CLI - Commands - Validate - Validate Config - Fails For Duplicate Shortcodes.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateShortcodes_DuplicateConfig = Record<string, unknown>;

export type Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateShortcodes_ConfigContent = string;

export type Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateShortcodes_Result = ReturnType<typeof validateConfig>;

/**
 * Tests - CLI - Commands - Validate - Validate Config - Fails For Duplicate Tracker Names.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateTrackerNames_DuplicateConfig = Record<string, unknown>;

export type Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateTrackerNames_ConfigContent = string;

export type Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateTrackerNames_Result = ReturnType<typeof validateConfig>;

/**
 * Tests - CLI - Commands - Validate - Validate Config - Fails For Invalid Fallback URL.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Validate_ValidateConfig_FailsForInvalidFallbackURL_InvalidConfig = Record<string, unknown>;

export type Tests_Cli_Commands_Validate_ValidateConfig_FailsForInvalidFallbackURL_ConfigContent = string;

export type Tests_Cli_Commands_Validate_ValidateConfig_FailsForInvalidFallbackURL_Result = ReturnType<typeof validateConfig>;

/**
 * Tests - CLI - Commands - Validate - Validate Config - Fails For Missing Links Section.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingLinksSection_InvalidConfig = Record<string, unknown>;

export type Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingLinksSection_ConfigContent = string;

export type Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingLinksSection_Result = ReturnType<typeof validateConfig>;

/**
 * Tests - CLI - Commands - Validate - Validate Config - Fails For Missing Settings Fields.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingSettingsFields_InvalidConfig = Record<string, unknown>;

export type Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingSettingsFields_ConfigContent = string;

export type Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingSettingsFields_Result = ReturnType<typeof validateConfig>;

/**
 * Tests - CLI - Commands - Validate - Validate Config - Passes For A Valid Config.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Validate_ValidateConfig_PassesForAValidConfig_ValidConfig = Record<string, unknown>;

export type Tests_Cli_Commands_Validate_ValidateConfig_PassesForAValidConfig_ConfigContent = string;

export type Tests_Cli_Commands_Validate_ValidateConfig_PassesForAValidConfig_Result = ReturnType<typeof validateConfig>;

/**
 * Tests - CLI - Commands - Validate - Validate Config - Passes With Empty Items And Trackers.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Validate_ValidateConfig_PassesWithEmptyItemsAndTrackers_MinimalConfig = Record<string, unknown>;

export type Tests_Cli_Commands_Validate_ValidateConfig_PassesWithEmptyItemsAndTrackers_ConfigContent = string;

export type Tests_Cli_Commands_Validate_ValidateConfig_PassesWithEmptyItemsAndTrackers_Result = ReturnType<typeof validateConfig>;

/**
 * Tests - CLI - Commands - Validate - Validate Config - Returns Valid True With No Duplicates Across Different Shortcodes.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Validate_ValidateConfig_ReturnsValidTrueWithNoDuplicatesAcrossDifferentShortcodes_ValidConfig = Record<string, unknown>;

export type Tests_Cli_Commands_Validate_ValidateConfig_ReturnsValidTrueWithNoDuplicatesAcrossDifferentShortcodes_ConfigContent = string;

export type Tests_Cli_Commands_Validate_ValidateConfig_ReturnsValidTrueWithNoDuplicatesAcrossDifferentShortcodes_Result = ReturnType<typeof validateConfig>;
