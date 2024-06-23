import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

const Provider = ({ children, theme }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};

const lightTheme = createTheme({ palette: { mode: 'light' } });

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: lightTheme,
    },
    defaultTheme: 'light',
    Provider,
  }),
];
