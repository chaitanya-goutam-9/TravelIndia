import { createContext, useContext, useState, useCallback } from 'react';

const BASE = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => sessionStorage.getItem('adminToken'));

  const login = useCallback(async (email, password) => {
    const res = await fetch(`${BASE}/api/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    sessionStorage.setItem('adminToken', data.accessToken);
    setAccessToken(data.accessToken);
  }, []);

  const logout = useCallback(async () => {
    await fetch(`${BASE}/api/admin/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: 'include',
    });
    sessionStorage.removeItem('adminToken');
    setAccessToken(null);
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, isAuthenticated: !!accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
