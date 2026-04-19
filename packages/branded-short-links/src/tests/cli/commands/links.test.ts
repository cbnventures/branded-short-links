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
  addLink, editLink, getFallbackUrl, listLinks, removeLink, setFallbackUrl,
} from '../../../cli/commands/links.js';
import { configSchema } from '../../../lib/schema.js';

import type {
  TestsCliCommandsLinksConfig,
  TestsCliCommandsLinksConfigPath,
  TestsCliCommandsLinksEmptyConfig,
  TestsCliCommandsLinksItems,
  TestsCliCommandsLinksNewLink,
  TestsCliCommandsLinksTempDir,
  TestsCliCommandsLinksTempDirPath,
  TestsCliCommandsLinksUrl,
  TestsCliCommandsLinksValidConfig,
} from '../../../types/tests/cli/commands/links.test.d.ts';

const validConfig: TestsCliCommandsLinksValidConfig = {
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
        http_response: 302 as const,
        redirect_url: 'https://github.com/example',
      },
      {
        shortcode: '/tw',
        http_response: 301 as const,
        redirect_url: 'https://twitter.com/example',
      },
    ],
  },
  trackers: [],
};

describe('listLinks', () => {
  let tempDir: TestsCliCommandsLinksTempDir = undefined;
  let configPath: TestsCliCommandsLinksConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: TestsCliCommandsLinksTempDirPath = tmpdir();
    const tempDirPath: TestsCliCommandsLinksTempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: TestsCliCommandsLinksConfigPath = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath, configJson);

    return;
  });

  afterEach(() => {
    if (tempDir !== undefined && existsSync(tempDir) === true) {
      rmSync(tempDir, { recursive: true });
    }

    return;
  });

  it('returns the items array', () => {
    const items: TestsCliCommandsLinksItems = listLinks(configPath!);

    expect(items).toEqual(validConfig['links']['items']);

    return;
  });

  it('returns correct number of items', () => {
    const items: TestsCliCommandsLinksItems = listLinks(configPath!);

    expect(items).toHaveLength(2);

    return;
  });

  it('returns empty array when no items', () => {
    const emptyConfig: TestsCliCommandsLinksEmptyConfig = {
      ...validConfig, links: {
        ...validConfig['links'], items: [],
      },
    };

    const configJson: TestsCliCommandsLinksConfigPath = JSON.stringify(emptyConfig, null, 2);

    writeFileSync(configPath!, configJson);

    const items: TestsCliCommandsLinksItems = listLinks(configPath!);

    expect(items).toEqual([]);

    return;
  });

  return;
});

describe('addLink', () => {
  let tempDir: TestsCliCommandsLinksTempDir = undefined;
  let configPath: TestsCliCommandsLinksConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: TestsCliCommandsLinksTempDirPath = tmpdir();
    const tempDirPath: TestsCliCommandsLinksTempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: TestsCliCommandsLinksConfigPath = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath, configJson);

    return;
  });

  afterEach(() => {
    if (tempDir !== undefined && existsSync(tempDir) === true) {
      rmSync(tempDir, { recursive: true });
    }

    return;
  });

  it('adds a link item to the array', () => {
    const newLink: TestsCliCommandsLinksNewLink = {
      shortcode: '/yt',
      http_response: 302 as const,
      redirect_url: 'https://youtube.com/example',
    };

    addLink(configPath!, newLink);

    const items: TestsCliCommandsLinksItems = listLinks(configPath!);

    expect(items).toHaveLength(3);

    expect(items[2]).toEqual(newLink);

    return;
  });

  it('persists the added link to file', () => {
    const newLink: TestsCliCommandsLinksNewLink = {
      shortcode: '/yt',
      http_response: 302 as const,
      redirect_url: 'https://youtube.com/example',
    };

    addLink(configPath!, newLink);

    const config: TestsCliCommandsLinksConfig = configSchema.parse(loadConfig(configPath!));

    expect(config['links']['items']).toHaveLength(3);

    return;
  });

  it('does not affect existing links', () => {
    const newLink: TestsCliCommandsLinksNewLink = {
      shortcode: '/yt',
      http_response: 302 as const,
      redirect_url: 'https://youtube.com/example',
    };

    addLink(configPath!, newLink);

    const items: TestsCliCommandsLinksItems = listLinks(configPath!);

    expect(items[0]).toEqual(validConfig['links']['items'][0]);

    expect(items[1]).toEqual(validConfig['links']['items'][1]);

    return;
  });

  return;
});

