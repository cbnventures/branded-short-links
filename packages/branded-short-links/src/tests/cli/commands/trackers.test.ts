import {
  existsSync, mkdtempSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import { loadConfig } from '../../../cli/commands/config-io.js';
import {
  addTracker, editTracker, listTrackers, removeTracker,
} from '../../../cli/commands/trackers.js';
import { configSchema } from '../../../lib/schema.js';

import type {
  Tests_Cli_Commands_Trackers_AddTracker_AddsATrackerToTheArray_NewTracker,
  Tests_Cli_Commands_Trackers_AddTracker_AddsATrackerToTheArray_Trackers,
  Tests_Cli_Commands_Trackers_AddTracker_DoesNotAffectExistingTrackers_NewTracker,
  Tests_Cli_Commands_Trackers_AddTracker_DoesNotAffectExistingTrackers_Trackers,
  Tests_Cli_Commands_Trackers_AddTracker_PersistsTheAddedTrackerToFile_Config,
  Tests_Cli_Commands_Trackers_AddTracker_PersistsTheAddedTrackerToFile_NewTracker,
  Tests_Cli_Commands_Trackers_ConfigJson,
  Tests_Cli_Commands_Trackers_ConfigPath,
  Tests_Cli_Commands_Trackers_EditTracker_DoesNotAffectOtherTrackers_Trackers,
  Tests_Cli_Commands_Trackers_EditTracker_MergesUpdatesIntoTheMatchingTracker_Ga4,
  Tests_Cli_Commands_Trackers_EditTracker_MergesUpdatesIntoTheMatchingTracker_Ga4ApiSecret,
  Tests_Cli_Commands_Trackers_EditTracker_MergesUpdatesIntoTheMatchingTracker_Ga4AsRecord,
  Tests_Cli_Commands_Trackers_EditTracker_MergesUpdatesIntoTheMatchingTracker_Ga4Unknown,
  Tests_Cli_Commands_Trackers_EditTracker_MergesUpdatesIntoTheMatchingTracker_Trackers,
  Tests_Cli_Commands_Trackers_ListTrackers_ReturnsCorrectNumberOfTrackers_Trackers,
  Tests_Cli_Commands_Trackers_ListTrackers_ReturnsEmptyArrayWhenNoTrackers_EmptyConfig,
  Tests_Cli_Commands_Trackers_ListTrackers_ReturnsEmptyArrayWhenNoTrackers_Trackers,
  Tests_Cli_Commands_Trackers_ListTrackers_ReturnsTheTrackersArray_Trackers,
  Tests_Cli_Commands_Trackers_OsTmpDir,
  Tests_Cli_Commands_Trackers_RemoveTracker_PersistsTheRemovalToFile_Config,
  Tests_Cli_Commands_Trackers_RemoveTracker_RemovesATrackerByName_Trackers,
  Tests_Cli_Commands_Trackers_TempDir,
  Tests_Cli_Commands_Trackers_TempDirPath,
  Tests_Cli_Commands_Trackers_ValidConfig,
} from '../../../types/tests/cli/commands/trackers.test.d.ts';

const validConfig: Tests_Cli_Commands_Trackers_ValidConfig = {
  links: {
    fallback_url: 'https://example.com',
    items: [],
  },
  trackers: [
    {
      type: 'facebook' as const,
      name: 'fb-tracker',
      pixel_id: '1234567890',
    },
    {
      type: 'ga4' as const,
      name: 'ga4-tracker',
      measurement_id: 'G-XXXXXXXXXX',
      api_secret: 'secret123',
    },
  ],
  settings: {
    worker_name: 'test-worker',
    base_domain: 'bsl.example.com',
    show_response_output: false,
  },
};

describe('listTrackers', () => {
  let tempDir: Tests_Cli_Commands_Trackers_TempDir = undefined;
  let configPath: Tests_Cli_Commands_Trackers_ConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Commands_Trackers_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_Trackers_TempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: Tests_Cli_Commands_Trackers_ConfigJson = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath, configJson);

    return;
  });

  afterEach(() => {
    if (tempDir !== undefined && existsSync(tempDir) === true) {
      rmSync(tempDir, { recursive: true });
    }

    return;
  });

  it('returns the trackers array', () => {
    const trackers: Tests_Cli_Commands_Trackers_ListTrackers_ReturnsTheTrackersArray_Trackers = listTrackers(configPath!);

    expect(trackers).toEqual(validConfig['trackers']);

    return;
  });

  it('returns correct number of trackers', () => {
    const trackers: Tests_Cli_Commands_Trackers_ListTrackers_ReturnsCorrectNumberOfTrackers_Trackers = listTrackers(configPath!);

    expect(trackers).toHaveLength(2);

    return;
  });

  it('returns empty array when no trackers', () => {
    const emptyConfig: Tests_Cli_Commands_Trackers_ListTrackers_ReturnsEmptyArrayWhenNoTrackers_EmptyConfig = {
      ...validConfig,
      trackers: [],
    };

    const configJson: Tests_Cli_Commands_Trackers_ConfigJson = JSON.stringify(emptyConfig, null, 2);

    writeFileSync(configPath!, configJson);

    const trackers: Tests_Cli_Commands_Trackers_ListTrackers_ReturnsEmptyArrayWhenNoTrackers_Trackers = listTrackers(configPath!);

    expect(trackers).toEqual([]);

    return;
  });

  return;
});

