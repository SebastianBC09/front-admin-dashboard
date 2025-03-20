'use client'
import { useState } from 'react';
import { usePropiedades } from './usePropiedades';
import api from '@/services/api';

export const usePropiedadesActions = () => {
  const { refetch } = usePropiedades();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const requestDelete = (id: string) => {
    setPendingDeleteId(id);
    setConfirmDialogOpen(true);
  };


  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      await api.delete(`/properties/${pendingDeleteId}`);
      refetch();
      setNotification({ open: true, message: 'Propiedad eliminada correctamente', severity: 'success' });
    } catch (error: any) {
      setNotification({ open: true, message: 'Error al eliminar la propiedad. Inténtelo de nuevo.', severity: 'error' });
    } finally {
      setConfirmDialogOpen(false);
      setPendingDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setConfirmDialogOpen(false);
    setPendingDeleteId(null);
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return {
    openForm,
    handleOpenForm,
    handleCloseForm,
    notification,
    handleCloseNotification,
    requestDelete,
    confirmDialogOpen,
    confirmDelete,
    cancelDelete,
  };
};
