'use client'
import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import AuthButtons from '../auth/AuthButtons';

const Hero: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        p: 6,
        mb: 4,
        borderRadius: 3,
        backgroundImage: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)'
          : 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      })}
    >
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          Bienvenido a Fortex
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            maxWidth: 600,
            opacity: 0.9
          }}
        >
          Plataforma integral para la administración de tipos y propiedades con una interfaz intuitiva y potentes herramientas de gestión.
        </Typography>
        <AuthButtons />
      </Box>
      <Box sx={{
        position: 'absolute',
        right: -50,
        bottom: -50,
        width: 200,
        height: 200,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        zIndex: 1
      }} />
      <Box sx={{
        position: 'absolute',
        right: 100,
        top: -30,
        width: 100,
        height: 100,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        zIndex: 1
      }} />
    </Paper>
  );
};

export default Hero;
