import {
  existsSync, mkdtempSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import { validateConfig } from '../../../cli/commands/validate.js';

import type {
  Tests_Cli_Commands_Validate_ValidateConfig_ConfigPath,
  Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateShortcodes_ConfigContent,
  Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateShortcodes_DuplicateConfig,
  Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateShortcodes_Result,
  Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateTrackerNames_ConfigContent,
  Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateTrackerNames_DuplicateConfig,
  Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateTrackerNames_Result,
  Tests_Cli_Commands_Validate_ValidateConfig_FailsForInvalidFallbackURL_ConfigContent,
  Tests_Cli_Commands_Validate_ValidateConfig_FailsForInvalidFallbackURL_InvalidConfig,
  Tests_Cli_Commands_Validate_ValidateConfig_FailsForInvalidFallbackURL_Result,
  Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingLinksSection_ConfigContent,
  Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingLinksSection_InvalidConfig,
  Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingLinksSection_Result,
  Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingSettingsFields_ConfigContent,
  Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingSettingsFields_InvalidConfig,
  Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingSettingsFields_Result,
  Tests_Cli_Commands_Validate_ValidateConfig_OsTmpDir,
  Tests_Cli_Commands_Validate_ValidateConfig_PassesForAValidConfig_ConfigContent,
  Tests_Cli_Commands_Validate_ValidateConfig_PassesForAValidConfig_Result,
  Tests_Cli_Commands_Validate_ValidateConfig_PassesForAValidConfig_ValidConfig,
  Tests_Cli_Commands_Validate_ValidateConfig_PassesWithEmptyItemsAndTrackers_ConfigContent,
  Tests_Cli_Commands_Validate_ValidateConfig_PassesWithEmptyItemsAndTrackers_MinimalConfig,
  Tests_Cli_Commands_Validate_ValidateConfig_PassesWithEmptyItemsAndTrackers_Result,
  Tests_Cli_Commands_Validate_ValidateConfig_ReturnsValidTrueWithNoDuplicatesAcrossDifferentShortcodes_ConfigContent,
  Tests_Cli_Commands_Validate_ValidateConfig_ReturnsValidTrueWithNoDuplicatesAcrossDifferentShortcodes_Result,
  Tests_Cli_Commands_Validate_ValidateConfig_ReturnsValidTrueWithNoDuplicatesAcrossDifferentShortcodes_ValidConfig,
  Tests_Cli_Commands_Validate_ValidateConfig_TempDir,
  Tests_Cli_Commands_Validate_ValidateConfig_TempDirPath,
} from '../../../types/tests/cli/commands/validate.test.d.ts';

describe('validateConfig', () => {
  let tempDir: Tests_Cli_Commands_Validate_ValidateConfig_TempDir = undefined;
  let configPath: Tests_Cli_Commands_Validate_ValidateConfig_ConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Commands_Validate_ValidateConfig_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_Validate_ValidateConfig_TempDirPath = join(osTmpDir, 'bsl-test-');

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
    const validConfig: Tests_Cli_Commands_Validate_ValidateConfig_PassesForAValidConfig_ValidConfig = {
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

    const configContent: Tests_Cli_Commands_Validate_ValidateConfig_PassesForAValidConfig_ConfigContent = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: Tests_Cli_Commands_Validate_ValidateConfig_PassesForAValidConfig_Result = validateConfig(configPath!);

    expect(result['valid']).toBe(true);

    expect(result['errors']).toEqual([]);

    return;
  });

  it('fails for missing settings fields', () => {
    const invalidConfig: Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingSettingsFields_InvalidConfig = {
      settings: {
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [],
      },
      trackers: [],
    };

    const configContent: Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingSettingsFields_ConfigContent = JSON.stringify(invalidConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingSettingsFields_Result = validateConfig(configPath!);

    expect(result['valid']).toBe(false);

    expect(result['errors']['length']).toBeGreaterThan(0);

    return;
  });

  it('fails for missing links section', () => {
    const invalidConfig: Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingLinksSection_InvalidConfig = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      trackers: [],
    };

    const configContent: Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingLinksSection_ConfigContent = JSON.stringify(invalidConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: Tests_Cli_Commands_Validate_ValidateConfig_FailsForMissingLinksSection_Result = validateConfig(configPath!);

    expect(result['valid']).toBe(false);

    expect(result['errors']['length']).toBeGreaterThan(0);

    return;
  });

  it('fails for duplicate shortcodes', () => {
    const duplicateConfig: Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateShortcodes_DuplicateConfig = {
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

    const configContent: Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateShortcodes_ConfigContent = JSON.stringify(duplicateConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateShortcodes_Result = validateConfig(configPath!);

    expect(result['valid']).toBe(false);

    expect(result['errors']).toContain('Duplicate shortcode "/gh" found in links.');

    return;
  });

  it('fails for duplicate tracker names', () => {
    const duplicateConfig: Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateTrackerNames_DuplicateConfig = {
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

    const configContent: Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateTrackerNames_ConfigContent = JSON.stringify(duplicateConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: Tests_Cli_Commands_Validate_ValidateConfig_FailsForDuplicateTrackerNames_Result = validateConfig(configPath!);

    expect(result['valid']).toBe(false);

    expect(result['errors']).toContain('Duplicate tracker name "my-tracker" found in trackers.');

    return;
  });

  it('passes with empty items and trackers', () => {
    const minimalConfig: Tests_Cli_Commands_Validate_ValidateConfig_PassesWithEmptyItemsAndTrackers_MinimalConfig = {
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

    const configContent: Tests_Cli_Commands_Validate_ValidateConfig_PassesWithEmptyItemsAndTrackers_ConfigContent = JSON.stringify(minimalConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: Tests_Cli_Commands_Validate_ValidateConfig_PassesWithEmptyItemsAndTrackers_Result = validateConfig(configPath!);

    expect(result['valid']).toBe(true);

    expect(result['errors']).toEqual([]);

    return;
  });

  it('fails for invalid fallback URL', () => {
    const invalidConfig: Tests_Cli_Commands_Validate_ValidateConfig_FailsForInvalidFallbackURL_InvalidConfig = {
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

    const configContent: Tests_Cli_Commands_Validate_ValidateConfig_FailsForInvalidFallbackURL_ConfigContent = JSON.stringify(invalidConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: Tests_Cli_Commands_Validate_ValidateConfig_FailsForInvalidFallbackURL_Result = validateConfig(configPath!);

    expect(result['valid']).toBe(false);

    expect(result['errors']['length']).toBeGreaterThan(0);

    return;
  });

  it('returns valid true with no duplicates across different shortcodes', () => {
    const validConfig: Tests_Cli_Commands_Validate_ValidateConfig_ReturnsValidTrueWithNoDuplicatesAcrossDifferentShortcodes_ValidConfig = {
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

    const configContent: Tests_Cli_Commands_Validate_ValidateConfig_ReturnsValidTrueWithNoDuplicatesAcrossDifferentShortcodes_ConfigContent = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath!, configContent);

    const result: Tests_Cli_Commands_Validate_ValidateConfig_ReturnsValidTrueWithNoDuplicatesAcrossDifferentShortcodes_Result = validateConfig(configPath!);

    expect(result['valid']).toBe(true);

    expect(result['errors']).toEqual([]);

    return;
  });

  return;
});
