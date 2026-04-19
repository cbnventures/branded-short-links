import type { LibSchemaConfig, LibSchemaSettingsConfig } from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Settings.
 *
 * @since 2.0.0
 */
export type CliCommandsSettingsGetSettingsConfigPath = string;

export type CliCommandsSettingsGetSettingsReturn = LibSchemaSettingsConfig;

export type CliCommandsSettingsGetSettingsConfig = LibSchemaConfig;

/**
 * CLI - Commands - Settings.
 *
 * @since 2.0.0
 */
export type CliCommandsSettingsUpdateSettingsConfigPath = string;

export type CliCommandsSettingsUpdateSettingsUpdates = Partial<LibSchemaSettingsConfig>;

export type CliCommandsSettingsUpdateSettingsReturn = void;

export type CliCommandsSettingsUpdateSettingsConfig = LibSchemaConfig;
