import {
  existsSync, mkdtempSync, rmSync, writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import { loadConfig } from '../../../cli/commands/config-io.js';
import {
  addTracker, editTracker, listTrackers, removeTracker,
} from '../../../cli/commands/trackers.js';
import { configSchema } from '../../../lib/schema.js';

import type {
  TestsCliCommandsTrackersConfig,
  TestsCliCommandsTrackersConfigPath,
  TestsCliCommandsTrackersEmptyConfig,
  TestsCliCommandsTrackersGa4ApiSecret,
  TestsCliCommandsTrackersGa4Record,
  TestsCliCommandsTrackersGa4Tracker,
  TestsCliCommandsTrackersNewNtfyTracker,
  TestsCliCommandsTrackersNewPosthogTracker,
  TestsCliCommandsTrackersTempDir,
  TestsCliCommandsTrackersTempDirPath,
  TestsCliCommandsTrackersTrackers,
  TestsCliCommandsTrackersUnknown,
  TestsCliCommandsTrackersValidConfig,
} from '../../../types/tests/cli/commands/trackers.test.d.ts';

const validConfig: TestsCliCommandsTrackersValidConfig = {
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
  let tempDir: TestsCliCommandsTrackersTempDir = undefined;
  let configPath: TestsCliCommandsTrackersConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: TestsCliCommandsTrackersTempDirPath = tmpdir();
    const tempDirPath: TestsCliCommandsTrackersTempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: TestsCliCommandsTrackersConfigPath = JSON.stringify(validConfig, null, 2);

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
    const trackers: TestsCliCommandsTrackersTrackers = listTrackers(configPath!);

    expect(trackers).toEqual(validConfig['trackers']);

    return;
  });

  it('returns correct number of trackers', () => {
    const trackers: TestsCliCommandsTrackersTrackers = listTrackers(configPath!);

    expect(trackers).toHaveLength(2);

    return;
  });

  it('returns empty array when no trackers', () => {
    const emptyConfig: TestsCliCommandsTrackersEmptyConfig = {
      ...validConfig, trackers: [],
    };

    const configJson: TestsCliCommandsTrackersConfigPath = JSON.stringify(emptyConfig, null, 2);

    writeFileSync(configPath!, configJson);

    const trackers: TestsCliCommandsTrackersTrackers = listTrackers(configPath!);

    expect(trackers).toEqual([]);

    return;
  });

  return;
});

describe('addTracker', () => {
  let tempDir: TestsCliCommandsTrackersTempDir = undefined;
  let configPath: TestsCliCommandsTrackersConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: TestsCliCommandsTrackersTempDirPath = tmpdir();
    const tempDirPath: TestsCliCommandsTrackersTempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: TestsCliCommandsTrackersConfigPath = JSON.stringify(validConfig, null, 2);

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
    const newTracker: TestsCliCommandsTrackersNewNtfyTracker = {
      name: 'ntfy-tracker',
      type: 'ntfy' as const,
      server: 'https://ntfy.example.com',
      topic: 'bsl-clicks',
      token: 'tk_abc123',
    };

    addTracker(configPath!, newTracker);

    const trackers: TestsCliCommandsTrackersTrackers = listTrackers(configPath!);

    expect(trackers).toHaveLength(3);

    expect(trackers[2]).toEqual(newTracker);

    return;
  });

  it('persists the added tracker to file', () => {
    const newTracker: TestsCliCommandsTrackersNewPosthogTracker = {
      name: 'posthog-tracker',
      type: 'posthog' as const,
      host: 'https://app.posthog.com',
      api_key: 'phc_abc123',
    };

    addTracker(configPath!, newTracker);

    const config: TestsCliCommandsTrackersConfig = configSchema.parse(loadConfig(configPath!));

    expect(config['trackers']).toHaveLength(3);

    return;
  });

  it('does not affect existing trackers', () => {
    const newTracker: TestsCliCommandsTrackersNewNtfyTracker = {
      name: 'ntfy-tracker',
      type: 'ntfy' as const,
      server: 'https://ntfy.example.com',
      topic: 'bsl-clicks',
      token: 'tk_abc123',
    };

    addTracker(configPath!, newTracker);

    const trackers: TestsCliCommandsTrackersTrackers = listTrackers(configPath!);

    expect(trackers[0]).toEqual(validConfig['trackers'][0]);

    expect(trackers[1]).toEqual(validConfig['trackers'][1]);

    return;
  });

  return;
});

describe('editTracker', () => {
  let tempDir: TestsCliCommandsTrackersTempDir = undefined;
  let configPath: TestsCliCommandsTrackersConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: TestsCliCommandsTrackersTempDirPath = tmpdir();
    const tempDirPath: TestsCliCommandsTrackersTempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: TestsCliCommandsTrackersConfigPath = JSON.stringify(validConfig, null, 2);

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

    const trackers: TestsCliCommandsTrackersTrackers = listTrackers(configPath!);
    const ga4: TestsCliCommandsTrackersGa4Tracker = trackers.find((tracker) => tracker['name'] === 'ga4-tracker') as TestsCliCommandsTrackersGa4Tracker;

    expect(ga4).toBeDefined();

    const ga4Unknown: TestsCliCommandsTrackersUnknown = ga4;
    const ga4AsRecord: TestsCliCommandsTrackersGa4Record = ga4Unknown as TestsCliCommandsTrackersGa4Record;
    const ga4ApiSecret: TestsCliCommandsTrackersGa4ApiSecret = ga4AsRecord['api_secret']!;

    expect(ga4ApiSecret).toBe('new-secret');

    return;
  });

  it('throws if tracker name not found', () => {
    expect(() => editTracker(configPath!, 'missing-tracker', { name: 'updated' })).toThrow('Tracker with name "missing-tracker" not found.');

    return;
  });

  it('does not affect other trackers', () => {
    editTracker(configPath!, 'ga4-tracker', { api_secret: 'new-secret' });

    const trackers: TestsCliCommandsTrackersTrackers = listTrackers(configPath!);

    expect(trackers[0]).toEqual(validConfig['trackers'][0]);

    return;
  });

  return;
});

describe('removeTracker', () => {
  let tempDir: TestsCliCommandsTrackersTempDir = undefined;
  let configPath: TestsCliCommandsTrackersConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: TestsCliCommandsTrackersTempDirPath = tmpdir();
    const tempDirPath: TestsCliCommandsTrackersTempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: TestsCliCommandsTrackersConfigPath = JSON.stringify(validConfig, null, 2);

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

    const trackers: TestsCliCommandsTrackersTrackers = listTrackers(configPath!);

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

    const config: TestsCliCommandsTrackersConfig = configSchema.parse(loadConfig(configPath!));

    expect(config['trackers']).toHaveLength(1);

    return;
  });

  return;
});
