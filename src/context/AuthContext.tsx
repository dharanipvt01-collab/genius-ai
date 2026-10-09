import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<User>;
  register: (name: string, email: string, pass: string, role?: string) => Promise<User>;
  logout: () => void;
  switchRole: (newRole: UserRole) => Promise<void>;
  updateUser: (updated: User) => void;
  updateProfile: (name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('genius_ai_token');
    const savedUser = localStorage.getItem('genius_ai_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('genius_ai_token');
        localStorage.removeItem('genius_ai_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<User> => {
    setIsLoading(true);
    try {
      const data = await api.login({ email, password: pass });
      localStorage.setItem('genius_ai_token', data.access_token);
      localStorage.setItem('genius_ai_user', JSON.stringify(data.user));
      setToken(data.access_token);
      setUser(data.user);
      return data.user;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, pass: string, chosenRole: string = 'citizen'): Promise<User> => {
    setIsLoading(true);
    try {
      const data = await api.register({ name, email, password: pass, role: chosenRole });
      localStorage.setItem('genius_ai_token', data.access_token);
      localStorage.setItem('genius_ai_user', JSON.stringify(data.user));
      setToken(data.access_token);
      setUser(data.user);
      return data.user;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('genius_ai_token');
    localStorage.removeItem('genius_ai_user');
    setToken(null);
    setUser(null);
  };

  const switchRole = async (newRole: UserRole) => {
    if (!user) return;
    try {
      const updated = await api.updateProfile({ role: newRole });
      setUser(updated);
      localStorage.setItem('genius_ai_user', JSON.stringify(updated));
    } catch (e) {
      // Optimistic update for local presentation mode
      const updated: User = { ...user, role: newRole };
      setUser(updated);
      localStorage.setItem('genius_ai_user', JSON.stringify(updated));
    }
  };

  const updateUser = (updated: User) => {
    setUser(updated);
    localStorage.setItem('genius_ai_user', JSON.stringify(updated));
  };

  const updateProfile = async (name: string) => {
    if (!user) return;
    try {
      const updated = await api.updateProfile({ name });
      setUser(updated);
      localStorage.setItem('genius_ai_user', JSON.stringify(updated));
    } catch (e) {
      const updated: User = { ...user, name };
      setUser(updated);
      localStorage.setItem('genius_ai_user', JSON.stringify(updated));
    }
  };

  const role: UserRole = user?.role || 'citizen';
  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider value={{
      user,
      role,
      token,
      isLoading,
      isAuthenticated,
      login,
      register,
      logout,
      switchRole,
      updateUser,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