describe('addTracker', () => {
  let tempDir: Tests_Cli_Commands_Trackers_TempDir = undefined;
  let configPath: Tests_Cli_Commands_Trackers_ConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Commands_Trackers_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_Trackers_TempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: Tests_Cli_Commands_Trackers_ConfigJson = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath, configJson);

    return;
  });

  afterEach(() => {
    if (tempDir !== undefined && existsSync(tempDir) === true) {
      rmSync(tempDir, { recursive: true });
    }

    return;
  });

  it('adds a tracker to the array', () => {
    const newTracker: Tests_Cli_Commands_Trackers_AddTracker_AddsATrackerToTheArray_NewTracker = {
      name: 'ntfy-tracker',
      type: 'ntfy' as const,
      server: 'https://ntfy.example.com',
      topic: 'bsl-clicks',
      token: 'tk_abc123',
    };

    addTracker(configPath!, newTracker);

    const trackers: Tests_Cli_Commands_Trackers_AddTracker_AddsATrackerToTheArray_Trackers = listTrackers(configPath!);

    expect(trackers).toHaveLength(3);

    expect(trackers[2]).toEqual(newTracker);

    return;
  });

  it('persists the added tracker to file', () => {
    const newTracker: Tests_Cli_Commands_Trackers_AddTracker_PersistsTheAddedTrackerToFile_NewTracker = {
      name: 'posthog-tracker',
      type: 'posthog' as const,
      host: 'https://app.posthog.com',
      api_key: 'phc_abc123',
    };

    addTracker(configPath!, newTracker);

    const config: Tests_Cli_Commands_Trackers_AddTracker_PersistsTheAddedTrackerToFile_Config = configSchema.parse(loadConfig(configPath!));

    expect(config['trackers']).toHaveLength(3);

    return;
  });

  it('does not affect existing trackers', () => {
    const newTracker: Tests_Cli_Commands_Trackers_AddTracker_DoesNotAffectExistingTrackers_NewTracker = {
      name: 'ntfy-tracker',
      type: 'ntfy' as const,
      server: 'https://ntfy.example.com',
      topic: 'bsl-clicks',
      token: 'tk_abc123',
    };

    addTracker(configPath!, newTracker);

    const trackers: Tests_Cli_Commands_Trackers_AddTracker_DoesNotAffectExistingTrackers_Trackers = listTrackers(configPath!);

    expect(trackers[0]).toEqual(validConfig['trackers'][0]);

    expect(trackers[1]).toEqual(validConfig['trackers'][1]);

    return;
  });

  return;
});

