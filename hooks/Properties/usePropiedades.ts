'use client'
import { useState, useEffect, useCallback } from 'react';
import api from '@/services/api';
import { PropertyData, GetPropertiesResponse } from '@/interfaces/types';

export function usePropiedades() {
  const [propiedades, setPropiedades] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  // const [notification, setNotification] = useState({
  //   open: false,
  //   message: '',
  //   severity: 'success' as 'success' | 'error',
  // });

  //   const handleCloseNotification = () => setNotification((prev) => ({ ...prev, open: false }));

  const fetchPropiedades = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<GetPropertiesResponse>('/properties');
      setPropiedades(response.data.properties);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar las propiedades');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPropiedades();
  }, [fetchPropiedades]);

  const filteredPropiedades = propiedades.filter((prop) =>
    prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prop.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPropiedades = filteredPropiedades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    propiedades: paginatedPropiedades,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    refetch: fetchPropiedades,
    total: filteredPropiedades.length
  };
}
