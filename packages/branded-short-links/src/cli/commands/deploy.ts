import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

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
  Cli_Commands_Deploy_CloudflareApiBase,
  Cli_Commands_Deploy_ConfigDir,
  Cli_Commands_Deploy_Deploy_AccountId,
  Cli_Commands_Deploy_Deploy_ConfigPath,
  Cli_Commands_Deploy_Deploy_Interactive,
  Cli_Commands_Deploy_Deploy_ProjectRoot,
  Cli_Commands_Deploy_Deploy_Result,
  Cli_Commands_Deploy_Deploy_Returns,
  Cli_Commands_Deploy_Deploy_Settings,
  Cli_Commands_Deploy_Deploy_Token,
  Cli_Commands_Deploy_Deploy_WranglerTomlPath,
  Cli_Commands_Deploy_DeployWorker_DeployError,
  Cli_Commands_Deploy_DeployWorker_DeployResult,
  Cli_Commands_Deploy_DeployWorker_ProjectRoot,
  Cli_Commands_Deploy_DeployWorker_Returns,
  Cli_Commands_Deploy_DeployWorker_WranglerTomlPath,
  Cli_Commands_Deploy_EnvFilePath,
  Cli_Commands_Deploy_EnvTokenKey,
  Cli_Commands_Deploy_GetZoneInfo_BaseDomain,
  Cli_Commands_Deploy_GetZoneInfo_Candidate,
  Cli_Commands_Deploy_GetZoneInfo_Data,
  Cli_Commands_Deploy_GetZoneInfo_FirstResult,
  Cli_Commands_Deploy_GetZoneInfo_I,
  Cli_Commands_Deploy_GetZoneInfo_Parts,
  Cli_Commands_Deploy_GetZoneInfo_Response,
  Cli_Commands_Deploy_GetZoneInfo_Returns,
  Cli_Commands_Deploy_GetZoneInfo_Token,
  Cli_Commands_Deploy_GetZoneInfo_ZoneError,
  Cli_Commands_Deploy_LoadEnvToken_Content,
  Cli_Commands_Deploy_LoadEnvToken_EnvTokenRegex,
  Cli_Commands_Deploy_LoadEnvToken_EnvValue,
  Cli_Commands_Deploy_LoadEnvToken_Match,
  Cli_Commands_Deploy_LoadEnvToken_Returns,
  Cli_Commands_Deploy_LoadEnvToken_Value,
  Cli_Commands_Deploy_PrintLinksSummary_ConfigPath,
  Cli_Commands_Deploy_PrintLinksSummary_FallbackUrl,
  Cli_Commands_Deploy_PrintLinksSummary_Links,
  Cli_Commands_Deploy_PrintLinksSummary_Returns,
  Cli_Commands_Deploy_PrintLinksSummary_Settings,
  Cli_Commands_Deploy_PrintLinksSummary_Trackers,
  Cli_Commands_Deploy_PromptForApiToken_ApiToken,
  Cli_Commands_Deploy_PromptForApiToken_PromptResult,
  Cli_Commands_Deploy_PromptForApiToken_Returns,
  Cli_Commands_Deploy_PromptForApiToken_Token,
  Cli_Commands_Deploy_PromptForApiToken_VerifyResult,
  Cli_Commands_Deploy_ResolveApiToken_EnvToken,
  Cli_Commands_Deploy_ResolveApiToken_EnvTokenValid,
  Cli_Commands_Deploy_ResolveApiToken_Interactive,
  Cli_Commands_Deploy_ResolveApiToken_Returns,
  Cli_Commands_Deploy_RunLint_LintError,
  Cli_Commands_Deploy_RunLint_LintResult,
  Cli_Commands_Deploy_RunLint_Returns,
  Cli_Commands_Deploy_SaveEnvToken_Appended,
  Cli_Commands_Deploy_SaveEnvToken_AppendedLines,
  Cli_Commands_Deploy_SaveEnvToken_Content,
  Cli_Commands_Deploy_SaveEnvToken_NewContent,
  Cli_Commands_Deploy_SaveEnvToken_Regex,
  Cli_Commands_Deploy_SaveEnvToken_Replaced,
  Cli_Commands_Deploy_SaveEnvToken_Returns,
  Cli_Commands_Deploy_SaveEnvToken_Token,
  Cli_Commands_Deploy_VerifyApiToken_Data,
  Cli_Commands_Deploy_VerifyApiToken_Response,
  Cli_Commands_Deploy_VerifyApiToken_Returns,
  Cli_Commands_Deploy_VerifyApiToken_Token,
  Cli_Commands_Deploy_VerifyPermissions_AccountId,
  Cli_Commands_Deploy_VerifyPermissions_BaseDomain,
  Cli_Commands_Deploy_VerifyPermissions_EmailRoutingData,
  Cli_Commands_Deploy_VerifyPermissions_EmailRoutingResponse,
  Cli_Commands_Deploy_VerifyPermissions_HasEmailRouting,
  Cli_Commands_Deploy_VerifyPermissions_HasWorkersRoutes,
  Cli_Commands_Deploy_VerifyPermissions_HasWorkersScripts,
  Cli_Commands_Deploy_VerifyPermissions_Interactive,
  Cli_Commands_Deploy_VerifyPermissions_Missing,
  Cli_Commands_Deploy_VerifyPermissions_MissingMessage,
  Cli_Commands_Deploy_VerifyPermissions_PermissionsError,
  Cli_Commands_Deploy_VerifyPermissions_PromptResult,
  Cli_Commands_Deploy_VerifyPermissions_Ready,
  Cli_Commands_Deploy_VerifyPermissions_Returns,
  Cli_Commands_Deploy_VerifyPermissions_Token,
  Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesData,
  Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesResponse,
  Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsData,
  Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsResponse,
  Cli_Commands_Deploy_VerifyPermissions_ZoneId,
  Cli_Commands_Deploy_VerifyPermissions_ZoneInfo,
} from '../../types/cli/commands/deploy.d.ts';

