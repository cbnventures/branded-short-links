import type { Theme } from '@mui/material';
import type { SxProps } from '@mui/system';
import type { FieldPathValue } from 'react-hook-form/dist/types';

/**
 * Generate bsl link.
 *
 * @since 1.0.0
 */
export type GenerateBslLinkRequestType = 'GET' | 'POST';

export type GenerateBslLinkUrl = URL;

export type GenerateBslLinkReturns = string;

/**
 * Generate mui styles.
 *
 * @param {GenerateMuiStylesId} id - Id.
 *
 * @returns {GenerateMuiStylesReturns}
 *
 * @since 1.0.0
 */
export type GenerateMuiStylesId = string;

export type GenerateMuiStylesReturns = SxProps<Theme> | undefined;

/**
 * Generator - Handle add parameter.
 *
 * @since 1.0.0
 */
export type GeneratorHandleAddParameterReturns = void;

/**
 * Generator - Handle remove parameter.
 *
 * @since 1.0.0
 */
export type GeneratorHandleRemoveParameterIndex = number;

export type GeneratorHandleRemoveParameterReturns = void;

/**
 * Json Editor.
 *
 * @since 1.0.0
 */
export type JsonEditorPropsOnChange = (...event: any[]) => void;

export type JsonEditorPropsValue = FieldPathValue<any, any>;

export type JsonEditorProps = {
  onChange: JsonEditorPropsOnChange;
  value: JsonEditorPropsValue;
};
