'use client'
import React from 'react';
import { IconButton, InputAdornment, TextField, Button, Alert, Stack, Paper, Box, Typography, CircularProgress } from '@mui/material';
import { Email as EmailIcon, Lock as LockIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import { useLogin } from '@/hooks/useLogin';
import Wrapper from './Wrapper';

const LoginForm: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    showPassword,
    toggleShowPassword,
    handleLogin,
  } = useLogin();

  return (
    <Wrapper maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: '100%', maxWidth: 450, backgroundColor: 'background.paper' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Box sx={{ backgroundColor: 'primary.main', color: 'white', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, fontSize: '1.5rem', fontWeight: 'bold' }}>
            F
          </Box>
          <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: 'bold' }}>
            Iniciar Sesión
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            Accede a tu cuenta para gestionar tipos y propiedades
          </Typography>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleLogin} noValidate>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            margin="normal"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2, fontWeight: 'bold', textTransform: 'none', fontSize: '1rem' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
          </Button>
          <Stack direction="row" alignItems="center" spacing={1} justifyContent="flex-end" sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              ¿No tienes una cuenta?
            </Typography>
            <Button component={Link} href="/register" variant="text" sx={{ fontWeight: 'medium' }}>
              Regístrate
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Wrapper>
  );
};

export default LoginForm;