/**
 * CLI - Commands - Deploy - Cloudflare API Base.
 *
 * Base URL for all Cloudflare REST API requests made during
 * the deployment and permission verification workflow.
 *
 * @since 2.0.3
 */
const cloudflareApiBase: Cli_Commands_Deploy_CloudflareApiBase = 'https://api.cloudflare.com/client/v4';

/**
 * CLI - Commands - Deploy - Config Dir.
 *
 * Absolute path to the resolved XDG config directory used
 * as the base for the local environment file.
 *
 * @since 2.0.3
 */
const configDir: Cli_Commands_Deploy_ConfigDir = Bootstrap.getConfigDir(APP_NAME);

/**
 * CLI - Commands - Deploy - Env File Path.
 *
 * Absolute path to the local environment file storing the
 * persisted Cloudflare API token between deploys.
 *
 * @since 2.0.3
 */
const envFilePath: Cli_Commands_Deploy_EnvFilePath = resolve(configDir, '.env');

/**
 * CLI - Commands - Deploy - Env Token Key.
 *
 * Environment variable name under which the Cloudflare API
 * token is read from and written to the environment file.
 *
 * @since 2.0.3
 */
const envTokenKey: Cli_Commands_Deploy_EnvTokenKey = 'CLOUDFLARE_API_TOKEN';

/**
 * CLI - Commands - Deploy.
 *
 * Orchestrates the full deployment workflow by validating config,
 * resolving authentication, and pushing the worker to Cloudflare.
 *
 * @param {Cli_Commands_Deploy_Deploy_ConfigPath}  configPath  - Config path.
 * @param {Cli_Commands_Deploy_Deploy_Interactive} interactive - Interactive.
 *
 * @returns {Cli_Commands_Deploy_Deploy_Returns}
 *
 * @since 2.0.0
 */
