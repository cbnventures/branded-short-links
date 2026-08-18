import { spawn } from 'node:child_process';
import {
  appendFileSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';

import prompts from 'prompts';

import { PATTERN_CLOUDFLARE_API_TOKEN } from './lib/regex.mjs';

/**
 * Tail Logs - Toolkit.
 *
 * Holds the nova toolkit namespace after the guarded import resolves so config
 * discovery and status output run only after Nova has been built.
 *
 * @type {typeof import('@cbnventures/nova/toolkit') | undefined}
 *
 * @since 2.0.0
 */
let toolkit = undefined;

try {
  toolkit = await import('@cbnventures/nova/toolkit');
} catch {
  process.stderr.write('tail-logs.mjs: requires @cbnventures/nova to be built. Run "npm run build" first.\n');

  process.exit(1);
}

/**
 * Tail Logs - Bootstrap.
 *
 * Holds the nova toolkit Bootstrap battery so config discovery can locate the
 * per-project config directory.
 *
 * @since 2.0.0
 */
const bootstrap = toolkit['Bootstrap'];

/**
 * Tail Logs - Logger.
 *
 * Holds the nova toolkit Logger battery so status and error output share the
 * toolkit formatting.
 *
 * @since 2.0.0
 */
const logger = toolkit['Logger'];

/**
 * Tail Logs - Output File.
 *
 * Names the newline-delimited JSONL sink each streamed tail entry is appended to
 * so captured worker logs survive across restarts.
 *
 * @since 2.0.0
 */
const OUTPUT_FILE = 'tail-logs.jsonl';

/**
 * Tail Logs - Cloudflare API Base.
 *
 * Base URL for the Cloudflare v4 REST API used to resolve the account and manage
 * tail sessions out of band from wrangler.
 *
 * @since 2.0.0
 */
const CLOUDFLARE_API_BASE = 'https://api.cloudflare.com/client/v4';

/**
 * Tail Logs - Restart Buffer Milliseconds.
 *
 * Lead time before a tail session expires at which wrangler is restarted so the
 * stream never lapses during the handover.
 *
 * @since 2.0.0
 */
const RESTART_BUFFER_MILLISECONDS = 300_000; // Restart 5 min before expiry.

/**
 * Tail Logs - Discovered Config.
 *
 * Describes a config.json candidate found during discovery, carrying the resolved
 * file path and the worker identity fields needed to start a tail session.
 *
 * @typedef {{ path: string, workerName: string, baseDomain: string }} DiscoveredConfig
 *
 * @since 2.0.0
 */

/**
 * Tail Logs - Tail Session.
 *
 * Represents a single active tail session returned by the Cloudflare API,
 * carrying the session identifier and its ISO-8601 expiry timestamp.
 *
 * @typedef {{ id: string, expires_at: string }} TailSession
 *
 * @since 2.0.0
 */

/**
 * Tail Logs - Load Token.
 *
 * Reads the CLOUDFLARE_API_TOKEN out of the local .env so the script can call the
 * Cloudflare API, exiting when the token is absent.
 *
 * @returns {string}
 *
 * @since 2.0.0
 */
function loadToken() {
  try {
    const env = readFileSync('.env', 'utf-8');
    const match = env.match(PATTERN_CLOUDFLARE_API_TOKEN);

    if (
      match !== null
      && match[1] !== undefined
      && match[1] !== ''
    ) {
      return match[1];
    }
  } catch {
    // Ignore.
  }

  logger.error('Missing CLOUDFLARE_API_TOKEN in .env');

  process.exit(1);
}

/**
 * Tail Logs - Find Project Root.
 *
 * Walks up from the working directory looking for a package.json that declares
 * workspaces so config discovery can anchor on the monorepo root.
 *
 * @returns {string | undefined}
 *
 * @since 2.0.0
 */
function findProjectRoot() {
  let dir = process.cwd();

  while (dir !== dirname(dir)) {
    const pkgPath = join(dir, 'package.json');

    if (existsSync(pkgPath) === true) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

        if (pkg.workspaces !== undefined) {
          return dir;
        }
      } catch {
        // Ignore.
      }
    }

    dir = dirname(dir);
  }

  return undefined;
}

