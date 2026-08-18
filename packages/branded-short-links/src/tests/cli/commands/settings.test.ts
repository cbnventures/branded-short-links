import {
  existsSync, mkdtempSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import { loadConfig } from '../../../cli/commands/config-io.js';
import { getSettings, updateSettings } from '../../../cli/commands/settings.js';
import { configSchema } from '../../../lib/schema.js';

import type {
  Tests_Cli_Commands_Settings_ConfigContent,
  Tests_Cli_Commands_Settings_ConfigPath,
  Tests_Cli_Commands_Settings_GetSettings_ReturnsCorrectBaseDomain_Settings,
  Tests_Cli_Commands_Settings_GetSettings_ReturnsCorrectShowResponseOutput_Settings,
  Tests_Cli_Commands_Settings_GetSettings_ReturnsTheSettingsObject_Settings,
  Tests_Cli_Commands_Settings_OsTmpDir,
  Tests_Cli_Commands_Settings_TempDir,
  Tests_Cli_Commands_Settings_TempDirPath,
  Tests_Cli_Commands_Settings_UpdateSettings_DoesNotAffectOtherConfigSections_Config,
  Tests_Cli_Commands_Settings_UpdateSettings_MergesUpdatesIntoSettings_Settings,
  Tests_Cli_Commands_Settings_UpdateSettings_PersistsChangesToFile_Config,
  Tests_Cli_Commands_Settings_UpdateSettings_UpdatesMultipleFieldsAtOnce_Settings,
  Tests_Cli_Commands_Settings_ValidConfig,
} from '../../../types/tests/cli/commands/settings.test.d.ts';

const validConfig: Tests_Cli_Commands_Settings_ValidConfig = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'bsl.example.com',
    show_response_output: false,
  },
  links: {
    fallback_url: 'https://example.com',
    items: [],
  },
  trackers: [],
};

describe('getSettings', () => {
  let tempDir: Tests_Cli_Commands_Settings_TempDir = undefined;
  let configPath: Tests_Cli_Commands_Settings_ConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Commands_Settings_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_Settings_TempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configContent: Tests_Cli_Commands_Settings_ConfigContent = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath, configContent);

    return;
  });

  afterEach(() => {
    if (tempDir !== undefined && existsSync(tempDir) === true) {
      rmSync(tempDir, { recursive: true });
    }

    return;
  });

  it('returns the settings object', () => {
    const settings: Tests_Cli_Commands_Settings_GetSettings_ReturnsTheSettingsObject_Settings = getSettings(configPath!);

    expect(settings).toEqual(validConfig['settings']);

    return;
  });

  it('returns correct base_domain', () => {
    const settings: Tests_Cli_Commands_Settings_GetSettings_ReturnsCorrectBaseDomain_Settings = getSettings(configPath!);

    expect(settings['base_domain']).toBe('bsl.example.com');

    return;
  });

  it('returns correct show_response_output', () => {
    const settings: Tests_Cli_Commands_Settings_GetSettings_ReturnsCorrectShowResponseOutput_Settings = getSettings(configPath!);

    expect(settings['show_response_output']).toBe(false);

    return;
  });

  return;
});

describe('updateSettings', () => {
  let tempDir: Tests_Cli_Commands_Settings_TempDir = undefined;
  let configPath: Tests_Cli_Commands_Settings_ConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Commands_Settings_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_Settings_TempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configContent: Tests_Cli_Commands_Settings_ConfigContent = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath, configContent);

    return;
  });

  afterEach(() => {
    if (tempDir !== undefined && existsSync(tempDir) === true) {
      rmSync(tempDir, { recursive: true });
    }

    return;
  });

  it('merges updates into settings', () => {
    updateSettings(configPath!, { show_response_output: true });

    const settings: Tests_Cli_Commands_Settings_UpdateSettings_MergesUpdatesIntoSettings_Settings = getSettings(configPath!);

    expect(settings['show_response_output']).toBe(true);

    expect(settings['base_domain']).toBe('bsl.example.com');

    return;
  });

  it('updates multiple fields at once', () => {
    updateSettings(configPath!, {
      show_response_output: true,
      base_domain: 'new.example.com',
    });

    const settings: Tests_Cli_Commands_Settings_UpdateSettings_UpdatesMultipleFieldsAtOnce_Settings = getSettings(configPath!);

    expect(settings['show_response_output']).toBe(true);

    expect(settings['base_domain']).toBe('new.example.com');

    return;
  });

  it('persists changes to file', () => {
    updateSettings(configPath!, { base_domain: 'new.example.com' });

    const config: Tests_Cli_Commands_Settings_UpdateSettings_PersistsChangesToFile_Config = configSchema.parse(loadConfig(configPath!));

    expect(config['settings']['base_domain']).toBe('new.example.com');

    return;
  });

  it('does not affect other config sections', () => {
    updateSettings(configPath!, { show_response_output: true });

    const config: Tests_Cli_Commands_Settings_UpdateSettings_DoesNotAffectOtherConfigSections_Config = configSchema.parse(loadConfig(configPath!));

    expect(config['links']).toEqual(validConfig['links']);

    expect(config['trackers']).toEqual(validConfig['trackers']);

    return;
  });

  return;
});
