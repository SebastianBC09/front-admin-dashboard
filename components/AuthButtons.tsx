'use client'
import React from 'react';
import { Button, Stack, useTheme } from '@mui/material';
import Link from 'next/link';
import { useHeader } from '@/hooks/useHeader';

const AuthButtons: React.FC = () => {
  const { isAuthenticated } = useHeader();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!isAuthenticated) {
    return (
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button
          variant="contained"
          size="large"
          component={Link}
          href="/register"
          sx={{
            bgcolor: isDark ? theme.palette.primary.main : 'white',
            color: isDark ? theme.palette.background.paper : theme.palette.primary.main,
            '&:hover': {
              bgcolor: isDark ? theme.palette.primary.dark : 'rgba(255, 255, 255, 0.9)',
            },
            fontWeight: 'bold',
            px: 4,
          }}
        >
          Comenzar Ahora
        </Button>
        <Button
          variant="outlined"
          size="large"
          component={Link}
          href="/login"
          sx={{
            borderColor: isDark ? theme.palette.primary.main : 'white',
            color: isDark ? theme.palette.primary.main : 'white',
            '&:hover': {
              borderColor: isDark ? theme.palette.primary.light : 'white',
              bgcolor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Iniciar Sesión
        </Button>
      </Stack>
    );
  } else {
    return (
      <Button
        variant="contained"
        size="large"
        component={Link}
        href="/tipos"
        sx={{
          bgcolor: isDark ? theme.palette.primary.main : 'white',
          color: isDark ? theme.palette.background.paper : theme.palette.primary.main,
          '&:hover': {
            bgcolor: isDark ? theme.palette.primary.dark : 'rgba(255, 255, 255, 0.9)',
          },
          fontWeight: 'bold',
          px: 4,
        }}
      >
        Ir al Panel
      </Button>
    );
  }
};

export default AuthButtons;
