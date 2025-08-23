import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { refreshMe } from '../redux/authSlice';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, initializing } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (initializing) {
      dispatch(refreshMe());
    }
  }, [dispatch, initializing]);

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

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/messages" replace />;
  }

  return children;
}