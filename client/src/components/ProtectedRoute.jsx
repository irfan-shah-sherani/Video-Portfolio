import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

export default function ProtectedRoute({ children }) {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return (
      <div className="min-h-[50vh] grid place-items-center">
        <div className="text-sm text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}