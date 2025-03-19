'use client'
import React, { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import api from '../../services/api';

interface Property {
  id: string;
  name: string;
  type: string;
}

const PropiedadesPage: React.FC = () => {
  const [propiedades, setPropiedades] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await api.get('/properties');
        setPropiedades(response.data.properties);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al obtener las propiedades');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Propiedades
      </Typography>
      <List>
        {propiedades.map((prop) => (
          <ListItem key={prop.id}>
            <ListItemText
              primary={prop.name}
              secondary={`Tipo: ${prop.type}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PropiedadesPage;
