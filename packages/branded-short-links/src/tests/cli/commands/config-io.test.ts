import {
  existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import { loadConfig, saveConfig } from '../../../cli/commands/config-io.js';
import { configSchema } from '../../../lib/schema.js';

import type {
  TestsCliCommandsConfigIoConfigContent,
  TestsCliCommandsConfigIoConfigPath,
  TestsCliCommandsConfigIoContent,
  TestsCliCommandsConfigIoEndsWithNewline,
  TestsCliCommandsConfigIoExpectedContent,
  TestsCliCommandsConfigIoMissingPath,
  TestsCliCommandsConfigIoResult,
  TestsCliCommandsConfigIoTempDir,
  TestsCliCommandsConfigIoTempDirPath,
  TestsCliCommandsConfigIoValidConfig,
} from '../../../types/tests/cli/commands/config-io.test.d.ts';

const validConfig: TestsCliCommandsConfigIoValidConfig = {
  links: {
    fallback_url: 'https://example.com',
    items: [{
      shortcode: '/gh',
      http_response: 302 as const,
      redirect_url: 'https://github.com/example',
    }],
  },
  trackers: [],
  settings: {
    worker_name: 'test-worker',
    base_domain: 'bsl.example.com',
    show_response_output: false,
  },
};

describe('loadConfig', () => {
  let tempDir: TestsCliCommandsConfigIoTempDir = undefined;
  let configPath: TestsCliCommandsConfigIoConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: TestsCliCommandsConfigIoTempDirPath = tmpdir();
    const tempDirPath: TestsCliCommandsConfigIoTempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    return;
  });

  afterEach(() => {
    if (tempDir !== undefined && existsSync(tempDir) === true) {
      rmSync(tempDir, { recursive: true });
    }

    return;
  });

  it('reads and parses valid JSON', () => {
    const configContent: TestsCliCommandsConfigIoConfigContent = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: TestsCliCommandsConfigIoResult = configSchema.parse(loadConfig(configPath!));

    expect(result).toEqual(validConfig);

    return;
  });

  it('throws on non-existent file', () => {
    const missingPath: TestsCliCommandsConfigIoMissingPath = join(tempDir!, 'missing.json');

    expect(() => loadConfig(missingPath)).toThrow();

    return;
  });

  it('throws on invalid JSON', () => {
    writeFileSync(configPath!, '{ invalid json }');

    expect(() => loadConfig(configPath!)).toThrow();

    return;
  });

  return;
});

describe('saveConfig', () => {
  let tempDir: TestsCliCommandsConfigIoTempDir = undefined;
  let configPath: TestsCliCommandsConfigIoConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: TestsCliCommandsConfigIoTempDirPath = tmpdir();
    const tempDirPath: TestsCliCommandsConfigIoTempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    return;
  });

  afterEach(() => {
    if (tempDir !== undefined && existsSync(tempDir) === true) {
      rmSync(tempDir, { recursive: true });
    }

    return;
  });

  it('writes formatted JSON with 2-space indent', () => {
    saveConfig(configPath!, validConfig);

    const content: TestsCliCommandsConfigIoContent = readFileSync(configPath!, 'utf-8');
    const expectedContent: TestsCliCommandsConfigIoExpectedContent = `${JSON.stringify(validConfig, null, 2)}\n`;

    expect(content).toBe(expectedContent);

    return;
  });

  it('writes JSON with trailing newline', () => {
    saveConfig(configPath!, validConfig);

    const content: TestsCliCommandsConfigIoContent = readFileSync(configPath!, 'utf-8');
    const endsWithNewline: TestsCliCommandsConfigIoEndsWithNewline = content.endsWith('\n');

    expect(endsWithNewline).toBe(true);

    return;
  });

  it('produces output that loadConfig can read back', () => {
    saveConfig(configPath!, validConfig);

    const result: TestsCliCommandsConfigIoResult = configSchema.parse(loadConfig(configPath!));

    expect(result).toEqual(validConfig);

    return;
  });

  return;
});
