import { configSchema } from '../../lib/schema.js';
import { loadConfig } from './config-io.js';

import type {
  Cli_Commands_Validate_ValidateConfig_Config,
  Cli_Commands_Validate_ValidateConfig_ConfigPath,
  Cli_Commands_Validate_ValidateConfig_Entry,
  Cli_Commands_Validate_ValidateConfig_Errors,
  Cli_Commands_Validate_ValidateConfig_ExistingShortcodeCount,
  Cli_Commands_Validate_ValidateConfig_ExistingTrackerCount,
  Cli_Commands_Validate_ValidateConfig_Items,
  Cli_Commands_Validate_ValidateConfig_Links,
  Cli_Commands_Validate_ValidateConfig_NewShortcodeCount,
  Cli_Commands_Validate_ValidateConfig_NewTrackerCount,
  Cli_Commands_Validate_ValidateConfig_ParseResult,
  Cli_Commands_Validate_ValidateConfig_Raw,
  Cli_Commands_Validate_ValidateConfig_Returns,
  Cli_Commands_Validate_ValidateConfig_Shortcode,
  Cli_Commands_Validate_ValidateConfig_ShortcodeCounts,
  Cli_Commands_Validate_ValidateConfig_TrackerNameCounts,
  Cli_Commands_Validate_ValidateConfig_Trackers,
} from '../../types/cli/commands/validate.d.ts';

/**
 * CLI - Commands - Validate - Config.
 *
 * Parses and validates a configuration file against the schema,
 * then checks for duplicate shortcodes and tracker names.
 *
 * @param {Cli_Commands_Validate_ValidateConfig_ConfigPath} configPath - Config path.
 *
 * @returns {Cli_Commands_Validate_ValidateConfig_Returns}
 *
 * @since 2.0.0
 */
function validateConfig(configPath: Cli_Commands_Validate_ValidateConfig_ConfigPath): Cli_Commands_Validate_ValidateConfig_Returns {
  const errors: Cli_Commands_Validate_ValidateConfig_Errors = [];
  const raw: Cli_Commands_Validate_ValidateConfig_Raw = loadConfig(configPath);
  const parseResult: Cli_Commands_Validate_ValidateConfig_ParseResult = configSchema.safeParse(raw);

  if (parseResult['success'] === false) {
    for (const issue of parseResult['error']['issues']) {
      errors.push(issue['message']);
    }

    return {
      valid: false,
      errors,
    };
  }

  const config: Cli_Commands_Validate_ValidateConfig_Config = parseResult['data'];
  const shortcodeCounts: Cli_Commands_Validate_ValidateConfig_ShortcodeCounts = new Map<string, number>();

  const links: Cli_Commands_Validate_ValidateConfig_Links = config['links'];
  const items: Cli_Commands_Validate_ValidateConfig_Items = links['items'];

  for (const item of items) {
    const existingShortcodeCount: Cli_Commands_Validate_ValidateConfig_ExistingShortcodeCount = shortcodeCounts.get(item['shortcode']);
    const newShortcodeCount: Cli_Commands_Validate_ValidateConfig_NewShortcodeCount = (existingShortcodeCount ?? 0) + 1;

    shortcodeCounts.set(item['shortcode'], newShortcodeCount);
  }

  for (const shortcodeEntry of shortcodeCounts) {
    const shortcode: Cli_Commands_Validate_ValidateConfig_Shortcode = shortcodeEntry as Cli_Commands_Validate_ValidateConfig_Shortcode;

    if (shortcode[1] > 1) {
      errors.push(`Duplicate shortcode "${shortcode[0]}" found in links.`);
    }
  }

  const trackerNameCounts: Cli_Commands_Validate_ValidateConfig_TrackerNameCounts = new Map<string, number>();

  const trackers: Cli_Commands_Validate_ValidateConfig_Trackers = config['trackers'];

  for (const tracker of trackers) {
    const existingTrackerCount: Cli_Commands_Validate_ValidateConfig_ExistingTrackerCount = trackerNameCounts.get(tracker['name']);
    const newTrackerCount: Cli_Commands_Validate_ValidateConfig_NewTrackerCount = (existingTrackerCount ?? 0) + 1;

    trackerNameCounts.set(tracker['name'], newTrackerCount);
  }

  for (const trackerEntry of trackerNameCounts) {
    const entry: Cli_Commands_Validate_ValidateConfig_Entry = trackerEntry as Cli_Commands_Validate_ValidateConfig_Entry;

    if (entry[1] > 1) {
      errors.push(`Duplicate tracker name "${entry[0]}" found in trackers.`);
    }
  }

  return {
    valid: errors['length'] === 0,
    errors,
  };
}

export {
  validateConfig,
};
