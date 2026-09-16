import {
  existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  dirname, join, relative, sep,
} from 'node:path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import { generateWranglerToml } from '../../../cli/commands/generate.js';
import { getWorkerEntryPath } from '../../../lib/package-runtime.js';

import type {
  Tests_Cli_Commands_Generate_GenerateWranglerToml_ConfigContent,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_ConfigPath,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_FileEndsWithNewline_EndsWithNewline,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_FileEndsWithNewline_Output,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_LINKSVarIsPresentAsDoubleJSONEncodedString_Expected,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_LINKSVarIsPresentAsDoubleJSONEncodedString_InnerJson,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_LINKSVarIsPresentAsDoubleJSONEncodedString_Output,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_OsTmpDir,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputContainsNameBrandedShortLinks_Output,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputIsWrittenToSpecifiedPath_CustomPath,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputIsWrittenToSpecifiedPath_CustomPathExists,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputIsWrittenToSpecifiedPath_Output,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputPath,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputReferencesExistingWorkerEntry_Output,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputReferencesExistingWorkerEntry_OutputDir,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputReferencesExistingWorkerEntry_WorkerEntryPath,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputReferencesExistingWorkerEntry_WorkerEntryRelativePath,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_RoutesIncludeBaseDomainButNotWwwBaseDomainForSubdomain_Output,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_RoutesIncludeWwwBaseDomainForRootDomain_Output,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_RoutesIncludeWwwBaseDomainForRootDomain_RootConfigContent,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_RoutesIncludeWwwBaseDomainForRootDomain_RootDomainConfig,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_SETTINGSVarIsPresentAsDoubleJSONEncodedString_Expected,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_SETTINGSVarIsPresentAsDoubleJSONEncodedString_InnerJson,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_SETTINGSVarIsPresentAsDoubleJSONEncodedString_Output,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_TempDir,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_TempDirPath,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_TRACKERSVarIsPresentAsDoubleJSONEncodedString_Expected,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_TRACKERSVarIsPresentAsDoubleJSONEncodedString_InnerJson,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_TRACKERSVarIsPresentAsDoubleJSONEncodedString_Output,
  Tests_Cli_Commands_Generate_GenerateWranglerToml_ValidConfig,
} from '../../../types/tests/cli/commands/generate.test.d.ts';