describe('editLink', () => {
  let tempDir: TestsCliCommandsLinksTempDir = undefined;
  let configPath: TestsCliCommandsLinksConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: TestsCliCommandsLinksTempDirPath = tmpdir();
    const tempDirPath: TestsCliCommandsLinksTempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: TestsCliCommandsLinksConfigPath = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath, configJson);

    return;
  });

  afterEach(() => {
    if (tempDir !== undefined && existsSync(tempDir) === true) {
      rmSync(tempDir, { recursive: true });
    }

    return;
  });

  it('merges updates into the matching link', () => {
    editLink(configPath!, '/gh', { redirect_url: 'https://github.com/updated' });

    const items: TestsCliCommandsLinksItems = listLinks(configPath!);

    expect(items[0]!['redirect_url']).toBe('https://github.com/updated');

    expect(items[0]!['shortcode']).toBe('/gh');

    expect(items[0]!['http_response']).toBe(302);

    return;
  });

  it('throws if shortcode not found', () => {
    expect(() => editLink(configPath!, '/missing', { redirect_url: 'https://example.com' })).toThrow('Link with shortcode "/missing" not found.');

    return;
  });

  it('does not affect other links', () => {
    editLink(configPath!, '/gh', { redirect_url: 'https://github.com/updated' });

    const items: TestsCliCommandsLinksItems = listLinks(configPath!);

    expect(items[1]).toEqual(validConfig['links']['items'][1]);

    return;
  });

  return;
});

describe('removeLink', () => {
  let tempDir: TestsCliCommandsLinksTempDir = undefined;
  let configPath: TestsCliCommandsLinksConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: TestsCliCommandsLinksTempDirPath = tmpdir();
    const tempDirPath: TestsCliCommandsLinksTempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: TestsCliCommandsLinksConfigPath = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath, configJson);

    return;
  });

  afterEach(() => {
    if (tempDir !== undefined && existsSync(tempDir) === true) {
      rmSync(tempDir, { recursive: true });
    }

    return;
  });

  it('removes a link by shortcode', () => {
    removeLink(configPath!, '/gh');

    const items: TestsCliCommandsLinksItems = listLinks(configPath!);

    expect(items).toHaveLength(1);

    expect(items[0]!['shortcode']).toBe('/tw');

    return;
  });

  it('throws if shortcode not found', () => {
    expect(() => removeLink(configPath!, '/missing')).toThrow('Link with shortcode "/missing" not found.');

    return;
  });

  it('persists the removal to file', () => {
    removeLink(configPath!, '/gh');

    const config: TestsCliCommandsLinksConfig = configSchema.parse(loadConfig(configPath!));

    expect(config['links']['items']).toHaveLength(1);

    return;
  });

  return;
});

describe('getFallbackUrl', () => {
  let tempDir: TestsCliCommandsLinksTempDir = undefined;
  let configPath: TestsCliCommandsLinksConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: TestsCliCommandsLinksTempDirPath = tmpdir();
    const tempDirPath: TestsCliCommandsLinksTempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: TestsCliCommandsLinksConfigPath = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath, configJson);

    return;
  });

  afterEach(() => {
    if (tempDir !== undefined && existsSync(tempDir) === true) {
      rmSync(tempDir, { recursive: true });
    }

    return;
  });

  it('returns the fallback URL', () => {
    const url: TestsCliCommandsLinksUrl = getFallbackUrl(configPath!);

    expect(url).toBe('https://example.com');

    return;
  });

  return;
});

describe('setFallbackUrl', () => {
  let tempDir: TestsCliCommandsLinksTempDir = undefined;
  let configPath: TestsCliCommandsLinksConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: TestsCliCommandsLinksTempDirPath = tmpdir();
    const tempDirPath: TestsCliCommandsLinksTempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: TestsCliCommandsLinksConfigPath = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath, configJson);

    return;
  });

  afterEach(() => {
    if (tempDir !== undefined && existsSync(tempDir) === true) {
      rmSync(tempDir, { recursive: true });
    }

    return;
  });

  it('updates the fallback URL', () => {
    setFallbackUrl(configPath!, 'https://new-fallback.com');

    const url: TestsCliCommandsLinksUrl = getFallbackUrl(configPath!);

    expect(url).toBe('https://new-fallback.com');

    return;
  });

  it('persists the fallback URL to file', () => {
    setFallbackUrl(configPath!, 'https://new-fallback.com');

    const config: TestsCliCommandsLinksConfig = configSchema.parse(loadConfig(configPath!));

    expect(config['links']['fallback_url']).toBe('https://new-fallback.com');

    return;
  });

  it('does not affect link items', () => {
    setFallbackUrl(configPath!, 'https://new-fallback.com');

    const config: TestsCliCommandsLinksConfig = configSchema.parse(loadConfig(configPath!));

    expect(config['links']['items']).toEqual(validConfig['links']['items']);

    return;
  });

  return;
});
