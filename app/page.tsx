import React from 'react';
import { Typography, Box } from '@mui/material';

export default function HomePage() {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Bienvenido a Fortex
      </Typography>
      <Typography variant="h6">
        Esta es la aplicación frontend para la prueba técnica de Fortex.
      </Typography>
    </Box>
  );
}