describe('generateWranglerToml', () => {
  let tempDir: Tests_Cli_Commands_Generate_GenerateWranglerToml_TempDir = undefined;
  let configPath: Tests_Cli_Commands_Generate_GenerateWranglerToml_ConfigPath = undefined;
  let outputPath: Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputPath = undefined;

  const validConfig: Tests_Cli_Commands_Generate_GenerateWranglerToml_ValidConfig = {
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
    const osTmpDir: Tests_Cli_Commands_Generate_GenerateWranglerToml_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_Generate_GenerateWranglerToml_TempDirPath = join(osTmpDir, 'bsl-test-');

    tempDir = mkdtempSync(tempDirPath);
    configPath = join(tempDir, 'config.json');
    outputPath = join(tempDir, 'wrangler.toml');

    const configContent: Tests_Cli_Commands_Generate_GenerateWranglerToml_ConfigContent = JSON.stringify(validConfig, null, 2);

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

    const output: Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputContainsNameBrandedShortLinks_Output = readFileSync(outputPath!, 'utf-8');

    expect(output).toContain('name = "test-worker"');

    return;
  });

  it('output references existing Worker entry', () => {
    generateWranglerToml(configPath!, outputPath);

    const output: Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputReferencesExistingWorkerEntry_Output = readFileSync(outputPath!, 'utf-8');
    const outputDir: Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputReferencesExistingWorkerEntry_OutputDir = dirname(outputPath!);
    const workerEntryPath: Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputReferencesExistingWorkerEntry_WorkerEntryPath = getWorkerEntryPath();
    const workerEntryRelativePath: Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputReferencesExistingWorkerEntry_WorkerEntryRelativePath = relative(outputDir, workerEntryPath).split(sep).join('/');

    expect(output).toContain(`main = ${JSON.stringify(workerEntryRelativePath)}`);

    expect(existsSync(workerEntryPath)).toBe(true);

    return;
  });

  it('routes include base_domain but not www.base_domain for subdomain', () => {
    generateWranglerToml(configPath!, outputPath);

    const output: Tests_Cli_Commands_Generate_GenerateWranglerToml_RoutesIncludeBaseDomainButNotWwwBaseDomainForSubdomain_Output = readFileSync(outputPath!, 'utf-8');

    expect(output).toContain('{ pattern = "bsl.example.com", custom_domain = true }');

    expect(output).not.toContain('{ pattern = "www.bsl.example.com", custom_domain = true }');

    return;
  });

  it('routes include www.base_domain for root domain', () => {
    const rootDomainConfig: Tests_Cli_Commands_Generate_GenerateWranglerToml_RoutesIncludeWwwBaseDomainForRootDomain_RootDomainConfig = {
      ...validConfig,
      settings: {
        ...validConfig['settings'],
        base_domain: 'example.com',
      },
    };
    const rootConfigContent: Tests_Cli_Commands_Generate_GenerateWranglerToml_RoutesIncludeWwwBaseDomainForRootDomain_RootConfigContent = JSON.stringify(rootDomainConfig, null, 2);

    writeFileSync(configPath!, rootConfigContent);

    generateWranglerToml(configPath!, outputPath);

    const output: Tests_Cli_Commands_Generate_GenerateWranglerToml_RoutesIncludeWwwBaseDomainForRootDomain_Output = readFileSync(outputPath!, 'utf-8');

    expect(output).toContain('{ pattern = "example.com", custom_domain = true }');

    expect(output).toContain('{ pattern = "www.example.com", custom_domain = true }');

    return;
  });

  it('SETTINGS var is present as double-JSON-encoded string', () => {
    generateWranglerToml(configPath!, outputPath);

    const output: Tests_Cli_Commands_Generate_GenerateWranglerToml_SETTINGSVarIsPresentAsDoubleJSONEncodedString_Output = readFileSync(outputPath!, 'utf-8');
    const innerJson: Tests_Cli_Commands_Generate_GenerateWranglerToml_SETTINGSVarIsPresentAsDoubleJSONEncodedString_InnerJson = JSON.stringify(validConfig['settings']);
    const expected: Tests_Cli_Commands_Generate_GenerateWranglerToml_SETTINGSVarIsPresentAsDoubleJSONEncodedString_Expected = JSON.stringify(innerJson);

    expect(output).toContain(`SETTINGS = ${expected}`);

    return;
  });

  it('LINKS var is present as double-JSON-encoded string', () => {
    generateWranglerToml(configPath!, outputPath);

    const output: Tests_Cli_Commands_Generate_GenerateWranglerToml_LINKSVarIsPresentAsDoubleJSONEncodedString_Output = readFileSync(outputPath!, 'utf-8');
    const innerJson: Tests_Cli_Commands_Generate_GenerateWranglerToml_LINKSVarIsPresentAsDoubleJSONEncodedString_InnerJson = JSON.stringify(validConfig['links']);
    const expected: Tests_Cli_Commands_Generate_GenerateWranglerToml_LINKSVarIsPresentAsDoubleJSONEncodedString_Expected = JSON.stringify(innerJson);

    expect(output).toContain(`LINKS = ${expected}`);

    return;
  });

  it('TRACKERS var is present as double-JSON-encoded string', () => {
    generateWranglerToml(configPath!, outputPath);

    const output: Tests_Cli_Commands_Generate_GenerateWranglerToml_TRACKERSVarIsPresentAsDoubleJSONEncodedString_Output = readFileSync(outputPath!, 'utf-8');
    const innerJson: Tests_Cli_Commands_Generate_GenerateWranglerToml_TRACKERSVarIsPresentAsDoubleJSONEncodedString_InnerJson = JSON.stringify(validConfig['trackers']);
    const expected: Tests_Cli_Commands_Generate_GenerateWranglerToml_TRACKERSVarIsPresentAsDoubleJSONEncodedString_Expected = JSON.stringify(innerJson);

    expect(output).toContain(`TRACKERS = ${expected}`);

    return;
  });

  it('output is written to specified path', () => {
    const customPath: Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputIsWrittenToSpecifiedPath_CustomPath = join(tempDir!, 'custom-wrangler.toml');

    generateWranglerToml(configPath!, customPath);

    const customPathExists: Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputIsWrittenToSpecifiedPath_CustomPathExists = existsSync(customPath);

    expect(customPathExists).toBe(true);

    const output: Tests_Cli_Commands_Generate_GenerateWranglerToml_OutputIsWrittenToSpecifiedPath_Output = readFileSync(customPath, 'utf-8');

    expect(output).toContain('name = "test-worker"');

    return;
  });

  it('file ends with newline', () => {
    generateWranglerToml(configPath!, outputPath);

    const output: Tests_Cli_Commands_Generate_GenerateWranglerToml_FileEndsWithNewline_Output = readFileSync(outputPath!, 'utf-8');
    const endsWithNewline: Tests_Cli_Commands_Generate_GenerateWranglerToml_FileEndsWithNewline_EndsWithNewline = output.endsWith('\n');

    expect(endsWithNewline).toBe(true);

    return;
  });

  return;
});
