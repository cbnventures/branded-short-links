import type {
  LibSchemaConfig,
  LibSchemaLinkItemConfig,
  LibSchemaLinksConfigFallbackUrl,
  LibSchemaLinksConfigItems,
} from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Links.
 *
 * @since 2.0.0
 */
export type CliCommandsLinksAddLinkConfigPath = string;

export type CliCommandsLinksAddLinkItem = LibSchemaLinkItemConfig;

export type CliCommandsLinksAddLinkReturn = void;

export type CliCommandsLinksAddLinkConfig = LibSchemaConfig;

/**
 * CLI - Commands - Links.
 *
 * @since 2.0.0
 */
export type CliCommandsLinksEditLinkConfigPath = string;

export type CliCommandsLinksEditLinkShortcode = string;

export type CliCommandsLinksEditLinkUpdates = Partial<LibSchemaLinkItemConfig>;

export type CliCommandsLinksEditLinkReturn = void;

export type CliCommandsLinksEditLinkConfig = LibSchemaConfig;

export type CliCommandsLinksEditLinkIndex = number;

/**
 * CLI - Commands - Links.
 *
 * @since 2.0.0
 */
export type CliCommandsLinksGetFallbackUrlConfigPath = string;

export type CliCommandsLinksGetFallbackUrlReturn = LibSchemaLinksConfigFallbackUrl;

export type CliCommandsLinksGetFallbackUrlConfig = LibSchemaConfig;

/**
 * CLI - Commands - Links.
 *
 * @since 2.0.0
 */
export type CliCommandsLinksListLinksConfigPath = string;

export type CliCommandsLinksListLinksReturn = LibSchemaLinksConfigItems;

export type CliCommandsLinksListLinksConfig = LibSchemaConfig;

/**
 * CLI - Commands - Links.
 *
 * @since 2.0.0
 */
export type CliCommandsLinksRemoveLinkConfigPath = string;

export type CliCommandsLinksRemoveLinkShortcode = string;

export type CliCommandsLinksRemoveLinkReturn = void;

export type CliCommandsLinksRemoveLinkConfig = LibSchemaConfig;

export type CliCommandsLinksRemoveLinkFiltered = LibSchemaLinksConfigItems;

/**
 * CLI - Commands - Links.
 *
 * @since 2.0.0
 */
export type CliCommandsLinksSetFallbackUrlConfigPath = string;

export type CliCommandsLinksSetFallbackUrlUrl = LibSchemaLinksConfigFallbackUrl;

export type CliCommandsLinksSetFallbackUrlReturn = void;

export type CliCommandsLinksSetFallbackUrlConfig = LibSchemaConfig;
