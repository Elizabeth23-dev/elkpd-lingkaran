/**
 * Image upload service untuk foto jawaban essay siswa.
 * Memakai ImgBB (https://api.imgbb.com) — gratis, tanpa expire,
 * mengembalikan URL publik yang bisa diakses guru dari device manapun.
 *
 * Prioritas konfigurasi:
 * 1. localStorage manual key (set dari halaman /debug-cloud)
 * 2. import.meta.env.VITE_IMGBB_API_KEY (di-embed saat build)
 */

const IMGBB_BASE = 'https://api.imgbb.com/1/upload';
const MANUAL_IMGBB_KEY_STORE = 'elkpd-manual-imgbb-key';

export function getActiveImgBBKey(): string {
  try {
    const manual = localStorage.getItem(MANUAL_IMGBB_KEY_STORE);
    if (manual) return manual;
  } catch { /* ignore */ }
  return (import.meta.env.VITE_IMGBB_API_KEY as string) ?? '';
}

export function setManualImgBBKey(key: string): void {
  try {
    localStorage.setItem(MANUAL_IMGBB_KEY_STORE, key);
  } catch { /* ignore */ }
}

export function clearManualImgBBKey(): void {
  try {
    localStorage.removeItem(MANUAL_IMGBB_KEY_STORE);
  } catch { /* ignore */ }
}

export function isImgBBConfigured(): boolean {
  return Boolean(getActiveImgBBKey());
}

export interface ImgBBUploadResult {
  url: string;
  thumbUrl: string;
}

interface ImgBBResponse {
  success?: boolean;
  data?: {
    url?: string;
    display_url?: string;
    thumb?: { url?: string };
  };
}

/** Timeout default untuk request upload (ms). Cukup longgar untuk koneksi mobile lambat. */
const UPLOAD_TIMEOUT_MS = 30_000;

/**
 * Upload base64 image (data URI atau plain base64) ke ImgBB.
 * Return URL gambar publik atau null jika gagal/belum dikonfigurasi.
 *
 * Punya timeout {@link UPLOAD_TIMEOUT_MS} (30 detik) supaya saat sinyal
 * lemah, request tidak menggantung tanpa batas — siswa setidaknya
 * mendapat error eksplisit alih-alih tombol "Menyimpan…" yang stuck.
 */
export async function uploadImageToImgBB(base64: string): Promise<ImgBBUploadResult | null> {
  const key = getActiveImgBBKey();
  if (!key) {
    console.warn('[image-upload] ImgBB API key tidak tersedia. Upload dilewati.');
    return null;
  }

  // ImgBB expects raw base64 (tanpa prefix data:image/...)
  const cleanBase64 = base64.replace(/^data:image\/[a-z+]+;base64,/, '');

  const formData = new FormData();
  formData.append('key', key);
  formData.append('image', cleanBase64);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS);

  try {
    const res = await fetch(IMGBB_BASE, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as ImgBBResponse;
    if (!data.success || !data.data?.url) {
      console.warn('[image-upload] Response tidak success:', data);
      return null;
    }
    return {
      url: data.data.display_url ?? data.data.url,
      thumbUrl: data.data.thumb?.url ?? data.data.url,
    };
  } catch (err) {
    if ((err as { name?: string }).name === 'AbortError') {
      console.warn(`[image-upload] Upload timeout setelah ${UPLOAD_TIMEOUT_MS}ms`);
    } else {
      console.warn('[image-upload] Gagal upload:', err);
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
