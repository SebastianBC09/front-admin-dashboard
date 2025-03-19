'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  CircularProgress,
  Fade,
  Slide
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import api from '../../services/api';

interface RegistrationData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState<RegistrationData>({
    name: '',
    email: '',
    password: '',
    role: 'USER',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const router = useRouter();

  // Animación al cargar la página
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validar nombre
    if (!form.name.trim()) {
      newErrors.name = 'El nombre es requerido';
      isValid = false;
    } else if (form.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
      isValid = false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = 'El email es requerido';
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Ingrese un email válido';
      isValid = false;
    }

    // Validar contraseña
    if (!form.password) {
      newErrors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Limpiar error específico al editar
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!validateForm()) {
      return;
    }

    setServerError(null);
    setLoading(true);

    try {
      const response = await api.post('/auth/register', form);
      console.log('Registro exitoso:', response.data);
      // Mostrar mensaje de éxito y redirigir después de un breve retraso
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error en el registro';
      setServerError(errorMessage);
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Fade in={pageLoaded} timeout={800}>
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Slide direction="up" in={pageLoaded} timeout={500}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
              border: '1px solid #e0e0e0'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" component="h1" fontWeight={600}>
                Crear cuenta
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Complete el formulario para registrarse en la plataforma
            </Typography>

            {serverError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {serverError}
              </Alert>
            )}

            {formSubmitted && Object.keys(errors).length === 0 && loading && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Registro exitoso. Redirigiendo al inicio de sesión...
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
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
                        onClick={toggleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{
                  mt: 1,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  position: 'relative'
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'common.white' }} />
                ) : (
                  'Crear cuenta'
                )}
              </Button>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  o
                </Typography>
              </Divider>

              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  ¿Ya tiene una cuenta?{' '}
                  <Link href="/login" style={{ textDecoration: 'none', color: theme => theme.palette.primary.main, fontWeight: 500 }}>
                    Iniciar sesión
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Slide>
      </Container>
    </Fade>
  );
};

export default RegisterPage;
