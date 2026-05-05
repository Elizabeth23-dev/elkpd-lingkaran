/**
 * Result storage service: menyimpan hasil pengerjaan latihan siswa ke Supabase
 * (tabel `cloud_hasil`) sehingga guru bisa memantau dari device manapun.
 *
 * Migrasi dari JSONBin: API publik modul ini (`fetchAllHasil`, `fetchHasil`,
 * `pushHasil`, `deleteHasil`, `reconcileLocalHasil`, `invalidateHasilCache`)
 * tetap dipertahankan untuk backward compatibility dengan call site yang ada.
 *
 * Race condition: tidak perlu fetch-merge-put manual lagi, karena Supabase
 * mengupdate per-row (`upsert` & `delete` by id) — tidak ada lagi PUT seluruh
 * bin yang bisa overwrite data siswa lain.
 */

import { getSupabase, isSupabaseConfigured } from './supabase-client';
import type { CloudUser } from './cloud-storage';
import { daftarMateri } from './materi';

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
  /** URL ImgBB (bukan base64) — supaya tidak penuhin kuota DB. */
  essayImageUrls: Record<number, string>;
  submittedAt: number;
  /** True kalau siswa masih mengerjakan; false kalau sudah klik "Selesai". */
  isInProgress?: boolean;
  /** Indeks soal yang sedang aktif (untuk resume). */
  currentIndex?: number;
  /** Timestamp aktivitas terakhir (auto-save progres atau submit final). */
  updatedAt?: number;
}

interface CacheEntry {
  data: CloudHasil[];
  ts: number;
}

// Re-export untuk backward compatibility; sebagian call site masih import dari sini.
export type { CloudUser };

interface SupabaseHasilRow {
  id: string;
  siswa_id: string;
  siswa_name: string;
  topic_id: string;
  score: number;
  total: number;
  total_skor: number;
  skor_diperoleh: number;
  time_taken: number;
  answers: Record<string, number> | null;
  submitted: Record<string, boolean> | null;
  essay_image_urls: Record<string, string> | null;
  submitted_at: string;
  is_in_progress?: boolean | null;
  current_index?: number | null;
  updated_at?: string | null;
}

/** Konversi dari Record<number, T> (dipakai di TS) ke object yang aman ditulis ke jsonb. */
function numericKeyedRecord<T>(input: Record<string, T> | null | undefined): Record<number, T> {
  if (!input) return {};
  const out: Record<number, T> = {};
  for (const [k, v] of Object.entries(input)) {
    const n = Number(k);
    if (!Number.isNaN(n)) out[n] = v;
  }
  return out;
}

function rowToHasil(row: SupabaseHasilRow): CloudHasil {
  return {
    id: row.id,
    siswaId: row.siswa_id,
    siswaName: row.siswa_name,
    topicId: row.topic_id,
    score: row.score,
    total: row.total,
    totalSkor: row.total_skor,
    skorDiperoleh: row.skor_diperoleh,
    timeTaken: row.time_taken,
    answers: numericKeyedRecord<number>(row.answers),
    submitted: numericKeyedRecord<boolean>(row.submitted),
    essayImageUrls: numericKeyedRecord<string>(row.essay_image_urls),
    submittedAt: row.submitted_at ? new Date(row.submitted_at).getTime() : Date.now(),
    isInProgress: row.is_in_progress ?? false,
    currentIndex: row.current_index ?? 0,
    updatedAt: row.updated_at ? new Date(row.updated_at).getTime() : undefined,
  };
}

function hasilToRow(entry: CloudHasil): SupabaseHasilRow {
  return {
    id: entry.id,
    siswa_id: entry.siswaId,
    siswa_name: entry.siswaName,
    topic_id: entry.topicId,
    score: entry.score,
    total: entry.total,
    total_skor: entry.totalSkor,
    skor_diperoleh: entry.skorDiperoleh,
    time_taken: entry.timeTaken,
    answers: entry.answers ?? {},
    submitted: entry.submitted ?? {},
    essay_image_urls: entry.essayImageUrls ?? {},
    submitted_at: new Date(entry.submittedAt || Date.now()).toISOString(),
    is_in_progress: entry.isInProgress ?? false,
    current_index: entry.currentIndex ?? 0,
    updated_at: new Date(entry.updatedAt ?? Date.now()).toISOString(),
  };
}

function readLocalHasil(): CloudHasil[] {
  try {
    const raw = localStorage.getItem(HASIL_LOCAL_FALLBACK);
    return raw ? (JSON.parse(raw) as CloudHasil[]) : [];
  } catch {
    return [];
  }
}

