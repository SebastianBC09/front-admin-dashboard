'use client'
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Button,
  Divider,
  Paper,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Apartment as ApartmentIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Place as PlaceIcon,
  Brightness1 as GenericIcon
} from '@mui/icons-material';
import api from '../../services/api';

interface Property {
  id: string;
  name: string;
  type: string;
}

// Componente para seleccionar el icono adecuado basado en el tipo
const TypeIcon: React.FC<{ type: string }> = ({ type }) => {
  const lowerType = type.toLowerCase();

  if (lowerType.includes('person')) return <PersonIcon color="primary" />;
  if (lowerType.includes('organi')) return <ApartmentIcon color="secondary" />;
  if (lowerType.includes('event')) return <EventIcon style={{ color: '#ff9800' }} />;
  if (lowerType.includes('place') || lowerType.includes('lugar')) return <PlaceIcon style={{ color: '#4caf50' }} />;

  return <GenericIcon style={{ color: '#9c27b0' }} />;
};

// Componente de tarjeta de propiedad
const PropertyCard: React.FC<{ property: Property }> = ({ property }) => (
  <Card variant="outlined" sx={{
    height: '100%',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    }
  }}>
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        <TypeIcon type={property.type} />
        <Typography variant="h6" ml={1} fontWeight="500">
          {property.name}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Chip
          label={property.type}
          size="small"
          sx={{
            borderRadius: '4px',
            backgroundColor: property.type.toLowerCase().includes('person') ? '#bbdefb' :
              property.type.toLowerCase().includes('organi') ? '#f8bbd0' :
              property.type.toLowerCase().includes('event') ? '#ffe0b2' :
              property.type.toLowerCase().includes('place') ? '#c8e6c9' : '#e1bee7'
          }}
        />
        <Box>
          <IconButton size="small" color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const PropiedadesPage: React.FC = () => {
  const [propiedades, setPropiedades] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  // Filtrar propiedades basadas en el término de búsqueda
  const filteredProperties = propiedades.filter(
    (prop) => prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              prop.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="500" color="primary">
          Propiedades
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: '8px',
            boxShadow: 2,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
          }}
        >
          Nueva Propiedad
        </Button>
      </Box>

      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar propiedades por nombre o tipo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: { borderRadius: 2 }
          }}
        />
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && filteredProperties.length === 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          No se encontraron propiedades. {searchTerm && 'Intenta con otro término de búsqueda.'}
        </Alert>
      )}

      <Grid container spacing={3}>
        {filteredProperties.map((prop) => (
          <Grid item xs={12} sm={6} md={4} key={prop.id}>
            <PropertyCard property={prop} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default PropiedadesPage;
