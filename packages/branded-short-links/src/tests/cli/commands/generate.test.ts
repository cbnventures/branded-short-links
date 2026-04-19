import {
  existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import { generateWranglerToml } from '../../../cli/commands/generate.js';

import type {
  TestsCliCommandsGenerateConfigContent,
  TestsCliCommandsGenerateConfigPath,
  TestsCliCommandsGenerateCustomPath,
  TestsCliCommandsGenerateCustomPathExists,
  TestsCliCommandsGenerateEndsWithNewline,
  TestsCliCommandsGenerateExpected,
  TestsCliCommandsGenerateInnerJson,
  TestsCliCommandsGenerateOutput,
  TestsCliCommandsGenerateOutputPath,
  TestsCliCommandsGenerateTempDir,
  TestsCliCommandsGenerateTempDirPath,
  TestsCliCommandsGenerateValidConfig,
} from '../../../types/tests/cli/commands/generate.test.d.ts';

describe('generateWranglerToml', () => {
  let tempDir: TestsCliCommandsGenerateTempDir = undefined;
  let configPath: TestsCliCommandsGenerateConfigPath = undefined;
  let outputPath: TestsCliCommandsGenerateOutputPath = undefined;

  const validConfig: TestsCliCommandsGenerateValidConfig = {
    links: {
      fallback_url: 'https://example.com',
      items: [{
        shortcode: '/gh',
        http_response: 302,
        redirect_url: 'https://github.com/example',
      }],
    },
    trackers: [{
      type: 'ga4' as const,
      name: 'ga4-tracker',
      measurement_id: 'G-XXXXXXXXXX',
      api_secret: 'secret123',
    }],
    settings: {
      worker_name: 'test-worker',
      base_domain: 'bsl.example.com',
      show_response_output: false,
    },
  };

  beforeEach(() => {
    const osTmpDir: TestsCliCommandsGenerateTempDirPath = tmpdir();
    const tempDirPath: TestsCliCommandsGenerateTempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');
    outputPath = join(tempDir, 'wrangler.toml');

    const configContent: TestsCliCommandsGenerateConfigContent = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath, configContent);

    return;
  });

  afterEach(() => {
    if (tempDir !== undefined && existsSync(tempDir) === true) {
      rmSync(tempDir, { recursive: true });
    }

    return;
  });

  it('output contains name = "branded-short-links"', () => {
    generateWranglerToml(configPath!, outputPath);

    const output: TestsCliCommandsGenerateOutput = readFileSync(outputPath!, 'utf-8');

    expect(output).toContain('name = "test-worker"');

    return;
  });

  it('output contains main = "packages/branded-short-links/build/src/worker/index.js"', () => {
    generateWranglerToml(configPath!, outputPath);

    const output: TestsCliCommandsGenerateOutput = readFileSync(outputPath!, 'utf-8');

    expect(output).toContain('main = "packages/branded-short-links/build/src/worker/index.js"');

    return;
  });

  it('routes include base_domain but not www.base_domain for subdomain', () => {
    generateWranglerToml(configPath!, outputPath);

    const output: TestsCliCommandsGenerateOutput = readFileSync(outputPath!, 'utf-8');

    expect(output).toContain('{ pattern = "bsl.example.com", custom_domain = true }');

    expect(output).not.toContain('{ pattern = "www.bsl.example.com", custom_domain = true }');

    return;
  });

  it('routes include www.base_domain for root domain', () => {
    const rootDomainConfig: TestsCliCommandsGenerateValidConfig = {
      ...validConfig,
      settings: {
        ...validConfig['settings'],
        base_domain: 'example.com',
      },
    };
    const rootConfigContent: TestsCliCommandsGenerateConfigContent = JSON.stringify(rootDomainConfig, null, 2);

    writeFileSync(configPath!, rootConfigContent);

    generateWranglerToml(configPath!, outputPath);

    const output: TestsCliCommandsGenerateOutput = readFileSync(outputPath!, 'utf-8');

    expect(output).toContain('{ pattern = "example.com", custom_domain = true }');

    expect(output).toContain('{ pattern = "www.example.com", custom_domain = true }');

    return;
  });

  it('SETTINGS var is present as double-JSON-encoded string', () => {
    generateWranglerToml(configPath!, outputPath);

    const output: TestsCliCommandsGenerateOutput = readFileSync(outputPath!, 'utf-8');
    const innerJson: TestsCliCommandsGenerateInnerJson = JSON.stringify(validConfig['settings']);
    const expected: TestsCliCommandsGenerateExpected = JSON.stringify(innerJson);

    expect(output).toContain(`SETTINGS = ${expected}`);

    return;
  });

  it('LINKS var is present as double-JSON-encoded string', () => {
    generateWranglerToml(configPath!, outputPath);

    const output: TestsCliCommandsGenerateOutput = readFileSync(outputPath!, 'utf-8');
    const innerJson: TestsCliCommandsGenerateInnerJson = JSON.stringify(validConfig['links']);
    const expected: TestsCliCommandsGenerateExpected = JSON.stringify(innerJson);

    expect(output).toContain(`LINKS = ${expected}`);

    return;
  });

  it('TRACKERS var is present as double-JSON-encoded string', () => {
    generateWranglerToml(configPath!, outputPath);

    const output: TestsCliCommandsGenerateOutput = readFileSync(outputPath!, 'utf-8');
    const innerJson: TestsCliCommandsGenerateInnerJson = JSON.stringify(validConfig['trackers']);
    const expected: TestsCliCommandsGenerateExpected = JSON.stringify(innerJson);

    expect(output).toContain(`TRACKERS = ${expected}`);

    return;
  });

  it('output is written to specified path', () => {
    const customPath: TestsCliCommandsGenerateCustomPath = join(tempDir!, 'custom-wrangler.toml');

    generateWranglerToml(configPath!, customPath);

    const customPathExists: TestsCliCommandsGenerateCustomPathExists = existsSync(customPath);

    expect(customPathExists).toBe(true);

    const output: TestsCliCommandsGenerateOutput = readFileSync(customPath, 'utf-8');

    expect(output).toContain('name = "test-worker"');

    return;
  });

  it('file ends with newline', () => {
    generateWranglerToml(configPath!, outputPath);

    const output: TestsCliCommandsGenerateOutput = readFileSync(outputPath!, 'utf-8');
    const endsWithNewline: TestsCliCommandsGenerateEndsWithNewline = output.endsWith('\n');

    expect(endsWithNewline).toBe(true);

    return;
  });

  return;
});
