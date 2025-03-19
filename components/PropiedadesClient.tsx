'use client'
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Snackbar,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { usePropiedades } from '@/hooks/usePropiedades';

import Wrapper from './Wrapper';
import PropertyCard from './PropertyCard';

const PropiedadesClient: React.FC = () => {
  const { propiedades, loading, error, searchTerm, setSearchTerm } = usePropiedades();
  const [notification, setNotification] = React.useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleCloseNotification = () => setNotification((prev) => ({ ...prev, open: false }));

  return (
    <Wrapper maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
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
      <Paper sx={{ mb: 3, p: 2, borderRadius: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar propiedades por nombre o tipo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
      </Paper>
      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : propiedades.length === 0 ? (
        <Alert severity="info">
          No se encontraron propiedades. {searchTerm && 'Intenta con otro término de búsqueda.'}
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {propiedades.map((prop) => (
            <Grid key={prop.id} size={{xs: 12, sm: 6, md:4}}>
              <PropertyCard property={prop} />
            </Grid>
          ))}
        </Grid>
      )}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

export default PropiedadesClient;
