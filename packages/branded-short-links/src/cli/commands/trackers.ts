import { configSchema } from '../../lib/schema.js';
import { loadConfig, saveConfig } from './config-io.js';

import type {
  CliCommandsTrackersAddTrackerConfig,
  CliCommandsTrackersAddTrackerConfigPath,
  CliCommandsTrackersAddTrackerReturn,
  CliCommandsTrackersAddTrackerTracker,
  CliCommandsTrackersEditTrackerConfig,
  CliCommandsTrackersEditTrackerConfigPath,
  CliCommandsTrackersEditTrackerIndex,
  CliCommandsTrackersEditTrackerName,
  CliCommandsTrackersEditTrackerReturn,
  CliCommandsTrackersEditTrackerUpdates,
  CliCommandsTrackersListTrackersConfig,
  CliCommandsTrackersListTrackersConfigPath,
  CliCommandsTrackersListTrackersReturn,
  CliCommandsTrackersRemoveTrackerConfig,
  CliCommandsTrackersRemoveTrackerConfigPath,
  CliCommandsTrackersRemoveTrackerFiltered,
  CliCommandsTrackersRemoveTrackerName,
  CliCommandsTrackersRemoveTrackerReturn,
} from '../../types/cli/commands/trackers.d.ts';

/**
 * CLI - Commands - Trackers - Add Tracker.
 *
 * Appends a new tracker to the configuration after verifying
 * that no existing tracker shares the same name.
 *
 * @param {CliCommandsTrackersAddTrackerConfigPath} configPath - Config path.
 * @param {CliCommandsTrackersAddTrackerTracker}    tracker    - Tracker.
 *
 * @returns {CliCommandsTrackersAddTrackerReturn}
 *
 * @since 2.0.0
 */
function addTracker(configPath: CliCommandsTrackersAddTrackerConfigPath, tracker: CliCommandsTrackersAddTrackerTracker): CliCommandsTrackersAddTrackerReturn {
  const config: CliCommandsTrackersAddTrackerConfig = configSchema.parse(loadConfig(configPath));

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
 * @param {CliCommandsTrackersEditTrackerConfigPath} configPath - Config path.
 * @param {CliCommandsTrackersEditTrackerName}       name       - Name.
 * @param {CliCommandsTrackersEditTrackerUpdates}    updates    - Updates.
 *
 * @returns {CliCommandsTrackersEditTrackerReturn}
 *
 * @since 2.0.0
 */
function editTracker(configPath: CliCommandsTrackersEditTrackerConfigPath, name: CliCommandsTrackersEditTrackerName, updates: CliCommandsTrackersEditTrackerUpdates): CliCommandsTrackersEditTrackerReturn {
  const config: CliCommandsTrackersEditTrackerConfig = configSchema.parse(loadConfig(configPath));
  const index: CliCommandsTrackersEditTrackerIndex = config['trackers'].findIndex((tracker) => tracker['name'] === name);

  if (index === -1) {
    throw new Error(`Tracker with name "${name}" not found.`);
  }

  Reflect.set(config['trackers'], index, {
    ...config['trackers'][index], ...updates,
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
 * @param {CliCommandsTrackersListTrackersConfigPath} configPath - Config path.
 *
 * @returns {CliCommandsTrackersListTrackersReturn}
 *
 * @since 2.0.0
 */
function listTrackers(configPath: CliCommandsTrackersListTrackersConfigPath): CliCommandsTrackersListTrackersReturn {
  const config: CliCommandsTrackersListTrackersConfig = configSchema.parse(loadConfig(configPath));

  return config['trackers'];
}

/**
 * CLI - Commands - Trackers - Remove Tracker.
 *
 * Filters out a tracker by its name and persists the
 * updated list back to the configuration file.
 *
 * @param {CliCommandsTrackersRemoveTrackerConfigPath} configPath - Config path.
 * @param {CliCommandsTrackersRemoveTrackerName}       name       - Name.
 *
 * @returns {CliCommandsTrackersRemoveTrackerReturn}
 *
 * @since 2.0.0
 */
function removeTracker(configPath: CliCommandsTrackersRemoveTrackerConfigPath, name: CliCommandsTrackersRemoveTrackerName): CliCommandsTrackersRemoveTrackerReturn {
  const config: CliCommandsTrackersRemoveTrackerConfig = configSchema.parse(loadConfig(configPath));
  const filtered: CliCommandsTrackersRemoveTrackerFiltered = config['trackers'].filter((tracker) => tracker['name'] !== name);

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
