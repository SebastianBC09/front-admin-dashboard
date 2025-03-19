import React, { useEffect, useState } from 'react';
import { Drawer, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip, Typography } from '@mui/material';
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

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get('/properties');
        setPropertyOptions(response.data.properties);
      } catch (err: any) {
        console.error('Error fetching properties', err);
      }
    };

    fetchProperties();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = { name, description, properties: selectedProperties };
      await api.post('/types', data);
      setName('');
      setDescription('');
      setSelectedProperties([]);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear el tipo');
    } finally {
      setLoading(false);
    }
  };

  const handlePropertiesChange = (event: any) => {
    const { value } = event.target;
    setSelectedProperties(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Crear Tipo
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
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
          <FormControl fullWidth margin="normal">
            <InputLabel id="properties-label">Propiedades</InputLabel>
            <Select
              labelId="properties-label"
              multiple
              value={selectedProperties}
              onChange={handlePropertiesChange}
              input={<OutlinedInput label="Propiedades" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((value) => {
                    const property = propertyOptions.find((p) => p.id === value);
                    return <Chip key={value} label={property ? property.name : value} />;
                  })}
                </Box>
              )}
            >
              {propertyOptions.map((property) => (
                <MenuItem key={property.id} value={property.id}>
                  {property.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ mt: 2 }}>
            {loading ? 'Creando...' : 'Crear Tipo'}
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default TypeForm;
