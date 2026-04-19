import { spawnSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import { Bootstrap, Logger } from '@cbnventures/nova/toolkit';
import chalk from 'chalk';
import prompts from 'prompts';

import { APP_NAME } from '../../lib/item.js';
import { generateWranglerToml } from './generate.js';
import { getFallbackUrl, listLinks } from './links.js';
import { getSettings } from './settings.js';
import { listTrackers } from './trackers.js';
import { validateConfig } from './validate.js';

import type {
  CliCommandsDeployCloudflareApiBase,
  CliCommandsDeployDeployAccountId,
  CliCommandsDeployDeployConfigPath,
  CliCommandsDeployDeployInteractive,
  CliCommandsDeployDeployProjectRoot,
  CliCommandsDeployDeployResult,
  CliCommandsDeployDeployReturn,
  CliCommandsDeployDeploySettings,
  CliCommandsDeployDeployToken,
  CliCommandsDeployDeployWorkerDeployResult,
  CliCommandsDeployDeployWorkerError,
  CliCommandsDeployDeployWorkerProjectRoot,
  CliCommandsDeployDeployWorkerReturn,
  CliCommandsDeployDeployWorkerWranglerTomlPath,
  CliCommandsDeployDeployWranglerTomlPath,
  CliCommandsDeployEnvFilePath,
  CliCommandsDeployEnvTokenKey,
  CliCommandsDeployGetZoneInfoBaseDomain,
  CliCommandsDeployGetZoneInfoCandidate,
  CliCommandsDeployGetZoneInfoData,
  CliCommandsDeployGetZoneInfoError,
  CliCommandsDeployGetZoneInfoFirstResult,
  CliCommandsDeployGetZoneInfoIndex,
  CliCommandsDeployGetZoneInfoParts,
  CliCommandsDeployGetZoneInfoResponse,
  CliCommandsDeployGetZoneInfoReturn,
  CliCommandsDeployGetZoneInfoToken,
  CliCommandsDeployLoadEnvTokenContent,
  CliCommandsDeployLoadEnvTokenEnvValue,
  CliCommandsDeployLoadEnvTokenMatch,
  CliCommandsDeployLoadEnvTokenRegex,
  CliCommandsDeployLoadEnvTokenReturn,
  CliCommandsDeployLoadEnvTokenValue,
  CliCommandsDeployPrintLinksSummaryConfigPath,
  CliCommandsDeployPrintLinksSummaryFallbackUrl,
  CliCommandsDeployPrintLinksSummaryLinks,
  CliCommandsDeployPrintLinksSummaryReturn,
  CliCommandsDeployPrintLinksSummarySettings,
  CliCommandsDeployPrintLinksSummaryTrackers,
  CliCommandsDeployPromptForApiTokenApiToken,
  CliCommandsDeployPromptForApiTokenPromptResult,
  CliCommandsDeployPromptForApiTokenReturn,
  CliCommandsDeployPromptForApiTokenToken,
  CliCommandsDeployPromptForApiTokenVerifyResult,
  CliCommandsDeployResolveApiTokenEnvToken,
  CliCommandsDeployResolveApiTokenEnvTokenValid,
  CliCommandsDeployResolveApiTokenInteractive,
  CliCommandsDeployResolveApiTokenReturn,
  CliCommandsDeployRunLintError,
  CliCommandsDeployRunLintLintResult,
  CliCommandsDeployRunLintReturn,
  CliCommandsDeploySaveEnvTokenAppended,
  CliCommandsDeploySaveEnvTokenAppendedLines,
  CliCommandsDeploySaveEnvTokenContent,
  CliCommandsDeploySaveEnvTokenNewContent,
  CliCommandsDeploySaveEnvTokenRegex,
  CliCommandsDeploySaveEnvTokenReplaced,
  CliCommandsDeploySaveEnvTokenReturn,
  CliCommandsDeploySaveEnvTokenToken,
  CliCommandsDeployVerifyApiTokenData,
  CliCommandsDeployVerifyApiTokenResponse,
  CliCommandsDeployVerifyApiTokenReturn,
  CliCommandsDeployVerifyApiTokenToken,
  CliCommandsDeployVerifyPermissionsAccountId,
  CliCommandsDeployVerifyPermissionsBaseDomain,
  CliCommandsDeployVerifyPermissionsEmailRoutingData,
  CliCommandsDeployVerifyPermissionsEmailRoutingResponse,
  CliCommandsDeployVerifyPermissionsError,
  CliCommandsDeployVerifyPermissionsHasEmailRouting,
  CliCommandsDeployVerifyPermissionsHasWorkersRoutes,
  CliCommandsDeployVerifyPermissionsHasWorkersScripts,
  CliCommandsDeployVerifyPermissionsInteractive,
  CliCommandsDeployVerifyPermissionsMissing,
  CliCommandsDeployVerifyPermissionsMissingMessage,
  CliCommandsDeployVerifyPermissionsPromptResult,
  CliCommandsDeployVerifyPermissionsReady,
  CliCommandsDeployVerifyPermissionsReturn,
  CliCommandsDeployVerifyPermissionsToken,
  CliCommandsDeployVerifyPermissionsWorkersRoutesData,
  CliCommandsDeployVerifyPermissionsWorkersRoutesResponse,
  CliCommandsDeployVerifyPermissionsWorkersScriptsData,
  CliCommandsDeployVerifyPermissionsWorkersScriptsResponse,
  CliCommandsDeployVerifyPermissionsZoneId,
  CliCommandsDeployVerifyPermissionsZoneInfo,
} from '../../types/cli/commands/deploy.d.ts';

const CLOUDFLARE_API_BASE: CliCommandsDeployCloudflareApiBase = 'https://api.cloudflare.com/client/v4';
const configDir = Bootstrap.getConfigDir(APP_NAME);
const envFilePath: CliCommandsDeployEnvFilePath = resolve(configDir, '.env');
const ENV_TOKEN_KEY: CliCommandsDeployEnvTokenKey = 'CLOUDFLARE_API_TOKEN';

/**
 * CLI - Commands - Deploy.
 *
 * Orchestrates the full deployment workflow by validating config,
 * resolving authentication, and pushing the worker to Cloudflare.
 *
 * @param {CliCommandsDeployDeployConfigPath}  configPath  - Config path.
 * @param {CliCommandsDeployDeployInteractive} interactive - Interactive.
 *
 * @returns {CliCommandsDeployDeployReturn}
 *
 * @since 2.0.0
 */
async function deploy(configPath: CliCommandsDeployDeployConfigPath, interactive: CliCommandsDeployDeployInteractive = false): CliCommandsDeployDeployReturn {
  /* Step 1: Resolve API token. */
  Logger.info('Checking authentication...');

  const token: CliCommandsDeployDeployToken = await resolveApiToken(interactive);

  Reflect.set(process.env, ENV_TOKEN_KEY, token);

  Logger.info('Authenticated.');

  /* Step 2: Validate config. */
  Logger.info('Validating config...');

  const result: CliCommandsDeployDeployResult = validateConfig(configPath);

  if (result['valid'] === false) {
    Logger.error('Config is invalid:');

    for (const error of result['errors']) {
      Logger.error(`  - ${error}`);
    }

    return;
  }

  Logger.info('Config is valid.');

  /* Step 3: Verify permissions. */
  const settings: CliCommandsDeployDeploySettings = getSettings(configPath);

  Logger.info('Verifying API token permissions...');

  const accountId: CliCommandsDeployDeployAccountId = await verifyPermissions(token, settings['base_domain'], interactive);

  Logger.info('Permissions verified.');

  /* Step 4: Generate wrangler.toml. */
  Logger.info('Generating wrangler.toml...');

  const projectRoot: CliCommandsDeployDeployProjectRoot = Bootstrap.getProjectRoot() ?? process.cwd();
  const wranglerTomlPath: CliCommandsDeployDeployWranglerTomlPath = resolve(projectRoot, 'wrangler.toml');

  generateWranglerToml(configPath, wranglerTomlPath, accountId);

  Logger.info('wrangler.toml generated.');

  /* Step 5: Lint. */
  Logger.info('Running lint...');

  runLint();

  Logger.info('Lint passed.');

  /* Step 6: Deploy worker. */
  Logger.info('Deploying worker...');

  deployWorker();

  Logger.info('Worker deployed.');

  /* Step 7: Print links summary. */
  printLinksSummary(configPath);

  /* Step 8: Done. */
  Logger.info('Deploy complete.');

  return;
}

/**
 * CLI - Commands - Deploy - Worker.
 *
 * Invokes the Wrangler CLI to deploy the built worker script
 * to Cloudflare using the generated configuration file.
 *
 * @returns {CliCommandsDeployDeployWorkerReturn}
 *
 * @since 2.0.0
 */
function deployWorker(): CliCommandsDeployDeployWorkerReturn {
  const projectRoot: CliCommandsDeployDeployWorkerProjectRoot = Bootstrap.getProjectRoot() ?? process.cwd();
  const wranglerTomlPath: CliCommandsDeployDeployWorkerWranglerTomlPath = resolve(projectRoot, 'wrangler.toml');

  const deployResult: CliCommandsDeployDeployWorkerDeployResult = spawnSync('npx', [
    'wrangler',
    'deploy',
    '--config',
    wranglerTomlPath,
  ], {
    encoding: 'utf-8',
    stdio: 'inherit',
  });

  if (deployResult['status'] !== 0) {
    const deployError: CliCommandsDeployDeployWorkerError = new Error('Worker deployment failed.');

    throw deployError;
  }

  return;
}

/**
 * CLI - Commands - Deploy - Get Zone Info.
 *
 * Queries the Cloudflare API to locate the zone matching
 * the base domain by trying progressively shorter segments.
 *
 * @param {CliCommandsDeployGetZoneInfoToken}      token      - Token.
 * @param {CliCommandsDeployGetZoneInfoBaseDomain} baseDomain - Base domain.
 *
 * @returns {CliCommandsDeployGetZoneInfoReturn}
 *
 * @since 2.0.0
 */
async function getZoneInfo(token: CliCommandsDeployGetZoneInfoToken, baseDomain: CliCommandsDeployGetZoneInfoBaseDomain): CliCommandsDeployGetZoneInfoReturn {
  const parts: CliCommandsDeployGetZoneInfoParts = baseDomain.split('.');
  let i: CliCommandsDeployGetZoneInfoIndex = 0;

  while (i < parts['length'] - 1) {
    const candidate: CliCommandsDeployGetZoneInfoCandidate = parts.slice(i).join('.');

    const response: CliCommandsDeployGetZoneInfoResponse = await fetch(`${CLOUDFLARE_API_BASE}/zones?name=${candidate}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data: CliCommandsDeployGetZoneInfoData = await response.json<CliCommandsDeployGetZoneInfoData>();

    const firstResult: CliCommandsDeployGetZoneInfoFirstResult = data['result'][0];

    if (
      data['success'] === true
      && data['result']['length'] > 0
      && firstResult !== undefined
    ) {
      return {
        zoneId: firstResult['id'], accountId: firstResult['account']['id'], zoneName: firstResult['name'],
      };
    }

    i += 1;
  }

  const zoneError: CliCommandsDeployGetZoneInfoError = new Error(`Failed to find Cloudflare zone for "${baseDomain}". Is the domain added to your Cloudflare account?`);

  throw zoneError;
}

/**
 * CLI - Commands - Deploy - Load Env Token.
 *
 * Reads the local environment file and extracts the stored
 * Cloudflare API token if one is present.
 *
 * @returns {CliCommandsDeployLoadEnvTokenReturn}
 *
 * @since 2.0.0
 */
function loadEnvToken(): CliCommandsDeployLoadEnvTokenReturn {
  const envValue: CliCommandsDeployLoadEnvTokenEnvValue = process.env[ENV_TOKEN_KEY];

  if (envValue !== undefined && envValue !== '') {
    return envValue;
  }

  if (existsSync(envFilePath) === false) {
    return undefined;
  }

  const content: CliCommandsDeployLoadEnvTokenContent = readFileSync(envFilePath, 'utf-8');
  const envTokenRegex: CliCommandsDeployLoadEnvTokenRegex = new RegExp(`${ENV_TOKEN_KEY}=["']?([^\\s"']+)["']?`);
  const match: CliCommandsDeployLoadEnvTokenMatch = content.match(envTokenRegex);

  if (
    match === null
    || match[1] === undefined
  ) {
    return undefined;
  }

  const value: CliCommandsDeployLoadEnvTokenValue = match[1].trim();

  return (value !== '') ? value : undefined;
}

/**
 * CLI - Commands - Deploy - Print Links Summary.
 *
 * Displays a formatted overview of all configured shortcodes,
 * their redirect targets, and active trackers.
 *
 * @param {CliCommandsDeployPrintLinksSummaryConfigPath} configPath - Config path.
 *
 * @returns {CliCommandsDeployPrintLinksSummaryReturn}
 *
 * @since 2.0.0
 */
function printLinksSummary(configPath: CliCommandsDeployPrintLinksSummaryConfigPath): CliCommandsDeployPrintLinksSummaryReturn {
  const links: CliCommandsDeployPrintLinksSummaryLinks = listLinks(configPath);
  const trackers: CliCommandsDeployPrintLinksSummaryTrackers = listTrackers(configPath);
  const settings: CliCommandsDeployPrintLinksSummarySettings = getSettings(configPath);
  const fallbackUrl: CliCommandsDeployPrintLinksSummaryFallbackUrl = getFallbackUrl(configPath);

  process.stdout.write('\n');

  process.stdout.write(`${chalk.bold('Links summary:')}\n`);

  process.stdout.write('\n');

  process.stdout.write(`  Fallback URL: ${chalk.green(fallbackUrl)}\n`);

  process.stdout.write('\n');

  if (links['length'] === 0) {
    process.stdout.write(`  ${chalk.gray('No shortcodes configured.')}\n`);
  } else {
    for (const link of links) {
      process.stdout.write(`  ${chalk.cyan(link['shortcode'])}\n`);

      process.stdout.write(`    URL:      ${chalk.green(`https://${settings['base_domain']}${link['shortcode']}`)}\n`);

      process.stdout.write(`    Redirect: ${link['redirect_url']} ${chalk.gray(`(${String(link['http_response'])})`)}\n`);
    }
  }

  process.stdout.write('\n');

  if (trackers['length'] === 0) {
    process.stdout.write(`  ${chalk.gray('No trackers configured.')}\n`);
  } else {
    process.stdout.write(`  ${chalk.bold('Trackers:')}\n`);

    for (const tracker of trackers) {
      process.stdout.write(`    - ${chalk.cyan(tracker['name'])} ${chalk.gray(`(${tracker['type']})`)}\n`);
    }
  }

  process.stdout.write('\n');

  return;
}

/**
 * CLI - Commands - Deploy - Prompt For API Token.
 *
 * Guides the user through creating a Cloudflare API token
 * and validates it before saving to the environment file.
 *
 * @returns {CliCommandsDeployPromptForApiTokenReturn}
 *
 * @since 2.0.0
 */
async function promptForApiToken(): CliCommandsDeployPromptForApiTokenReturn {
  Logger.info('');

  Logger.info('You need a Cloudflare API token to deploy.');

  Logger.info('');

  Logger.info('  1. Go to https://dash.cloudflare.com/profile/api-tokens');

  Logger.info('  2. Click "Create Token"');

  Logger.info('  3. Under "Custom token", click "Get started"');

  Logger.info('  4. Name the token (e.g. "Branded Short Links")');

  Logger.info('  5. Under Permissions, add the following (use "+ Add more" for each):');

  Logger.info('     - Account | Workers Scripts | Edit');

  Logger.info('     - Zone | Workers Routes | Edit');

  Logger.info('     - Zone | Email Routing Rules | Edit');

  Logger.info('  6. Under Account Resources, select your account');

  Logger.info('  7. Under Zone Resources, select Specific zone → your base domain');

  Logger.info('  8. Click "Continue to summary" then "Create Token"');

  Logger.info('  9. Copy the generated token');

  Logger.info('');

  const promptResult: CliCommandsDeployPromptForApiTokenPromptResult = await prompts({
    type: 'password',
    name: 'apiToken',
    message: 'Paste your API token:',
    validate: (value) => {
      return value.trim()['length'] > 0 || 'Token is required';
    },
  });

  const apiToken: CliCommandsDeployPromptForApiTokenApiToken = promptResult['apiToken'];

  if (apiToken === undefined) {
    throw new Error('API token is required to deploy.');
  }

  const token: CliCommandsDeployPromptForApiTokenToken = apiToken.trim();

  const verifyResult: CliCommandsDeployPromptForApiTokenVerifyResult = await verifyApiToken(token);

  if (verifyResult === false) {
    throw new Error('API token is invalid. Please check the token and try again.');
  }

  saveEnvToken(token);

  Logger.info('API token saved to .env file.');

  return token;
}

/**
 * CLI - Commands - Deploy - Resolve API Token.
 *
 * Checks for an existing token in the environment file and
 * falls back to interactive prompting when necessary.
 *
 * @param {CliCommandsDeployResolveApiTokenInteractive} interactive - Interactive.
 *
 * @returns {CliCommandsDeployResolveApiTokenReturn}
 *
 * @since 2.0.0
 */
async function resolveApiToken(interactive: CliCommandsDeployResolveApiTokenInteractive): CliCommandsDeployResolveApiTokenReturn {
  const envToken: CliCommandsDeployResolveApiTokenEnvToken = loadEnvToken();

  if (envToken !== undefined) {
    const envTokenValid: CliCommandsDeployResolveApiTokenEnvTokenValid = await verifyApiToken(envToken);

    if (envTokenValid === true) {
      return envToken;
    }

    if (interactive === false) {
      throw new Error('API token in .env is invalid or expired. Update the CLOUDFLARE_API_TOKEN value in your .env file.');
    }

    Logger.warn('Saved API token in .env is invalid or expired.');
  } else {
    if (interactive === false) {
      throw new Error('No API token found. Create a .env file with CLOUDFLARE_API_TOKEN=<your-token> or run "npm run manage" for guided setup.');
    }

    Logger.warn('No API token found. Let\'s set one up.');
  }

  return promptForApiToken();
}

/**
 * CLI - Commands - Deploy - Run Lint.
 *
 * Executes the project linter via a spawned process and
 * throws if any lint violations are detected.
 *
 * @returns {CliCommandsDeployRunLintReturn}
 *
 * @since 2.0.0
 */
function runLint(): CliCommandsDeployRunLintReturn {
  const lintResult: CliCommandsDeployRunLintLintResult = spawnSync('npx', [
    'eslint',
    './src',
  ], {
    encoding: 'utf-8',
    stdio: 'inherit',
  });

  if (lintResult['status'] !== 0) {
    const lintError: CliCommandsDeployRunLintError = new Error('Lint failed.');

    throw lintError;
  }

  return;
}

/**
 * CLI - Commands - Deploy - Save Env Token.
 *
 * Persists the Cloudflare API token to the local environment
 * file, updating an existing entry or appending a new one.
 *
 * @param {CliCommandsDeploySaveEnvTokenToken} token - Token.
 *
 * @returns {CliCommandsDeploySaveEnvTokenReturn}
 *
 * @since 2.0.0
 */
function saveEnvToken(token: CliCommandsDeploySaveEnvTokenToken): CliCommandsDeploySaveEnvTokenReturn {
  if (existsSync(envFilePath) === true) {
    const content: CliCommandsDeploySaveEnvTokenContent = readFileSync(envFilePath, 'utf-8');
    const regex: CliCommandsDeploySaveEnvTokenRegex = new RegExp(`^${ENV_TOKEN_KEY}=.*$`, 'm');

    if (regex.test(content) === true) {
      const replaced: CliCommandsDeploySaveEnvTokenReplaced = content.replace(regex, `${ENV_TOKEN_KEY}=${token}`);

      writeFileSync(envFilePath, replaced);
    } else {
      const appendedLines: CliCommandsDeploySaveEnvTokenAppendedLines = [
        content.trimEnd(),
        `${ENV_TOKEN_KEY}=${token}`,
        '',
      ];

      const appended: CliCommandsDeploySaveEnvTokenAppended = appendedLines.join('\n');

      writeFileSync(envFilePath, appended);
    }
  } else {
    const newContent: CliCommandsDeploySaveEnvTokenNewContent = `${ENV_TOKEN_KEY}=${token}\n`;

    writeFileSync(envFilePath, newContent);
  }

  return;
}

/**
 * CLI - Commands - Deploy - Verify API Token.
 *
 * Sends a verification request to the Cloudflare API to
 * confirm whether the provided token is valid and active.
 *
 * @param {CliCommandsDeployVerifyApiTokenToken} token - Token.
 *
 * @returns {CliCommandsDeployVerifyApiTokenReturn}
 *
 * @since 2.0.0
 */
async function verifyApiToken(token: CliCommandsDeployVerifyApiTokenToken): CliCommandsDeployVerifyApiTokenReturn {
  try {
    const response: CliCommandsDeployVerifyApiTokenResponse = await fetch(`${CLOUDFLARE_API_BASE}/user/tokens/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data: CliCommandsDeployVerifyApiTokenData = await response.json<CliCommandsDeployVerifyApiTokenData>();

    return data['success'];
  } catch {
    return false;
  }
}

/**
 * CLI - Commands - Deploy - Verify Permissions.
 *
 * Checks that the API token has the required Cloudflare
 * permissions for Workers, Routes, and Email Routing.
 *
 * @param {CliCommandsDeployVerifyPermissionsToken}       token       - Token.
 * @param {CliCommandsDeployVerifyPermissionsBaseDomain}  baseDomain  - Base domain.
 * @param {CliCommandsDeployVerifyPermissionsInteractive} interactive - Interactive.
 *
 * @returns {CliCommandsDeployVerifyPermissionsReturn}
 *
 * @since 2.0.0
 */
async function verifyPermissions(token: CliCommandsDeployVerifyPermissionsToken, baseDomain: CliCommandsDeployVerifyPermissionsBaseDomain, interactive: CliCommandsDeployVerifyPermissionsInteractive): CliCommandsDeployVerifyPermissionsReturn {
  const zoneInfo: CliCommandsDeployVerifyPermissionsZoneInfo = await getZoneInfo(token, baseDomain);
  const zoneId: CliCommandsDeployVerifyPermissionsZoneId = zoneInfo['zoneId'];
  const accountId: CliCommandsDeployVerifyPermissionsAccountId = zoneInfo['accountId'];

  /* Check Workers Scripts (Account level). */
  let hasWorkersScripts: CliCommandsDeployVerifyPermissionsHasWorkersScripts = false;

  try {
    const workersScriptsResponse: CliCommandsDeployVerifyPermissionsWorkersScriptsResponse = await fetch(`${CLOUDFLARE_API_BASE}/accounts/${accountId}/workers/scripts`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const workersScriptsData: CliCommandsDeployVerifyPermissionsWorkersScriptsData = await workersScriptsResponse.json<CliCommandsDeployVerifyPermissionsWorkersScriptsData>();

    hasWorkersScripts = workersScriptsData['success'];
  } catch {
    hasWorkersScripts = false;
  }

  /* Check Workers Routes (Zone level). */
  let hasWorkersRoutes: CliCommandsDeployVerifyPermissionsHasWorkersRoutes = false;

  try {
    const workersRoutesResponse: CliCommandsDeployVerifyPermissionsWorkersRoutesResponse = await fetch(`${CLOUDFLARE_API_BASE}/zones/${zoneId}/workers/routes`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const workersRoutesData: CliCommandsDeployVerifyPermissionsWorkersRoutesData = await workersRoutesResponse.json<CliCommandsDeployVerifyPermissionsWorkersRoutesData>();

    hasWorkersRoutes = workersRoutesData['success'];
  } catch {
    hasWorkersRoutes = false;
  }

  /*
   * Check Email Routing Rules (Zone level).
   * Required because the zone has email routing enabled (shared with ntfy-reverse-proxy).
   */
  let hasEmailRouting: CliCommandsDeployVerifyPermissionsHasEmailRouting = false;

  try {
    const emailRoutingResponse: CliCommandsDeployVerifyPermissionsEmailRoutingResponse = await fetch(`${CLOUDFLARE_API_BASE}/zones/${zoneId}/email/routing/rules`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const emailRoutingData: CliCommandsDeployVerifyPermissionsEmailRoutingData = await emailRoutingResponse.json<CliCommandsDeployVerifyPermissionsEmailRoutingData>();

    hasEmailRouting = emailRoutingData['success'];
  } catch {
    hasEmailRouting = false;
  }

  const missing: CliCommandsDeployVerifyPermissionsMissing = [];

  if (hasWorkersScripts === false) {
    missing.push('Account > Workers Scripts > Edit');
  }

  if (hasWorkersRoutes === false) {
    missing.push('Zone > Workers Routes > Edit');
  }

  if (hasEmailRouting === false) {
    missing.push('Zone > Email Routing Rules > Edit');
  }

  if (missing['length'] === 0) {
    return accountId;
  }

  if (interactive === false) {
    const missingMessage: CliCommandsDeployVerifyPermissionsMissingMessage = [
      'API token is missing permissions:',
      ...missing.map((permission) => `  - ${permission}`),
      '',
      'Update your token at https://dash.cloudflare.com/profile/api-tokens',
    ].join('\n');

    const permissionsError: CliCommandsDeployVerifyPermissionsError = new Error(missingMessage);

    throw permissionsError;
  }

  Logger.warn('API token is missing the following permissions:');

  Logger.warn('');

  for (const permission of missing) {
    Logger.warn(`  - ${permission}`);
  }

  Logger.warn('');

  Logger.info('  1. Go to https://dash.cloudflare.com/profile/api-tokens');

  Logger.info('  2. Find your token → ... → Edit');

  Logger.info('  3. Add the missing permissions listed above');

  Logger.info('  4. Click "Continue to summary" then "Update Token"');

  Logger.info('');

  const promptResult: CliCommandsDeployVerifyPermissionsPromptResult = await prompts({
    type: 'confirm',
    name: 'ready',
    message: 'Done? Press enter to retry.',
    initial: true,
  });

  const ready: CliCommandsDeployVerifyPermissionsReady = promptResult['ready'];

  if (ready !== true) {
    throw new Error('Deploy cancelled. Please update your API token permissions and try again.');
  }

  return verifyPermissions(token, baseDomain, interactive);
}

export {
  deploy,
};
