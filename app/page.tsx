'use client'
import React, { useEffect, useState } from 'react';
import { Typography, Box, Paper, Grid, Button, Card, CardContent, CardHeader, CardActions, Divider, Stack } from '@mui/material';
import { Category as CategoryIcon, FormatListBulleted as ListIcon, Security as SecurityIcon } from '@mui/icons-material';
import Link from 'next/link';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          p: 6,
          mb: 4,
          borderRadius: 3,
          backgroundImage: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
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

          {!isAuthenticated && (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/register"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  },
                  fontWeight: 'bold',
                  px: 4
                }}
              >
                Comenzar Ahora
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                href="/login"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                Iniciar Sesión
              </Button>
            </Stack>
          )}

          {isAuthenticated && (
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/tipos"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                },
                fontWeight: 'bold',
                px: 4
              }}
            >
              Ir al Panel
            </Button>
          )}
        </Box>

        {/* Decorative elements */}
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

      {/* Features */}
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 600,
          mb: 4,
          mt: 8
        }}
      >
        Características Principales
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}
          >
            <CardHeader
              avatar={
                <CategoryIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              }
              title={
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                  Gestión de Tipos
                </Typography>
              }
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography>
                Crea, edita y elimina diferentes tipos de entidades para adaptarse a tus necesidades organizativas.
              </Typography>
            </CardContent>
            <Divider />
            <CardActions>
              {isAuthenticated ? (
                <Button
                  size="small"
                  component={Link}
                  href="/tipos"
                >
                  Administrar Tipos
                </Button>
              ) : (
                <Button
                  size="small"
                  component={Link}
                  href="/login"
                >
                  Iniciar sesión para acceder
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}
          >
            <CardHeader
              avatar={
                <ListIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              }
              title={
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                  Control de Propiedades
                </Typography>
              }
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography>
                Administra propiedades personalizadas y asígnalas a diferentes tipos mediante un intuitivo sistema de multiselección.
              </Typography>
            </CardContent>
            <Divider />
            <CardActions>
              {isAuthenticated ? (
                <Button
                  size="small"
                  component={Link}
                  href="/propiedades"
                >
                  Administrar Propiedades
                </Button>
              ) : (
                <Button
                  size="small"
                  component={Link}
                  href="/login"
                >
                  Iniciar sesión para acceder
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}
          >
            <CardHeader
              avatar={
                <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              }
              title={
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                  Autenticación Segura
                </Typography>
              }
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography>
                Sistema de autenticación JWT con roles de usuario para garantizar un acceso seguro y controlado a las funcionalidades.
              </Typography>
            </CardContent>
            <Divider />
            <CardActions>
              {!isAuthenticated ? (
                <Button
                  size="small"
                  component={Link}
                  href="/register"
                >
                  Crear una cuenta
                </Button>
              ) : (
                <Button
                  size="small"
                  disabled
                >
                  Sesión iniciada
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
