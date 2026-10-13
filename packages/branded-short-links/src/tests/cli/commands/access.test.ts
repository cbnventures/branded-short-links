import {
  existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import {
  addAccessUser, generateAccessKey, removeAccessUser, rotateAccessKey,
} from '../../../cli/commands/access.js';
import { loadConfig } from '../../../cli/commands/config-io.js';
import { generateWranglerToml } from '../../../cli/commands/generate.js';
import { validateConfig } from '../../../cli/commands/validate.js';
import { compactAccessKeyPattern, memorableAccessKeyPattern, randomAccessKeyPattern } from '../../../lib/regex.js';
import { configSchema } from '../../../lib/schema.js';

import type {
  Tests_Cli_Commands_Access_AccessCommands_AddsAndNormalizesAnAccessUser_SavedConfig,
  Tests_Cli_Commands_Access_AccessCommands_AddsAndNormalizesAnAccessUser_User,
  Tests_Cli_Commands_Access_AccessCommands_ConfigPath,
  Tests_Cli_Commands_Access_AccessCommands_GeneratesAllSupportedKeyFormats_CompactKey,
  Tests_Cli_Commands_Access_AccessCommands_GeneratesAllSupportedKeyFormats_MemorableKey,
  Tests_Cli_Commands_Access_AccessCommands_GeneratesAllSupportedKeyFormats_RandomKey,
  Tests_Cli_Commands_Access_AccessCommands_OsTmpDir,
  Tests_Cli_Commands_Access_AccessCommands_RemovesTheAppAccessSectionWithTheLastUser_SavedConfig,
  Tests_Cli_Commands_Access_AccessCommands_RotatesAnAccessKey_InitialUser,
  Tests_Cli_Commands_Access_AccessCommands_RotatesAnAccessKey_RotatedUser,
  Tests_Cli_Commands_Access_AccessCommands_RotatesAnAccessKey_SavedConfig,
  Tests_Cli_Commands_Access_AccessCommands_TempDir,
  Tests_Cli_Commands_Access_AccessCommands_TempDirPath,
  Tests_Cli_Commands_Access_AccessCommands_ValidatesDuplicateUsersAndTheReservedShortcode_ConfigContent,
  Tests_Cli_Commands_Access_AccessCommands_ValidatesDuplicateUsersAndTheReservedShortcode_InvalidConfig,
  Tests_Cli_Commands_Access_AccessCommands_ValidatesDuplicateUsersAndTheReservedShortcode_Result,
  Tests_Cli_Commands_Access_AccessCommands_WritesAppAccessToWranglerVars_Output,
  Tests_Cli_Commands_Access_AccessCommands_WritesAppAccessToWranglerVars_OutputPath,
  Tests_Cli_Commands_Access_BaseConfig,
} from '../../../types/tests/cli/commands/access.test.d.ts';

const baseConfig: Tests_Cli_Commands_Access_BaseConfig = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'bsl.example.com',
    show_response_output: false,
  },
  links: {
    fallback_url: 'https://example.com',
    items: [{
      shortcode: '/docs',
      http_response: 302,
      redirect_url: 'https://docs.example.com',
    }],
  },
  trackers: [],
};

