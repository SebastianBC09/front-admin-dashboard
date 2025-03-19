import React, { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
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

  useEffect(() => {
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

    fetchTipos();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Tipos
      </Typography>
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
    </Box>
  );
};

export default TiposPage;
