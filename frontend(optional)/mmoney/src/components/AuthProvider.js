import React, { createContext, useState, useEffect } from 'react';
import api from '../axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      setUser({ id: res.data.userId });
      toast.success('Logged in successfully!');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
      return false;
    }
  };

  const register = async (email, password) => {
    try {
      await api.post('/auth/register', { email, password });
      toast.success('Registered successfully! Please log in.');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    toast.info('Logged out');
  };

  const refreshAccessToken = async () => {
    try {
      const res = await api.post('/auth/refresh', { refreshToken });
      setAccessToken(res.data.accessToken);
      localStorage.setItem('accessToken', res.data.accessToken);
      return res.data.accessToken;
    } catch (err) {
      logout();
      return null;
    }
  };

  // Auto-refresh token before expiry
  useEffect(() => {
    if (accessToken) {
      api.interceptors.request.use(
        async (config) => {
          config.headers.Authorization = `Bearer ${accessToken}`;
          return config;
        },
        async (error) => {
          if (error.response?.status === 403) {
            const newToken = await refreshAccessToken();
            if (newToken) {
              error.config.headers.Authorization = `Bearer ${newToken}`;
              return api(error.config);
            }
          }
          return Promise.reject(error);
        }
      );
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};