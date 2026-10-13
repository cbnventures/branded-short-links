import { Buffer } from 'node:buffer';
import { randomBytes, randomInt } from 'node:crypto';

import { wordlist } from '@scure/bip39/wordlists/english.js';

import { appAccessUsernamePattern } from '../../lib/regex.js';
import { configSchema } from '../../lib/schema.js';
import { loadConfig, saveConfig } from './config-io.js';

import type {
  Cli_Commands_Access_AccessKeyFormats,
  Cli_Commands_Access_AddAccessUser_AccessKey,
  Cli_Commands_Access_AddAccessUser_Config,
  Cli_Commands_Access_AddAccessUser_ConfigPath,
  Cli_Commands_Access_AddAccessUser_Format,
  Cli_Commands_Access_AddAccessUser_NormalizedUsername,
  Cli_Commands_Access_AddAccessUser_Returns,
  Cli_Commands_Access_AddAccessUser_User,
  Cli_Commands_Access_AddAccessUser_Username,
  Cli_Commands_Access_AddAccessUser_Users,
  Cli_Commands_Access_CompactAccessKeyAlphabet,
  Cli_Commands_Access_GenerateAccessKey_CompactSegments,
  Cli_Commands_Access_GenerateAccessKey_Format,
  Cli_Commands_Access_GenerateAccessKey_MemorableSegments,
  Cli_Commands_Access_GenerateAccessKey_RandomValue,
  Cli_Commands_Access_GenerateAccessKey_Returns,
  Cli_Commands_Access_NormalizeAccessUsername_NormalizedUsername,
  Cli_Commands_Access_NormalizeAccessUsername_Returns,
  Cli_Commands_Access_NormalizeAccessUsername_Username,
  Cli_Commands_Access_RemoveAccessUser_AppAccess,
  Cli_Commands_Access_RemoveAccessUser_Config,
  Cli_Commands_Access_RemoveAccessUser_ConfigPath,
  Cli_Commands_Access_RemoveAccessUser_Filtered,
  Cli_Commands_Access_RemoveAccessUser_NormalizedUsername,
  Cli_Commands_Access_RemoveAccessUser_Returns,
  Cli_Commands_Access_RemoveAccessUser_Username,
  Cli_Commands_Access_ResolveAccessKeyFormat_Format,
  Cli_Commands_Access_ResolveAccessKeyFormat_ResolvedFormat,
  Cli_Commands_Access_ResolveAccessKeyFormat_Returns,
  Cli_Commands_Access_RotateAccessKey_AccessKey,
  Cli_Commands_Access_RotateAccessKey_AppAccess,
  Cli_Commands_Access_RotateAccessKey_Config,
  Cli_Commands_Access_RotateAccessKey_ConfigPath,
  Cli_Commands_Access_RotateAccessKey_Format,
  Cli_Commands_Access_RotateAccessKey_NormalizedUsername,
  Cli_Commands_Access_RotateAccessKey_Returns,
  Cli_Commands_Access_RotateAccessKey_User,
  Cli_Commands_Access_RotateAccessKey_UserIndex,
  Cli_Commands_Access_RotateAccessKey_Username,
} from '../../types/cli/commands/access.d.ts';

/**
 * CLI - Commands - Access - Key Formats.
 *
 * Lists the supported access-key formats exposed by the CLI so command option
 * values can be validated consistently.
 *
 * @since 2.1.0
 */
const accessKeyFormats: Cli_Commands_Access_AccessKeyFormats = [
  'memorable',
  'compact',
  'random',
];

/**
 * CLI - Commands - Access - Compact Access Key Alphabet.
 *
 * Provides the Crockford Base32 alphabet used for compact keys while omitting
 * visually ambiguous characters.
 *
 * @since 2.1.0
 */
const compactAccessKeyAlphabet: Cli_Commands_Access_CompactAccessKeyAlphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

/**
 * CLI - Commands - Access - Normalize Access Username.
 *
 * Trims and lowercases an app-access username before validating its portable
 * ASCII representation.
 *
 * @param {Cli_Commands_Access_NormalizeAccessUsername_Username} username - Username.
 *
 * @returns {Cli_Commands_Access_NormalizeAccessUsername_Returns}
 *
 * @since 2.1.0
 */
