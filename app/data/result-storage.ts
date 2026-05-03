/**
 * Result storage service: menyimpan hasil pengerjaan latihan siswa ke JSONBin.io
 * sehingga guru bisa memantau dari device manapun.
 *
 * Memakai bin yang sama dengan akun siswa (cloud-storage.ts), hanya menambah
 * key `hasil` di JSON root.
 *
 * Format bin: { "users": CloudUser[], "hasil": CloudHasil[] }
 *
 * Race condition mitigation: setiap pushHasil melakukan fetch-merge-put dengan
 * retry exponential. Jika dua siswa submit nyaris bersamaan, yang kedua akan
 * fetch state terbaru (termasuk entry siswa pertama) sebelum push.
 */

import { getActiveApiKey, getActiveBinId, type CloudUser } from './cloud-storage';
import { daftarMateri } from './materi';

const JSONBIN_BASE = 'https://api.jsonbin.io/v3';

const HASIL_CACHE_KEY = 'elkpd-hasil-cache';
const HASIL_LOCAL_FALLBACK = 'elkpd-local-hasil';
const CACHE_TTL = 10_000; // 10 detik
const MAX_PUSH_RETRY = 3;

export interface CloudHasil {
  /** Composite ID = `${siswaId}-${topicId}` */
  id: string;
  siswaId: string;
  siswaName: string;
  topicId: string;
  score: number;
  total: number;
  totalSkor: number;
  skorDiperoleh: number;
  timeTaken: number;
  answers: Record<number, number>;
  submitted: Record<number, boolean>;
  /** URL ImgBB (bukan base64) — supaya tidak penuhin kuota JSONBin. */
  essayImageUrls: Record<number, string>;
  submittedAt: number;
}

interface CloudData {
  users?: CloudUser[];
  hasil?: CloudHasil[];
}

interface CacheEntry {
  data: CloudHasil[];
  ts: number;
}

function isConfigured(): boolean {
  return Boolean(getActiveApiKey() && getActiveBinId());
}

