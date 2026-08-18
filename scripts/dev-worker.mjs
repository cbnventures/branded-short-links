import { spawn } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

/**
 * Dev Worker - Toolkit.
 *
 * Holds the toolkit namespace once the guarded import resolves so config directory
 * lookups and status output run only after Nova has been built.
 *
 * @type {typeof import('@cbnventures/nova/toolkit') | undefined}
 *
 * @since 2.0.0
 */
let toolkit = undefined;

try {
  toolkit = await import('@cbnventures/nova/toolkit');
} catch {
  process.stderr.write('dev-worker.mjs: requires @cbnventures/nova to be built. Run "npm run build" first.\n');

  process.exit(1);
}

/**
 * Dev Worker - Bootstrap.
 *
 * Holds the Bootstrap toolkit battery so config directory lookups resolve the
 * per-project config location.
 *
 * @since 2.0.0
 */
const bootstrap = toolkit['Bootstrap'];

/**
 * Dev Worker - Logger.
 *
 * Holds the Logger toolkit battery so status output flows through Nova's logger
 * rather than raw stdout writes.
 *
 * @since 2.0.0
 */
const logger = toolkit['Logger'];

/**
 * Dev Worker - Project Root.
 *
 * Absolute path to the repository root, resolved from this file's
 * location so config lookups and generated output land in the right
 * place.
 *
 * @since 2.0.0
 */
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Dev Worker - App Name.
 *
 * Application slug used to resolve the XDG config directory so local
 * and XDG config paths stay consistent with the rest of the toolchain.
 *
 * @since 2.0.0
 */
const APP_NAME = 'branded-short-links';

/**
 * Dev Worker - Prompt Choice.
 *
 * Prompts the developer to pick between the local and XDG wrangler.toml files when
 * both exist, resolving with the chosen path.
 *
 * @param {string} localPath - Local path.
 * @param {string} xdgPath   - Xdg path.
 *
 * @returns {Promise<string>}
 *
 * @since 2.0.0
 */
function promptChoice(localPath, xdgPath) {
  return new Promise((promiseResolve) => {
    const readlineInterface = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    process.stdout.write('\n');
    process.stdout.write('Found wrangler.toml in two locations:\n');
    process.stdout.write(`  1. Local: ${localPath}\n`);
    process.stdout.write(`  2. XDG:   ${xdgPath}\n`);
    process.stdout.write('\n');

    readlineInterface.question('Which one? (1 or 2): ', (answer) => {
      readlineInterface.close();

      const trimmed = answer.trim();

      if (trimmed === '1') {
        logger.info(`Using local wrangler.toml: ${localPath}`);

        promiseResolve(localPath);

        return;
      }

      if (trimmed === '2') {
        logger.info(`Using XDG wrangler.toml: ${xdgPath}`);

        promiseResolve(xdgPath);

        return;
      }

      logger.error('Invalid choice. Exiting.');

      return process.exit(1);
    });

    return;
  });
}

/**
 * Dev Worker - Resolve Config JSON.
 *
 * Searches for config.json in the local directory, project
 * root, and XDG config directory. Returns the first match.
 *
 * @returns {string | undefined}
 *
 * @since 2.0.0
 */
function resolveConfigJson() {
  const localPath = join(projectRoot, 'config.json');
  const xdgPath = join(bootstrap.getConfigDir(APP_NAME), 'config.json');

  if (existsSync(localPath) === true) {
    return localPath;
  }

  if (existsSync(xdgPath) === true) {
    return xdgPath;
  }

  return undefined;
}

/**
 * Dev Worker - Generate Wrangler Toml.
 *
 * Reads config.json and writes a wrangler.toml file
 * with routes and vars derived from the configuration.
 *
 * @param {string} configJsonPath - Config json path.
 * @param {string} outputPath     - Output path.
 *
 * @returns {void}
 *
 * @since 2.0.0
 */
function generateWranglerToml(configJsonPath, outputPath) {
  const config = JSON.parse(readFileSync(configJsonPath, 'utf-8'));
  const settings = config['settings'];
  const links = config['links'];
  const trackers = config['trackers'];
  const compatibilityDate = new Date().toISOString().slice(0, 10);

  const lines = [
    `name = "${settings['worker_name']}"`,
    'main = "packages/branded-short-links/src/worker/index.ts"',
    `compatibility_date = "${compatibilityDate}"`,
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
    `SETTINGS = ${JSON.stringify(JSON.stringify(settings))}`,
    `LINKS = ${JSON.stringify(JSON.stringify(links))}`,
    `TRACKERS = ${JSON.stringify(JSON.stringify(trackers))}`,
  ];

  const outputDir = dirname(outputPath);

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, `${lines.join('\n')}\n`);

  return;
}

/**
 * Dev Worker - Resolve Wrangler Config.
 *
 * Checks for local and XDG wrangler.toml locations.
 * Prompts the developer to choose when both exist.
 *
 * @returns {Promise<string>}
 *
 * @since 2.0.0
 */
async function resolveWranglerConfig() {
  const localPath = join(projectRoot, 'wrangler.toml');
  const xdgPath = join(bootstrap.getConfigDir(APP_NAME), 'wrangler.toml');

  const localExists = existsSync(localPath);
  const xdgExists = existsSync(xdgPath);

  if (localExists === true && xdgExists === true) {
    return promptChoice(localPath, xdgPath);
  }

  if (localExists === true) {
    logger.info(`Using local wrangler.toml: ${localPath}`);

    return localPath;
  }

  if (xdgExists === true) {
    logger.info(`Using XDG wrangler.toml: ${xdgPath}`);

    return xdgPath;
  }

  const configJsonPath = resolveConfigJson();

  if (configJsonPath === undefined) {
    logger.error('No wrangler.toml or config.json found. Copy config.sample.json to config.json and configure it.');

    process.exit(1);
  }

  logger.info(`No wrangler.toml found. Generating from ${configJsonPath}...`);

  generateWranglerToml(configJsonPath, localPath);

  logger.info(`Generated wrangler.toml: ${localPath}`);

  return localPath;
}

// Main.

/**
 * Dev Worker - Config Path.
 *
 * Resolved wrangler config path handed to the dev command so the worker boots from
 * the location the developer selected or the generated file.
 *
 * @since 2.0.0
 */
const configPath = await resolveWranglerConfig();

/**
 * Dev Worker - Wrangler.
 *
 * Child process running the local wrangler dev worker so its exit code can be
 * propagated back to the parent shell on close.
 *
 * @since 2.0.0
 */
const wrangler = spawn('npx', [
  'wrangler',
  'dev',
  '--config',
  configPath,
  '--local-upstream',
  'localhost',
  '--inspector-port=0',
], {
  stdio: 'inherit',
});

wrangler.on('close', (code) => {
  return process.exit(code ?? 1);
});
