import React from 'react';
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const theme = createTheme({ palette: { mode: 'light' } });

export const decorators = [
  (Story) => (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </StyledEngineProvider>
  ),
];