// hooks/useTipos.ts
'use client'
import { useState, useEffect, useCallback } from 'react';
import api from '@/services/api';
import { TypeData, GetTypesResponse } from '@/interfaces/types';

export function useTipos() {
  const [tipos, setTipos] = useState<TypeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const fetchTipos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<GetTypesResponse>('/types');
      setTipos(response.data.types);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al cargar los tipos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTipos();
  }, [fetchTipos]);

  const filteredTipos = tipos.filter((tipo) =>
    tipo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tipo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedTipos = filteredTipos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    tipos: paginatedTipos,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    refetch: fetchTipos,
    total: filteredTipos.length,
  };
}
