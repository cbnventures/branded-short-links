import { mkdirSync, writeFileSync } from 'node:fs';
import {
  dirname, relative, resolve, sep,
} from 'node:path';

import { Bootstrap } from '@cbnventures/nova/toolkit';

import { getWorkerEntryPath } from '../../lib/package-runtime.js';
import { configSchema } from '../../lib/schema.js';
import { loadConfig } from './config-io.js';

import type {
  Cli_Commands_Generate_DefaultWranglerTomlPath,
  Cli_Commands_Generate_GenerateWranglerToml_AccountId,
  Cli_Commands_Generate_GenerateWranglerToml_CompatibilityDate,
  Cli_Commands_Generate_GenerateWranglerToml_Config,
  Cli_Commands_Generate_GenerateWranglerToml_ConfigPath,
  Cli_Commands_Generate_GenerateWranglerToml_Lines,
  Cli_Commands_Generate_GenerateWranglerToml_Links,
  Cli_Commands_Generate_GenerateWranglerToml_LinksAsString,
  Cli_Commands_Generate_GenerateWranglerToml_OutputDir,
  Cli_Commands_Generate_GenerateWranglerToml_OutputPath,
  Cli_Commands_Generate_GenerateWranglerToml_Returns,
  Cli_Commands_Generate_GenerateWranglerToml_Settings,
  Cli_Commands_Generate_GenerateWranglerToml_SettingsAsString,
  Cli_Commands_Generate_GenerateWranglerToml_Trackers,
  Cli_Commands_Generate_GenerateWranglerToml_TrackersAsString,
  Cli_Commands_Generate_GenerateWranglerToml_WorkerEntryConfigPath,
  Cli_Commands_Generate_GenerateWranglerToml_WorkerEntryPath,
  Cli_Commands_Generate_GenerateWranglerToml_WorkerEntryRelativePath,
  Cli_Commands_Generate_GenerateWranglerToml_WorkerEntryToml,
  Cli_Commands_Generate_ProjectRoot,
} from '../../types/cli/commands/generate.d.ts';

/**
 * CLI - Commands - Generate - Project Root.
 *
 * Absolute path to the resolved project root used as the base
 * for locating the default Wrangler configuration output.
 *
 * @since 2.0.3
 */
const projectRoot: Cli_Commands_Generate_ProjectRoot = Bootstrap.getProjectRoot() ?? process.cwd();

/**
 * CLI - Commands - Generate - Default Wrangler Toml Path.
 *
 * Absolute path where the generated Wrangler configuration file
 * is written when no explicit output path is supplied.
 *
 * @since 2.0.3
 */
const defaultWranglerTomlPath: Cli_Commands_Generate_DefaultWranglerTomlPath = resolve(projectRoot, 'wrangler.toml');

/**
 * CLI - Commands - Generate - Wrangler Toml.
 *
 * Builds a Wrangler configuration file from the project config
 * and writes it to the specified output path.
 *
 * @param {Cli_Commands_Generate_GenerateWranglerToml_ConfigPath} configPath  - Config path.
 * @param {Cli_Commands_Generate_GenerateWranglerToml_OutputPath} outputPath  - Output path.
 * @param {Cli_Commands_Generate_GenerateWranglerToml_AccountId}  [accountId] - Account id.
 *
 * @returns {Cli_Commands_Generate_GenerateWranglerToml_Returns}
 *
 * @since 2.0.0
 */
function generateWranglerToml(configPath: Cli_Commands_Generate_GenerateWranglerToml_ConfigPath, outputPath: Cli_Commands_Generate_GenerateWranglerToml_OutputPath = defaultWranglerTomlPath, accountId?: Cli_Commands_Generate_GenerateWranglerToml_AccountId): Cli_Commands_Generate_GenerateWranglerToml_Returns {
  const config: Cli_Commands_Generate_GenerateWranglerToml_Config = configSchema.parse(loadConfig(configPath));
  const settings: Cli_Commands_Generate_GenerateWranglerToml_Settings = config['settings'];
  const links: Cli_Commands_Generate_GenerateWranglerToml_Links = config['links'];
  const trackers: Cli_Commands_Generate_GenerateWranglerToml_Trackers = config['trackers'];
  const compatibilityDate: Cli_Commands_Generate_GenerateWranglerToml_CompatibilityDate = new Date().toISOString().slice(0, 10);
  const outputDir: Cli_Commands_Generate_GenerateWranglerToml_OutputDir = dirname(outputPath);
  const workerEntryPath: Cli_Commands_Generate_GenerateWranglerToml_WorkerEntryPath = getWorkerEntryPath();
  const workerEntryRelativePath: Cli_Commands_Generate_GenerateWranglerToml_WorkerEntryRelativePath = relative(outputDir, workerEntryPath);
  const workerEntryConfigPath: Cli_Commands_Generate_GenerateWranglerToml_WorkerEntryConfigPath = workerEntryRelativePath.split(sep).join('/');
  const workerEntryToml: Cli_Commands_Generate_GenerateWranglerToml_WorkerEntryToml = JSON.stringify(workerEntryConfigPath);

  const settingsAsString: Cli_Commands_Generate_GenerateWranglerToml_SettingsAsString = JSON.stringify(settings);
  const linksAsString: Cli_Commands_Generate_GenerateWranglerToml_LinksAsString = JSON.stringify(links);
  const trackersAsString: Cli_Commands_Generate_GenerateWranglerToml_TrackersAsString = JSON.stringify(trackers);

  const lines: Cli_Commands_Generate_GenerateWranglerToml_Lines = [
    `name = "${settings['worker_name']}"`,
    `main = ${workerEntryToml}`,
    `compatibility_date = "${compatibilityDate}"`,
    ...((accountId !== undefined) ? [`account_id = "${accountId}"`] : []),
    '',
    '################',
    '#### Routes ####',
    '################',
    'routes = [',
    `  { pattern = "${settings['base_domain']}", custom_domain = true },`,
    ...((settings['base_domain'].split('.').length === 2) ? [`  { pattern = "www.${settings['base_domain']}", custom_domain = true },`] : []),
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

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, `${lines.join('\n')}\n`);

  return;
}

export {
  generateWranglerToml,
};