function normalizeAccessUsername(username: Cli_Commands_Access_NormalizeAccessUsername_Username): Cli_Commands_Access_NormalizeAccessUsername_Returns {
  const normalizedUsername: Cli_Commands_Access_NormalizeAccessUsername_NormalizedUsername = username.trim().toLowerCase();

  if (appAccessUsernamePattern.test(normalizedUsername) === false) {
    throw new Error('Username must be 1-64 lowercase letters, digits, periods, underscores, or hyphens.');
  }

  return normalizedUsername;
}

/**
 * CLI - Commands - Access - Resolve Access Key Format.
 *
 * Converts a CLI option value into one of the supported access-key formats and
 * rejects unknown values before a config file can be changed.
 *
 * @param {Cli_Commands_Access_ResolveAccessKeyFormat_Format} format - Format.
 *
 * @returns {Cli_Commands_Access_ResolveAccessKeyFormat_Returns}
 *
 * @since 2.1.0
 */
function resolveAccessKeyFormat(format: Cli_Commands_Access_ResolveAccessKeyFormat_Format): Cli_Commands_Access_ResolveAccessKeyFormat_Returns {
  const resolvedFormat: Cli_Commands_Access_ResolveAccessKeyFormat_ResolvedFormat = format as Cli_Commands_Access_ResolveAccessKeyFormat_ResolvedFormat;

  if (accessKeyFormats.includes(resolvedFormat) === false) {
    throw new Error(`Unknown access-key format "${format}". Choose memorable, compact, or random.`);
  }

  return resolvedFormat;
}

/**
 * CLI - Commands - Access - Generate Access Key.
 *
 * Generates a cryptographically random key in the requested human-friendly or
 * copy-and-paste format.
 *
 * @param {Cli_Commands_Access_GenerateAccessKey_Format} format - Format.
 *
 * @returns {Cli_Commands_Access_GenerateAccessKey_Returns}
 *
 * @since 2.1.0
 */
function generateAccessKey(format: Cli_Commands_Access_GenerateAccessKey_Format): Cli_Commands_Access_GenerateAccessKey_Returns {
  if (format === 'memorable') {
    const memorableSegments: Cli_Commands_Access_GenerateAccessKey_MemorableSegments = Array.from({ length: 5 }, () => wordlist.at(randomInt(wordlist['length'])) ?? 'abandon');

    return memorableSegments.join('-');
  }

  if (format === 'compact') {
    const compactSegments: Cli_Commands_Access_GenerateAccessKey_CompactSegments = Array.from({ length: 5 }, () => {
      return Array.from({ length: 4 }, () => compactAccessKeyAlphabet.charAt(randomInt(compactAccessKeyAlphabet['length']))).join('');
    });

    return compactSegments.join('-');
  }

  const randomValue: Cli_Commands_Access_GenerateAccessKey_RandomValue = Buffer.from(randomBytes(32)).toString('base64url');

  return `bsl_${randomValue}`;
}

/**
 * CLI - Commands - Access - Add Access User.
 *
 * Adds a normalized username with a newly generated access key to the config
 * and returns the generated credential for display.
 *
 * @param {Cli_Commands_Access_AddAccessUser_ConfigPath} configPath - Config path.
 * @param {Cli_Commands_Access_AddAccessUser_Username}   username   - Username.
 * @param {Cli_Commands_Access_AddAccessUser_Format}     format     - Format.
 *
 * @returns {Cli_Commands_Access_AddAccessUser_Returns}
 *
 * @since 2.1.0
 */
function addAccessUser(configPath: Cli_Commands_Access_AddAccessUser_ConfigPath, username: Cli_Commands_Access_AddAccessUser_Username, format: Cli_Commands_Access_AddAccessUser_Format): Cli_Commands_Access_AddAccessUser_Returns {
  const config: Cli_Commands_Access_AddAccessUser_Config = configSchema.parse(loadConfig(configPath));
  const normalizedUsername: Cli_Commands_Access_AddAccessUser_NormalizedUsername = normalizeAccessUsername(username);
  const users: Cli_Commands_Access_AddAccessUser_Users = (config['app_access'] === undefined) ? [] : config['app_access']['users'];

  if (users.some((user) => user['username'] === normalizedUsername) === true) {
    throw new Error(`App access user "${normalizedUsername}" already exists.`);
  }

  const accessKey: Cli_Commands_Access_AddAccessUser_AccessKey = generateAccessKey(format);
  const user: Cli_Commands_Access_AddAccessUser_User = {
    username: normalizedUsername,
    access_key: accessKey,
  };

  Reflect.set(config, 'app_access', {
    users: [
      ...users,
      user,
    ],
  });

  saveConfig(configPath, config);

  return user;
}

