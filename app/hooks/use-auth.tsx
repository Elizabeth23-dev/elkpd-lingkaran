import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, UserRole, RegisterPayload, RegisterResult } from '~/data/auth';
import { authenticate, registerSiswa, getDaftarAkunAsync } from '~/data/auth';
import { invalidateCloudCache } from '~/data/cloud-storage';
import { reconcileLocalHasil } from '~/data/result-storage';

const AUTH_KEY = 'elkpd-auth';

function loadSession(): User | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function saveSession(user: User | null): void {
  if (user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_KEY);
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
    // Invalidate cache sebelum login agar data siswa terbaru selalu di-fetch dari cloud
    invalidateCloudCache();
    // Jika login sebagai guru, fetch fresh dengan bypass cache
    const bypassCache = role === 'guru';
    const found = bypassCache
      ? (await getDaftarAkunAsync(true)).find(
          (u) => u.username === username && u.password === password && u.role === role
        ) ?? null
      : await authenticate(username, password, role);
    if (found) {
      // Untuk siswa: sinkron sessionStorage hasil dengan cloud sebelum lanjut,
      // supaya kalau guru sudah reset nilai dari admin, tampilan siswa juga
      // ikut tereset begitu login (siswa bisa kerjakan latihan ulang).
      if (found.role === 'siswa') {
        try {
          await reconcileLocalHasil(found.id);
        } catch { /* ignore — login tetap lanjut */ }
      }
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
