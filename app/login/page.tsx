'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Stack,
  // Divider,
  Link as MuiLink,
  Fade,
  Container,
  Slide
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import Link from 'next/link';
import api from '../../services/api';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
      setPageLoaded(true);
    }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error en el login. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade in={pageLoaded} timeout={800}>
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Slide direction="up" in={pageLoaded} timeout={500}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '60vh',
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                width: '100%',
                maxWidth: 450,
                backgroundColor: 'white',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}
                >
                  F
                </Box>
                <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: 'bold' }}>
                  Iniciar Sesión
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                  Accede a tu cuenta para gestionar tipos y propiedades
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleLogin} noValidate>
                <TextField
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                <TextField
                  label="Contraseña"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '1rem',
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
                </Button>

                <Stack direction="row" alignItems="center" spacing={1} justifyContent="flex-end" sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    ¿No tienes una cuenta?
                  </Typography>
                  <MuiLink
                    component={Link}
                    href="/register"
                    variant="body2"
                    sx={{ fontWeight: 'medium' }}
                  >
                    Regístrate
                  </MuiLink>
                </Stack>
              </Box>
            </Paper>
          </Box>
        </Slide>
      </Container>
    </Fade>
  );
};

export default LoginPage;
