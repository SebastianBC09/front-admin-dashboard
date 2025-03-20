import ProtectedRoute from '@/components/ProtectedRoute';
import PropiedadesClient from '@/components/Properties/PropiedadesClient';

export default function PropiedadesPage() {
  return (
    <ProtectedRoute>
      <PropiedadesClient />
    </ProtectedRoute>
  );
}