/**
 * Tail Logs - Discover Configs.
 *
 * Searches cwd, project root, and config dir for config.json
 * files, matching the same strategy as the manage CLI.
 *
 * @returns {DiscoveredConfig[]}
 *
 * @since 2.0.0
 */
function discoverConfigs() {
  const candidates = [
    process.cwd(),
    findProjectRoot(),
    bootstrap.getConfigDir('branded-short-links'),
  ];

  const seen = new Set();
  const found = [];

  for (const dir of candidates) {
    if (dir === undefined) {
      continue;
    }

    const resolved = resolve(dir);

    if (seen.has(resolved) === true) {
      continue;
    }

    seen.add(resolved);

    const configPath = join(resolved, 'config.json');

    if (existsSync(configPath) === true) {
      try {
        const config = JSON.parse(readFileSync(configPath, 'utf-8'));
        const settings = config.settings ?? {};
        const hasWorkerName = Boolean(settings.worker_name);
        const hasBaseDomain = Boolean(settings.base_domain);

        if (hasWorkerName === true && hasBaseDomain === true) {
          found.push({
            path: configPath,
            workerName: settings.worker_name,
            baseDomain: settings.base_domain,
          });
        }
      } catch {
        // Ignore malformed configs.
      }
    }
  }

  return found;
}

/**
 * Tail Logs - Choose Config.
 *
 * Discovers candidate configs and prompts the user to pick one when several
 * match, exiting when none are found or the prompt is cancelled.
 *
 * @returns {Promise<DiscoveredConfig>}
 *
 * @since 2.0.0
 */
async function chooseConfig() {
  const configs = discoverConfigs();

  if (configs.length === 0) {
    logger.error('No config.json found with worker_name and base_domain in settings.');

    process.exit(1);
  }

  if (configs.length === 1) {
    return /** @type {DiscoveredConfig} */ (configs[0]);
  }

  const response = await prompts({
    type: 'select',
    name: 'config',
    message: 'Which worker?',
    choices: configs.map((cfg) => ({
      title: `${cfg['workerName']} (${cfg['path']})`,
      value: cfg,
    })),
  });

  if (response.config === undefined) {
    process.exit(0);
  }

  return response.config;
}

/**
 * Tail Logs - Get Account ID.
 *
 * Resolves the Cloudflare account id for the config's base domain by querying the
 * zones endpoint so tail-session calls can be scoped correctly.
 *
 * @param {string} token      - Token.
 * @param {string} baseDomain - Base domain.
 *
 * @returns {Promise<string>}
 *
 * @since 2.0.0
 */