function writeLocalHasil(hasil: CloudHasil[], dispatchEvent = true): void {
  try {
    localStorage.setItem(HASIL_LOCAL_FALLBACK, JSON.stringify(hasil));
    if (dispatchEvent) {
      window.dispatchEvent(new StorageEvent('storage', { key: HASIL_LOCAL_FALLBACK }));
    }
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

async function fetchAllFromSupabase(): Promise<CloudHasil[]> {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase belum dikonfigurasi');
  const { data, error } = await supabase
    .from('cloud_hasil')
    .select(
      'id, siswa_id, siswa_name, topic_id, score, total, total_skor, skor_diperoleh, time_taken, answers, submitted, essay_image_urls, submitted_at, is_in_progress, current_index, updated_at'
    );
  if (error) throw error;
  return (data ?? []).map((row) => rowToHasil(row as SupabaseHasilRow));
}

/** Ambil semua hasil dari cloud (dengan cache). Fallback ke localStorage jika tidak terkonfigurasi. */
export async function fetchAllHasil(bypassCache = false): Promise<CloudHasil[]> {
  if (!isSupabaseConfigured()) {
    return readLocalHasil();
  }
  if (!bypassCache) {
    const cached = getCache();
    if (cached) return cached;
  }
  try {
    const hasil = await fetchAllFromSupabase();
    setCache(hasil);
    writeLocalHasil(hasil);
    return hasil;
  } catch (err) {
    console.warn('[result-storage] Gagal fetch hasil dari Supabase, pakai localStorage:', err);
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
  const localUpdated = upsert(localList, { ...entry, isInProgress: entry.isInProgress ?? false });
  writeLocalHasil(localUpdated);
  setCache(localUpdated);

  const supabase = getSupabase();
  if (!supabase || !isSupabaseConfigured()) {
    console.warn('[result-storage] Supabase belum dikonfigurasi, hasil hanya tersimpan lokal.');
    return;
  }

  let lastErr: unknown;
  for (let attempt = 1; attempt <= MAX_PUSH_RETRY; attempt++) {
    try {
      const { error } = await supabase
        .from('cloud_hasil')
        .upsert(hasilToRow(entry), { onConflict: 'id' });
      if (error) throw error;
      invalidateHasilCache();
      // Re-cache dengan data terbaru dari local (sudah berisi entry).
      setCache(localUpdated);
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

/**
 * Push progres in-progress (siswa sedang mengerjakan, belum klik Selesai).
 *
 * Berbeda dengan `pushHasil`:
 * - Selalu di-set `isInProgress=true`.
 * - Tidak menyertakan base64 gambar essay (kolom `essay_image_urls` di-zero-kan).
 *   Foto tetap ada di localStorage device siswa; tujuan progres cloud cuma untuk
 *   resume cross-device & visibility ke guru.
 * - Fail-silent: best-effort 1 attempt, tidak melempar error supaya tidak
 *   ganggu UX latihan kalau jaringan terputus.
 * - Tidak men-dispatch `storage` event (mencegah admin tab spam refresh).
 */
export async function pushProgress(
  entry: Omit<CloudHasil, 'essayImageUrls' | 'isInProgress'>
): Promise<void> {
  const progressEntry: CloudHasil = {
    ...entry,
    isInProgress: true,
    essayImageUrls: {}, // jangan simpan base64 di cloud
    updatedAt: Date.now(),
  };

  // Backup ke localStorage (untuk resume offline) — tanpa dispatch event.
  try {
    const localList = readLocalHasil();
    const localUpdated = upsert(localList, progressEntry);
    writeLocalHasil(localUpdated, false);
  } catch { /* ignore */ }

  const supabase = getSupabase();
  if (!supabase || !isSupabaseConfigured()) return;

  try {
    const { error } = await supabase
      .from('cloud_hasil')
      .upsert(hasilToRow(progressEntry), { onConflict: 'id' });
    if (error) throw error;
  } catch (err) {
    // Sengaja silent — auto-save jangan mengganggu user kalau koneksi flaky.
    console.warn('[result-storage] Auto-save progres gagal (akan retry pada perubahan berikutnya):', err);
  }
}

/** Hapus 1 hasil dari cloud (dipakai admin untuk reset nilai siswa). */
export async function deleteHasil(siswaId: string, topicId: string): Promise<void> {
  const local = readLocalHasil().filter((h) => !(h.siswaId === siswaId && h.topicId === topicId));
  writeLocalHasil(local);
  setCache(local);

  const supabase = getSupabase();
  if (!supabase || !isSupabaseConfigured()) return;

  const compositeId = `${siswaId}-${topicId}`;

  let lastErr: unknown;
  for (let attempt = 1; attempt <= MAX_PUSH_RETRY; attempt++) {
    try {
      const { error } = await supabase
        .from('cloud_hasil')
        .delete()
        .eq('id', compositeId);
      if (error) throw error;
      invalidateHasilCache();
      setCache(local);
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
  if (!isSupabaseConfigured()) return;
  if (typeof window === 'undefined') return;

  // Catatan: kita perlu fetch fresh dari Supabase langsung — bukan via fetchAllHasil
  // (yang fallback ke localStorage saat error), karena di sini kita membedakan
  // "cloud kosong" vs "offline" untuk memutuskan apakah aman menghapus
  // sessionStorage hasil siswa.
  let cloudHasil: CloudHasil[];
  try {
    cloudHasil = await fetchAllFromSupabase();
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
        // admin baru saja reset → hapus hasil + progress lokal (di sessionStorage
        // & localStorage, karena progress disimpan di localStorage sejak versi
        // resume-after-refresh).
        sessionStorage.removeItem(hKey);
        sessionStorage.removeItem(pKey);
        try { localStorage.removeItem(pKey); } catch { /* ignore */ }
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
