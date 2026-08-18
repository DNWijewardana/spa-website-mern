import { createContext, useContext, useEffect, useState } from 'react';
import { apiLogin, apiRegister, apiLogout, apiMe } from '../lib/api.js';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on load (cookie-based)
  useEffect(() => {
    apiMe()
      .then((d) => setUser(d.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (data) => {
    const res = await apiLogin(data);
    setUser(res.user);
    return res.user;
  };

  const register = async (data) => {
    const res = await apiRegister(data);
    setUser(res.user);
    return res.user;
  };

  const logout = async () => {
    await apiLogout().catch(() => {});
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
