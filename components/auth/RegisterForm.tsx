'use client'
import React from 'react';
import { IconButton, InputAdornment, TextField, Button, Alert, Divider, Paper, Box, Typography, CircularProgress } from '@mui/material';
import { Person as PersonIcon, Email as EmailIcon, Lock as LockIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import { useRegister } from '@/hooks/useRegister';
import Wrapper from './Wrapper';

const RegisterForm: React.FC = () => {
  const { form, errors, serverError, loading, handleChange, handleRegister } = useRegister();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Wrapper maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: '100%', maxWidth: 450, backgroundColor: 'background.paper' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h1" fontWeight={600}>
            Crear cuenta
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Complete el formulario para registrarse en la plataforma
        </Typography>
        {serverError && <Alert severity="error" sx={{ mb: 3 }}>{serverError}</Alert>}
        <Box component="form" onSubmit={handleRegister} noValidate>
          <TextField
            label="Nombre completo"
            name="name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleChange}
            required
            error={!!errors.name}
            helperText={errors.name}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            label="Correo electrónico"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required
            error={!!errors.email}
            helperText={errors.email}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            label="Contraseña"
            name="password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
            error={!!errors.password}
            helperText={errors.password}
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
            sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ mt: 1, mb: 2, py: 1.5, borderRadius: 2, position: 'relative' }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'common.white' }} /> : 'Crear cuenta'}
          </Button>
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">o</Typography>
          </Divider>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              ¿Ya tiene una cuenta?{' '}
            <Button component={Link} href="/login" variant="text" sx={{ fontWeight: 'medium' }}>
              Iniciar sesión
            </Button>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Wrapper>
  );
};

export default RegisterForm;
