import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const refreshMe = useCallback(async () => {
    try {
      const res = await api.me();
      setUser(res.user || null);
    } catch {
      setUser(null);
    } finally {
      setInitializing(false);
    }
  }, []);

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  const login = useCallback(async ({ email, password }) => {
    const res = await api.login({ email, password });
    setUser(res.user);
    return res.user;
  }, []);

  const signup = useCallback(async ({ name, email, password }) => {
    const res = await api.signup({ name, email, password });
    return res;
  }, []);

  const resendVerification = useCallback(async (email) => {
    return api.resendVerification({ email });
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      initializing,
      refreshMe,
      login,
      signup,
      logout,
      resendVerification,
    }),
    [user, initializing, refreshMe, login, signup, logout, resendVerification]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}