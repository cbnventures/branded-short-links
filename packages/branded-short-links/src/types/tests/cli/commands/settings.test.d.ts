import type { LibSchemaConfig, LibSchemaSettingsConfig } from '../../../lib/schema.d.ts';

/**
 * Tests - CLI - Commands - Settings.
 *
 * @since 2.0.0
 */
export type TestsCliCommandsSettingsValidConfig = LibSchemaConfig;

export type TestsCliCommandsSettingsTempDir = string | undefined;

export type TestsCliCommandsSettingsConfigPath = string | undefined;

export type TestsCliCommandsSettingsTempDirPrefix = string;

export type TestsCliCommandsSettingsTempDirPath = string;

export type TestsCliCommandsSettingsTempDirExists = boolean;

export type TestsCliCommandsSettingsConfigContent = string;

export type TestsCliCommandsSettingsSettings = LibSchemaSettingsConfig;

export type TestsCliCommandsSettingsConfig = LibSchemaConfig;
