import {
  existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import { loadConfig, saveConfig } from '../../../cli/commands/config-io.js';
import { configSchema } from '../../../lib/schema.js';

import type {
  Tests_Cli_Commands_ConfigIo_LoadConfig_ConfigPath,
  Tests_Cli_Commands_ConfigIo_LoadConfig_OsTmpDir,
  Tests_Cli_Commands_ConfigIo_LoadConfig_ReadsAndParsesValidJSON_ConfigContent,
  Tests_Cli_Commands_ConfigIo_LoadConfig_ReadsAndParsesValidJSON_Result,
  Tests_Cli_Commands_ConfigIo_LoadConfig_TempDir,
  Tests_Cli_Commands_ConfigIo_LoadConfig_TempDirPath,
  Tests_Cli_Commands_ConfigIo_LoadConfig_ThrowsOnNonExistentFile_MissingPath,
  Tests_Cli_Commands_ConfigIo_SaveConfig_ConfigPath,
  Tests_Cli_Commands_ConfigIo_SaveConfig_OsTmpDir,
  Tests_Cli_Commands_ConfigIo_SaveConfig_ProducesOutputThatLoadConfigCanReadBack_Result,
  Tests_Cli_Commands_ConfigIo_SaveConfig_TempDir,
  Tests_Cli_Commands_ConfigIo_SaveConfig_TempDirPath,
  Tests_Cli_Commands_ConfigIo_SaveConfig_WritesFormattedJSONWith2SpaceIndent_Content,
  Tests_Cli_Commands_ConfigIo_SaveConfig_WritesFormattedJSONWith2SpaceIndent_ExpectedContent,
  Tests_Cli_Commands_ConfigIo_SaveConfig_WritesJSONWithTrailingNewline_Content,
  Tests_Cli_Commands_ConfigIo_SaveConfig_WritesJSONWithTrailingNewline_EndsWithNewline,
  Tests_Cli_Commands_ConfigIo_ValidConfig,
} from '../../../types/tests/cli/commands/config-io.test.d.ts';

const validConfig: Tests_Cli_Commands_ConfigIo_ValidConfig = {
  links: {
    fallback_url: 'https://example.com',
    items: [{
      shortcode: '/gh',
      http_response: 302 as const,
      redirect_url: 'https://github.com/example',
    }],
  },
  trackers: [],
  app_access: {
    users: [{
      username: 'test-user',
      access_key: 'artist-cactus-forest-magnet-river',
    }],
  },
  settings: {
    worker_name: 'test-worker',
    base_domain: 'bsl.example.com',
    show_response_output: false,
  },
};

describe('loadConfig', () => {
  let tempDir: Tests_Cli_Commands_ConfigIo_LoadConfig_TempDir = undefined;
  let configPath: Tests_Cli_Commands_ConfigIo_LoadConfig_ConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Commands_ConfigIo_LoadConfig_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_ConfigIo_LoadConfig_TempDirPath = join(osTmpDir, 'bsl-test-');

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
    const configContent: Tests_Cli_Commands_ConfigIo_LoadConfig_ReadsAndParsesValidJSON_ConfigContent = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: Tests_Cli_Commands_ConfigIo_LoadConfig_ReadsAndParsesValidJSON_Result = configSchema.parse(loadConfig(configPath!));

    expect(result).toEqual(validConfig);

    return;
  });

  it('throws on non-existent file', () => {
    const missingPath: Tests_Cli_Commands_ConfigIo_LoadConfig_ThrowsOnNonExistentFile_MissingPath = join(tempDir!, 'missing.json');

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
  let tempDir: Tests_Cli_Commands_ConfigIo_SaveConfig_TempDir = undefined;
  let configPath: Tests_Cli_Commands_ConfigIo_SaveConfig_ConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Commands_ConfigIo_SaveConfig_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_ConfigIo_SaveConfig_TempDirPath = join(osTmpDir, 'bsl-test-');

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

    const content: Tests_Cli_Commands_ConfigIo_SaveConfig_WritesFormattedJSONWith2SpaceIndent_Content = readFileSync(configPath!, 'utf-8');
    const expectedContent: Tests_Cli_Commands_ConfigIo_SaveConfig_WritesFormattedJSONWith2SpaceIndent_ExpectedContent = `${JSON.stringify(validConfig, null, 2)}\n`;

    expect(content).toBe(expectedContent);

    return;
  });

  it('writes JSON with trailing newline', () => {
    saveConfig(configPath!, validConfig);

    const content: Tests_Cli_Commands_ConfigIo_SaveConfig_WritesJSONWithTrailingNewline_Content = readFileSync(configPath!, 'utf-8');
    const endsWithNewline: Tests_Cli_Commands_ConfigIo_SaveConfig_WritesJSONWithTrailingNewline_EndsWithNewline = content.endsWith('\n');

    expect(endsWithNewline).toBe(true);

    return;
  });

  it('produces output that loadConfig can read back', () => {
    saveConfig(configPath!, validConfig);

    const result: Tests_Cli_Commands_ConfigIo_SaveConfig_ProducesOutputThatLoadConfigCanReadBack_Result = configSchema.parse(loadConfig(configPath!));

    expect(result).toEqual(validConfig);

    return;
  });

  return;
});
