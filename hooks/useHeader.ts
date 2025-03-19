'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useHeader = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

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
    setDrawerOpen((prev) => !prev);
  };

  return {
    isAuthenticated,
    drawerOpen,
    anchorEl,
    handleLogout,
    handleMenu,
    handleCloseMenu,
    toggleDrawer,
  };
};
