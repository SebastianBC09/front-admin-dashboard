
'use client'
import { useState } from 'react';
import api from '@/services/api';
import { useTipos } from './useTipos';

export const useTiposActions = () => {
  const { refetch } = useTipos();
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
      await api.delete(`/types/${pendingDeleteId}`);
      refetch();
      setNotification({ open: true, message: 'Tipo eliminado correctamente', severity: 'success' });
    } catch (error: any) {
      setNotification({ open: true, message: 'Error al eliminar el tipo. Inténtelo de nuevo.', severity: 'error' });
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
