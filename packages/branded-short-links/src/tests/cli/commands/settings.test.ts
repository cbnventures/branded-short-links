import {
  existsSync, mkdtempSync, rmSync, writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import { loadConfig } from '../../../cli/commands/config-io.js';
import { getSettings, updateSettings } from '../../../cli/commands/settings.js';
import { configSchema } from '../../../lib/schema.js';

import type {
  TestsCliCommandsSettingsConfig,
  TestsCliCommandsSettingsConfigContent,
  TestsCliCommandsSettingsConfigPath,
  TestsCliCommandsSettingsSettings,
  TestsCliCommandsSettingsTempDir,
  TestsCliCommandsSettingsTempDirPath,
  TestsCliCommandsSettingsValidConfig,
} from '../../../types/tests/cli/commands/settings.test.d.ts';

const validConfig: TestsCliCommandsSettingsValidConfig = {
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
  let tempDir: TestsCliCommandsSettingsTempDir = undefined;
  let configPath: TestsCliCommandsSettingsConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: TestsCliCommandsSettingsTempDirPath = tmpdir();
    const tempDirPath: TestsCliCommandsSettingsTempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configContent: TestsCliCommandsSettingsConfigContent = JSON.stringify(validConfig, null, 2);

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
    const settings: TestsCliCommandsSettingsSettings = getSettings(configPath!);

    expect(settings).toEqual(validConfig['settings']);

    return;
  });

  it('returns correct base_domain', () => {
    const settings: TestsCliCommandsSettingsSettings = getSettings(configPath!);

    expect(settings['base_domain']).toBe('bsl.example.com');

    return;
  });

  it('returns correct show_response_output', () => {
    const settings: TestsCliCommandsSettingsSettings = getSettings(configPath!);

    expect(settings['show_response_output']).toBe(false);

    return;
  });

  return;
});

describe('updateSettings', () => {
  let tempDir: TestsCliCommandsSettingsTempDir = undefined;
  let configPath: TestsCliCommandsSettingsConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: TestsCliCommandsSettingsTempDirPath = tmpdir();
    const tempDirPath: TestsCliCommandsSettingsTempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configContent: TestsCliCommandsSettingsConfigContent = JSON.stringify(validConfig, null, 2);

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

    const settings: TestsCliCommandsSettingsSettings = getSettings(configPath!);

    expect(settings['show_response_output']).toBe(true);

    expect(settings['base_domain']).toBe('bsl.example.com');

    return;
  });

  it('updates multiple fields at once', () => {
    updateSettings(configPath!, {
      show_response_output: true, base_domain: 'new.example.com',
    });

    const settings: TestsCliCommandsSettingsSettings = getSettings(configPath!);

    expect(settings['show_response_output']).toBe(true);

    expect(settings['base_domain']).toBe('new.example.com');

    return;
  });

  it('persists changes to file', () => {
    updateSettings(configPath!, { base_domain: 'new.example.com' });

    const config: TestsCliCommandsSettingsConfig = configSchema.parse(loadConfig(configPath!));

    expect(config['settings']['base_domain']).toBe('new.example.com');

    return;
  });

  it('does not affect other config sections', () => {
    updateSettings(configPath!, { show_response_output: true });

    const config: TestsCliCommandsSettingsConfig = configSchema.parse(loadConfig(configPath!));

    expect(config['links']).toEqual(validConfig['links']);

    expect(config['trackers']).toEqual(validConfig['trackers']);

    return;
  });

  return;
});
