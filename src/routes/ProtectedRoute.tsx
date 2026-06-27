import React from 'react';
import { ROUTES } from '@/constants';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { ROLES, Role } from '@/constants/roles';

export function ProtectedRoute({ children }: { children?: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export function GuestRoute({ children }: { children?: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to={user?.role === 'PARENT' ? ROUTES.PARENT_DASHBOARD : ROUTES.DASHBOARD} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export function AdminRoute({ children }: { children?: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (user.role !== ROLES.ADMIN && user.role !== ROLES.SUPER_ADMIN) {
    return <Navigate to={user.role === 'PARENT' ? ROUTES.PARENT_DASHBOARD : ROUTES.DASHBOARD} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export function TeacherRoute({ children }: { children?: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  const allowedRoles: Role[] = [ROLES.TEACHER, ROLES.ADMIN, ROLES.SUPER_ADMIN];
  if (!allowedRoles.includes(user.role as Role)) {
    return <Navigate to={user.role === 'PARENT' ? ROUTES.PARENT_DASHBOARD : ROUTES.DASHBOARD} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export default ProtectedRoute;
