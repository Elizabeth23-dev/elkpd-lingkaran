/**
 * Supabase client tunggal untuk seluruh app.
 *
 * URL & anon key dibaca dari `import.meta.env.VITE_SUPABASE_URL` &
 * `VITE_SUPABASE_ANON_KEY` saat build. Anon key aman di-embed di bundle
 * publik karena akses dilindungi RLS di Supabase (lihat
 * `supabase/migrations/0001_init_cloud_users_and_hasil.sql`).
 *
 * Sebagai fallback (mis. untuk testing manual lewat halaman /debug-cloud),
 * bisa juga override dari `localStorage`:
 *   - `elkpd-manual-supabase-url`
 *   - `elkpd-manual-supabase-anon-key`
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const MANUAL_URL_KEY = 'elkpd-manual-supabase-url';
const MANUAL_ANON_KEY = 'elkpd-manual-supabase-anon-key';

function readLocalOverride(key: string): string {
  try {
    return localStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
}

export function getSupabaseUrl(): string {
  const manual = readLocalOverride(MANUAL_URL_KEY);
  if (manual) return manual;
  return (import.meta.env.VITE_SUPABASE_URL as string) ?? '';
}

export function getSupabaseAnonKey(): string {
  const manual = readLocalOverride(MANUAL_ANON_KEY);
  if (manual) return manual;
  return (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ?? '';
}

export function setManualSupabaseCredentials(url: string, anonKey: string): void {
  try {
    localStorage.setItem(MANUAL_URL_KEY, url);
    localStorage.setItem(MANUAL_ANON_KEY, anonKey);
  } catch { /* ignore */ }
  // Reset memoised client agar create ulang dengan kredensial baru.
  cachedClient = null;
}

export function clearManualSupabaseCredentials(): void {
  try {
    localStorage.removeItem(MANUAL_URL_KEY);
    localStorage.removeItem(MANUAL_ANON_KEY);
  } catch { /* ignore */ }
  cachedClient = null;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}

let cachedClient: SupabaseClient | null = null;

/** Ambil singleton Supabase client. Return null kalau belum dikonfigurasi. */
export function getSupabase(): SupabaseClient | null {
  if (cachedClient) return cachedClient;
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) return null;
  cachedClient = createClient(url, key, {
    auth: {
      // App tidak pakai Supabase Auth (login custom). Matikan persistensi
      // session supaya tidak ada localStorage spam dari Supabase.
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  return cachedClient;
}
