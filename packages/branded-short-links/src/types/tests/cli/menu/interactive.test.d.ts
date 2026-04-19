import type { ExpectStatic } from 'vitest';

import type { LibSchemaConfig } from '../../../lib/schema.d.ts';

/**
 * Tests - CLI - Menu - Interactive.
 *
 * @since 2.0.0
 */
export type TestsCliMenuInteractiveChalkParam = string;

export type TestsCliMenuInteractiveValidConfig = LibSchemaConfig;

export type TestsCliMenuInteractiveTempDir = string | undefined;

export type TestsCliMenuInteractiveConfigPath = string | undefined;

export type TestsCliMenuInteractiveTempDirPath = string;

export type TestsCliMenuInteractiveConfigJson = string;

export type TestsCliMenuInteractivePromptsModule = {
  default: typeof import('prompts');
  inject: typeof import('prompts')['inject'];
  override: typeof import('prompts')['override'];
  prompt: typeof import('prompts')['prompt'];
  prompts: typeof import('prompts')['prompts'];
};

export type TestsCliMenuInteractiveUnknown = unknown;

export type TestsCliMenuInteractiveMockFn = ReturnType<typeof import('vitest')['vi']['fn']>;

export type TestsCliMenuInteractiveExpectedMenu = ReturnType<ExpectStatic['objectContaining']>;

export type TestsCliMenuInteractiveMenuChoice = {
  title: string;
  value: string;
};

export type TestsCliMenuInteractiveMenuCall = {
  type: string;
  name: string;
  choices: TestsCliMenuInteractiveMenuChoice[];
};

export type TestsCliMenuInteractiveExpectedChoices = ReturnType<ExpectStatic['arrayContaining']>;

export type TestsCliMenuInteractiveSettingsCall = {
  name: string;
};