describe('access commands', () => {
  let tempDir: Tests_Cli_Commands_Access_AccessCommands_TempDir = undefined;
  let configPath: Tests_Cli_Commands_Access_AccessCommands_ConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Commands_Access_AccessCommands_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_Access_AccessCommands_TempDirPath = join(osTmpDir, 'bsl-access-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    writeFileSync(configPath, `${JSON.stringify(baseConfig, null, 2)}\n`);

    return;
  });

  afterEach(() => {
    if (tempDir !== undefined && existsSync(tempDir) === true) {
      rmSync(tempDir, { recursive: true });
    }

    return;
  });

  it('generates all supported key formats', () => {
    const memorableKey: Tests_Cli_Commands_Access_AccessCommands_GeneratesAllSupportedKeyFormats_MemorableKey = generateAccessKey('memorable');
    const compactKey: Tests_Cli_Commands_Access_AccessCommands_GeneratesAllSupportedKeyFormats_CompactKey = generateAccessKey('compact');
    const randomKey: Tests_Cli_Commands_Access_AccessCommands_GeneratesAllSupportedKeyFormats_RandomKey = generateAccessKey('random');

    expect(memorableAccessKeyPattern.test(memorableKey)).toBe(true);

    expect(compactAccessKeyPattern.test(compactKey)).toBe(true);

    expect(randomAccessKeyPattern.test(randomKey)).toBe(true);

    return;
  });

  it('adds and normalizes an access user', () => {
    const user: Tests_Cli_Commands_Access_AccessCommands_AddsAndNormalizesAnAccessUser_User = addAccessUser(configPath!, ' Jacky ', 'memorable');
    const savedConfig: Tests_Cli_Commands_Access_AccessCommands_AddsAndNormalizesAnAccessUser_SavedConfig = configSchema.parse(loadConfig(configPath!));

    expect(user['username']).toBe('jacky');

    expect(savedConfig['app_access']).toEqual({ users: [user] });

    return;
  });

  it('rejects duplicate access users', () => {
    addAccessUser(configPath!, 'jacky', 'compact');

    expect(() => addAccessUser(configPath!, 'JACKY', 'random')).toThrow('already exists');

    return;
  });

  it('rotates an access key', () => {
    const initialUser: Tests_Cli_Commands_Access_AccessCommands_RotatesAnAccessKey_InitialUser = addAccessUser(configPath!, 'jacky', 'memorable');
    const rotatedUser: Tests_Cli_Commands_Access_AccessCommands_RotatesAnAccessKey_RotatedUser = rotateAccessKey(configPath!, 'jacky', 'random');
    const savedConfig: Tests_Cli_Commands_Access_AccessCommands_RotatesAnAccessKey_SavedConfig = configSchema.parse(loadConfig(configPath!));

    expect(rotatedUser['access_key']).not.toBe(initialUser['access_key']);

    expect(savedConfig['app_access']).toEqual({ users: [rotatedUser] });

    return;
  });

  it('removes the app access section with the last user', () => {
    addAccessUser(configPath!, 'jacky', 'compact');
    removeAccessUser(configPath!, 'jacky');

    const savedConfig: Tests_Cli_Commands_Access_AccessCommands_RemovesTheAppAccessSectionWithTheLastUser_SavedConfig = configSchema.parse(loadConfig(configPath!));

    expect(savedConfig['app_access']).toBeUndefined();

    return;
  });

  it('writes app access to Wrangler vars', () => {
    addAccessUser(configPath!, 'jacky', 'compact');

    const outputPath: Tests_Cli_Commands_Access_AccessCommands_WritesAppAccessToWranglerVars_OutputPath = join(tempDir!, 'wrangler.toml');

    generateWranglerToml(configPath!, outputPath);

    const output: Tests_Cli_Commands_Access_AccessCommands_WritesAppAccessToWranglerVars_Output = readFileSync(outputPath, 'utf-8');

    expect(output).toContain('APP_ACCESS = ');

    expect(output).toContain('jacky');

    return;
  });

  it('validates duplicate users and the reserved shortcode', () => {
    const invalidConfig: Tests_Cli_Commands_Access_AccessCommands_ValidatesDuplicateUsersAndTheReservedShortcode_InvalidConfig = {
      ...baseConfig,
      links: {
        items: [{
          shortcode: '/__bsl/links',
          http_response: 302,
          redirect_url: 'https://example.com/private',
        }],
      },
      app_access: {
        users: [
          {
            username: 'jacky',
            access_key: 'alpha-bravo-charlie-delta-echo',
          },
          {
            username: 'jacky',
            access_key: 'FGH1-JKM2-NPQ3-RST4-VWX5',
          },
        ],
      },
    };
    const configContent: Tests_Cli_Commands_Access_AccessCommands_ValidatesDuplicateUsersAndTheReservedShortcode_ConfigContent = JSON.stringify(invalidConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: Tests_Cli_Commands_Access_AccessCommands_ValidatesDuplicateUsersAndTheReservedShortcode_Result = validateConfig(configPath!);

    expect(result['valid']).toBe(false);

    expect(result['errors']).toContain('Shortcode "/__bsl/links" is reserved for app access.');

    expect(result['errors']).toContain('Duplicate app access username "jacky" found.');

    return;
  });

  return;
});
