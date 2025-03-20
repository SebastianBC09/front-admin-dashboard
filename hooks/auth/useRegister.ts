'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../services/api';

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

export const useRegister = () => {
  const [form, setForm] = useState<RegistrationData>({ name: '', email: '', password: '', role: 'USER' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (!form.name.trim()) {
      newErrors.name = 'El nombre es requerido';
      isValid = false;
    } else if (form.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = 'El email es requerido';
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Ingrese un email válido';
      isValid = false;
    }
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
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setServerError(null);
    setLoading(true);
    try {
      await api.post('/auth/register', form);
      setTimeout(() => router.push('/login'), 1500);
    } catch (err: any) {
      setServerError(err.response?.data?.message || 'Error en el registro');
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    serverError,
    loading,
    handleChange,
    handleRegister,
  };
};
