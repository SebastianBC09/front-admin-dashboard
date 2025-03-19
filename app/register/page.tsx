import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import api from '../../services/api';

interface RegistrationData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState<RegistrationData>({
    name: '',
    email: '',
    password: '',
    role: 'USER',
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await api.post('/auth/register', form);
      console.log('Registro exitoso:', response.data);
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error en el registro');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Registro de Usuario
      </Typography>
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField
          label="Nombre"
          name="name"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Registrarse
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;
