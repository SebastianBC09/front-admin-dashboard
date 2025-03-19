'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <html lang="es">
      <head>
        <title>Fortex Frontend</title>
      </head>
      <body>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Fortex
            </Typography>
            <Button color="inherit" component={Link} href="/">
              Inicio
            </Button>
            {!isAuthenticated && (
              <>
                <Button color="inherit" component={Link} href="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} href="/register">
                  Registro
                </Button>
              </>
            )}
            {isAuthenticated && (
              <>
                <Button color="inherit" component={Link} href="/tipos">
                  Tipos
                </Button>
                <Button color="inherit" component={Link} href="/propiedades">
                  Propiedades
                </Button>
                {/* Agregar un botón de logout si lo deseas */}
              </>
            )}
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>{children}</Container>
      </body>
    </html>
  );
};

export default RootLayout;
