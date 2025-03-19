import React, { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, CircularProgress, Button } from '@mui/material';
import TypeForm from '../../components/TypeForm';
import api from '../../services/api';

interface Type {
  id: string;
  name: string;
  description?: string;
  properties: any[];
}

const TiposPage: React.FC = () => {
  const [tipos, setTipos] = useState<Type[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const fetchTipos = async () => {
    setLoading(true);
    try {
      const response = await api.get('/types');
      setTipos(response.data.types);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al obtener los tipos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);
  const handleSuccess = () => fetchTipos();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Tipos
      </Typography>
      <Button variant="contained" onClick={handleDrawerOpen} sx={{ mb: 2 }}>
        Crear Tipo
      </Button>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <List>
        {tipos.map((tipo) => (
          <ListItem key={tipo.id}>
            <ListItemText
              primary={tipo.name}
              secondary={tipo.description || 'Sin descripción'}
            />
          </ListItem>
        ))}
      </List>
      <TypeForm open={openDrawer} onClose={handleDrawerClose} onSuccess={handleSuccess} />
    </Box>
  );
};

export default TiposPage;
