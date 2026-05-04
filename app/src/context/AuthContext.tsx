import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

type AuthContextData = {
  user: any;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storedToken = await AsyncStorage.getItem('@token');

      if (storedToken) {
        api.defaults.headers.Authorization = `Bearer ${storedToken}`;
        const me = await api.get('/me');

        setUser(me.data);
        setToken(storedToken);
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  async function signIn(email: string, password: string) {
    const response = await api.post('/login', { email, password });

    const token = response.data.token;

    await AsyncStorage.setItem('@token', token);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    const me = await api.get('/me');

    setUser(me.data);
    setToken(token);
  }

  function signOut() {
    AsyncStorage.removeItem('@token');
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}