async function fetchBin(): Promise<CloudData> {
  const apiKey = getActiveApiKey();
  const binId = getActiveBinId();
  const res = await fetch(`${JSONBIN_BASE}/b/${binId}/latest`, {
    headers: {
      'X-Master-Key': apiKey,
      'X-Bin-Meta': 'false',
      'Cache-Control': 'no-cache',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as CloudData;
}

async function putBin(data: CloudData): Promise<void> {
  const apiKey = getActiveApiKey();
  const binId = getActiveBinId();
  const res = await fetch(`${JSONBIN_BASE}/b/${binId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': apiKey,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

function readLocalHasil(): CloudHasil[] {
  try {
    const raw = localStorage.getItem(HASIL_LOCAL_FALLBACK);
    return raw ? (JSON.parse(raw) as CloudHasil[]) : [];
  } catch {
    return [];
  }
}

function writeLocalHasil(hasil: CloudHasil[]): void {
  try {
    localStorage.setItem(HASIL_LOCAL_FALLBACK, JSON.stringify(hasil));
    window.dispatchEvent(new StorageEvent('storage', { key: HASIL_LOCAL_FALLBACK }));
  } catch { /* ignore */ }
}

function getCache(): CloudHasil[] | null {
  try {
    const raw = localStorage.getItem(HASIL_CACHE_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (Date.now() - entry.ts > CACHE_TTL) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function setCache(data: CloudHasil[]): void {
  try {
    localStorage.setItem(HASIL_CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch { /* ignore */ }
}

export function invalidateHasilCache(): void {
  try {
    localStorage.removeItem(HASIL_CACHE_KEY);
  } catch { /* ignore */ }
}

function upsert(list: CloudHasil[], entry: CloudHasil): CloudHasil[] {
  const idx = list.findIndex((h) => h.id === entry.id);
  if (idx === -1) return [...list, entry];
  const next = [...list];
  next[idx] = entry;
  return next;
}

/** Ambil semua hasil dari cloud (dengan cache). Fallback ke localStorage jika tidak terkonfigurasi. */
export async function fetchAllHasil(bypassCache = false): Promise<CloudHasil[]> {
  if (!isConfigured()) {
    return readLocalHasil();
  }
  if (!bypassCache) {
    const cached = getCache();
    if (cached) return cached;
  }
  try {
    const bin = await fetchBin();
    const hasil = Array.isArray(bin.hasil) ? bin.hasil : [];
    setCache(hasil);
    writeLocalHasil(hasil);
    return hasil;
  } catch (err) {
    console.warn('[result-storage] Gagal fetch hasil dari cloud, pakai localStorage:', err);
    return readLocalHasil();
  }
}

/** Ambil 1 hasil siswa untuk topik tertentu. */
export async function fetchHasil(siswaId: string, topicId: string): Promise<CloudHasil | null> {
  const all = await fetchAllHasil();
  return all.find((h) => h.siswaId === siswaId && h.topicId === topicId) ?? null;
}

/** Push 1 hasil ke cloud (dan localStorage). Retry sampai MAX_PUSH_RETRY kali. */
export async function pushHasil(entry: CloudHasil): Promise<void> {
  // Backup localStorage dulu (idempoten)
  const localList = readLocalHasil();
  const localUpdated = upsert(localList, entry);
  writeLocalHasil(localUpdated);
  setCache(localUpdated);

  if (!isConfigured()) {
    console.warn('[result-storage] Cloud tidak terkonfigurasi, hasil hanya tersimpan lokal.');
    return;
  }

  let lastErr: unknown;
  for (let attempt = 1; attempt <= MAX_PUSH_RETRY; attempt++) {
    try {
      const bin = await fetchBin();
      const existingHasil = Array.isArray(bin.hasil) ? bin.hasil : [];
      const merged = upsert(existingHasil, entry);
      const newBin: CloudData = { ...bin, hasil: merged };
      await putBin(newBin);
      invalidateHasilCache();
      setCache(merged);
      console.info(`[result-storage] Push hasil ${entry.id} berhasil (attempt ${attempt})`);
      return;
    } catch (err) {
      lastErr = err;
      console.warn(`[result-storage] Push gagal (attempt ${attempt}/${MAX_PUSH_RETRY}):`, err);
      if (attempt < MAX_PUSH_RETRY) {
        await new Promise((r) => setTimeout(r, 200 * attempt));
      }
    }
  }
  throw lastErr ?? new Error('Push hasil gagal setelah retry maksimum');
}

/** Hapus 1 hasil dari cloud (dipakai admin untuk reset nilai siswa). */
export async function deleteHasil(siswaId: string, topicId: string): Promise<void> {
  const local = readLocalHasil().filter((h) => !(h.siswaId === siswaId && h.topicId === topicId));
  writeLocalHasil(local);
  setCache(local);

  if (!isConfigured()) return;

  let lastErr: unknown;
  for (let attempt = 1; attempt <= MAX_PUSH_RETRY; attempt++) {
    try {
      const bin = await fetchBin();
      const filtered = (Array.isArray(bin.hasil) ? bin.hasil : []).filter(
        (h) => !(h.siswaId === siswaId && h.topicId === topicId)
      );
      await putBin({ ...bin, hasil: filtered });
      invalidateHasilCache();
      setCache(filtered);
      return;
    } catch (err) {
      lastErr = err;
      console.warn(`[result-storage] Delete gagal (attempt ${attempt}/${MAX_PUSH_RETRY}):`, err);
      if (attempt < MAX_PUSH_RETRY) {
        await new Promise((r) => setTimeout(r, 200 * attempt));
      }
    }
  }
  throw lastErr ?? new Error(`Delete hasil gagal setelah ${MAX_PUSH_RETRY} retry`);
}

/**
 * Sinkron sessionStorage + localStorage hasil siswa dengan cloud (sumber kebenaran).
 * Dipakai supaya ketika guru klik "Reset Nilai" di admin (yang menghapus entry
 * dari cloud), tampilan di device siswa juga ikut tereset begitu siswa
 * navigate/refresh — tanpa harus tutup tab manual.
 *
 * Aturan: hanya hapus key `hasil-{siswaId}-{topicId}` (dan progress) yang ada di
 * sessionStorage TAPI tidak ada di cloud. Tidak menyentuh sessionStorage saat
 * cloud tidak terkonfigurasi atau saat fetch gagal — supaya tidak salah
 * menghapus data lokal hanya karena offline.
 */
export async function reconcileLocalHasil(siswaId: string): Promise<void> {
  if (!isConfigured()) return;
  if (typeof window === 'undefined') return;

  let cloudHasil: CloudHasil[];
  try {
    cloudHasil = await fetchAllHasil(true);
  } catch {
    return; // gagal fetch → biarkan local apa adanya
  }

  const cloudTopicsForSiswa = new Set(
    cloudHasil.filter((h) => h.siswaId === siswaId).map((h) => h.topicId)
  );

  for (const m of daftarMateri) {
    if (cloudTopicsForSiswa.has(m.id)) continue;
    const hKey = `hasil-${siswaId}-${m.id}`;
    const pKey = `progress-${siswaId}-${m.id}`;
    try {
      if (sessionStorage.getItem(hKey) !== null) {
        // Siswa pernah selesai latihan ini, tapi cloud sudah tidak punya →
        // admin baru saja reset → hapus hasil + progress lokal.
        sessionStorage.removeItem(hKey);
        sessionStorage.removeItem(pKey);
      }
    } catch { /* ignore */ }
  }

  // Bersihkan localStorage fallback juga supaya konsisten.
  try {
    const local = readLocalHasil();
    const filtered = local.filter(
      (h) => h.siswaId !== siswaId || cloudTopicsForSiswa.has(h.topicId)
    );
    if (filtered.length !== local.length) writeLocalHasil(filtered);
  } catch { /* ignore */ }
}
