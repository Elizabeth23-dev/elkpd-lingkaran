import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, UserRole, RegisterPayload, RegisterResult } from '~/data/auth';
import { authenticate, registerSiswa } from '~/data/auth';

const AUTH_KEY = 'elkpd-auth';

function loadSession(): User | null {
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function saveSession(user: User | null): void {
  if (user) {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } else {
    sessionStorage.removeItem(AUTH_KEY);
  }
}

interface AuthContextValue {
  user: User | null;
  login: (username: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  register: (payload: RegisterPayload) => Promise<RegisterResult>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadSession);

  const login = useCallback(async (username: string, password: string, role: UserRole): Promise<boolean> => {
    const found = await authenticate(username, password, role);
    if (found) {
      setUser(found);
      saveSession(found);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    saveSession(null);
  }, []);

  const register = useCallback(async (payload: RegisterPayload): Promise<RegisterResult> => {
    return registerSiswa(payload);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
