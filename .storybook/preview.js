import React from 'react';
import { ThemeProvider } from '@mui/styles';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={{}}>
      <Story />
    </ThemeProvider>
  ),
];
