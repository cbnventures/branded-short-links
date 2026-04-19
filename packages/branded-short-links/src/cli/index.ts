#!/usr/bin/env node
import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

import { Bootstrap, Logger } from '@cbnventures/nova/toolkit';
import { Command } from 'commander';

import { APP_NAME } from '../lib/item.js';
import { deploy } from './commands/deploy.js';
import { generateWranglerToml } from './commands/generate.js';
import { removeLink } from './commands/links.js';
import { removeTracker } from './commands/trackers.js';
import { validateConfig } from './commands/validate.js';
import { interactiveMenu } from './menu/interactive.js';

import type {
  CliConfigDir,
  CliConfigPath,
  CliEnvDir,
  CliGetConfigFilePathReturn,
  CliIndexProgram,
  CliMainCatchError,
  CliMainConfigDirs,
  CliMainConfigPath,
  CliMainLinksCommand,
  CliMainLinksRemoveShortcode,
  CliMainReturn,
  CliMainTrackersCommand,
  CliMainTrackersRemoveName,
  CliMainValidateResult,
  CliSamplePath,
} from '../types/cli/index.d.ts';

const envDir: CliEnvDir = Bootstrap.resolveFileDir(APP_NAME, '.env', [
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
 * @since 2.0.0
 */
function getConfigFilePath(): CliGetConfigFilePathReturn {
  const configDir: CliConfigDir = Bootstrap.resolveFileDir(APP_NAME, 'config.json', [
    'cwd',
    'project-root',
    'config-dir',
  ]);

  if (configDir !== undefined) {
    return join(configDir, 'config.json');
  }

  const defaultDir: CliConfigPath = Bootstrap.getConfigDir(APP_NAME);
  const configPath: CliConfigPath = join(defaultDir, 'config.json');
  const samplePath: CliSamplePath = join(defaultDir, 'config.sample.json');

  if (existsSync(configPath) === false && existsSync(samplePath) === true) {
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
const program: CliIndexProgram = new Command();

program.name('branded-short-links').alias('bsl').description('CLI management tool for Branded Short Links').version('2.0.0');

/**
 * CLI - Main.
 *
 * Entry point that registers all subcommands and parses arguments.
 * Falls back to the interactive menu when no arguments are provided.
 *
 * @since 2.0.0
 */
async function main(): CliMainReturn {
  if (process.argv['length'] <= 2) {
    const configDirs: CliMainConfigDirs = Bootstrap.resolveFileDirs(APP_NAME, 'config.json', [
      'cwd',
      'project-root',
      'config-dir',
    ]);

    await interactiveMenu(configDirs);

    return;
  }

  const configPath: CliMainConfigPath = getConfigFilePath();

  const linksCommand: CliMainLinksCommand = new Command('links').description('Manage links');

  linksCommand
    .command('remove <shortcode>')
    .description('Remove a link by shortcode')
    .action((shortcode: CliMainLinksRemoveShortcode) => {
      removeLink(configPath, shortcode);

      Logger.info(`Link "${shortcode}" removed.`);

      return;
    });

  const trackersCommand: CliMainTrackersCommand = new Command('trackers').description('Manage trackers');

  trackersCommand
    .command('remove <name>')
    .description('Remove a tracker by name')
    .action((name: CliMainTrackersRemoveName) => {
      removeTracker(configPath, name);

      Logger.info(`Tracker "${name}" removed.`);

      return;
    });

  program.addCommand(linksCommand);
  program.addCommand(trackersCommand);

  program
    .command('validate')
    .description('Validate config')
    .action(() => {
      const result: CliMainValidateResult = validateConfig(configPath);

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
        Logger.error(error instanceof Error ? error['message'] : String(error));

        process.exitCode = 1;
      }

      return;
    });

  program.parse(process.argv);

  return;
}

main().catch((error: CliMainCatchError) => {
  Logger.error(error instanceof Error ? error['message'] : String(error));

  process.exitCode = 1;

  return;
});

export {
  program,
};
