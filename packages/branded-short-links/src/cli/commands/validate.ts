import { configSchema } from '../../lib/schema.js';
import { loadConfig } from './config-io.js';

import type {
  CliCommandsValidateValidateConfigConfig,
  CliCommandsValidateValidateConfigConfigPath,
  CliCommandsValidateValidateConfigErrors,
  CliCommandsValidateValidateConfigExistingShortcodeCount,
  CliCommandsValidateValidateConfigExistingTrackerCount,
  CliCommandsValidateValidateConfigItems,
  CliCommandsValidateValidateConfigLinks,
  CliCommandsValidateValidateConfigNewShortcodeCount,
  CliCommandsValidateValidateConfigNewTrackerCount,
  CliCommandsValidateValidateConfigParseResult,
  CliCommandsValidateValidateConfigRaw,
  CliCommandsValidateValidateConfigReturn,
  CliCommandsValidateValidateConfigShortcodeCounts,
  CliCommandsValidateValidateConfigShortcodeEntry,
  CliCommandsValidateValidateConfigTrackerEntry,
  CliCommandsValidateValidateConfigTrackerNameCounts,
  CliCommandsValidateValidateConfigTrackers,
} from '../../types/cli/commands/validate.d.ts';

/**
 * CLI - Commands - Validate - Config.
 *
 * Parses and validates a configuration file against the schema,
 * then checks for duplicate shortcodes and tracker names.
 *
 * @since 2.0.0
 */
function validateConfig(configPath: CliCommandsValidateValidateConfigConfigPath): CliCommandsValidateValidateConfigReturn {
  const errors: CliCommandsValidateValidateConfigErrors = [];
  const raw: CliCommandsValidateValidateConfigRaw = loadConfig(configPath);
  const parseResult: CliCommandsValidateValidateConfigParseResult = configSchema.safeParse(raw);

  if (parseResult['success'] === false) {
    for (const issue of parseResult['error']['issues']) {
      errors.push(issue['message']);
    }

    return {
      valid: false, errors,
    };
  }

  const config: CliCommandsValidateValidateConfigConfig = parseResult['data'];
  const shortcodeCounts: CliCommandsValidateValidateConfigShortcodeCounts = new Map<string, number>();

  const links: CliCommandsValidateValidateConfigLinks = config['links'];
  const items: CliCommandsValidateValidateConfigItems = links['items'];

  for (const item of items) {
    const existingCount: CliCommandsValidateValidateConfigExistingShortcodeCount = shortcodeCounts.get(item['shortcode']);
    const newCount: CliCommandsValidateValidateConfigNewShortcodeCount = (existingCount ?? 0) + 1;

    shortcodeCounts.set(item['shortcode'], newCount);
  }

  for (const shortcodeEntry of shortcodeCounts) {
    const shortcode: CliCommandsValidateValidateConfigShortcodeEntry = shortcodeEntry as CliCommandsValidateValidateConfigShortcodeEntry;

    if (shortcode[1] > 1) {
      errors.push(`Duplicate shortcode "${shortcode[0]}" found in links.`);
    }
  }

  const trackerNameCounts: CliCommandsValidateValidateConfigTrackerNameCounts = new Map<string, number>();

  const trackers: CliCommandsValidateValidateConfigTrackers = config['trackers'];

  for (const tracker of trackers) {
    const existingCount: CliCommandsValidateValidateConfigExistingTrackerCount = trackerNameCounts.get(tracker['name']);
    const newCount: CliCommandsValidateValidateConfigNewTrackerCount = (existingCount ?? 0) + 1;

    trackerNameCounts.set(tracker['name'], newCount);
  }

  for (const trackerEntry of trackerNameCounts) {
    const entry: CliCommandsValidateValidateConfigTrackerEntry = trackerEntry as CliCommandsValidateValidateConfigTrackerEntry;

    if (entry[1] > 1) {
      errors.push(`Duplicate tracker name "${entry[0]}" found in trackers.`);
    }
  }

  return {
    valid: errors['length'] === 0, errors,
  };
}

export {
  validateConfig,
};