/**
 * CLI - Commands - Access - Rotate Access Key.
 *
 * Replaces an existing app-access user's key with a newly generated value and
 * returns the replacement credential for display.
 *
 * @param {Cli_Commands_Access_RotateAccessKey_ConfigPath} configPath - Config path.
 * @param {Cli_Commands_Access_RotateAccessKey_Username}   username   - Username.
 * @param {Cli_Commands_Access_RotateAccessKey_Format}     format     - Format.
 *
 * @returns {Cli_Commands_Access_RotateAccessKey_Returns}
 *
 * @since 2.1.0
 */
function rotateAccessKey(configPath: Cli_Commands_Access_RotateAccessKey_ConfigPath, username: Cli_Commands_Access_RotateAccessKey_Username, format: Cli_Commands_Access_RotateAccessKey_Format): Cli_Commands_Access_RotateAccessKey_Returns {
  const config: Cli_Commands_Access_RotateAccessKey_Config = configSchema.parse(loadConfig(configPath));
  const normalizedUsername: Cli_Commands_Access_RotateAccessKey_NormalizedUsername = normalizeAccessUsername(username);
  const appAccess: Cli_Commands_Access_RotateAccessKey_AppAccess = config['app_access'];
  const userIndex: Cli_Commands_Access_RotateAccessKey_UserIndex = (appAccess === undefined) ? -1 : appAccess['users'].findIndex((user) => user['username'] === normalizedUsername);

  if (appAccess === undefined || userIndex === -1) {
    throw new Error(`App access user "${normalizedUsername}" not found.`);
  }

  const accessKey: Cli_Commands_Access_RotateAccessKey_AccessKey = generateAccessKey(format);
  const user: Cli_Commands_Access_RotateAccessKey_User = {
    username: normalizedUsername,
    access_key: accessKey,
  };

  Reflect.set(appAccess['users'], userIndex, user);

  saveConfig(configPath, config);

  return user;
}

/**
 * CLI - Commands - Access - Remove Access User.
 *
 * Removes an app-access user and deletes the optional config section when no
 * users remain.
 *
 * @param {Cli_Commands_Access_RemoveAccessUser_ConfigPath} configPath - Config path.
 * @param {Cli_Commands_Access_RemoveAccessUser_Username}   username   - Username.
 *
 * @returns {Cli_Commands_Access_RemoveAccessUser_Returns}
 *
 * @since 2.1.0
 */
function removeAccessUser(configPath: Cli_Commands_Access_RemoveAccessUser_ConfigPath, username: Cli_Commands_Access_RemoveAccessUser_Username): Cli_Commands_Access_RemoveAccessUser_Returns {
  const config: Cli_Commands_Access_RemoveAccessUser_Config = configSchema.parse(loadConfig(configPath));
  const normalizedUsername: Cli_Commands_Access_RemoveAccessUser_NormalizedUsername = normalizeAccessUsername(username);
  const appAccess: Cli_Commands_Access_RemoveAccessUser_AppAccess = config['app_access'];
  const filtered: Cli_Commands_Access_RemoveAccessUser_Filtered = (appAccess === undefined) ? [] : appAccess['users'].filter((user) => user['username'] !== normalizedUsername);

  if (appAccess === undefined || filtered['length'] === appAccess['users']['length']) {
    throw new Error(`App access user "${normalizedUsername}" not found.`);
  }

  if (filtered['length'] === 0) {
    delete config['app_access'];
  } else {
    Reflect.set(config, 'app_access', { users: filtered });
  }

  saveConfig(configPath, config);

  return;
}

export {
  accessKeyFormats,
  addAccessUser,
  generateAccessKey,
  normalizeAccessUsername,
  removeAccessUser,
  resolveAccessKeyFormat,
  rotateAccessKey,
};