describe('editTracker', () => {
  let tempDir: Tests_Cli_Commands_Trackers_TempDir = undefined;
  let configPath: Tests_Cli_Commands_Trackers_ConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Commands_Trackers_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_Trackers_TempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: Tests_Cli_Commands_Trackers_ConfigJson = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath, configJson);

    return;
  });

  afterEach(() => {
    if (tempDir !== undefined && existsSync(tempDir) === true) {
      rmSync(tempDir, { recursive: true });
    }

    return;
  });

  it('merges updates into the matching tracker', () => {
    editTracker(configPath!, 'ga4-tracker', { api_secret: 'new-secret' });

    const trackers: Tests_Cli_Commands_Trackers_EditTracker_MergesUpdatesIntoTheMatchingTracker_Trackers = listTrackers(configPath!);
    const ga4: Tests_Cli_Commands_Trackers_EditTracker_MergesUpdatesIntoTheMatchingTracker_Ga4 = trackers.find((tracker) => tracker['name'] === 'ga4-tracker') as Tests_Cli_Commands_Trackers_EditTracker_MergesUpdatesIntoTheMatchingTracker_Ga4;

    expect(ga4).toBeDefined();

    const ga4Unknown: Tests_Cli_Commands_Trackers_EditTracker_MergesUpdatesIntoTheMatchingTracker_Ga4Unknown = ga4;
    const ga4AsRecord: Tests_Cli_Commands_Trackers_EditTracker_MergesUpdatesIntoTheMatchingTracker_Ga4AsRecord = ga4Unknown as Tests_Cli_Commands_Trackers_EditTracker_MergesUpdatesIntoTheMatchingTracker_Ga4AsRecord;
    const ga4ApiSecret: Tests_Cli_Commands_Trackers_EditTracker_MergesUpdatesIntoTheMatchingTracker_Ga4ApiSecret = ga4AsRecord['api_secret']!;

    expect(ga4ApiSecret).toBe('new-secret');

    return;
  });

  it('throws if tracker name not found', () => {
    expect(() => editTracker(configPath!, 'missing-tracker', { name: 'updated' })).toThrow('Tracker with name "missing-tracker" not found.');

    return;
  });

  it('does not affect other trackers', () => {
    editTracker(configPath!, 'ga4-tracker', { api_secret: 'new-secret' });

    const trackers: Tests_Cli_Commands_Trackers_EditTracker_DoesNotAffectOtherTrackers_Trackers = listTrackers(configPath!);

    expect(trackers[0]).toEqual(validConfig['trackers'][0]);

    return;
  });

  return;
});

describe('removeTracker', () => {
  let tempDir: Tests_Cli_Commands_Trackers_TempDir = undefined;
  let configPath: Tests_Cli_Commands_Trackers_ConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Commands_Trackers_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_Trackers_TempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: Tests_Cli_Commands_Trackers_ConfigJson = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath, configJson);

    return;
  });

  afterEach(() => {
    if (tempDir !== undefined && existsSync(tempDir) === true) {
      rmSync(tempDir, { recursive: true });
    }

    return;
  });

  it('removes a tracker by name', () => {
    removeTracker(configPath!, 'ga4-tracker');

    const trackers: Tests_Cli_Commands_Trackers_RemoveTracker_RemovesATrackerByName_Trackers = listTrackers(configPath!);

    expect(trackers).toHaveLength(1);

    expect(trackers[0]!['name']).toBe('fb-tracker');

    return;
  });

  it('throws if tracker name not found', () => {
    expect(() => removeTracker(configPath!, 'missing-tracker')).toThrow('Tracker with name "missing-tracker" not found.');

    return;
  });

  it('persists the removal to file', () => {
    removeTracker(configPath!, 'ga4-tracker');

    const config: Tests_Cli_Commands_Trackers_RemoveTracker_PersistsTheRemovalToFile_Config = configSchema.parse(loadConfig(configPath!));

    expect(config['trackers']).toHaveLength(1);

    return;
  });

  return;
});
