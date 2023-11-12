import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/auth/AuthContext';

export const ProtectedRoute = () => {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};
