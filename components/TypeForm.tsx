import React, { useEffect, useState } from 'react';
import {
  Drawer,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  Divider,
  Paper,
  // Tooltip,
  FormHelperText
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Info as InfoIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import api from '../services/api';

interface TypeFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface PropertyOption {
  id: string;
  name: string;
}

const TypeForm: React.FC<TypeFormProps> = ({ open, onClose, onSuccess }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [propertyOptions, setPropertyOptions] = useState<PropertyOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProperties, setLoadingProperties] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      fetchProperties();
    }
  }, [open]);

  const fetchProperties = async () => {
    setLoadingProperties(true);
    try {
      const response = await api.get('/properties');
      setPropertyOptions(response.data.properties);
    } catch (err: any) {
      console.error('Error fetching properties', err);
      setError('No se pudieron cargar las propiedades. Intente de nuevo.');
    } finally {
      setLoadingProperties(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = { name, description, properties: selectedProperties };
      await api.post('/types', data);
      resetForm();
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear el tipo');
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

  const handlePropertiesChange = (event: any) => {
    const { value } = event.target;
    setSelectedProperties(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 450 },
          borderTopLeftRadius: { xs: 0, sm: 16 },
          borderBottomLeftRadius: { xs: 0, sm: 16 },
          boxShadow: '0px 0px 24px rgba(0,0,0,0.2)'
        }
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight="500" color="primary">
            Crear Tipo
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            action={
              <IconButton color="inherit" size="small" onClick={() => setError(null)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        )}

        <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: 'rgba(33, 150, 243, 0.05)', borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <InfoIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            Los tipos definen categorías de entidades en el sistema. Puedes asignar
            múltiples propiedades a cada tipo.
          </Typography>
        </Paper>

        <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <TextField
            label="Nombre del Tipo"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            InputProps={{
              sx: { borderRadius: 2 }
            }}
            helperText="Ej: Persona, Organización, Evento"
          />

          <TextField
            label="Descripción"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{
              sx: { borderRadius: 2 }
            }}
            helperText="Descripción breve del tipo (opcional)"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="properties-label">Propiedades</InputLabel>
            <Select
              labelId="properties-label"
              multiple
              value={selectedProperties}
              onChange={handlePropertiesChange}
              input={<OutlinedInput label="Propiedades" sx={{ borderRadius: 2 }} />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((value) => {
                    const property = propertyOptions.find((p) => p.id === value);
                    return (
                      <Chip
                        key={value}
                        label={property ? property.name : value}
                        size="small"
                        sx={{
                          bgcolor: 'primary.light',
                          color: 'primary.contrastText',
                          fontWeight: 500
                        }}
                      />
                    );
                  })}
                </Box>
              )}
              disabled={loadingProperties}
              endAdornment={
                loadingProperties && (
                  <CircularProgress size={20} sx={{ position: 'absolute', right: 36, top: '50%', transform: 'translateY(-50%)' }} />
                )
              }
            >
              {propertyOptions.length === 0 && !loadingProperties ? (
                <MenuItem disabled>No hay propiedades disponibles</MenuItem>
              ) : (
                propertyOptions.map((property) => (
                  <MenuItem key={property.id} value={property.id}>
                    {property.name}
                  </MenuItem>
                ))
              )}
            </Select>
            <Box display="flex" justifyContent="flex-end" mt={0.5}>
              <Button
                size="small"
                startIcon={<RefreshIcon />}
                onClick={fetchProperties}
                disabled={loadingProperties}
              >
                Actualizar lista
              </Button>
            </Box>
            <FormHelperText>
              Selecciona las propiedades que pertenecen a este tipo
            </FormHelperText>
          </FormControl>

          <Box sx={{ mt: 'auto', pt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                resetForm();
                onClose();
              }}
              disabled={loading}
              startIcon={<CloseIcon />}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
              sx={{
                borderRadius: '8px',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #0EA6D2 90%)',
                }
              }}
            >
              {loading ? 'Guardando...' : 'Guardar Tipo'}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export default TypeForm;
