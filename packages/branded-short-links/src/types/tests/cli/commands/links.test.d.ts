import type {
  LibSchemaConfig,
  LibSchemaLinkItemConfig,
  LibSchemaLinksConfigFallbackUrl,
  LibSchemaLinksConfigItems,
} from '../../../lib/schema.d.ts';

/**
 * Tests - CLI - Commands - Links.
 *
 * @since 2.0.0
 */
export type TestsCliCommandsLinksValidConfig = LibSchemaConfig;

export type TestsCliCommandsLinksTempDir = string | undefined;

export type TestsCliCommandsLinksConfigPath = string | undefined;

export type TestsCliCommandsLinksTempDirPath = string;

export type TestsCliCommandsLinksItems = LibSchemaLinksConfigItems;

export type TestsCliCommandsLinksEmptyConfig = LibSchemaConfig;

export type TestsCliCommandsLinksConfigJson = string;

export type TestsCliCommandsLinksNewLink = LibSchemaLinkItemConfig;

export type TestsCliCommandsLinksConfig = LibSchemaConfig;

export type TestsCliCommandsLinksUrl = LibSchemaLinksConfigFallbackUrl;
