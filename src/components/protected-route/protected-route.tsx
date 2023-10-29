import { ReactNode } from 'react';
import { useAuth } from '../../contexts/auth/auth-context';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return children;
}
