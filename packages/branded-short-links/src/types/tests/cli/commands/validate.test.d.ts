import type { CliCommandsValidateValidateConfigReturn } from '../../../cli/commands/validate.d.ts';

/**
 * Tests - CLI - Commands - Validate.
 *
 * @since 2.0.0
 */
export type TestsCliCommandsValidateTempDir = string | undefined;

export type TestsCliCommandsValidateConfigPath = string | undefined;

export type TestsCliCommandsValidateTempDirPrefix = string;

export type TestsCliCommandsValidateTempDirPath = string;

export type TestsCliCommandsValidateTempDirExists = boolean;

export type TestsCliCommandsValidateValidConfig = Record<string, unknown>;

export type TestsCliCommandsValidateConfigContent = string;

export type TestsCliCommandsValidateResult = CliCommandsValidateValidateConfigReturn;

export type TestsCliCommandsValidateInvalidConfig = Record<string, unknown>;

export type TestsCliCommandsValidateDuplicateConfig = Record<string, unknown>;

export type TestsCliCommandsValidateMinimalConfig = Record<string, unknown>;
