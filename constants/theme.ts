import { createTheme, ThemeOptions } from '@mui/material/styles';

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#f50057' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none', borderRadius: 8 } },
    },
    MuiAppBar: {
      styleOverrides: { root: { boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1)' } },
    },
  },
};

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
    background: { default: '#121212', paper: '#1e1e1e' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none', borderRadius: 8 } },
    },
    MuiAppBar: {
      styleOverrides: { root: { boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.5)' } },
    },
  },
};

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme(mode === 'dark' ? darkThemeOptions : lightThemeOptions);
