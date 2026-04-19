import { configSchema } from '../../lib/schema.js';
import { loadConfig, saveConfig } from './config-io.js';

import type {
  CliCommandsSettingsGetSettingsConfig,
  CliCommandsSettingsGetSettingsConfigPath,
  CliCommandsSettingsGetSettingsReturn,
  CliCommandsSettingsUpdateSettingsConfig,
  CliCommandsSettingsUpdateSettingsConfigPath,
  CliCommandsSettingsUpdateSettingsReturn,
  CliCommandsSettingsUpdateSettingsUpdates,
} from '../../types/cli/commands/settings.d.ts';

/**
 * CLI - Commands - Settings - Get Settings.
 *
 * Reads the current settings object from the configuration file
 * so callers can inspect or display the active preferences.
 *
 * @param {CliCommandsSettingsGetSettingsConfigPath} configPath - Config path.
 *
 * @returns {CliCommandsSettingsGetSettingsReturn}
 *
 * @since 2.0.0
 */
function getSettings(configPath: CliCommandsSettingsGetSettingsConfigPath): CliCommandsSettingsGetSettingsReturn {
  const config: CliCommandsSettingsGetSettingsConfig = configSchema.parse(loadConfig(configPath));

  return config['settings'];
}

/**
 * CLI - Commands - Settings - Update Settings.
 *
 * Merges partial setting updates into the existing settings object
 * and persists the result back to the configuration file.
 *
 * @param {CliCommandsSettingsUpdateSettingsConfigPath} configPath - Config path.
 * @param {CliCommandsSettingsUpdateSettingsUpdates}    updates    - Updates.
 *
 * @returns {CliCommandsSettingsUpdateSettingsReturn}
 *
 * @since 2.0.0
 */
function updateSettings(configPath: CliCommandsSettingsUpdateSettingsConfigPath, updates: CliCommandsSettingsUpdateSettingsUpdates): CliCommandsSettingsUpdateSettingsReturn {
  const config: CliCommandsSettingsUpdateSettingsConfig = configSchema.parse(loadConfig(configPath));

  Reflect.set(config, 'settings', {
    ...config['settings'], ...updates,
  });

  saveConfig(configPath, config);

  return;
}

export {
  getSettings,
  updateSettings,
};
