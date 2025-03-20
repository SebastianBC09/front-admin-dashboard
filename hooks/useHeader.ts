'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export const useHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logout } = useAuthStore();
  const router = useRouter();

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    setAnchorEl(null);
    router.push('/login');
  };

  return {
    drawerOpen,
    toggleDrawer,
    anchorEl,
    handleMenu,
    handleCloseMenu,
    handleLogout,
  };
};
