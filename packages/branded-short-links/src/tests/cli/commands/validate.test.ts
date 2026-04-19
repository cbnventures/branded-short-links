import {
  existsSync, mkdtempSync, rmSync, writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import { validateConfig } from '../../../cli/commands/validate.js';

import type {
  TestsCliCommandsValidateConfigContent,
  TestsCliCommandsValidateConfigPath,
  TestsCliCommandsValidateDuplicateConfig,
  TestsCliCommandsValidateInvalidConfig,
  TestsCliCommandsValidateMinimalConfig,
  TestsCliCommandsValidateResult,
  TestsCliCommandsValidateTempDir,
  TestsCliCommandsValidateTempDirPath,
  TestsCliCommandsValidateValidConfig,
} from '../../../types/tests/cli/commands/validate.test.d.ts';

describe('validateConfig', () => {
  let tempDir: TestsCliCommandsValidateTempDir = undefined;
  let configPath: TestsCliCommandsValidateConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: TestsCliCommandsValidateTempDirPath = tmpdir();
    const tempDirPath: TestsCliCommandsValidateTempDirPath = join(osTmpDir, 'bsl-test-');

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

  it('passes for a valid config', () => {
    const validConfig: TestsCliCommandsValidateValidConfig = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [{
          shortcode: '/gh',
          http_response: 302,
          redirect_url: 'https://github.com/example',
        }],
      },
      trackers: [{
        name: 'ga4-tracker',
        type: 'ga4',
        measurement_id: 'G-XXXXXXXXXX',
        api_secret: 'secret123',
      }],
    };

    const configContent: TestsCliCommandsValidateConfigContent = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: TestsCliCommandsValidateResult = validateConfig(configPath!);

    expect(result['valid']).toBe(true);

    expect(result['errors']).toEqual([]);

    return;
  });

  it('fails for missing settings fields', () => {
    const invalidConfig: TestsCliCommandsValidateInvalidConfig = {
      settings: {
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [],
      },
      trackers: [],
    };

    const configContent: TestsCliCommandsValidateConfigContent = JSON.stringify(invalidConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: TestsCliCommandsValidateResult = validateConfig(configPath!);

    expect(result['valid']).toBe(false);

    expect(result['errors']['length']).toBeGreaterThan(0);

    return;
  });

  it('fails for missing links section', () => {
    const invalidConfig: TestsCliCommandsValidateInvalidConfig = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      trackers: [],
    };

    const configContent: TestsCliCommandsValidateConfigContent = JSON.stringify(invalidConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: TestsCliCommandsValidateResult = validateConfig(configPath!);

    expect(result['valid']).toBe(false);

    expect(result['errors']['length']).toBeGreaterThan(0);

    return;
  });

  it('fails for duplicate shortcodes', () => {
    const duplicateConfig: TestsCliCommandsValidateDuplicateConfig = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [
          {
            shortcode: '/gh',
            http_response: 302,
            redirect_url: 'https://github.com/example',
          },
          {
            shortcode: '/gh',
            http_response: 301,
            redirect_url: 'https://github.com/other',
          },
        ],
      },
      trackers: [],
    };

    const configContent: TestsCliCommandsValidateConfigContent = JSON.stringify(duplicateConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: TestsCliCommandsValidateResult = validateConfig(configPath!);

    expect(result['valid']).toBe(false);

    expect(result['errors']).toContain('Duplicate shortcode "/gh" found in links.');

    return;
  });

  it('fails for duplicate tracker names', () => {
    const duplicateConfig: TestsCliCommandsValidateDuplicateConfig = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [],
      },
      trackers: [
        {
          name: 'my-tracker',
          type: 'ga4',
          measurement_id: 'G-XXXXXXXXXX',
          api_secret: 'secret123',
        },
        {
          name: 'my-tracker',
          type: 'facebook',
          pixel_id: '1234567890',
        },
      ],
    };

    const configContent: TestsCliCommandsValidateConfigContent = JSON.stringify(duplicateConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: TestsCliCommandsValidateResult = validateConfig(configPath!);

    expect(result['valid']).toBe(false);

    expect(result['errors']).toContain('Duplicate tracker name "my-tracker" found in trackers.');

    return;
  });

  it('passes with empty items and trackers', () => {
    const minimalConfig: TestsCliCommandsValidateMinimalConfig = {
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

    const configContent: TestsCliCommandsValidateConfigContent = JSON.stringify(minimalConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: TestsCliCommandsValidateResult = validateConfig(configPath!);

    expect(result['valid']).toBe(true);

    expect(result['errors']).toEqual([]);

    return;
  });

  it('fails for invalid fallback URL', () => {
    const invalidConfig: TestsCliCommandsValidateInvalidConfig = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'not-a-url',
        items: [],
      },
      trackers: [],
    };

    const configContent: TestsCliCommandsValidateConfigContent = JSON.stringify(invalidConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: TestsCliCommandsValidateResult = validateConfig(configPath!);

    expect(result['valid']).toBe(false);

    expect(result['errors']['length']).toBeGreaterThan(0);

    return;
  });

  it('returns valid true with no duplicates across different shortcodes', () => {
    const validConfig: TestsCliCommandsValidateValidConfig = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [
          {
            shortcode: '/gh',
            http_response: 302,
            redirect_url: 'https://github.com/example',
          },
          {
            shortcode: '/tw',
            http_response: 301,
            redirect_url: 'https://twitter.com/example',
          },
        ],
      },
      trackers: [
        {
          name: 'ga4-tracker',
          type: 'ga4',
          measurement_id: 'G-XXXXXXXXXX',
          api_secret: 'secret123',
        },
        {
          name: 'fb-tracker',
          type: 'facebook',
          pixel_id: '1234567890',
        },
      ],
    };

    const configContent: TestsCliCommandsValidateConfigContent = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: TestsCliCommandsValidateResult = validateConfig(configPath!);

    expect(result['valid']).toBe(true);

    expect(result['errors']).toEqual([]);

    return;
  });

  return;
});
