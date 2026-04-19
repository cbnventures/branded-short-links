import type { z } from 'zod';

/**
 * Tests - Lib - Schema.
 *
 * @since 2.0.0
 */
export type TestsLibSchemaInput = Record<string, unknown>;

export type TestsLibSchemaResult = z.ZodSafeParseResult<unknown>;

export type TestsLibSchemaGa4Input = Record<string, unknown>;

export type TestsLibSchemaWrongFieldsInput = Record<string, unknown>;

export type TestsLibSchemaValidCodes = number[];

export type TestsLibSchemaCode = number;
