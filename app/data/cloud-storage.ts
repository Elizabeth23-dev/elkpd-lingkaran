/**
 * Cloud storage service menggunakan Supabase (tabel `cloud_users`).
 * Data siswa disimpan di cloud sehingga bisa diakses dari device manapun.
 *
 * Migrasi dari JSONBin: API publik modul ini (`fetchCloudUsers`,
 * `saveCloudUsers`, `invalidateCloudCache`) tetap dipertahankan supaya
 * call site (`auth.ts`, `use-auth.tsx`, `admin.tsx`, dll.) tidak perlu
 * banyak berubah. Konfigurasi Supabase di-handle di `supabase-client.ts`.
 */

import { getSupabase, isSupabaseConfigured } from './supabase-client';

const LOCAL_FALLBACK_KEY = 'elkpd-registered-users';
const CACHE_KEY = 'elkpd-cloud-cache';
const CACHE_TTL = 15_000; // 15 detik

export interface CloudUser {
  id: string;
  name: string;
  username: string;
  password: string;
  kelas: string;
  createdAt: number;
}

interface CacheEntry {
  data: CloudUser[];
  ts: number;
}

interface SupabaseCloudUserRow {
  id: string;
  name: string;
  username: string;
  password: string;
  kelas: string;
  created_at: string;
}

function rowToCloudUser(row: SupabaseCloudUserRow): CloudUser {
  return {
    id: row.id,
    name: row.name,
    username: row.username,
    password: row.password,
    kelas: row.kelas,
    createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
  };
}

function cloudUserToRow(user: CloudUser): SupabaseCloudUserRow {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    password: user.password,
    kelas: user.kelas,
    created_at: new Date(user.createdAt || Date.now()).toISOString(),
  };
}

function getCache(): CloudUser[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (Date.now() - entry.ts > CACHE_TTL) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function setCache(users: CloudUser[]): void {
  try {
    const entry: CacheEntry = { data: users, ts: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch { /* ignore */ }
}

function invalidateCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch { /* ignore */ }
}

/** Ekspor untuk dipakai dari luar (misal: saat login guru) */
export function invalidateCloudCache(): void {
  invalidateCache();
}

function getLocalFallback(): CloudUser[] {
  try {
    const raw = localStorage.getItem(LOCAL_FALLBACK_KEY);
    return raw ? (JSON.parse(raw) as CloudUser[]) : [];
  } catch {
    return [];
  }
}

function writeLocalFallback(users: CloudUser[]): void {
  try {
    localStorage.setItem(LOCAL_FALLBACK_KEY, JSON.stringify(users));
    window.dispatchEvent(new StorageEvent('storage', { key: LOCAL_FALLBACK_KEY }));
  } catch { /* ignore */ }
}

/** Ambil daftar user dari cloud. Fallback ke localStorage jika tidak terkonfigurasi atau gagal. */
export async function fetchCloudUsers(bypassCache = false): Promise<CloudUser[]> {
  const supabase = getSupabase();
  if (!supabase || !isSupabaseConfigured()) {
    console.warn('[cloud-storage] Supabase belum dikonfigurasi. Pakai localStorage fallback.');
    return getLocalFallback();
  }

  if (!bypassCache) {
    const cached = getCache();
    if (cached) return cached;
  }

  try {
    const { data, error } = await supabase
      .from('cloud_users')
      .select('id, name, username, password, kelas, created_at')
      .order('created_at', { ascending: true });
    if (error) throw error;
    const users = (data ?? []).map((row) => rowToCloudUser(row as SupabaseCloudUserRow));
    console.info(`[cloud-storage] Berhasil fetch ${users.length} users dari Supabase`);
    setCache(users);
    // Backup juga ke localStorage supaya offline tetap kebaca.
    writeLocalFallback(users);
    return users;
  } catch (err) {
    console.warn('[cloud-storage] Gagal fetch dari Supabase, pakai localStorage:', err);
    return getLocalFallback();
  }
}

/**
 * Simpan daftar user ke cloud. Implementasi melakukan diff vs row yang sudah ada
 * dan hanya melakukan INSERT untuk user baru — tidak menyentuh row lain
 * (misal hasil pengerjaan di tabel `cloud_hasil`).
 *
 * API tetap menerima full array `users` agar backward-compatible dengan
 * call site yang sudah ada (`registerSiswa` di `auth.ts`).
 */
export async function saveCloudUsers(users: CloudUser[]): Promise<void> {
  // Selalu simpan ke localStorage sebagai backup, terlepas dari status cloud.
  writeLocalFallback(users);

  const supabase = getSupabase();
  if (!supabase || !isSupabaseConfigured()) return;
  if (users.length === 0) return;

  // RLS pada `cloud_users` sengaja TIDAK membuka UPDATE/DELETE untuk anon —
  // akun siswa imutable dari client (lihat
  // `supabase/migrations/0001_init_cloud_users_and_hasil.sql`).
  //
  // Karena itu jangan pakai upsert dengan full list: PostgREST akan
  // menerjemahkannya menjadi `INSERT ... ON CONFLICT DO UPDATE`, yang
  // mengevaluasi RLS UPDATE policy untuk row yang sudah ada dan ditolak
  // (`code 42501: new row violates row-level security policy`).
  //
  // Sebaliknya, lakukan diff vs row yang sudah ada lalu INSERT hanya
  // user baru. API tetap menerima full array agar backward-compatible.
  const { data: existingRows, error: fetchError } = await supabase
    .from('cloud_users')
    .select('id');
  if (fetchError) {
    console.warn('[cloud-storage] Gagal ambil daftar id sebelum simpan:', fetchError);
    throw fetchError;
  }
  const existingIds = new Set((existingRows ?? []).map((r) => (r as { id: string }).id));
  const newRows = users.filter((u) => !existingIds.has(u.id)).map(cloudUserToRow);

  if (newRows.length === 0) {
    invalidateCache();
    setCache(users);
    return;
  }

  try {
    const { error } = await supabase.from('cloud_users').insert(newRows);
    if (error) throw error;
    console.info(`[cloud-storage] Berhasil INSERT ${newRows.length} user baru ke Supabase`);
    invalidateCache();
    setCache(users);
  } catch (err) {
    console.warn('[cloud-storage] Gagal simpan ke Supabase:', err);
    throw err;
  }
}
