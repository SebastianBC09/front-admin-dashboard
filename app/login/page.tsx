import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Box, Typography } from '@mui/material';
import api from '../../services/api';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error en el login');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400, mx: 'auto', mt: 8 }}
    >
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Iniciar Sesión
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Email"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Contraseña"
        variant="outlined"
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Ingresar
      </Button>
    </Box>
  );
};

export default LoginPage;
