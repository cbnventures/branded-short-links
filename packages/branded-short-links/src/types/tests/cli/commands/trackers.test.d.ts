import type { Lib_Schema_Config } from '../../../lib/schema.d.ts';

/**
 * Tests - CLI - Commands - Trackers.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Trackers_ValidConfig = Lib_Schema_Config & {};

export type Tests_Cli_Commands_Trackers_TempDir = string | undefined;

export type Tests_Cli_Commands_Trackers_ConfigPath = string | undefined;

export type Tests_Cli_Commands_Trackers_OsTmpDir = string;

export type Tests_Cli_Commands_Trackers_TempDirPath = string;

export type Tests_Cli_Commands_Trackers_ConfigJson = string;

/**
 * Tests - CLI - Commands - Trackers - Add Tracker - Adds A Tracker To The Array.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Trackers_AddTracker_AddsATrackerToTheArray_NewTracker = Lib_Schema_Config['trackers'][number];

export type Tests_Cli_Commands_Trackers_AddTracker_AddsATrackerToTheArray_Trackers = Lib_Schema_Config['trackers'];

/**
 * Tests - CLI - Commands - Trackers - Add Tracker - Does Not Affect Existing Trackers.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Trackers_AddTracker_DoesNotAffectExistingTrackers_NewTracker = Lib_Schema_Config['trackers'][number];

export type Tests_Cli_Commands_Trackers_AddTracker_DoesNotAffectExistingTrackers_Trackers = Lib_Schema_Config['trackers'];

/**
 * Tests - CLI - Commands - Trackers - Add Tracker - Persists The Added Tracker To File.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Trackers_AddTracker_PersistsTheAddedTrackerToFile_NewTracker = Lib_Schema_Config['trackers'][number];

export type Tests_Cli_Commands_Trackers_AddTracker_PersistsTheAddedTrackerToFile_Config = Lib_Schema_Config & {};

/**
 * Tests - CLI - Commands - Trackers - Edit Tracker - Does Not Affect Other Trackers.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Trackers_EditTracker_DoesNotAffectOtherTrackers_Trackers = Lib_Schema_Config['trackers'];

/**
 * Tests - CLI - Commands - Trackers - Edit Tracker - Merges Updates Into The Matching Tracker.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Trackers_EditTracker_MergesUpdatesIntoTheMatchingTracker_Trackers = Lib_Schema_Config['trackers'];

export type Tests_Cli_Commands_Trackers_EditTracker_MergesUpdatesIntoTheMatchingTracker_Ga4 = Record<string, unknown>;

export type Tests_Cli_Commands_Trackers_EditTracker_MergesUpdatesIntoTheMatchingTracker_Ga4Unknown = unknown;

export type Tests_Cli_Commands_Trackers_EditTracker_MergesUpdatesIntoTheMatchingTracker_Ga4AsRecord = Record<string, string>;

export type Tests_Cli_Commands_Trackers_EditTracker_MergesUpdatesIntoTheMatchingTracker_Ga4ApiSecret = string;

/**
 * Tests - CLI - Commands - Trackers - Edit Tracker - Throws If Tracker Name Not Found.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Trackers_EditTracker_ThrowsIfTrackerNameNotFound_NotFoundError = string;

/**
 * Tests - CLI - Commands - Trackers - List Trackers - Returns Correct Number Of Trackers.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Trackers_ListTrackers_ReturnsCorrectNumberOfTrackers_Trackers = Lib_Schema_Config['trackers'];

/**
 * Tests - CLI - Commands - Trackers - List Trackers - Returns Empty Array When No Trackers.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Trackers_ListTrackers_ReturnsEmptyArrayWhenNoTrackers_EmptyConfig = Lib_Schema_Config & {};

export type Tests_Cli_Commands_Trackers_ListTrackers_ReturnsEmptyArrayWhenNoTrackers_Trackers = Lib_Schema_Config['trackers'];

/**
 * Tests - CLI - Commands - Trackers - List Trackers - Returns The Trackers Array.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Trackers_ListTrackers_ReturnsTheTrackersArray_Trackers = Lib_Schema_Config['trackers'];

/**
 * Tests - CLI - Commands - Trackers - Remove Tracker - Persists The Removal To File.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Trackers_RemoveTracker_PersistsTheRemovalToFile_Config = Lib_Schema_Config & {};

/**
 * Tests - CLI - Commands - Trackers - Remove Tracker - Removes A Tracker By Name.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Trackers_RemoveTracker_RemovesATrackerByName_Trackers = Lib_Schema_Config['trackers'];

/**
 * Tests - CLI - Commands - Trackers - Remove Tracker - Throws If Tracker Name Not Found.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Trackers_RemoveTracker_ThrowsIfTrackerNameNotFound_NotFoundError = string;
