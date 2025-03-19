'use client'
import React, { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline, Container, Box, Typography } from '@mui/material';
import { getTheme } from '../constants/theme';
import ClientHeader from './ClientHeader';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleDarkMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ClientHeader onToggleDarkMode={toggleDarkMode} currentMode={mode} />
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 8,
          minHeight: 'calc(100vh - 148px)',
          backgroundColor: (theme) => theme.palette.background.paper,
          borderRadius: 2,
          p: 3,
          boxShadow: (theme) => theme.shadows[3],
        }}
      >
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Fortex - Administración de Tipos y Propiedades
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
