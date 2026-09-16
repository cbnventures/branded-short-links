#!/usr/bin/env node
import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

import { Bootstrap, Logger } from '@cbnventures/nova/toolkit';
import { Command } from 'commander';

import { APP_NAME } from '../lib/item.js';
import { getConfigSamplePath, getPackageVersion } from '../lib/package-runtime.js';
import { deploy } from './commands/deploy.js';
import { generateWranglerToml } from './commands/generate.js';
import { removeLink } from './commands/links.js';
import { removeTracker } from './commands/trackers.js';
import { validateConfig } from './commands/validate.js';
import { interactiveMenu } from './menu/interactive.js';

import type {
  Cli_Index_EnvDir,
  Cli_Index_GetConfigFilePath_ConfigDir,
  Cli_Index_GetConfigFilePath_ConfigPath,
  Cli_Index_GetConfigFilePath_DefaultDir,
  Cli_Index_GetConfigFilePath_Returns,
  Cli_Index_GetConfigFilePath_SamplePath,
  Cli_Index_Main_ConfigDirs,
  Cli_Index_Main_ConfigPath,
  Cli_Index_Main_LinksCommand,
  Cli_Index_Main_Result,
  Cli_Index_Main_Returns,
  Cli_Index_Main_TrackersCommand,
  Cli_Index_Main_TypedName,
  Cli_Index_Main_TypedShortcode,
  Cli_Index_Program,
} from '../types/cli/index.d.ts';

/**
 * CLI - Env Dir.
 *
 * Directory containing the environment file, resolved by searching
 * the working directory, project root, and config directory.
 *
 * @since 2.0.3
 */
const envDir: Cli_Index_EnvDir = Bootstrap.resolveFileDir(APP_NAME, '.env', [
  'cwd',
  'project-root',
  'config-dir',
]);

if (envDir !== undefined) {
  Bootstrap.loadEnv(envDir);
}

/**
 * CLI - Get Config File Path.
 *
 * Resolves the configuration file path and copies the sample
 * config into place when no config file exists yet.
 *
 * @returns {Cli_Index_GetConfigFilePath_Returns}
 *
 * @since 2.0.0
 */
function getConfigFilePath(): Cli_Index_GetConfigFilePath_Returns {
  const configDir: Cli_Index_GetConfigFilePath_ConfigDir = Bootstrap.resolveFileDir(APP_NAME, 'config.json', [
    'cwd',
    'project-root',
    'config-dir',
  ]);

  if (configDir !== undefined) {
    return join(configDir, 'config.json');
  }

  const defaultDir: Cli_Index_GetConfigFilePath_DefaultDir = Bootstrap.getConfigDir(APP_NAME);
  const configPath: Cli_Index_GetConfigFilePath_ConfigPath = join(defaultDir, 'config.json');
  const samplePath: Cli_Index_GetConfigFilePath_SamplePath = getConfigSamplePath();

  if (existsSync(configPath) === false) {
    copyFileSync(samplePath, configPath);
  }

  return configPath;
}

/**
 * CLI - Program.
 *
 * Creates and configures the top-level Commander program instance.
 * Registers the CLI name, alias, description, and version metadata.
 *
 * @since 2.0.0
 */
const program: Cli_Index_Program = new Command();

program.name('branded-short-links').alias('bsl').description('CLI management tool for Branded Short Links').version(getPackageVersion());

/**
 * CLI - Main.
 *
 * Entry point that registers all subcommands and parses arguments.
 * Falls back to the interactive menu when no arguments are provided.
 *
 * @returns {Cli_Index_Main_Returns}
 *
 * @since 2.0.0
 */
async function main(): Cli_Index_Main_Returns {
  if (process.argv['length'] <= 2) {
    getConfigFilePath();

    const configDirs: Cli_Index_Main_ConfigDirs = Bootstrap.resolveFileDirs(APP_NAME, 'config.json', [
      'cwd',
      'project-root',
      'config-dir',
    ]);

    await interactiveMenu(configDirs);

    return;
  }

  const configPath: Cli_Index_Main_ConfigPath = getConfigFilePath();

  const linksCommand: Cli_Index_Main_LinksCommand = new Command('links').description('Manage links');

  linksCommand
    .command('remove <shortcode>')
    .description('Remove a link by shortcode')
    .action((shortcode) => {
      const typedShortcode: Cli_Index_Main_TypedShortcode = shortcode;

      removeLink(configPath, typedShortcode);

      Logger.info(`Link "${typedShortcode}" removed.`);

      return;
    });

  const trackersCommand: Cli_Index_Main_TrackersCommand = new Command('trackers').description('Manage trackers');

  trackersCommand
    .command('remove <name>')
    .description('Remove a tracker by name')
    .action((name) => {
      const typedName: Cli_Index_Main_TypedName = name;

      removeTracker(configPath, typedName);

      Logger.info(`Tracker "${typedName}" removed.`);

      return;
    });

  program.addCommand(linksCommand);
  program.addCommand(trackersCommand);

  program
    .command('validate')
    .description('Validate config')
    .action(() => {
      const result: Cli_Index_Main_Result = validateConfig(configPath);

      if (result['valid'] === true) {
        Logger.info('Config is valid.');
      } else {
        Logger.error('Config is invalid:');

        for (const error of result['errors']) {
          Logger.error(`  - ${error}`);
        }
      }

      return;
    });

  program
    .command('generate')
    .description('Generate wrangler.toml')
    .action(() => {
      generateWranglerToml(configPath);

      Logger.info('wrangler.toml generated successfully.');

      return;
    });

  program
    .command('deploy')
    .description('Deploy to Cloudflare Workers')
    .action(async () => {
      try {
        await deploy(configPath, false);
      } catch (error) {
        Logger.error((error instanceof Error) ? error['message'] : String(error));

        process.exitCode = 1;
      }

      return;
    });

  program.parse(process.argv);

  return;
}

main().catch((error) => {
  Logger.error((error instanceof Error) ? error['message'] : String(error));

  process.exitCode = 1;

  return;
});

export {
  program,
};
