import { colors } from '@mui/material';

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
  const { blue, common, grey } = colors;

  switch (id) {
    case 'button-trash':
      return {
        maxHeight: 56,
        '& svg': {
          fontSize: 18,
        },
      };
    case 'container':
      return {
        my: 2,
      };
    case 'link':
      return {
        backgroundColor: grey[100],
        fontFamily: 'monospace',
        fontSize: '0.875rem',
        padding: 2,
        borderColor: grey[300],
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 2,
        overflow: 'hidden',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        overflowY: 'auto',
      };
    case 'stack':
      return {
        mb: 2,
      };
    case 'title':
      return {
        display: 'inline-block',
        backgroundColor: blue[500],
        color: common.white,
        boxShadow: `6px 6px 0 ${blue[700]}`,
        my: 1,
        px: 2,
        py: 1,
      };
    default:
      return undefined;
  }
}
