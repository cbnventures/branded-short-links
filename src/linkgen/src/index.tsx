import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';

import Generator from '@/linkgen/src/components/generator';
import Header from '@/linkgen/src/components/header';

/**
 * Link Generator.
 *
 * @since 1.0.0
 */
export class LinkGenerator {
  /**
   * Link Generator - Constructor.
   *
   * @since 1.0.0
   */
  constructor() {
    const root = document.getElementById('root');

    // Ensures React is able to mount to the "#root" element.
    if (root === null) {
      throw new Error('The "#root" element does not exist');
    }

    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <CssBaseline />
        <Header />
        <Generator />
      </React.StrictMode>,
    );
  }
}

new LinkGenerator();
