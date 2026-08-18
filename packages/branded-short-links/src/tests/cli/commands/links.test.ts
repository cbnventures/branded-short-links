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
  addLink, editLink, getFallbackUrl, listLinks, removeLink, setFallbackUrl,
} from '../../../cli/commands/links.js';
import { configSchema } from '../../../lib/schema.js';

import type {
  Tests_Cli_Commands_Links_AddLink_AddsALinkItemToTheArray_Items,
  Tests_Cli_Commands_Links_AddLink_AddsALinkItemToTheArray_NewLink,
  Tests_Cli_Commands_Links_AddLink_DoesNotAffectExistingLinks_Items,
  Tests_Cli_Commands_Links_AddLink_DoesNotAffectExistingLinks_NewLink,
  Tests_Cli_Commands_Links_AddLink_PersistsTheAddedLinkToFile_Config,
  Tests_Cli_Commands_Links_AddLink_PersistsTheAddedLinkToFile_NewLink,
  Tests_Cli_Commands_Links_ConfigJson,
  Tests_Cli_Commands_Links_ConfigPath,
  Tests_Cli_Commands_Links_EditLink_DoesNotAffectOtherLinks_Items,
  Tests_Cli_Commands_Links_EditLink_MergesUpdatesIntoTheMatchingLink_Items,
  Tests_Cli_Commands_Links_GetFallbackUrl_ReturnsTheFallbackURL_Url,
  Tests_Cli_Commands_Links_ListLinks_ReturnsCorrectNumberOfItems_Items,
  Tests_Cli_Commands_Links_ListLinks_ReturnsEmptyArrayWhenNoItems_EmptyConfig,
  Tests_Cli_Commands_Links_ListLinks_ReturnsEmptyArrayWhenNoItems_Items,
  Tests_Cli_Commands_Links_ListLinks_ReturnsTheItemsArray_Items,
  Tests_Cli_Commands_Links_OsTmpDir,
  Tests_Cli_Commands_Links_RemoveLink_PersistsTheRemovalToFile_Config,
  Tests_Cli_Commands_Links_RemoveLink_RemovesALinkByShortcode_Items,
  Tests_Cli_Commands_Links_SetFallbackUrl_DoesNotAffectLinkItems_Config,
  Tests_Cli_Commands_Links_SetFallbackUrl_PersistsTheFallbackURLToFile_Config,
  Tests_Cli_Commands_Links_SetFallbackUrl_UpdatesTheFallbackURL_Url,
  Tests_Cli_Commands_Links_TempDir,
  Tests_Cli_Commands_Links_TempDirPath,
  Tests_Cli_Commands_Links_ValidConfig,
} from '../../../types/tests/cli/commands/links.test.d.ts';

const validConfig: Tests_Cli_Commands_Links_ValidConfig = {
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
  let tempDir: Tests_Cli_Commands_Links_TempDir = undefined;
  let configPath: Tests_Cli_Commands_Links_ConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Commands_Links_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_Links_TempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: Tests_Cli_Commands_Links_ConfigJson = JSON.stringify(validConfig, null, 2);

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
    const items: Tests_Cli_Commands_Links_ListLinks_ReturnsTheItemsArray_Items = listLinks(configPath!);

    expect(items).toEqual(validConfig['links']['items']);

    return;
  });

  it('returns correct number of items', () => {
    const items: Tests_Cli_Commands_Links_ListLinks_ReturnsCorrectNumberOfItems_Items = listLinks(configPath!);

    expect(items).toHaveLength(2);

    return;
  });

  it('returns empty array when no items', () => {
    const emptyConfig: Tests_Cli_Commands_Links_ListLinks_ReturnsEmptyArrayWhenNoItems_EmptyConfig = {
      ...validConfig,
      links: {
        ...validConfig['links'],
        items: [],
      },
    };

    const configJson: Tests_Cli_Commands_Links_ConfigJson = JSON.stringify(emptyConfig, null, 2);

    writeFileSync(configPath!, configJson);

    const items: Tests_Cli_Commands_Links_ListLinks_ReturnsEmptyArrayWhenNoItems_Items = listLinks(configPath!);

    expect(items).toEqual([]);

    return;
  });

  return;
});

