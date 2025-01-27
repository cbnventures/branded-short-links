import type { GenerateMuiStylesId, GenerateMuiStylesReturns } from '@/types/linkgen.d.ts';

/**
 * Generate mui styles.
 *
 * @param {GenerateMuiStylesId} id - Id.
 *
 * @returns {GenerateMuiStylesReturns}
 *
 * @since 1.0.0
 */
export function generateMuiStyles(id: GenerateMuiStylesId): GenerateMuiStylesReturns {
  switch (id) {
    case 'box':
      return {
        border: 1,
        borderRadius: 1,
        borderColor: 'rgba(0, 0, 0, 0.23)',
        backgroundColor: 'background.paper',
        overflow: 'hidden',
      };
    default:
      return undefined;
  }
}
