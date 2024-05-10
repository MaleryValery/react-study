import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({
  element,
  redirectPath,
}: {
  redirectPath: string;
  element: ReactNode;
}) {
  const { isAuth } = useAuth();

  if (isAuth) return element;

  return <Navigate to={redirectPath} replace />;
}

export default ProtectedRoute;
