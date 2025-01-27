import {
  AppBar,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';

/**
 * Header.
 *
 * @constructor
 *
 * @since 1.0.0
 */
export default function Header() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6">BSL Link Generator</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
