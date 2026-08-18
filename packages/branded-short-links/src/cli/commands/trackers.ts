import { configSchema } from '../../lib/schema.js';
import { loadConfig, saveConfig } from './config-io.js';

import type {
  Cli_Commands_Trackers_AddTracker_Config,
  Cli_Commands_Trackers_AddTracker_ConfigPath,
  Cli_Commands_Trackers_AddTracker_Returns,
  Cli_Commands_Trackers_AddTracker_Tracker,
  Cli_Commands_Trackers_EditTracker_Config,
  Cli_Commands_Trackers_EditTracker_ConfigPath,
  Cli_Commands_Trackers_EditTracker_Index,
  Cli_Commands_Trackers_EditTracker_Name,
  Cli_Commands_Trackers_EditTracker_Returns,
  Cli_Commands_Trackers_EditTracker_Updates,
  Cli_Commands_Trackers_ListTrackers_Config,
  Cli_Commands_Trackers_ListTrackers_ConfigPath,
  Cli_Commands_Trackers_ListTrackers_Returns,
  Cli_Commands_Trackers_RemoveTracker_Config,
  Cli_Commands_Trackers_RemoveTracker_ConfigPath,
  Cli_Commands_Trackers_RemoveTracker_Filtered,
  Cli_Commands_Trackers_RemoveTracker_Name,
  Cli_Commands_Trackers_RemoveTracker_Returns,
} from '../../types/cli/commands/trackers.d.ts';

/**
 * CLI - Commands - Trackers - Add Tracker.
 *
 * Appends a new tracker to the configuration after verifying
 * that no existing tracker shares the same name.
 *
 * @param {Cli_Commands_Trackers_AddTracker_ConfigPath} configPath - Config path.
 * @param {Cli_Commands_Trackers_AddTracker_Tracker}    tracker    - Tracker.
 *
 * @returns {Cli_Commands_Trackers_AddTracker_Returns}
 *
 * @since 2.0.0
 */
function addTracker(configPath: Cli_Commands_Trackers_AddTracker_ConfigPath, tracker: Cli_Commands_Trackers_AddTracker_Tracker): Cli_Commands_Trackers_AddTracker_Returns {
  const config: Cli_Commands_Trackers_AddTracker_Config = configSchema.parse(loadConfig(configPath));

  if (config['trackers'].some((existing) => existing['name'] === tracker['name']) === true) {
    throw new Error(`Tracker with name "${tracker['name']}" already exists.`);
  }

  config['trackers'].push(tracker);

  saveConfig(configPath, config);

  return;
}

/**
 * CLI - Commands - Trackers - Edit Tracker.
 *
 * Locates a tracker by its name and applies partial updates
 * to its properties using a merge strategy.
 *
 * @param {Cli_Commands_Trackers_EditTracker_ConfigPath} configPath - Config path.
 * @param {Cli_Commands_Trackers_EditTracker_Name}       name       - Name.
 * @param {Cli_Commands_Trackers_EditTracker_Updates}    updates    - Updates.
 *
 * @returns {Cli_Commands_Trackers_EditTracker_Returns}
 *
 * @since 2.0.0
 */
function editTracker(configPath: Cli_Commands_Trackers_EditTracker_ConfigPath, name: Cli_Commands_Trackers_EditTracker_Name, updates: Cli_Commands_Trackers_EditTracker_Updates): Cli_Commands_Trackers_EditTracker_Returns {
  const config: Cli_Commands_Trackers_EditTracker_Config = configSchema.parse(loadConfig(configPath));
  const index: Cli_Commands_Trackers_EditTracker_Index = config['trackers'].findIndex((tracker) => tracker['name'] === name);

  if (index === -1) {
    throw new Error(`Tracker with name "${name}" not found.`);
  }

  Reflect.set(config['trackers'], index, {
    ...config['trackers'][index],
    ...updates,
  });

  saveConfig(configPath, config);

  return;
}

/**
 * CLI - Commands - Trackers - List Trackers.
 *
 * Retrieves all tracker entries from the configuration file
 * so callers can enumerate or display them.
 *
 * @param {Cli_Commands_Trackers_ListTrackers_ConfigPath} configPath - Config path.
 *
 * @returns {Cli_Commands_Trackers_ListTrackers_Returns}
 *
 * @since 2.0.0
 */
function listTrackers(configPath: Cli_Commands_Trackers_ListTrackers_ConfigPath): Cli_Commands_Trackers_ListTrackers_Returns {
  const config: Cli_Commands_Trackers_ListTrackers_Config = configSchema.parse(loadConfig(configPath));

  return config['trackers'];
}

/**
 * CLI - Commands - Trackers - Remove Tracker.
 *
 * Filters out a tracker by its name and persists the
 * updated list back to the configuration file.
 *
 * @param {Cli_Commands_Trackers_RemoveTracker_ConfigPath} configPath - Config path.
 * @param {Cli_Commands_Trackers_RemoveTracker_Name}       name       - Name.
 *
 * @returns {Cli_Commands_Trackers_RemoveTracker_Returns}
 *
 * @since 2.0.0
 */
function removeTracker(configPath: Cli_Commands_Trackers_RemoveTracker_ConfigPath, name: Cli_Commands_Trackers_RemoveTracker_Name): Cli_Commands_Trackers_RemoveTracker_Returns {
  const config: Cli_Commands_Trackers_RemoveTracker_Config = configSchema.parse(loadConfig(configPath));
  const filtered: Cli_Commands_Trackers_RemoveTracker_Filtered = config['trackers'].filter((tracker) => tracker['name'] !== name);

  if (filtered['length'] === config['trackers']['length']) {
    throw new Error(`Tracker with name "${name}" not found.`);
  }

  Reflect.set(config, 'trackers', filtered);

  saveConfig(configPath, config);

  return;
}

export {
  addTracker,
  editTracker,
  listTrackers,
  removeTracker,
};
