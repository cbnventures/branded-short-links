import { readFileSync, writeFileSync } from 'node:fs';

import type {
  Cli_Commands_ConfigIo_LoadConfig_ConfigPath,
  Cli_Commands_ConfigIo_LoadConfig_RawContent,
  Cli_Commands_ConfigIo_LoadConfig_Returns,
  Cli_Commands_ConfigIo_NormalizeConfig_AppAccess,
  Cli_Commands_ConfigIo_NormalizeConfig_Config,
  Cli_Commands_ConfigIo_NormalizeConfig_Links,
  Cli_Commands_ConfigIo_NormalizeConfig_NormalizedAppAccess,
  Cli_Commands_ConfigIo_NormalizeConfig_NormalizedLinks,
  Cli_Commands_ConfigIo_NormalizeConfig_NormalizedTrackers,
  Cli_Commands_ConfigIo_NormalizeConfig_Returns,
  Cli_Commands_ConfigIo_NormalizeConfig_Settings,
  Cli_Commands_ConfigIo_NormalizeConfig_SortedItems,
  Cli_Commands_ConfigIo_NormalizeConfig_SortedUsers,
  Cli_Commands_ConfigIo_NormalizeConfig_Trackers,
  Cli_Commands_ConfigIo_SaveConfig_Config,
  Cli_Commands_ConfigIo_SaveConfig_ConfigPath,
  Cli_Commands_ConfigIo_SaveConfig_NormalizedConfig,
  Cli_Commands_ConfigIo_SaveConfig_Returns,
} from '../../types/cli/commands/config-io.d.ts';

/**
 * CLI - Commands - Config IO - Load Config.
 *
 * Reads and parses the JSON configuration file from disk. Returns unknown
 * because the parsed JSON has not been schema-validated; callers must run
 * configSchema.parse() or configSchema.safeParse() before operating on the result.
 *
 * @since 2.0.0
 */
function loadConfig(configPath: Cli_Commands_ConfigIo_LoadConfig_ConfigPath): Cli_Commands_ConfigIo_LoadConfig_Returns {
  const rawContent: Cli_Commands_ConfigIo_LoadConfig_RawContent = readFileSync(configPath, 'utf-8');

  return JSON.parse(rawContent);
}

/**
 * CLI - Commands - Config IO - Normalize Config.
 *
 * Reorders top-level keys to links, trackers, app_access, and settings, sorts
 * link items, trackers, and app-access users alphabetically, and places the
 * type key before name in each tracker to match the UI prompt sequence.
 *
 * @param {Cli_Commands_ConfigIo_NormalizeConfig_Config} config - Config.
 *
 * @returns {Cli_Commands_ConfigIo_NormalizeConfig_Returns}
 *
 * @since 2.0.0
 */
function normalizeConfig(config: Cli_Commands_ConfigIo_NormalizeConfig_Config): Cli_Commands_ConfigIo_NormalizeConfig_Returns {
  const links: Cli_Commands_ConfigIo_NormalizeConfig_Links = config['links'];
  const trackers: Cli_Commands_ConfigIo_NormalizeConfig_Trackers = config['trackers'];
  const settings: Cli_Commands_ConfigIo_NormalizeConfig_Settings = config['settings'];
  const appAccess: Cli_Commands_ConfigIo_NormalizeConfig_AppAccess = config['app_access'];

  const sortedItems: Cli_Commands_ConfigIo_NormalizeConfig_SortedItems = [...links['items']].sort(
    (a, b) => a['shortcode'].localeCompare(b['shortcode']),
  );

  const normalizedLinks: Cli_Commands_ConfigIo_NormalizeConfig_NormalizedLinks = {
    ...links,
    items: sortedItems,
  };

  const normalizedTrackers: Cli_Commands_ConfigIo_NormalizeConfig_NormalizedTrackers = [...trackers]
    .sort((a, b) => a['name'].localeCompare(b['name']))
    .map((tracker) => {
      return {
        ...{
          type: tracker['type'],
          name: tracker['name'],
        },
        ...tracker,
      };
    });

  const sortedUsers: Cli_Commands_ConfigIo_NormalizeConfig_SortedUsers = (appAccess === undefined) ? undefined : appAccess['users'].toSorted((a, b) => a['username'].localeCompare(b['username']));
  const normalizedAppAccess: Cli_Commands_ConfigIo_NormalizeConfig_NormalizedAppAccess = (sortedUsers === undefined) ? undefined : { users: sortedUsers };

  return {
    links: normalizedLinks,
    trackers: normalizedTrackers,
    ...((normalizedAppAccess === undefined) ? {} : { app_access: normalizedAppAccess }),
    settings,
  };
}

/**
 * CLI - Commands - Config IO - Save Config.
 *
 * Serializes the configuration object to JSON and writes
 * it to disk so changes persist between CLI sessions.
 *
 * @param {Cli_Commands_ConfigIo_SaveConfig_ConfigPath} configPath - Config path.
 * @param {Cli_Commands_ConfigIo_SaveConfig_Config}     config     - Config.
 *
 * @returns {Cli_Commands_ConfigIo_SaveConfig_Returns}
 *
 * @since 2.0.0
 */
function saveConfig(configPath: Cli_Commands_ConfigIo_SaveConfig_ConfigPath, config: Cli_Commands_ConfigIo_SaveConfig_Config): Cli_Commands_ConfigIo_SaveConfig_Returns {
  const normalizedConfig: Cli_Commands_ConfigIo_SaveConfig_NormalizedConfig = normalizeConfig(config);

  writeFileSync(configPath, `${JSON.stringify(normalizedConfig, null, 2)}\n`);

  return;
}

export {
  loadConfig,
  normalizeConfig,
  saveConfig,
};
