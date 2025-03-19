'use client'
import React from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
} from '@mui/material';
import {
  Home as HomeIcon,
  Category as CategoryIcon,
  ListAlt as ListAltIcon,
  Menu as MenuIcon,
  AccountCircle,
  Logout as LogoutIcon,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useHeader } from '../hooks/useHeader';

interface ClientHeaderProps {
  onToggleDarkMode: () => void;
  currentMode: 'light' | 'dark';
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ onToggleDarkMode, currentMode }) => {
  const { isAuthenticated, drawerOpen, anchorEl, handleLogout, handleMenu, handleCloseMenu, toggleDrawer } = useHeader();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, href: '/' },
    ...(isAuthenticated
      ? [
          { text: 'Tipos', icon: <CategoryIcon />, href: '/tipos' },
          { text: 'Propiedades', icon: <ListAltIcon />, href: '/propiedades' },
        ]
      : []),
  ];

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Fortex
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component={Link} href={item.href} sx={{
            borderRadius: '0 20px 20px 0',
            mx: 1,
            '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' },
          }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
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
              gap: 1,
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
                fontWeight: 'bold',
              }}
            >
              F
            </Box>
            Fortex
          </Typography>
          <IconButton onClick={onToggleDarkMode} color="inherit">
            {currentMode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button color="inherit" component={Link} href="/" startIcon={<HomeIcon />} sx={{ borderRadius: 2 }}>
                Inicio
              </Button>
              {isAuthenticated && (
                <>
                  <Button color="inherit" component={Link} href="/tipos" startIcon={<CategoryIcon />} sx={{ borderRadius: 2 }}>
                    Tipos
                  </Button>
                  <Button color="inherit" component={Link} href="/propiedades" startIcon={<ListAltIcon />} sx={{ borderRadius: 2 }}>
                    Propiedades
                  </Button>
                </>
              )}
            </Box>
          )}
          {!isAuthenticated ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" color="inherit" component={Link} href="/login" sx={{ borderRadius: 2 }}>
                Iniciar Sesión
              </Button>
              <Button variant="contained" color="secondary" component={Link} href="/register" sx={{ borderRadius: 2 }}>
                Registro
              </Button>
            </Box>
          ) : (
            <Box>
              <IconButton size="large" onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cerrar Sesión</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default ClientHeader;
