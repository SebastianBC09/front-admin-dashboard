'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  // Avatar,
  Menu,
  MenuItem,
  Divider,
  // useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery
} from '@mui/material';
import {
  Home as HomeIcon,
  Category as CategoryIcon,
  ListAlt as ListAltIcon,
  Menu as MenuIcon,
  AccountCircle,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setAnchorEl(null);
    router.push('/login');
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, href: '/' },
    ...(isAuthenticated
      ? [
          { text: 'Tipos', icon: <CategoryIcon />, href: '/tipos' },
          { text: 'Propiedades', icon: <ListAltIcon />, href: '/propiedades' },
        ]
      : [])
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component="div" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Fortex
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            component={Link}
            href={item.href}
            key={item.text}
            sx={{
              borderRadius: '0 20px 20px 0',
              mx: 1,
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <html lang="es">
        <head>
          <title>Fortex - Gestión de Tipos y Propiedades</title>
          <meta name="description" content="Aplicación para la gestión de tipos y propiedades" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </head>
        <body>
          <CssBaseline />
          <AppBar position="sticky">
            <Toolbar>
              {isMobile && (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}

              <Typography
                variant="h6"
                component={Link}
                href="/"
                sx={{
                  flexGrow: 1,
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Box
                  component="span"
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  F
                </Box>
                Fortex
              </Typography>

              {!isMobile && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    color="inherit"
                    component={Link}
                    href="/"
                    startIcon={<HomeIcon />}
                    sx={{ borderRadius: 2 }}
                  >
                    Inicio
                  </Button>
                  {isAuthenticated && (
                    <>
                      <Button
                        color="inherit"
                        component={Link}
                        href="/tipos"
                        startIcon={<CategoryIcon />}
                        sx={{ borderRadius: 2 }}
                      >
                        Tipos
                      </Button>
                      <Button
                        color="inherit"
                        component={Link}
                        href="/propiedades"
                        startIcon={<ListAltIcon />}
                        sx={{ borderRadius: 2 }}
                      >
                        Propiedades
                      </Button>
                    </>
                  )}
                </Box>
              )}

              {!isAuthenticated ? (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    component={Link}
                    href="/login"
                    sx={{ borderRadius: 2 }}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    href="/register"
                    sx={{ borderRadius: 2 }}
                  >
                    Registro
                  </Button>
                </Box>
              ) : (
                <div>
                  <IconButton
                    size="large"
                    aria-label="cuenta del usuario"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Cerrar Sesión</ListItemText>
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
          >
            {drawer}
          </Drawer>

          <Container
            maxWidth="lg"
            sx={{
              mt: 4,
              mb: 8,
              minHeight: 'calc(100vh - 148px)',
              backgroundColor: 'white',
              borderRadius: 2,
              p: 3,
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)'
            }}
          >
            {children}
          </Container>

          <Box
            component="footer"
            sx={{
              py: 3,
              px: 2,
              mt: 'auto',
              backgroundColor: (theme) => theme.palette.grey[100]
            }}
          >
            <Container maxWidth="lg">
              <Typography variant="body2" color="text.secondary" align="center">
                © {new Date().getFullYear()} Fortex - Administración de Tipos y Propiedades
              </Typography>
            </Container>
          </Box>
        </body>
      </html>
    </ThemeProvider>
  );
};

export default RootLayout;
