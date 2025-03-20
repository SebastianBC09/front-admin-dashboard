'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { useAuthStore } from '@/store/useAuthStore';

export const useLogin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      sessionStorage.setItem('token', token);
      setUser(user);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error en el login. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    showPassword,
    toggleShowPassword,
    handleLogin,
  };
};
