import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <Button color="inherit" component={Link} href="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} href="/register">
              Registro
            </Button>
            <Button color="inherit" component={Link} href="/tipos">
              Tipos
            </Button>
            <Button color="inherit" component={Link} href="/propiedades">
              Propiedades
            </Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>{children}</Container>
      </body>
    </html>
  );
}
