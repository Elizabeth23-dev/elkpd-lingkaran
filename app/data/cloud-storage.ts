/**
 * Cloud storage service menggunakan JSONBin.io v3.
 * Data siswa disimpan di cloud sehingga bisa diakses dari device manapun.
 *
 * Setup:
 * 1. Daftar gratis di https://jsonbin.io
 * 2. Buat bin baru dengan JSON awal: {"users": []}
 * 3. Salin BIN_ID dan API_KEY ke konstanta di bawah
 */

const JSONBIN_BASE = 'https://api.jsonbin.io/v3';

// Ganti dengan API key dan Bin ID dari jsonbin.io Anda
const API_KEY = (typeof window !== 'undefined' ? (window as any).__ELKPD_JSONBIN_KEY__ : '') ||
  import.meta.env.VITE_JSONBIN_API_KEY || '';
const BIN_ID = (typeof window !== 'undefined' ? (window as any).__ELKPD_JSONBIN_BIN__ : '') ||
  import.meta.env.VITE_JSONBIN_BIN_ID || '';

const LOCAL_FALLBACK_KEY = 'elkpd-registered-users';
const CACHE_KEY = 'elkpd-cloud-cache';
const CACHE_TTL = 30_000; // 30 detik

interface CloudData {
  users: CloudUser[];
}

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

function isConfigured(): boolean {
  return Boolean(API_KEY && BIN_ID);
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

/** Ambil daftar user dari cloud. Fallback ke localStorage jika tidak terkonfigurasi. */
export async function fetchCloudUsers(bypassCache = false): Promise<CloudUser[]> {
  if (!isConfigured()) {
    // Fallback: baca dari localStorage (antar-tab di device yang sama)
    try {
      const raw = localStorage.getItem(LOCAL_FALLBACK_KEY);
      return raw ? (JSON.parse(raw) as CloudUser[]) : [];
    } catch {
      return [];
    }
  }

  // Pakai cache kecuali diminta bypass
  if (!bypassCache) {
    const cached = getCache();
    if (cached) return cached;
  }

  try {
    const res = await fetch(`${JSONBIN_BASE}/b/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': API_KEY,
        'X-Bin-Meta': 'false',
        'Cache-Control': 'no-cache',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as CloudData;
    const users = Array.isArray(data.users) ? data.users : [];
    setCache(users);
    return users;
  } catch (err) {
    console.warn('[cloud-storage] Gagal fetch dari cloud, pakai cache/localStorage:', err);
    // Fallback ke localStorage
    try {
      const raw = localStorage.getItem(LOCAL_FALLBACK_KEY);
      return raw ? (JSON.parse(raw) as CloudUser[]) : [];
    } catch {
      return [];
    }
  }
}

/** Simpan daftar user ke cloud. */
export async function saveCloudUsers(users: CloudUser[]): Promise<void> {
  // Selalu simpan ke localStorage sebagai backup
  try {
    localStorage.setItem(LOCAL_FALLBACK_KEY, JSON.stringify(users));
    // Dispatch event agar tab lain di device yang sama ikut update
    window.dispatchEvent(new StorageEvent('storage', { key: LOCAL_FALLBACK_KEY }));
  } catch { /* ignore */ }

  if (!isConfigured()) return;

  try {
    await fetch(`${JSONBIN_BASE}/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
      },
      body: JSON.stringify({ users }),
    });
    invalidateCache();
    setCache(users);
  } catch (err) {
    console.warn('[cloud-storage] Gagal simpan ke cloud:', err);
  }
}
