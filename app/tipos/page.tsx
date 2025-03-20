import ProtectedRoute from '@/components/ProtectedRoute';
import TiposClient from "@/components/Tipos/TiposClient";

export default function TiposPage() {
  return (
    <ProtectedRoute>
      <TiposClient />
    </ProtectedRoute>
  );
}
