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
  useTheme,
  Theme
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
import { useHeader } from '@/hooks/useHeader';
import { useAuthStore } from '@/store/useAuthStore';
interface ClientHeaderProps {
  onToggleDarkMode: () => void;
  currentMode: 'light' | 'dark';
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ onToggleDarkMode, currentMode }) => {
  const {
    drawerOpen,
    anchorEl,
    handleLogout,
    handleMenu,
    handleCloseMenu,
    toggleDrawer,
  } = useHeader();
  const { isAuthenticated, user } = useAuthStore();
  const theme = useTheme();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const drawerItems = [
    { text: 'Inicio', icon: <HomeIcon />, href: '/' },
    ...(isAuthenticated
      ? [
          { text: 'Tipos', icon: <CategoryIcon />, href: '/tipos' },
          { text: 'Propiedades', icon: <ListAltIcon />, href: '/propiedades' },
        ]
      : [
          { text: 'Iniciar Sesión', icon: <AccountCircle />, href: '/login' },
          { text: 'Registro', icon: <AccountCircle />, href: '/register' },
        ]),
  ];

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
          Fortex
        </Typography>
      </Box>
      <Divider />
      <List>
        {drawerItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            href={item.href}
            sx={{
              borderRadius: '0 20px 20px 0',
              mx: 1,
              color: theme.palette.mode === 'dark' ? theme.palette.common.white : 'inherit',
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(25, 118, 210, 0.08)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: theme.palette.mode === 'dark' ? theme.palette.common.white : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
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
          <IconButton onClick={onToggleDarkMode} color="inherit" sx={{ mr: 1 }}>
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
          {!isMobile && (
            <>
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
                    <MenuItem disabled>{user?.name}</MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                      Cerrar Sesión
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </>
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