async function getAccountId(token, baseDomain) {
  const parts = baseDomain.split('.');
  const domain = parts.slice(-2).join('.');
  const response = await fetch(`${CLOUDFLARE_API_BASE}/zones?name=${domain}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = /** @type {{ success: boolean, result: { account: { id: string } }[] }} */ (await response.json());

  if (data['success'] === true && data['result'].length > 0) {
    const zone = data['result'][0];

    if (zone !== undefined) {
      return zone['account']['id'];
    }
  }

  throw new Error(`Failed to find account for ${domain}`);
}

/**
 * Tail Logs - Get Tail Sessions.
 *
 * Lists the worker's active tail sessions through the Cloudflare API so the
 * caller can inspect expiry times or clean up leftovers.
 *
 * @param {string} token      - Token.
 * @param {string} accountId  - Account id.
 * @param {string} scriptName - Script name.
 *
 * @returns {Promise<TailSession[]>}
 *
 * @since 2.0.0
 */
async function getTailSessions(token, accountId, scriptName) {
  const response = await fetch(`${CLOUDFLARE_API_BASE}/accounts/${accountId}/workers/scripts/${scriptName}/tails`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = /** @type {{ success: boolean, result: { id: string, expires_at: string }[] }} */ (await response.json());

  if (data['success'] === true) {
    return data['result'];
  }

  return [];
}

/**
 * Tail Logs - Delete Tail Session.
 *
 * Deletes a single tail session by id through the Cloudflare API so stale
 * sessions do not accumulate against the worker's limit.
 *
 * @param {string} token      - Token.
 * @param {string} accountId  - Account id.
 * @param {string} id         - Id.
 * @param {string} scriptName - Script name.
 *
 * @returns {Promise<void>}
 *
 * @since 2.0.0
 */
async function deleteTailSession(token, accountId, id, scriptName) {
  await fetch(`${CLOUDFLARE_API_BASE}/accounts/${accountId}/workers/scripts/${scriptName}/tails/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  return;
}

/**
 * Tail Logs - ANSI Colors.
 *
 * Wraps strings in ANSI escape codes for colored terminal output so the log
 * stream stays readable without a formatting dependency.
 *
 * @since 2.0.0
 */
const ansiColors = {
  dim: (/** @type {string} */ text) => `\x1b[2m${text}\x1b[0m`,
  bold: (/** @type {string} */ text) => `\x1b[1m${text}\x1b[0m`,
  green: (/** @type {string} */ text) => `\x1b[32m${text}\x1b[0m`,
  red: (/** @type {string} */ text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (/** @type {string} */ text) => `\x1b[33m${text}\x1b[0m`,
  cyan: (/** @type {string} */ text) => `\x1b[36m${text}\x1b[0m`,
  magenta: (/** @type {string} */ text) => `\x1b[35m${text}\x1b[0m`,
  blue: (/** @type {string} */ text) => `\x1b[34m${text}\x1b[0m`,
};

/**
 * Tail Logs - Last Section.
 *
 * Tracks the section of the previously written line so the logger can insert a
 * blank separator only when the section changes.
 *
 * @type {string | null}
 *
 * @since 2.0.0
 */
let lastSection = null;

/**
 * Tail Logs - Log Section.
 *
 * Writes a line to stdout, inserting a blank separator whenever the section
 * changes or repeats for traffic so grouped output stays scannable.
 *
 * @param {string} section - Section.
 * @param {string} message - Message.
 *
 * @returns {void}
 *
 * @since 2.0.0
 */
function logSection(section, message) {
  if (
    lastSection !== null
    && (
      lastSection !== section
      || section === 'traffic'
    )
  ) {
    process.stdout.write('\n');
  }

  process.stdout.write(`${message}\n`);

  lastSection = section;

  return;
}

/**
 * Tail Logs - Cleanup Stale Sessions.
 *
 * Removes every leftover tail session for the worker before a new run so the
 * account's concurrent-session cap is never exhausted.
 *
 * @param {string} token      - Token.
 * @param {string} accountId  - Account id.
 * @param {string} scriptName - Script name.
 *
 * @returns {Promise<void>}
 *
 * @since 2.0.0
 */
async function cleanupStaleSessions(token, accountId, scriptName) {
  const sessions = await getTailSessions(token, accountId, scriptName);

  if (sessions.length > 0) {
    logSection('startup', ansiColors.dim(`Cleaning up ${sessions.length} stale session(s)...`));

    for (const session of sessions) {
      await deleteTailSession(token, accountId, session['id'], scriptName);
    }
  }

  return;
}

/**
 * Tail Logs - Format Timestamp.
 *
 * Renders an epoch-millisecond value as a locale time string for the compact
 * per-request log header.
 *
 * @param {number} ms - Ms.
 *
 * @returns {string}
 *
 * @since 2.0.0
 */
function formatTimestamp(ms) {
  return new Date(ms).toLocaleTimeString();
}

/**
 * Tail Logs - Format Method.
 *
 * Colors an HTTP method name by kind so request lines are easy to scan, falling
 * back to dim for uncommon verbs.
 *
 * @param {string} method - Method.
 *
 * @returns {string}
 *
 * @since 2.0.0
 */
function formatMethod(method) {
  switch (method) {
    case 'GET': {
      return ansiColors.cyan(method);
    }

    case 'POST': {
      return ansiColors.green(method);
    }

    case 'HEAD': {
      return ansiColors.yellow(method);
    }

    default: {
      return ansiColors.dim(method);
    }
  }
}

/**
 * Tail Logs - Format Status.
 *
 * Colors an HTTP status for the log line, showing red for errors or 4xx and
 * green otherwise so failures stand out.
 *
 * @param {number | string} status   - Status.
 * @param {boolean}         hasError - Has error.
 *
 * @returns {string}
 *
 * @since 2.0.0
 */
function formatStatus(status, hasError) {
  if (hasError === true) {
    return ansiColors.red('ERR');
  }

  if (typeof status === 'number' && status >= 400) {
    return ansiColors.red(`${status}`);
  }

  return ansiColors.green(`${status}`);
}

/**
 * Tail Logs - Summarize HTTP.
 *
 * Builds the multi-line colored summary for one worker tail entry, folding in
 * request metadata, parsed BSL logs, and exceptions.
 *
 * @param {{ event?: { request?: { method?: string, url?: string, cf?: { asn?: number, asOrganization?: string, httpProtocol?: string, country?: string }, headers?: Partial<Record<string, string>> }, response?: { status?: number } }, logs?: { message?: unknown, level?: string }[], exceptions?: { message?: unknown }[], eventTimestamp?: number, outcome?: string }} entry - Entry.
 *
 * @returns {string}
 *
 * @since 2.0.0
 */
function summarizeHttp(entry) {
  const event = entry['event'] ?? {};
  const request = event['request'] ?? {};
  const response = event['response'] ?? {};
  const cf = request['cf'] ?? {};
  const headers = request['headers'] ?? {};
  const logs = entry['logs'] ?? [];

  const method = request['method'] ?? '?';
  const status = response['status'] ?? '?';
  const url = request['url'] ?? '?';
  const asn = cf['asn'] ?? '?';
  const org = cf['asOrganization'] ?? '?';
  const http = cf['httpProtocol'] ?? '?';
  const country = cf['country'] ?? '?';
  const userAgent = headers['user-agent'] ?? '-';
  const timestamp = formatTimestamp(entry['eventTimestamp'] ?? Date.now());
  const outcome = entry['outcome'] ?? '?';

  const exceptions = entry['exceptions'] ?? [];
  const hasError = exceptions.length > 0 || outcome !== 'ok';

  const lines = [];

  lines.push(`${ansiColors.dim(timestamp)} ${formatMethod(method)} ${formatStatus(status, hasError)} ${ansiColors.bold(url)} ${ansiColors.dim(`${http} | ${country} | ${org} (ASN:${asn})`)}`);

  if (userAgent !== '-') {
    lines.push(`  ${ansiColors.dim(userAgent.substring(0, 80))}`);
  }

  // Parse BSL log entries from logs.
  for (const log of logs) {
    const msg = (Array.isArray(log['message']) === true) ? log['message'][0] : log['message'];

    if (typeof msg !== 'string') {
      continue;
    }

    try {
      const parsed = JSON.parse(msg);

      if (parsed.shortcode !== undefined) {
        const trackerList = (parsed.trackers ?? []).join(', ');
        const trackerSuffix = (trackerList !== '') ? ` ${ansiColors.dim(`(${trackerList})`)}` : '';

        lines.push(`  ${ansiColors.dim(`→ ${parsed.shortcode} → ${parsed.redirect_url}`)}${trackerSuffix}`);
      }
    } catch {
      // Not JSON - show as-is.
      if (log['level'] === 'error') {
        lines.push(`  ${ansiColors.red('ERR:')} ${msg.substring(0, 150)}`);
      }
    }
  }

  for (const ex of exceptions) {
    const msg = (typeof ex['message'] === 'string') ? ex['message'] : JSON.stringify(ex);

    lines.push(`  ${ansiColors.red('EXC:')} ${msg.substring(0, 150)}`);
  }

  return lines.join('\n');
}

/**
 * Tail Logs - Summarize.
 *
 * Routes a tail entry to the HTTP summarizer, isolating the call site so other
 * entry shapes can be dispatched here later.
 *
 * @param {Parameters<typeof summarizeHttp>[0]} entry - Entry.
 *
 * @returns {string}
 *
 * @since 2.0.0
 */
function summarize(entry) {
  return summarizeHttp(entry);
}

/**
 * Tail Logs - Shutting Down.
 *
 * Guards the shutdown path so a second interrupt exits immediately and the
 * auto-restart handler stays quiet once teardown begins.
 *
 * @since 2.0.0
 */
let shuttingDown = false;

/**
 * Tail Logs - Start Tail.
 *
 * Spawns wrangler tail from an isolated temp directory, streams entries to the
 * sink, and restarts the session before it expires.
 *
 * @param {string} token      - Token.
 * @param {string} accountId  - Account id.
 * @param {string} scriptName - Script name.
 *
 * @returns {Promise<void>}
 *
 * @since 2.0.0
 */
async function startTail(token, accountId, scriptName) {
  try {
    await cleanupStaleSessions(token, accountId, scriptName);
  } catch {
    logSection('startup', ansiColors.yellow('Could not clean up stale sessions (API unreachable). Continuing...'));
  }

  logSection('connection', ansiColors.green('Connecting...'));

  // Spawn wrangler from a temp directory so it doesn't read the project's .env file.
  // The .env token is for deploy only - wrangler tail uses OAuth from `wrangler login`.
  const tailDir = mkdtempSync(join(tmpdir(), 'bsl-tail-'));

  writeFileSync(join(tailDir, 'wrangler.toml'), `name = "${scriptName}"\n`);

  const tail = spawn('npx', [
    'wrangler',
    'tail',
    '--format',
    'json',
  ], {
    stdio: [
      'ignore',
      'pipe',
      'pipe',
    ],
    cwd: tailDir,
  });

  let restartTimer = /** @type {NodeJS.Timeout | undefined} */ (undefined);

  /**
   * Tail Logs - Start Tail - Schedule Restart.
   *
   * Fetches the real session expiry from the Cloudflare API
   * and sets a timer to restart before it expires.
   *
   * @returns {Promise<Date | null>}
   *
   * @since 2.0.0
   */
  async function scheduleRestart() {
    try {
      const sessions = await getTailSessions(token, accountId, scriptName);

      if (sessions.length > 0) {
        const latest = sessions.sort((a, b) => new Date(b['expires_at']).getTime() - new Date(a['expires_at']).getTime())[0];

        if (latest !== undefined) {
          const expiresAt = new Date(latest['expires_at']);
          const restartAt = new Date(expiresAt.getTime() - RESTART_BUFFER_MILLISECONDS);
          const restartMs = restartAt.getTime() - Date.now();

          if (restartMs > 0) {
            clearTimeout(restartTimer);

            restartTimer = setTimeout(() => {
              logSection('restart', ansiColors.yellow('Session expiring. Restarting...'));

              tail.kill();

              return;
            }, restartMs);

            return expiresAt;
          }
        }
      }
    } catch {
      // API call failed.
    }

    return null;
  }

  // Initial check after wrangler creates the session.
  setTimeout(async () => {
    const expiresAt = await scheduleRestart();

    if (expiresAt !== null) {
      const restartAt = new Date(expiresAt.getTime() - RESTART_BUFFER_MILLISECONDS);

      logSection('connection', ansiColors.green(`Connected. Session expires at ${formatTimestamp(expiresAt.getTime())}, restart at ${formatTimestamp(restartAt.getTime())}`));
    } else {
      logSection('connection', ansiColors.green('Connected (could not fetch session expiry).'));
    }

    return;
  }, 5_000);

  // Periodic check every 30 minutes to keep the restart timer accurate.
  const checkInterval = setInterval(async () => {
    const expiresAt = await scheduleRestart();

    if (expiresAt !== null) {
      const restartAt = new Date(expiresAt.getTime() - RESTART_BUFFER_MILLISECONDS);

      logSection('session', ansiColors.dim(`Session check: expires at ${formatTimestamp(expiresAt.getTime())}, restart at ${formatTimestamp(restartAt.getTime())}`));
    }

    return;
  }, 1_800_000);

  let jsonBuffer = '';
  let jsonDepth = 0;
  let inObject = false;

  /**
   * Tail Logs - Start Tail - Process Chunk.
   *
   * Scans a raw wrangler chunk character by character, reassembling balanced
   * JSON objects so each complete entry is persisted and summarized.
   *
   * @param {Buffer | string} chunk - Chunk.
   *
   * @returns {void}
   *
   * @since 2.0.0
   */
  function processChunk(chunk) {
    const text = chunk.toString();

    for (const char of text) {
      if (char === '{') {
        if (inObject === false) {
          inObject = true;
          jsonBuffer = '';
        }

        jsonDepth += 1;
      }

      if (inObject === true) {
        jsonBuffer += char;
      }

      if (char === '}') {
        jsonDepth -= 1;

        if (inObject === true && jsonDepth === 0) {
          inObject = false;

          try {
            const entry = JSON.parse(jsonBuffer);
            const compact = JSON.stringify(entry);

            appendFileSync(OUTPUT_FILE, `${compact}\n`);
            logSection('traffic', summarize(entry));
          } catch {
            // Malformed JSON - skip.
          }

          jsonBuffer = '';
        }
      }
    }

    return;
  }

  tail.stdout.on('data', (chunk) => {
    processChunk(chunk);

    return;
  });

  tail.stderr.on('data', (chunk) => {
    processChunk(chunk);

    return;
  });

  tail.on('error', (err) => {
    logger.error(`Spawn error: ${err.message}`);

    return;
  });

  tail.on('close', () => {
    clearTimeout(restartTimer);
    clearInterval(checkInterval);

    if (shuttingDown === true) {
      return;
    }

    logSection('restart', ansiColors.yellow('Tail ended. Restarting in 5 seconds...'));
    setTimeout(() => startTail(token, accountId, scriptName), 5_000);

    return;
  });

  return;
}

/**
 * Tail Logs - Config.
 *
 * Holds the worker config chosen for this run so the main flow can read its
 * worker name and base domain.
 *
 * @since 2.0.0
 */
const config = await chooseConfig();

/**
 * Tail Logs - Token.
 *
 * Holds the Cloudflare API token loaded from .env so account and session calls
 * can authenticate.
 *
 * @since 2.0.0
 */
const token = loadToken();

logSection('startup', ansiColors.dim(`Tailing ${ansiColors.bold(config['workerName'])} to ${OUTPUT_FILE} (Ctrl+C to stop)...`));

/**
 * Tail Logs - Account ID.
 *
 * Holds the resolved Cloudflare account id so tail-session calls are scoped to
 * the right account for the run.
 *
 * @since 2.0.0
 */
const accountId = await getAccountId(token, config['baseDomain']);

/**
 * Tail Logs - Shutdown.
 *
 * Cleans up stale tail sessions on interrupt and exits, forcing an immediate
 * exit if a second interrupt arrives mid-cleanup.
 *
 * @returns {Promise<void>}
 *
 * @since 2.0.0
 */
async function shutdown() {
  if (shuttingDown === true) {
    process.exit(1);
  }

  shuttingDown = true;

  logSection('shutdown', ansiColors.dim('Cleaning up...'));

  await cleanupStaleSessions(token, accountId, config['workerName']);

  logSection('shutdown', ansiColors.dim('Stopped.'));

  return process.exit(0);
}

process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());

startTail(token, accountId, config['workerName']);
