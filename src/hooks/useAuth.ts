import { useState } from 'react';
import { User } from '../types';

const KEY = 'squadx_user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    try { const s = localStorage.getItem(KEY); return s ? JSON.parse(s) : null; }
    catch { return null; }
  });

  const login = (u: User) => { localStorage.setItem(KEY, JSON.stringify(u)); setUser(u); };
  const logout = () => { localStorage.removeItem(KEY); setUser(null); };
  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    localStorage.setItem(KEY, JSON.stringify(updated));
    setUser(updated);
  };

  return { user, login, logout, updateUser };
}
