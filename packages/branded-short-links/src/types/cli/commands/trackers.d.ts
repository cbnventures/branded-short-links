import type {
  Lib_Schema_Config,
  Lib_Schema_TrackerConfig,
} from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Trackers.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Trackers_AddTracker_ConfigPath = string;

export type Cli_Commands_Trackers_AddTracker_Tracker = Lib_Schema_TrackerConfig;

export type Cli_Commands_Trackers_AddTracker_Returns = void;

export type Cli_Commands_Trackers_AddTracker_Config_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_Trackers_AddTracker_Config_Links = Lib_Schema_Config['links'];

export type Cli_Commands_Trackers_AddTracker_Config_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_Trackers_AddTracker_Config = {
  settings: Cli_Commands_Trackers_AddTracker_Config_Settings;
  links: Cli_Commands_Trackers_AddTracker_Config_Links;
  trackers: Cli_Commands_Trackers_AddTracker_Config_Trackers;
};

/**
 * CLI - Commands - Trackers.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Trackers_EditTracker_ConfigPath = string;

export type Cli_Commands_Trackers_EditTracker_Name = string;

export type Cli_Commands_Trackers_EditTracker_Updates = Partial<Lib_Schema_TrackerConfig>;

export type Cli_Commands_Trackers_EditTracker_Returns = void;

export type Cli_Commands_Trackers_EditTracker_Config_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_Trackers_EditTracker_Config_Links = Lib_Schema_Config['links'];

export type Cli_Commands_Trackers_EditTracker_Config_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_Trackers_EditTracker_Config = {
  settings: Cli_Commands_Trackers_EditTracker_Config_Settings;
  links: Cli_Commands_Trackers_EditTracker_Config_Links;
  trackers: Cli_Commands_Trackers_EditTracker_Config_Trackers;
};

export type Cli_Commands_Trackers_EditTracker_Index = number;

/**
 * CLI - Commands - Trackers.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Trackers_ListTrackers_ConfigPath = string;

export type Cli_Commands_Trackers_ListTrackers_Returns = Lib_Schema_TrackerConfig[];

export type Cli_Commands_Trackers_ListTrackers_Config_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_Trackers_ListTrackers_Config_Links = Lib_Schema_Config['links'];

export type Cli_Commands_Trackers_ListTrackers_Config_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_Trackers_ListTrackers_Config = {
  settings: Cli_Commands_Trackers_ListTrackers_Config_Settings;
  links: Cli_Commands_Trackers_ListTrackers_Config_Links;
  trackers: Cli_Commands_Trackers_ListTrackers_Config_Trackers;
};

/**
 * CLI - Commands - Trackers.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Trackers_RemoveTracker_ConfigPath = string;

export type Cli_Commands_Trackers_RemoveTracker_Name = string;

export type Cli_Commands_Trackers_RemoveTracker_Returns = void;

export type Cli_Commands_Trackers_RemoveTracker_Config_Settings = Lib_Schema_Config['settings'];

export type Cli_Commands_Trackers_RemoveTracker_Config_Links = Lib_Schema_Config['links'];

export type Cli_Commands_Trackers_RemoveTracker_Config_Trackers = Lib_Schema_Config['trackers'];

export type Cli_Commands_Trackers_RemoveTracker_Config = {
  settings: Cli_Commands_Trackers_RemoveTracker_Config_Settings;
  links: Cli_Commands_Trackers_RemoveTracker_Config_Links;
  trackers: Cli_Commands_Trackers_RemoveTracker_Config_Trackers;
};

export type Cli_Commands_Trackers_RemoveTracker_Filtered = Lib_Schema_Config['trackers'];
