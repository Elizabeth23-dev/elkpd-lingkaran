/**
 * Cloud storage service menggunakan JSONBin.io v3.
 * Data siswa disimpan di cloud sehingga bisa diakses dari device manapun.
 *
 * Prioritas konfigurasi:
 * 1. localStorage manual key (set dari halaman /debug-cloud)
 * 2. import.meta.env.VITE_JSONBIN_* (di-embed saat build)
 */

const JSONBIN_BASE = 'https://api.jsonbin.io/v3';

const MANUAL_KEY_STORE = 'elkpd-manual-api-key';
const MANUAL_BIN_STORE = 'elkpd-manual-bin-id';
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

interface CloudData {
  users: CloudUser[];
}

interface CacheEntry {
  data: CloudUser[];
  ts: number;
}

/** Ambil API key aktif (manual override > env var) */
export function getActiveApiKey(): string {
  try {
    const manual = localStorage.getItem(MANUAL_KEY_STORE);
    if (manual) return manual;
  } catch { /* ignore */ }
  return (import.meta.env.VITE_JSONBIN_API_KEY as string) ?? '';
}

/** Ambil BIN ID aktif (manual override > env var) */
export function getActiveBinId(): string {
  try {
    const manual = localStorage.getItem(MANUAL_BIN_STORE);
    if (manual) return manual;
  } catch { /* ignore */ }
  return (import.meta.env.VITE_JSONBIN_BIN_ID as string) ?? '';
}

/** Simpan API key & BIN ID secara manual (untuk semua device yang buka halaman debug) */
export function setManualCredentials(apiKey: string, binId: string): void {
  try {
    localStorage.setItem(MANUAL_KEY_STORE, apiKey);
    localStorage.setItem(MANUAL_BIN_STORE, binId);
    invalidateCache();
  } catch { /* ignore */ }
}

/** Hapus manual credentials */
export function clearManualCredentials(): void {
  try {
    localStorage.removeItem(MANUAL_KEY_STORE);
    localStorage.removeItem(MANUAL_BIN_STORE);
  } catch { /* ignore */ }
}

function isConfigured(): boolean {
  const key = getActiveApiKey();
  const bin = getActiveBinId();
  return Boolean(key && bin);
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
    console.warn('[cloud-storage] Tidak terkonfigurasi. Pakai localStorage fallback.');
    return getLocalFallback();
  }

  if (!bypassCache) {
    const cached = getCache();
    if (cached) return cached;
  }

  const apiKey = getActiveApiKey();
  const binId = getActiveBinId();

  try {
    const res = await fetch(`${JSONBIN_BASE}/b/${binId}/latest`, {
      headers: {
        'X-Master-Key': apiKey,
        'X-Bin-Meta': 'false',
        'Cache-Control': 'no-cache',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as CloudData;
    const users = Array.isArray(data.users) ? data.users : [];
    console.info(`[cloud-storage] Berhasil fetch ${users.length} users dari JSONBin`);
    setCache(users);
    return users;
  } catch (err) {
    console.warn('[cloud-storage] Gagal fetch dari cloud, pakai localStorage:', err);
    return getLocalFallback();
  }
}

function getLocalFallback(): CloudUser[] {
  try {
    const raw = localStorage.getItem(LOCAL_FALLBACK_KEY);
    return raw ? (JSON.parse(raw) as CloudUser[]) : [];
  } catch {
    return [];
  }
}

/** Simpan daftar user ke cloud. Tetap mempertahankan data lain (hasil, dll). */
export async function saveCloudUsers(users: CloudUser[]): Promise<void> {
  // Selalu simpan ke localStorage sebagai backup
  try {
    localStorage.setItem(LOCAL_FALLBACK_KEY, JSON.stringify(users));
    window.dispatchEvent(new StorageEvent('storage', { key: LOCAL_FALLBACK_KEY }));
  } catch { /* ignore */ }

  if (!isConfigured()) return;

  const apiKey = getActiveApiKey();
  const binId = getActiveBinId();

  try {
    // Fetch dulu agar key lain (mis. `hasil`) tidak terhapus.
    let existingBin: Record<string, unknown> = {};
    try {
      const getRes = await fetch(`${JSONBIN_BASE}/b/${binId}/latest`, {
        headers: {
          'X-Master-Key': apiKey,
          'X-Bin-Meta': 'false',
          'Cache-Control': 'no-cache',
        },
      });
      if (getRes.ok) {
        existingBin = (await getRes.json()) as Record<string, unknown>;
      }
    } catch { /* ignore — tetap PUT di bawah */ }

    const res = await fetch(`${JSONBIN_BASE}/b/${binId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': apiKey,
      },
      body: JSON.stringify({ ...existingBin, users }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    console.info(`[cloud-storage] Berhasil simpan ${users.length} users ke JSONBin`);
    invalidateCache();
    setCache(users);
  } catch (err) {
    console.warn('[cloud-storage] Gagal simpan ke cloud:', err);
  }
}