describe('addLink', () => {
  let tempDir: Tests_Cli_Commands_Links_TempDir = undefined;
  let configPath: Tests_Cli_Commands_Links_ConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Commands_Links_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_Links_TempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: Tests_Cli_Commands_Links_ConfigJson = JSON.stringify(validConfig, null, 2);

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
    const newLink: Tests_Cli_Commands_Links_AddLink_AddsALinkItemToTheArray_NewLink = {
      shortcode: '/yt',
      http_response: 302 as const,
      redirect_url: 'https://youtube.com/example',
    };

    addLink(configPath!, newLink);

    const items: Tests_Cli_Commands_Links_AddLink_AddsALinkItemToTheArray_Items = listLinks(configPath!);

    expect(items).toHaveLength(3);

    expect(items[2]).toEqual(newLink);

    return;
  });

  it('persists the added link to file', () => {
    const newLink: Tests_Cli_Commands_Links_AddLink_PersistsTheAddedLinkToFile_NewLink = {
      shortcode: '/yt',
      http_response: 302 as const,
      redirect_url: 'https://youtube.com/example',
    };

    addLink(configPath!, newLink);

    const config: Tests_Cli_Commands_Links_AddLink_PersistsTheAddedLinkToFile_Config = configSchema.parse(loadConfig(configPath!));

    expect(config['links']['items']).toHaveLength(3);

    return;
  });

  it('does not affect existing links', () => {
    const newLink: Tests_Cli_Commands_Links_AddLink_DoesNotAffectExistingLinks_NewLink = {
      shortcode: '/yt',
      http_response: 302 as const,
      redirect_url: 'https://youtube.com/example',
    };

    addLink(configPath!, newLink);

    const items: Tests_Cli_Commands_Links_AddLink_DoesNotAffectExistingLinks_Items = listLinks(configPath!);

    expect(items[0]).toEqual(validConfig['links']['items'][0]);

    expect(items[1]).toEqual(validConfig['links']['items'][1]);

    return;
  });

  return;
});

describe('editLink', () => {
  let tempDir: Tests_Cli_Commands_Links_TempDir = undefined;
  let configPath: Tests_Cli_Commands_Links_ConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Commands_Links_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_Links_TempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: Tests_Cli_Commands_Links_ConfigJson = JSON.stringify(validConfig, null, 2);

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

    const items: Tests_Cli_Commands_Links_EditLink_MergesUpdatesIntoTheMatchingLink_Items = listLinks(configPath!);

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

    const items: Tests_Cli_Commands_Links_EditLink_DoesNotAffectOtherLinks_Items = listLinks(configPath!);

    expect(items[1]).toEqual(validConfig['links']['items'][1]);

    return;
  });

  return;
});

describe('removeLink', () => {
  let tempDir: Tests_Cli_Commands_Links_TempDir = undefined;
  let configPath: Tests_Cli_Commands_Links_ConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Commands_Links_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_Links_TempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: Tests_Cli_Commands_Links_ConfigJson = JSON.stringify(validConfig, null, 2);

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

    const items: Tests_Cli_Commands_Links_RemoveLink_RemovesALinkByShortcode_Items = listLinks(configPath!);

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

    const config: Tests_Cli_Commands_Links_RemoveLink_PersistsTheRemovalToFile_Config = configSchema.parse(loadConfig(configPath!));

    expect(config['links']['items']).toHaveLength(1);

    return;
  });

  return;
});

describe('getFallbackUrl', () => {
  let tempDir: Tests_Cli_Commands_Links_TempDir = undefined;
  let configPath: Tests_Cli_Commands_Links_ConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Commands_Links_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_Links_TempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: Tests_Cli_Commands_Links_ConfigJson = JSON.stringify(validConfig, null, 2);

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
    const url: Tests_Cli_Commands_Links_GetFallbackUrl_ReturnsTheFallbackURL_Url = getFallbackUrl(configPath!);

    expect(url).toBe('https://example.com');

    return;
  });

  return;
});

describe('setFallbackUrl', () => {
  let tempDir: Tests_Cli_Commands_Links_TempDir = undefined;
  let configPath: Tests_Cli_Commands_Links_ConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Commands_Links_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_Links_TempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');

    const configJson: Tests_Cli_Commands_Links_ConfigJson = JSON.stringify(validConfig, null, 2);

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

    const url: Tests_Cli_Commands_Links_SetFallbackUrl_UpdatesTheFallbackURL_Url = getFallbackUrl(configPath!);

    expect(url).toBe('https://new-fallback.com');

    return;
  });

  it('persists the fallback URL to file', () => {
    setFallbackUrl(configPath!, 'https://new-fallback.com');

    const config: Tests_Cli_Commands_Links_SetFallbackUrl_PersistsTheFallbackURLToFile_Config = configSchema.parse(loadConfig(configPath!));

    expect(config['links']['fallback_url']).toBe('https://new-fallback.com');

    return;
  });

  it('does not affect link items', () => {
    setFallbackUrl(configPath!, 'https://new-fallback.com');

    const config: Tests_Cli_Commands_Links_SetFallbackUrl_DoesNotAffectLinkItems_Config = configSchema.parse(loadConfig(configPath!));

    expect(config['links']['items']).toEqual(validConfig['links']['items']);

    return;
  });

  return;
});
