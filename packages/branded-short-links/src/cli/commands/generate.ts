import { mkdirSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';

import { Bootstrap } from '@cbnventures/nova/toolkit';

import { configSchema } from '../../lib/schema.js';
import { loadConfig } from './config-io.js';

import type {
  CliCommandsGenerateGenerateWranglerTomlAccountId,
  CliCommandsGenerateGenerateWranglerTomlCompatibilityDate,
  CliCommandsGenerateGenerateWranglerTomlConfig,
  CliCommandsGenerateGenerateWranglerTomlConfigPath,
  CliCommandsGenerateGenerateWranglerTomlDefaultPath,
  CliCommandsGenerateGenerateWranglerTomlLines,
  CliCommandsGenerateGenerateWranglerTomlLinks,
  CliCommandsGenerateGenerateWranglerTomlLinksAsString,
  CliCommandsGenerateGenerateWranglerTomlOutputDir,
  CliCommandsGenerateGenerateWranglerTomlOutputPath,
  CliCommandsGenerateGenerateWranglerTomlProjectRoot,
  CliCommandsGenerateGenerateWranglerTomlReturn,
  CliCommandsGenerateGenerateWranglerTomlSettings,
  CliCommandsGenerateGenerateWranglerTomlSettingsAsString,
  CliCommandsGenerateGenerateWranglerTomlTrackers,
  CliCommandsGenerateGenerateWranglerTomlTrackersAsString,
} from '../../types/cli/commands/generate.d.ts';

const projectRoot: CliCommandsGenerateGenerateWranglerTomlProjectRoot = Bootstrap.getProjectRoot() ?? process.cwd();
const defaultWranglerTomlPath: CliCommandsGenerateGenerateWranglerTomlDefaultPath = resolve(projectRoot, 'wrangler.toml');

/**
 * CLI - Commands - Generate - Wrangler Toml.
 *
 * Builds a Wrangler configuration file from the project config
 * and writes it to the specified output path.
 *
 * @since 2.0.0
 */
function generateWranglerToml(configPath: CliCommandsGenerateGenerateWranglerTomlConfigPath, outputPath: CliCommandsGenerateGenerateWranglerTomlOutputPath = defaultWranglerTomlPath, accountId?: CliCommandsGenerateGenerateWranglerTomlAccountId): CliCommandsGenerateGenerateWranglerTomlReturn {
  const config: CliCommandsGenerateGenerateWranglerTomlConfig = configSchema.parse(loadConfig(configPath));
  const settings: CliCommandsGenerateGenerateWranglerTomlSettings = config['settings'];
  const links: CliCommandsGenerateGenerateWranglerTomlLinks = config['links'];
  const trackers: CliCommandsGenerateGenerateWranglerTomlTrackers = config['trackers'];
  const compatibilityDate: CliCommandsGenerateGenerateWranglerTomlCompatibilityDate = new Date().toISOString().slice(0, 10);

  const settingsAsString: CliCommandsGenerateGenerateWranglerTomlSettingsAsString = JSON.stringify(settings);
  const linksAsString: CliCommandsGenerateGenerateWranglerTomlLinksAsString = JSON.stringify(links);
  const trackersAsString: CliCommandsGenerateGenerateWranglerTomlTrackersAsString = JSON.stringify(trackers);

  const lines: CliCommandsGenerateGenerateWranglerTomlLines = [
    `name = "${settings['worker_name']}"`,
    'main = "packages/branded-short-links/build/src/worker/index.js"',
    `compatibility_date = "${compatibilityDate}"`,
    ...(accountId !== undefined ? [`account_id = "${accountId}"`] : []),
    '',
    '################',
    '#### Routes ####',
    '################',
    'routes = [',
    `  { pattern = "${settings['base_domain']}", custom_domain = true },`,
    ...(settings['base_domain'].split('.').length === 2 ? [`  { pattern = "www.${settings['base_domain']}", custom_domain = true },`] : []),
    ']',
    '',
    '##############',
    '#### Vars ####',
    '##############',
    '[vars]',
    `SETTINGS = ${JSON.stringify(settingsAsString)}`,
    `LINKS = ${JSON.stringify(linksAsString)}`,
    `TRACKERS = ${JSON.stringify(trackersAsString)}`,
  ];

  const outputDir: CliCommandsGenerateGenerateWranglerTomlOutputDir = dirname(outputPath);

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, `${lines.join('\n')}\n`);

  return;
}

export {
  generateWranglerToml,
};
