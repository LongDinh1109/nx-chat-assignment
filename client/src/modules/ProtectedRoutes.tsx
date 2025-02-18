import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({children}: {children: React.ReactNode}) {
  const isLoggedIn = localStorage.getItem('user:token') !== null;
  const isAuthPath = ['/login'].includes(
    window.location.pathname
  );
  if (!isLoggedIn && !isAuthPath) {
    return <Navigate to="/login" />;
  } else if (isLoggedIn && isAuthPath) {
    return <Navigate to="/" />;
  }
  return children;
}
