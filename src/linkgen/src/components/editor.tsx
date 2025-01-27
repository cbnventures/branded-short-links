import Editor from '@monaco-editor/react';
import { Box, useTheme } from '@mui/material';
import * as monaco from 'monaco-editor';
import React, { useEffect } from 'react';

import { generateMuiStyles } from '@/linkgen/src/styles/editor';
import type { JsonEditorProps } from '@/types/linkgen.d.ts';

/**
 * Json Editor.
 *
 * @param {JsonEditorProps} props - Props.
 *
 * @constructor
 *
 * @since 1.0.0
 */
export default function JsonEditor(props: JsonEditorProps) {
  const { onChange, value } = props;

  const theme = useTheme();

  useEffect(() => {
    // Define a Material-UI theme for Monaco Editor.
    (() => {
      monaco.editor.defineTheme('material-ui', {
        base: theme.palette.mode === 'dark' ? 'vs-dark' : 'vs',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': theme.palette.background.paper,
          'editor.foreground': theme.palette.text.primary,
          'editor.lineHighlightBackground': theme.palette.action.hover,
          'editorCursor.foreground': theme.palette.primary.main,
          'editorWhitespace.foreground': theme.palette.divider,
          'editorLineNumber.foreground': theme.palette.text.secondary,
          'editorIndentGuide.background': theme.palette.divider,
        },
      });
    })();
  }, [
    theme,
  ]);

  return (
    <Box sx={generateMuiStyles('box')}>
      <Editor
        height="300px"
        language="json"
        value={value}
        onChange={onChange}
        theme="material-ui"
        options={{
          fontSize: 14,
          formatOnPaste: true,
          formatOnType: true,
          minimap: {
            enabled: false,
          },
          renderLineHighlight: 'none',
          scrollBeyondLastLine: false,
        }}
      />
    </Box>
  );
};
