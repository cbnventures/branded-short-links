import { readFileSync, writeFileSync } from 'fs';

import type {
  CliCommandsConfigIoLoadConfigConfigPath,
  CliCommandsConfigIoLoadConfigRawContent,
  CliCommandsConfigIoLoadConfigReturn,
  CliCommandsConfigIoNormalizeConfigConfig,
  CliCommandsConfigIoNormalizeConfigLinks,
  CliCommandsConfigIoNormalizeConfigNormalizedLinks,
  CliCommandsConfigIoNormalizeConfigNormalizedTrackers,
  CliCommandsConfigIoNormalizeConfigReturn,
  CliCommandsConfigIoNormalizeConfigSettings,
  CliCommandsConfigIoNormalizeConfigSortedItems,
  CliCommandsConfigIoNormalizeConfigTrackers,
  CliCommandsConfigIoSaveConfigConfig,
  CliCommandsConfigIoSaveConfigConfigPath,
  CliCommandsConfigIoSaveConfigNormalizedConfig,
  CliCommandsConfigIoSaveConfigReturn,
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
function loadConfig(configPath: CliCommandsConfigIoLoadConfigConfigPath): CliCommandsConfigIoLoadConfigReturn {
  const rawContent: CliCommandsConfigIoLoadConfigRawContent = readFileSync(configPath, 'utf-8');

  return JSON.parse(rawContent);
}

/**
 * CLI - Commands - Config IO - Normalize Config.
 *
 * Reorders top-level keys to match the interactive menu order (links, trackers,
 * settings), sorts link items and trackers alphabetically, and places the type
 * key before name in each tracker to match the UI prompt sequence.
 *
 * @param {CliCommandsConfigIoNormalizeConfigConfig} config - Config.
 *
 * @returns {CliCommandsConfigIoNormalizeConfigReturn}
 *
 * @since 2.0.0
 */
function normalizeConfig(config: CliCommandsConfigIoNormalizeConfigConfig): CliCommandsConfigIoNormalizeConfigReturn {
  const links: CliCommandsConfigIoNormalizeConfigLinks = config['links'];
  const trackers: CliCommandsConfigIoNormalizeConfigTrackers = config['trackers'];
  const settings: CliCommandsConfigIoNormalizeConfigSettings = config['settings'];

  const sortedItems: CliCommandsConfigIoNormalizeConfigSortedItems = [...links['items']].sort(
    (a, b) => a['shortcode'].localeCompare(b['shortcode']),
  );

  const normalizedLinks: CliCommandsConfigIoNormalizeConfigNormalizedLinks = {
    ...links,
    items: sortedItems,
  };

  const normalizedTrackers: CliCommandsConfigIoNormalizeConfigNormalizedTrackers = [...trackers]
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

  return {
    links: normalizedLinks,
    trackers: normalizedTrackers,
    settings,
  };
}

/**
 * CLI - Commands - Config IO - Save Config.
 *
 * Serializes the configuration object to JSON and writes
 * it to disk so changes persist between CLI sessions.
 *
 * @param {CliCommandsConfigIoSaveConfigConfigPath} configPath - Config path.
 * @param {CliCommandsConfigIoSaveConfigConfig}     config     - Config.
 *
 * @returns {CliCommandsConfigIoSaveConfigReturn}
 *
 * @since 2.0.0
 */
function saveConfig(configPath: CliCommandsConfigIoSaveConfigConfigPath, config: CliCommandsConfigIoSaveConfigConfig): CliCommandsConfigIoSaveConfigReturn {
  const normalizedConfig: CliCommandsConfigIoSaveConfigNormalizedConfig = normalizeConfig(config);

  writeFileSync(configPath, `${JSON.stringify(normalizedConfig, null, 2)}\n`);

  return;
}

export {
  loadConfig,
  normalizeConfig,
  saveConfig,
};
