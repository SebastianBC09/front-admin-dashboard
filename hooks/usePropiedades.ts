'use client'
import { useState, useEffect, useCallback } from 'react';
import api from '@/services/api';
import { PropertyData, GetPropertiesResponse } from '@/interfaces/types';

export function usePropiedades() {
  const [propiedades, setPropiedades] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  return {
    propiedades: filteredPropiedades,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    refetch: fetchPropiedades,
  };
}
