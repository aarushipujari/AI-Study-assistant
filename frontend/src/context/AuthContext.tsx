'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type AcademicStream = 'medical' | 'engineering' | 'class10' | 'science';

export interface UserProfile {
  name: string;
  email: string;
  stream: AcademicStream;
  institution?: string;
  joinedAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, name?: string, stream?: AcademicStream) => void;
  register: (name: string, email: string, stream: AcademicStream, institution?: string) => void;
  updateStream: (stream: AcademicStream) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'vaultx_user_profile';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      console.error('Failed to load profile from storage');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email: string, name?: string, stream?: AcademicStream) => {
    const existing = localStorage.getItem(STORAGE_KEY);
    let profile: UserProfile;

    if (existing) {
      profile = JSON.parse(existing);
      profile.email = email;
      if (name) profile.name = name;
      if (stream) profile.stream = stream;
    } else {
      profile = {
        name: name || email.split('@')[0],
        email,
        stream: stream || 'medical',
        joinedAt: new Date().toISOString(),
      };
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setUser(profile);
  };

  const register = (
    name: string,
    email: string,
    stream: AcademicStream,
    institution?: string
  ) => {
    const profile: UserProfile = {
      name,
      email,
      stream,
      institution: institution || 'University Campus',
      joinedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setUser(profile);
  };

  const updateStream = (stream: AcademicStream) => {
    if (!user) return;
    const updated = { ...user, stream };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setUser(updated);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        updateStream,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
