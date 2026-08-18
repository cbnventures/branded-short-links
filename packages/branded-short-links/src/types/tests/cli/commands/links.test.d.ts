import type { Lib_Schema_Config } from '../../../lib/schema.d.ts';

/**
 * Tests - CLI - Commands - Links.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Links_ValidConfig = Lib_Schema_Config & {};

export type Tests_Cli_Commands_Links_TempDir = string | undefined;

export type Tests_Cli_Commands_Links_ConfigPath = string | undefined;

export type Tests_Cli_Commands_Links_OsTmpDir = string;

export type Tests_Cli_Commands_Links_TempDirPath = string;

export type Tests_Cli_Commands_Links_ConfigJson = string;

/**
 * Tests - CLI - Commands - Links - Add Link - Adds A Link Item To The Array.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Links_AddLink_AddsALinkItemToTheArray_NewLink = Lib_Schema_Config['links']['items'][number];

export type Tests_Cli_Commands_Links_AddLink_AddsALinkItemToTheArray_Items = Lib_Schema_Config['links']['items'];

/**
 * Tests - CLI - Commands - Links - Add Link - Does Not Affect Existing Links.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Links_AddLink_DoesNotAffectExistingLinks_NewLink = Lib_Schema_Config['links']['items'][number];

export type Tests_Cli_Commands_Links_AddLink_DoesNotAffectExistingLinks_Items = Lib_Schema_Config['links']['items'];

/**
 * Tests - CLI - Commands - Links - Add Link - Persists The Added Link To File.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Links_AddLink_PersistsTheAddedLinkToFile_NewLink = Lib_Schema_Config['links']['items'][number];

export type Tests_Cli_Commands_Links_AddLink_PersistsTheAddedLinkToFile_Config = Lib_Schema_Config & {};

/**
 * Tests - CLI - Commands - Links - Edit Link - Does Not Affect Other Links.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Links_EditLink_DoesNotAffectOtherLinks_Items = Lib_Schema_Config['links']['items'];

/**
 * Tests - CLI - Commands - Links - Edit Link - Merges Updates Into The Matching Link.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Links_EditLink_MergesUpdatesIntoTheMatchingLink_Items = Lib_Schema_Config['links']['items'];

/**
 * Tests - CLI - Commands - Links - Edit Link - Throws If Shortcode Not Found.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Links_EditLink_ThrowsIfShortcodeNotFound_NotFoundError = string;

/**
 * Tests - CLI - Commands - Links - Get Fallback Url - Returns The Fallback URL.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Links_GetFallbackUrl_ReturnsTheFallbackURL_Url = Lib_Schema_Config['links']['fallback_url'];

/**
 * Tests - CLI - Commands - Links - List Links - Returns Correct Number Of Items.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Links_ListLinks_ReturnsCorrectNumberOfItems_Items = Lib_Schema_Config['links']['items'];

/**
 * Tests - CLI - Commands - Links - List Links - Returns Empty Array When No Items.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Links_ListLinks_ReturnsEmptyArrayWhenNoItems_EmptyConfig = Lib_Schema_Config & {};

export type Tests_Cli_Commands_Links_ListLinks_ReturnsEmptyArrayWhenNoItems_Items = Lib_Schema_Config['links']['items'];

/**
 * Tests - CLI - Commands - Links - List Links - Returns The Items Array.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Links_ListLinks_ReturnsTheItemsArray_Items = Lib_Schema_Config['links']['items'];

/**
 * Tests - CLI - Commands - Links - Remove Link - Persists The Removal To File.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Links_RemoveLink_PersistsTheRemovalToFile_Config = Lib_Schema_Config & {};

/**
 * Tests - CLI - Commands - Links - Remove Link - Removes A Link By Shortcode.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Links_RemoveLink_RemovesALinkByShortcode_Items = Lib_Schema_Config['links']['items'];

/**
 * Tests - CLI - Commands - Links - Remove Link - Throws If Shortcode Not Found.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Links_RemoveLink_ThrowsIfShortcodeNotFound_NotFoundError = string;

/**
 * Tests - CLI - Commands - Links - Set Fallback Url - Does Not Affect Link Items.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Links_SetFallbackUrl_DoesNotAffectLinkItems_Config = Lib_Schema_Config & {};

/**
 * Tests - CLI - Commands - Links - Set Fallback Url - Persists The Fallback URL To File.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Links_SetFallbackUrl_PersistsTheFallbackURLToFile_Config = Lib_Schema_Config & {};

/**
 * Tests - CLI - Commands - Links - Set Fallback Url - Updates The Fallback URL.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Links_SetFallbackUrl_UpdatesTheFallbackURL_Url = Lib_Schema_Config['links']['fallback_url'];
