import {
  existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { Bootstrap } from '@cbnventures/nova/toolkit';
import {
  afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';

import { APP_NAME } from '../../../lib/item.js';

import type {
  Tests_Cli_Commands_Deploy_Chalk_ChalkDefault,
  Tests_Cli_Commands_Deploy_ChalkIdentity_Returns,
  Tests_Cli_Commands_Deploy_ChalkIdentity_S,
  Tests_Cli_Commands_Deploy_ConfigDir,
  Tests_Cli_Commands_Deploy_DeployModule,
  Tests_Cli_Commands_Deploy_EnvFilePath,
  Tests_Cli_Commands_Deploy_EnvTokenKey,
  Tests_Cli_Commands_Deploy_GetWrittenOutput_Calls,
  Tests_Cli_Commands_Deploy_GetWrittenOutput_Returns,
  Tests_Cli_Commands_Deploy_GetWrittenOutput_WriteSpy,
  Tests_Cli_Commands_Deploy_GetWrittenOutput_WriteUnknown,
  Tests_Cli_Commands_Deploy_LoadEnvToken_FallsThroughToTheEnvFileWhenTheEnvironmentVariableIsAnEmptyString_Result,
  Tests_Cli_Commands_Deploy_LoadEnvToken_PrefersTheEnvironmentVariableOverTheEnvFile_Result,
  Tests_Cli_Commands_Deploy_LoadEnvToken_ReadsBackATokenAfterTheFirstWrite_Result,
  Tests_Cli_Commands_Deploy_LoadEnvToken_ReadsBackTheReplacedTokenAfterAnExistingKeyIsOverwritten_Result,
  Tests_Cli_Commands_Deploy_LoadEnvToken_ReturnsUndefinedWhenTheEnvFileDoesNotExist_Result,
  Tests_Cli_Commands_Deploy_OriginalXdgConfigHome,
  Tests_Cli_Commands_Deploy_OsTmpDir,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_ConfigPath,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_DoesNotPrintUndefinedWhenTheFallbackURLIsMissing_ConfigContent,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_DoesNotPrintUndefinedWhenTheFallbackURLIsMissing_NoFallbackConfig,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_DoesNotPrintUndefinedWhenTheFallbackURLIsMissing_Output,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_ExcludesTrackerSecretFieldsFromTheOutput_ConfigContent,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_ExcludesTrackerSecretFieldsFromTheOutput_Output,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_ExcludesTrackerSecretFieldsFromTheOutput_ValidConfig,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheFallbackURLInTheOutput_ConfigContent,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheFallbackURLInTheOutput_Output,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheFallbackURLInTheOutput_ValidConfig,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheLinkShortcodeAndRedirectURLInTheOutput_ConfigContent,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheLinkShortcodeAndRedirectURLInTheOutput_Output,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheLinkShortcodeAndRedirectURLInTheOutput_ValidConfig,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_OsTmpDir,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoShortcodesAreConfigured_ConfigContent,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoShortcodesAreConfigured_MinimalConfig,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoShortcodesAreConfigured_Output,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoTrackersAreConfigured_ConfigContent,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoTrackersAreConfigured_MinimalConfig,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoTrackersAreConfigured_Output,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_TempDir,
  Tests_Cli_Commands_Deploy_PrintLinksSummary_TempDirPath,
  Tests_Cli_Commands_Deploy_SaveEnvToken_AppendsTheTokenWhenTheFileExistsWithoutTheKey_Content,
  Tests_Cli_Commands_Deploy_SaveEnvToken_CreatesTheEnvFileAndWritesTheTokenWhenNoFileExists_Content,
  Tests_Cli_Commands_Deploy_SaveEnvToken_OverwritesAnExistingTokenInTheEnvFile_Content,
  Tests_Cli_Commands_Deploy_SaveEnvToken_PreservesOtherLinesWhenOverwritingAnExistingToken_Content,
  Tests_Cli_Commands_Deploy_SaveEnvToken_PreservesOtherLinesWhenOverwritingAnExistingToken_PreExistingContent,
  Tests_Cli_Commands_Deploy_SaveEnvToken_PreservesOtherLinesWhenOverwritingAnExistingToken_PreExistingLines,
  Tests_Cli_Commands_Deploy_TempConfigHome,
  Tests_Cli_Commands_Deploy_TempDirPath,
} from '../../../types/tests/cli/commands/deploy.test.d.ts';

function chalkIdentity(s: Tests_Cli_Commands_Deploy_ChalkIdentity_S): Tests_Cli_Commands_Deploy_ChalkIdentity_Returns {
  return s;
}

function getWrittenOutput(): Tests_Cli_Commands_Deploy_GetWrittenOutput_Returns {
  const writeUnknown: Tests_Cli_Commands_Deploy_GetWrittenOutput_WriteUnknown = process.stdout.write;
  const writeSpy: Tests_Cli_Commands_Deploy_GetWrittenOutput_WriteSpy = writeUnknown as Tests_Cli_Commands_Deploy_GetWrittenOutput_WriteSpy;
  const calls: Tests_Cli_Commands_Deploy_GetWrittenOutput_Calls = writeSpy['mock']['calls'];

  return calls.map((call) => call[0]).join('');
}

vi.mock('chalk', () => {
  const chalkDefault: Tests_Cli_Commands_Deploy_Chalk_ChalkDefault = {
    bold: chalkIdentity,
    cyan: chalkIdentity,
    gray: chalkIdentity,
    green: chalkIdentity,
  };

  return {
    default: chalkDefault,
  };
});

const envTokenKey: Tests_Cli_Commands_Deploy_EnvTokenKey = 'CLOUDFLARE_API_TOKEN';

let originalXdgConfigHome: Tests_Cli_Commands_Deploy_OriginalXdgConfigHome = undefined;
let tempConfigHome: Tests_Cli_Commands_Deploy_TempConfigHome = undefined;
let deployModule: Tests_Cli_Commands_Deploy_DeployModule = undefined;
let envFilePath: Tests_Cli_Commands_Deploy_EnvFilePath = undefined;

/*
 * "deploy.ts" resolves its env file path from Bootstrap.getConfigDir() once at
 * import time, so XDG_CONFIG_HOME is redirected to a temp directory before the
 * module is dynamically imported here. This keeps loadEnvToken()/saveEnvToken()
 * off the real user config file for every test in this file.
 */
beforeAll(async () => {
  originalXdgConfigHome = process.env['XDG_CONFIG_HOME'];

  const osTmpDir: Tests_Cli_Commands_Deploy_OsTmpDir = tmpdir();
  const tempDirPath: Tests_Cli_Commands_Deploy_TempDirPath = join(osTmpDir, 'bsl-test-');

  tempConfigHome = mkdtempSync(tempDirPath);

  Reflect.set(process.env, 'XDG_CONFIG_HOME', tempConfigHome);

  deployModule = await import('../../../cli/commands/deploy.js');

  const configDir: Tests_Cli_Commands_Deploy_ConfigDir = Bootstrap.getConfigDir(APP_NAME);

  envFilePath = join(configDir, '.env');

  return;
});

afterAll(() => {
  if (originalXdgConfigHome !== undefined) {
    Reflect.set(process.env, 'XDG_CONFIG_HOME', originalXdgConfigHome);
  } else {
    Reflect.deleteProperty(process.env, 'XDG_CONFIG_HOME');
  }

  if (tempConfigHome !== undefined && existsSync(tempConfigHome) === true) {
    rmSync(tempConfigHome, { recursive: true });
  }

  return;
});

describe('loadEnvToken', () => {
  beforeEach(() => {
    Reflect.deleteProperty(process.env, envTokenKey);

    if (envFilePath !== undefined && existsSync(envFilePath) === true) {
      rmSync(envFilePath);
    }

    return;
  });

  afterEach(() => {
    if (envFilePath !== undefined && existsSync(envFilePath) === true) {
      rmSync(envFilePath);
    }

    return;
  });

  it('returns undefined when the env file does not exist', () => {
    const result: Tests_Cli_Commands_Deploy_LoadEnvToken_ReturnsUndefinedWhenTheEnvFileDoesNotExist_Result = deployModule!.loadEnvToken();

    expect(result).toBeUndefined();

    return;
  });

  it('reads back a token after the first write', () => {
    deployModule!.saveEnvToken('first-token-abc');

    const result: Tests_Cli_Commands_Deploy_LoadEnvToken_ReadsBackATokenAfterTheFirstWrite_Result = deployModule!.loadEnvToken();

    expect(result).toBe('first-token-abc');

    return;
  });

  it('reads back the replaced token after an existing key is overwritten', () => {
    deployModule!.saveEnvToken('original-token');

    deployModule!.saveEnvToken('replaced-token');

    const result: Tests_Cli_Commands_Deploy_LoadEnvToken_ReadsBackTheReplacedTokenAfterAnExistingKeyIsOverwritten_Result = deployModule!.loadEnvToken();

    expect(result).toBe('replaced-token');

    return;
  });

  it('prefers the environment variable over the env file', () => {
    deployModule!.saveEnvToken('file-token-xyz');

    Reflect.set(process.env, envTokenKey, 'env-token-abc');

    const result: Tests_Cli_Commands_Deploy_LoadEnvToken_PrefersTheEnvironmentVariableOverTheEnvFile_Result = deployModule!.loadEnvToken();

    expect(result).toBe('env-token-abc');

    return;
  });

  it('falls through to the env file when the environment variable is an empty string', () => {
    deployModule!.saveEnvToken('file-fallback-token');

    Reflect.set(process.env, envTokenKey, '');

    const result: Tests_Cli_Commands_Deploy_LoadEnvToken_FallsThroughToTheEnvFileWhenTheEnvironmentVariableIsAnEmptyString_Result = deployModule!.loadEnvToken();

    expect(result).toBe('file-fallback-token');

    return;
  });

  return;
});

describe('saveEnvToken', () => {
  beforeEach(() => {
    Reflect.deleteProperty(process.env, envTokenKey);

    if (envFilePath !== undefined && existsSync(envFilePath) === true) {
      rmSync(envFilePath);
    }

    return;
  });

  afterEach(() => {
    if (envFilePath !== undefined && existsSync(envFilePath) === true) {
      rmSync(envFilePath);
    }

    return;
  });

  it('creates the env file and writes the token when no file exists', () => {
    deployModule!.saveEnvToken('new-token-123');

    const content: Tests_Cli_Commands_Deploy_SaveEnvToken_CreatesTheEnvFileAndWritesTheTokenWhenNoFileExists_Content = readFileSync(envFilePath!, 'utf-8');

    expect(content).toBe(`${envTokenKey}=new-token-123\n`);

    return;
  });

  it('appends the token when the file exists without the key', () => {
    writeFileSync(envFilePath!, 'OTHER_VAR=hello\n');

    deployModule!.saveEnvToken('appended-token');

    const content: Tests_Cli_Commands_Deploy_SaveEnvToken_AppendsTheTokenWhenTheFileExistsWithoutTheKey_Content = readFileSync(envFilePath!, 'utf-8');

    expect(content).toContain('OTHER_VAR=hello');

    expect(content).toContain(`${envTokenKey}=appended-token`);

    return;
  });

  it('overwrites an existing token in the env file', () => {
    writeFileSync(envFilePath!, `${envTokenKey}=old-token\n`);

    deployModule!.saveEnvToken('new-token-456');

    const content: Tests_Cli_Commands_Deploy_SaveEnvToken_OverwritesAnExistingTokenInTheEnvFile_Content = readFileSync(envFilePath!, 'utf-8');

    expect(content).toContain(`${envTokenKey}=new-token-456`);

    expect(content).not.toContain('old-token');

    return;
  });

  it('preserves other lines when overwriting an existing token', () => {
    const preExistingLines: Tests_Cli_Commands_Deploy_SaveEnvToken_PreservesOtherLinesWhenOverwritingAnExistingToken_PreExistingLines = [
      'OTHER_VAR=hello',
      `${envTokenKey}=old-token`,
      '',
    ];

    const preExistingContent: Tests_Cli_Commands_Deploy_SaveEnvToken_PreservesOtherLinesWhenOverwritingAnExistingToken_PreExistingContent = preExistingLines.join('\n');

    writeFileSync(envFilePath!, preExistingContent);

    deployModule!.saveEnvToken('new-token-789');

    const content: Tests_Cli_Commands_Deploy_SaveEnvToken_PreservesOtherLinesWhenOverwritingAnExistingToken_Content = readFileSync(envFilePath!, 'utf-8');

    expect(content).toContain('OTHER_VAR=hello');

    expect(content).toContain(`${envTokenKey}=new-token-789`);

    expect(content).not.toContain('old-token');

    return;
  });

  return;
});

describe('printLinksSummary', () => {
  let tempDir: Tests_Cli_Commands_Deploy_PrintLinksSummary_TempDir = undefined;
  let configPath: Tests_Cli_Commands_Deploy_PrintLinksSummary_ConfigPath = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Commands_Deploy_PrintLinksSummary_OsTmpDir = tmpdir();
    const tempDirPath: Tests_Cli_Commands_Deploy_PrintLinksSummary_TempDirPath = join(osTmpDir, 'bsl-test-');

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

  it('includes the link shortcode and redirect URL in the output', () => {
    const validConfig: Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheLinkShortcodeAndRedirectURLInTheOutput_ValidConfig = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://example.com',
        items: [{
          shortcode: '/gh',
          http_response: 302 as const,
          redirect_url: 'https://github.com/example',
        }],
      },
      trackers: [],
    };

    const configContent: Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheLinkShortcodeAndRedirectURLInTheOutput_ConfigContent = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath!, configContent);

    deployModule!.printLinksSummary(configPath!);

    const output: Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheLinkShortcodeAndRedirectURLInTheOutput_Output = getWrittenOutput();

    expect(output).toContain('/gh');

    expect(output).toContain('https://github.com/example');

    return;
  });

  it('includes the fallback URL in the output', () => {
    const validConfig: Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheFallbackURLInTheOutput_ValidConfig = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        fallback_url: 'https://fallback.example.com',
        items: [],
      },
      trackers: [],
    };

    const configContent: Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheFallbackURLInTheOutput_ConfigContent = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath!, configContent);

    deployModule!.printLinksSummary(configPath!);

    const output: Tests_Cli_Commands_Deploy_PrintLinksSummary_IncludesTheFallbackURLInTheOutput_Output = getWrittenOutput();

    expect(output).toContain('https://fallback.example.com');

    return;
  });

  it('excludes tracker secret fields from the output', () => {
    const validConfig: Tests_Cli_Commands_Deploy_PrintLinksSummary_ExcludesTrackerSecretFieldsFromTheOutput_ValidConfig = {
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
          type: 'ga4' as const,
          name: 'ga4-tracker',
          measurement_id: 'G-XXXXXXXXXX',
          api_secret: 'super-secret-ga4-value',
        },
        {
          type: 'ntfy' as const,
          name: 'ntfy-tracker',
          server: 'https://ntfy.example.com',
          topic: 'bsl-clicks',
          token: 'tk_super-secret-ntfy-token',
        },
      ],
    };

    const configContent: Tests_Cli_Commands_Deploy_PrintLinksSummary_ExcludesTrackerSecretFieldsFromTheOutput_ConfigContent = JSON.stringify(validConfig, null, 2);

    writeFileSync(configPath!, configContent);

    deployModule!.printLinksSummary(configPath!);

    const output: Tests_Cli_Commands_Deploy_PrintLinksSummary_ExcludesTrackerSecretFieldsFromTheOutput_Output = getWrittenOutput();

    expect(output).not.toContain('super-secret-ga4-value');

    expect(output).not.toContain('tk_super-secret-ntfy-token');

    expect(output).toContain('ga4-tracker');

    expect(output).toContain('ntfy-tracker');

    return;
  });

  it('shows a placeholder when no shortcodes are configured', () => {
    const minimalConfig: Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoShortcodesAreConfigured_MinimalConfig = {
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

    const configContent: Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoShortcodesAreConfigured_ConfigContent = JSON.stringify(minimalConfig, null, 2);

    writeFileSync(configPath!, configContent);

    deployModule!.printLinksSummary(configPath!);

    const output: Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoShortcodesAreConfigured_Output = getWrittenOutput();

    expect(output).toContain('No shortcodes configured.');

    return;
  });

  it('shows a placeholder when no trackers are configured', () => {
    const minimalConfig: Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoTrackersAreConfigured_MinimalConfig = {
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

    const configContent: Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoTrackersAreConfigured_ConfigContent = JSON.stringify(minimalConfig, null, 2);

    writeFileSync(configPath!, configContent);

    deployModule!.printLinksSummary(configPath!);

    const output: Tests_Cli_Commands_Deploy_PrintLinksSummary_ShowsAPlaceholderWhenNoTrackersAreConfigured_Output = getWrittenOutput();

    expect(output).toContain('No trackers configured.');

    return;
  });

  it('does not print undefined when the fallback URL is missing', () => {
    const noFallbackConfig: Tests_Cli_Commands_Deploy_PrintLinksSummary_DoesNotPrintUndefinedWhenTheFallbackURLIsMissing_NoFallbackConfig = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'bsl.example.com',
        show_response_output: false,
      },
      links: {
        items: [],
      },
      trackers: [],
    };

    const configContent: Tests_Cli_Commands_Deploy_PrintLinksSummary_DoesNotPrintUndefinedWhenTheFallbackURLIsMissing_ConfigContent = JSON.stringify(noFallbackConfig, null, 2);

    writeFileSync(configPath!, configContent);

    deployModule!.printLinksSummary(configPath!);

    const output: Tests_Cli_Commands_Deploy_PrintLinksSummary_DoesNotPrintUndefinedWhenTheFallbackURLIsMissing_Output = getWrittenOutput();

    expect(output).not.toContain('undefined');

    return;
  });

  return;
});
