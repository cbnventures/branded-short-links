import { configSchema } from '../../lib/schema.js';
import { loadConfig, saveConfig } from './config-io.js';

import type {
  Cli_Commands_Settings_GetSettings_Config,
  Cli_Commands_Settings_GetSettings_ConfigPath,
  Cli_Commands_Settings_GetSettings_Returns,
  Cli_Commands_Settings_UpdateSettings_Config,
  Cli_Commands_Settings_UpdateSettings_ConfigPath,
  Cli_Commands_Settings_UpdateSettings_Returns,
  Cli_Commands_Settings_UpdateSettings_Updates,
} from '../../types/cli/commands/settings.d.ts';

/**
 * CLI - Commands - Settings - Get Settings.
 *
 * Reads the current settings object from the configuration file
 * so callers can inspect or display the active preferences.
 *
 * @param {Cli_Commands_Settings_GetSettings_ConfigPath} configPath - Config path.
 *
 * @returns {Cli_Commands_Settings_GetSettings_Returns}
 *
 * @since 2.0.0
 */
function getSettings(configPath: Cli_Commands_Settings_GetSettings_ConfigPath): Cli_Commands_Settings_GetSettings_Returns {
  const config: Cli_Commands_Settings_GetSettings_Config = configSchema.parse(loadConfig(configPath));

  return config['settings'];
}

/**
 * CLI - Commands - Settings - Update Settings.
 *
 * Merges partial setting updates into the existing settings object
 * and persists the result back to the configuration file.
 *
 * @param {Cli_Commands_Settings_UpdateSettings_ConfigPath} configPath - Config path.
 * @param {Cli_Commands_Settings_UpdateSettings_Updates}    updates    - Updates.
 *
 * @returns {Cli_Commands_Settings_UpdateSettings_Returns}
 *
 * @since 2.0.0
 */
function updateSettings(configPath: Cli_Commands_Settings_UpdateSettings_ConfigPath, updates: Cli_Commands_Settings_UpdateSettings_Updates): Cli_Commands_Settings_UpdateSettings_Returns {
  const config: Cli_Commands_Settings_UpdateSettings_Config = configSchema.parse(loadConfig(configPath));

  Reflect.set(config, 'settings', {
    ...config['settings'],
    ...updates,
  });

  saveConfig(configPath, config);

  return;
}

export {
  getSettings,
  updateSettings,
};
