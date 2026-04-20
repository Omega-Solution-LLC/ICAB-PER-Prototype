"use client";

import React, { createContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { getSession, setSession as setStoredSession, clearSession } from '@/lib/auth';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loginState: (user: User) => void;
  logoutState: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const sessionUser = getSession();
    Promise.resolve().then(() => {
      if (sessionUser) {
        setUser(sessionUser);
      }
      setIsInitialized(true);
    });
  }, []);

  const loginState = (userContext: User) => {
    setUser(userContext);
    setStoredSession(userContext);
  };

  const logoutState = () => {
    setUser(null);
    clearSession();
  };

  if (!isInitialized) return null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loginState, logoutState }}>
      {children}
    </AuthContext.Provider>
  );
}
