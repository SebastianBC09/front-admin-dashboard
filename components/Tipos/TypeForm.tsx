'use client'
import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  Divider,
  Paper,
  Autocomplete,
} from '@mui/material';
import { Close as CloseIcon, Save as SaveIcon } from '@mui/icons-material';
import api from '@/services/api';

interface TypesFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const TypesForm: React.FC<TypesFormProps> = ({ open, onClose, onSuccess }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedProperties, setSelectedProperties] = useState<{ id: string; name: string }[]>([]);
  const [properties, setProperties] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get('/properties');
        setProperties(response.data.properties);
      } catch (err) {
        console.error('Error loading properties', err);
      }
    };
    fetchProperties();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post('/types', { name, description, properties: selectedProperties.map(prop => prop.id) });
      resetForm();
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
          setError('Error al crear el tipo');
        }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setSelectedProperties([]);
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
            Nuevo Tipo
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
            Define un nuevo tipo asignándole un nombre, una descripción y sus propiedades asociadas.
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
          <TextField
            label="Descripción"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Autocomplete
            multiple
            options={properties}
            getOptionLabel={(option) => option.name}
            value={selectedProperties}
            onChange={(_, newValue) => setSelectedProperties(newValue)}
            renderInput={(params) => <TextField {...params} label="Propiedades" variant="outlined" />}
          />
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

export default TypesForm;
