import type { PrettyPrintData, PrettyPrintReturns } from '@/types/index.d.ts';

/**
 * Pretty print.
 *
 * @param {PrettyPrintData} data - Data.
 *
 * @returns {PrettyPrintReturns}
 *
 * @since 1.0.0
 */
export function prettyPrint(data: PrettyPrintData): PrettyPrintReturns {
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return null;
  }
}
