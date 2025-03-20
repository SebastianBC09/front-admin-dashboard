'use client'
import React, { useState } from 'react';
import {
  Drawer,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  Divider,
  Paper,
} from '@mui/material';
import { Close as CloseIcon, Save as SaveIcon } from '@mui/icons-material';
import api from '@/services/api';

interface PropertiesFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const PropertiesForm: React.FC<PropertiesFormProps> = ({ open, onClose, onSuccess }) => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post('/properties', { name, type });
      resetForm();
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error al crear la propiedad');
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setType('');
    setError(null);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          borderTopLeftRadius: { xs: 0, sm: 16 },
          borderBottomLeftRadius: { xs: 0, sm: 16 },
        },
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight="500" color="primary">
            Nueva Propiedad
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 3 }} />
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        )}
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'rgba(33, 150, 243, 0.05)', borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Define una nueva propiedad asignándole un nombre y un tipo de dato.
          </Typography>
        </Paper>
        <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FormControl fullWidth >
            <InputLabel>Tipo de Propiedad</InputLabel>
            <Select
              label="Tipo de Propiedad"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <MenuItem value="text">Texto</MenuItem>
              <MenuItem value="number">Número</MenuItem>
              <MenuItem value="date">Fecha</MenuItem>
              <MenuItem value="check">Check</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 'auto', pt: 3, display: 'flex', gap: 2 }}>
            <Button variant="outlined" fullWidth onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={20} /> : <SaveIcon />} Guardar
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export default PropertiesForm;