async function deploy(configPath: Cli_Commands_Deploy_Deploy_ConfigPath, interactive: Cli_Commands_Deploy_Deploy_Interactive = false): Cli_Commands_Deploy_Deploy_Returns {
  /* Step 1: Resolve API token. */
  Logger.info('Checking authentication...');

  const token: Cli_Commands_Deploy_Deploy_Token = await resolveApiToken(interactive);

  Reflect.set(process.env, envTokenKey, token);

  Logger.info('Authenticated.');

  /* Step 2: Validate config. */
  Logger.info('Validating config...');

  const result: Cli_Commands_Deploy_Deploy_Result = validateConfig(configPath);

  if (result['valid'] === false) {
    Logger.error('Config is invalid:');

    for (const error of result['errors']) {
      Logger.error(`  - ${error}`);
    }

    return;
  }

  Logger.info('Config is valid.');

  /* Step 3: Verify permissions. */
  const settings: Cli_Commands_Deploy_Deploy_Settings = getSettings(configPath);

  Logger.info('Verifying API token permissions...');

  const accountId: Cli_Commands_Deploy_Deploy_AccountId = await verifyPermissions(token, settings['base_domain'], interactive);

  Logger.info('Permissions verified.');

  /* Step 4: Generate wrangler.toml. */
  Logger.info('Generating wrangler.toml...');

  const projectRoot: Cli_Commands_Deploy_Deploy_ProjectRoot = Bootstrap.getProjectRoot() ?? process.cwd();
  const wranglerTomlPath: Cli_Commands_Deploy_Deploy_WranglerTomlPath = resolve(projectRoot, 'wrangler.toml');

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
 * @returns {Cli_Commands_Deploy_DeployWorker_Returns}
 *
 * @since 2.0.0
 */
function deployWorker(): Cli_Commands_Deploy_DeployWorker_Returns {
  const projectRoot: Cli_Commands_Deploy_DeployWorker_ProjectRoot = Bootstrap.getProjectRoot() ?? process.cwd();
  const wranglerTomlPath: Cli_Commands_Deploy_DeployWorker_WranglerTomlPath = resolve(projectRoot, 'wrangler.toml');

  const deployResult: Cli_Commands_Deploy_DeployWorker_DeployResult = spawnSync('npx', [
    'wrangler',
    'deploy',
    '--config',
    wranglerTomlPath,
  ], {
    encoding: 'utf-8',
    stdio: 'inherit',
  });

  if (deployResult['status'] !== 0) {
    const deployError: Cli_Commands_Deploy_DeployWorker_DeployError = new Error('Worker deployment failed.');

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
 * @param {Cli_Commands_Deploy_GetZoneInfo_Token}      token      - Token.
 * @param {Cli_Commands_Deploy_GetZoneInfo_BaseDomain} baseDomain - Base domain.
 *
 * @returns {Cli_Commands_Deploy_GetZoneInfo_Returns}
 *
 * @since 2.0.0
 */
async function getZoneInfo(token: Cli_Commands_Deploy_GetZoneInfo_Token, baseDomain: Cli_Commands_Deploy_GetZoneInfo_BaseDomain): Cli_Commands_Deploy_GetZoneInfo_Returns {
  const parts: Cli_Commands_Deploy_GetZoneInfo_Parts = baseDomain.split('.');
  let i: Cli_Commands_Deploy_GetZoneInfo_I = 0;

  while (i < parts['length'] - 1) {
    const candidate: Cli_Commands_Deploy_GetZoneInfo_Candidate = parts.slice(i).join('.');

    const response: Cli_Commands_Deploy_GetZoneInfo_Response = await fetch(`${cloudflareApiBase}/zones?name=${candidate}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data: Cli_Commands_Deploy_GetZoneInfo_Data = await response.json<Cli_Commands_Deploy_GetZoneInfo_Data>();

    const firstResult: Cli_Commands_Deploy_GetZoneInfo_FirstResult = data['result'][0];

    if (
      data['success'] === true
      && data['result']['length'] > 0
      && firstResult !== undefined
    ) {
      return {
        zoneId: firstResult['id'],
        accountId: firstResult['account']['id'],
        zoneName: firstResult['name'],
      };
    }

    i += 1;
  }

  const zoneError: Cli_Commands_Deploy_GetZoneInfo_ZoneError = new Error(`Failed to find Cloudflare zone for "${baseDomain}". Is the domain added to your Cloudflare account?`);

  throw zoneError;
}

/**
 * CLI - Commands - Deploy - Load Env Token.
 *
 * Reads the local environment file and extracts the stored
 * Cloudflare API token if one is present.
 *
 * @returns {Cli_Commands_Deploy_LoadEnvToken_Returns}
 *
 * @since 2.0.0
 */
function loadEnvToken(): Cli_Commands_Deploy_LoadEnvToken_Returns {
  const envValue: Cli_Commands_Deploy_LoadEnvToken_EnvValue = process.env[envTokenKey];

  if (envValue !== undefined && envValue !== '') {
    return envValue;
  }

  if (existsSync(envFilePath) === false) {
    return undefined;
  }

  const content: Cli_Commands_Deploy_LoadEnvToken_Content = readFileSync(envFilePath, 'utf-8');
  const envTokenRegex: Cli_Commands_Deploy_LoadEnvToken_EnvTokenRegex = new RegExp(`${envTokenKey}=["']?([^\\s"']+)["']?`);
  const match: Cli_Commands_Deploy_LoadEnvToken_Match = content.match(envTokenRegex);

  if (
    match === null
    || match[1] === undefined
  ) {
    return undefined;
  }

  const value: Cli_Commands_Deploy_LoadEnvToken_Value = match[1].trim();

  return (value !== '') ? value : undefined;
}

/**
 * CLI - Commands - Deploy - Print Links Summary.
 *
 * Displays a formatted overview of all configured shortcodes,
 * their redirect targets, and active trackers.
 *
 * @param {Cli_Commands_Deploy_PrintLinksSummary_ConfigPath} configPath - Config path.
 *
 * @returns {Cli_Commands_Deploy_PrintLinksSummary_Returns}
 *
 * @since 2.0.3
 */
function printLinksSummary(configPath: Cli_Commands_Deploy_PrintLinksSummary_ConfigPath): Cli_Commands_Deploy_PrintLinksSummary_Returns {
  const links: Cli_Commands_Deploy_PrintLinksSummary_Links = listLinks(configPath);
  const trackers: Cli_Commands_Deploy_PrintLinksSummary_Trackers = listTrackers(configPath);
  const settings: Cli_Commands_Deploy_PrintLinksSummary_Settings = getSettings(configPath);
  const fallbackUrl: Cli_Commands_Deploy_PrintLinksSummary_FallbackUrl = getFallbackUrl(configPath);

  process.stdout.write('\n');

  process.stdout.write(`${chalk.bold('Links summary:')}\n`);

  process.stdout.write('\n');

  process.stdout.write(`  Fallback URL: ${chalk.green(fallbackUrl ?? 'Not configured')}\n`);

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
 * @returns {Cli_Commands_Deploy_PromptForApiToken_Returns}
 *
 * @since 2.0.0
 */
async function promptForApiToken(): Cli_Commands_Deploy_PromptForApiToken_Returns {
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

  const promptResult: Cli_Commands_Deploy_PromptForApiToken_PromptResult = await prompts({
    type: 'password',
    name: 'apiToken',
    message: 'Paste your API token:',
    validate: (value) => {
      return value.trim()['length'] > 0 || 'Token is required';
    },
  });

  const apiToken: Cli_Commands_Deploy_PromptForApiToken_ApiToken = promptResult['apiToken'];

  if (apiToken === undefined) {
    throw new Error('API token is required to deploy.');
  }

  const token: Cli_Commands_Deploy_PromptForApiToken_Token = apiToken.trim();

  const verifyResult: Cli_Commands_Deploy_PromptForApiToken_VerifyResult = await verifyApiToken(token);

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
 * @param {Cli_Commands_Deploy_ResolveApiToken_Interactive} interactive - Interactive.
 *
 * @returns {Cli_Commands_Deploy_ResolveApiToken_Returns}
 *
 * @since 2.0.0
 */
async function resolveApiToken(interactive: Cli_Commands_Deploy_ResolveApiToken_Interactive): Cli_Commands_Deploy_ResolveApiToken_Returns {
  const envToken: Cli_Commands_Deploy_ResolveApiToken_EnvToken = loadEnvToken();

  if (envToken !== undefined) {
    const envTokenValid: Cli_Commands_Deploy_ResolveApiToken_EnvTokenValid = await verifyApiToken(envToken);

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
 * @returns {Cli_Commands_Deploy_RunLint_Returns}
 *
 * @since 2.0.0
 */
function runLint(): Cli_Commands_Deploy_RunLint_Returns {
  const lintResult: Cli_Commands_Deploy_RunLint_LintResult = spawnSync('npx', [
    'eslint',
    './src',
  ], {
    encoding: 'utf-8',
    stdio: 'inherit',
  });

  if (lintResult['status'] !== 0) {
    const lintError: Cli_Commands_Deploy_RunLint_LintError = new Error('Lint failed.');

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
 * @param {Cli_Commands_Deploy_SaveEnvToken_Token} token - Token.
 *
 * @returns {Cli_Commands_Deploy_SaveEnvToken_Returns}
 *
 * @since 2.0.0
 */
function saveEnvToken(token: Cli_Commands_Deploy_SaveEnvToken_Token): Cli_Commands_Deploy_SaveEnvToken_Returns {
  if (existsSync(envFilePath) === true) {
    const content: Cli_Commands_Deploy_SaveEnvToken_Content = readFileSync(envFilePath, 'utf-8');
    const regex: Cli_Commands_Deploy_SaveEnvToken_Regex = new RegExp(`^${envTokenKey}=.*$`, 'm');

    if (regex.test(content) === true) {
      const replaced: Cli_Commands_Deploy_SaveEnvToken_Replaced = content.replace(regex, () => `${envTokenKey}=${token}`);

      writeFileSync(envFilePath, replaced);
    } else {
      const appendedLines: Cli_Commands_Deploy_SaveEnvToken_AppendedLines = [
        content.trimEnd(),
        `${envTokenKey}=${token}`,
        '',
      ];

      const appended: Cli_Commands_Deploy_SaveEnvToken_Appended = appendedLines.join('\n');

      writeFileSync(envFilePath, appended);
    }
  } else {
    const newContent: Cli_Commands_Deploy_SaveEnvToken_NewContent = `${envTokenKey}=${token}\n`;

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
 * @param {Cli_Commands_Deploy_VerifyApiToken_Token} token - Token.
 *
 * @returns {Cli_Commands_Deploy_VerifyApiToken_Returns}
 *
 * @since 2.0.0
 */
async function verifyApiToken(token: Cli_Commands_Deploy_VerifyApiToken_Token): Cli_Commands_Deploy_VerifyApiToken_Returns {
  try {
    const response: Cli_Commands_Deploy_VerifyApiToken_Response = await fetch(`${cloudflareApiBase}/user/tokens/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data: Cli_Commands_Deploy_VerifyApiToken_Data = await response.json<Cli_Commands_Deploy_VerifyApiToken_Data>();

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
 * @param {Cli_Commands_Deploy_VerifyPermissions_Token}       token       - Token.
 * @param {Cli_Commands_Deploy_VerifyPermissions_BaseDomain}  baseDomain  - Base domain.
 * @param {Cli_Commands_Deploy_VerifyPermissions_Interactive} interactive - Interactive.
 *
 * @returns {Cli_Commands_Deploy_VerifyPermissions_Returns}
 *
 * @since 2.0.0
 */
async function verifyPermissions(token: Cli_Commands_Deploy_VerifyPermissions_Token, baseDomain: Cli_Commands_Deploy_VerifyPermissions_BaseDomain, interactive: Cli_Commands_Deploy_VerifyPermissions_Interactive): Cli_Commands_Deploy_VerifyPermissions_Returns {
  const zoneInfo: Cli_Commands_Deploy_VerifyPermissions_ZoneInfo = await getZoneInfo(token, baseDomain);
  const zoneId: Cli_Commands_Deploy_VerifyPermissions_ZoneId = zoneInfo['zoneId'];
  const accountId: Cli_Commands_Deploy_VerifyPermissions_AccountId = zoneInfo['accountId'];

  /* Check Workers Scripts (Account level). */
  let hasWorkersScripts: Cli_Commands_Deploy_VerifyPermissions_HasWorkersScripts = false;

  try {
    const workersScriptsResponse: Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsResponse = await fetch(`${cloudflareApiBase}/accounts/${accountId}/workers/scripts`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const workersScriptsData: Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsData = await workersScriptsResponse.json<Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsData>();

    hasWorkersScripts = workersScriptsData['success'];
  } catch {
    hasWorkersScripts = false;
  }

  /* Check Workers Routes (Zone level). */
  let hasWorkersRoutes: Cli_Commands_Deploy_VerifyPermissions_HasWorkersRoutes = false;

  try {
    const workersRoutesResponse: Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesResponse = await fetch(`${cloudflareApiBase}/zones/${zoneId}/workers/routes`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const workersRoutesData: Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesData = await workersRoutesResponse.json<Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesData>();

    hasWorkersRoutes = workersRoutesData['success'];
  } catch {
    hasWorkersRoutes = false;
  }

  /*
   * Check Email Routing Rules (Zone level).
   * Required because the zone has email routing enabled (shared with ntfy-reverse-proxy).
   */
  let hasEmailRouting: Cli_Commands_Deploy_VerifyPermissions_HasEmailRouting = false;

  try {
    const emailRoutingResponse: Cli_Commands_Deploy_VerifyPermissions_EmailRoutingResponse = await fetch(`${cloudflareApiBase}/zones/${zoneId}/email/routing/rules`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const emailRoutingData: Cli_Commands_Deploy_VerifyPermissions_EmailRoutingData = await emailRoutingResponse.json<Cli_Commands_Deploy_VerifyPermissions_EmailRoutingData>();

    hasEmailRouting = emailRoutingData['success'];
  } catch {
    hasEmailRouting = false;
  }

  const missing: Cli_Commands_Deploy_VerifyPermissions_Missing = [];

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
    const missingMessage: Cli_Commands_Deploy_VerifyPermissions_MissingMessage = [
      'API token is missing permissions:',
      ...missing.map((permission) => `  - ${permission}`),
      '',
      'Update your token at https://dash.cloudflare.com/profile/api-tokens',
    ].join('\n');

    const permissionsError: Cli_Commands_Deploy_VerifyPermissions_PermissionsError = new Error(missingMessage);

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

  const promptResult: Cli_Commands_Deploy_VerifyPermissions_PromptResult = await prompts({
    type: 'confirm',
    name: 'ready',
    message: 'Done? Press enter to retry.',
    initial: true,
  });

  const ready: Cli_Commands_Deploy_VerifyPermissions_Ready = promptResult['ready'];

  if (ready !== true) {
    throw new Error('Deploy cancelled. Please update your API token permissions and try again.');
  }

  return verifyPermissions(token, baseDomain, interactive);
}

export {
  deploy,
  loadEnvToken,
  printLinksSummary,
  saveEnvToken,
};
