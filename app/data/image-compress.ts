/**
 * Kompres gambar di browser sebelum di-upload ke server.
 *
 * Foto kamera HP modern bisa berukuran 4–12 MB (JPEG full-res).
 * Sebagai foto jawaban tulisan tangan, ukuran segitu jauh lebih besar
 * dari yang dibutuhkan untuk legibilitas — guru hanya perlu membaca
 * tulisan, bukan mendetail piksel. Resize ke maks 1600px sisi terpanjang
 * dengan kualitas JPEG 0.82 biasanya menurunkan ukuran 5–20×, sangat
 * mempercepat upload pada koneksi mobile yang lambat.
 *
 * Return base64 data URI siap pakai untuk:
 *   - <img src={...}> preview di UI
 *   - sessionStorage backup
 *   - dikirim ke ImgBB via {@link uploadImageToImgBB}
 */
export interface CompressOptions {
  /** Sisi terpanjang maksimum dalam pixel. Default 1600. */
  maxDimension?: number;
  /** Kualitas JPEG 0..1. Default 0.82. */
  quality?: number;
  /** MIME type output. Default 'image/jpeg'. */
  mimeType?: 'image/jpeg' | 'image/webp' | 'image/png';
}

const DEFAULTS: Required<CompressOptions> = {
  maxDimension: 1600,
  quality: 0.82,
  mimeType: 'image/jpeg',
};

/**
 * Kompres File gambar ke base64 data URI (resized + re-encoded).
 *
 * Kalau browser tidak bisa men-decode file (mis. HEIC di Android Chrome
 * yang tidak punya decoder native), fallback ke `FileReader.readAsDataURL`
 * agar perilaku tidak regresi vs implementasi sebelumnya — biarpun upload
 * jadi lambat, minimal jawaban tetap masuk.
 */
export async function compressImageFile(file: File, opts: CompressOptions = {}): Promise<string> {
  const { maxDimension, quality, mimeType } = { ...DEFAULTS, ...opts };

  // SSR guard — komponen ini hanya dipakai di client, tapi defensive.
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return readFileAsDataURL(file);
  }

  // Decode pakai createImageBitmap kalau tersedia (lebih cepat & low-mem
  // dibanding HTMLImageElement). Fallback ke <img> kalau tidak.
  let bitmap: ImageBitmap | HTMLImageElement | null = null;
  try {
    if (typeof createImageBitmap === 'function') {
      bitmap = await createImageBitmap(file);
    } else {
      bitmap = await loadImageElement(file);
    }
  } catch (err) {
    console.warn('[image-compress] Decode gagal, fallback ke base64 raw:', err);
    return readFileAsDataURL(file);
  }

  const srcW = 'width' in bitmap ? bitmap.width : (bitmap as HTMLImageElement).naturalWidth;
  const srcH = 'height' in bitmap ? bitmap.height : (bitmap as HTMLImageElement).naturalHeight;
  if (!srcW || !srcH) {
    if ('close' in bitmap) bitmap.close();
    return readFileAsDataURL(file);
  }

  const scale = Math.min(1, maxDimension / Math.max(srcW, srcH));
  const dstW = Math.max(1, Math.round(srcW * scale));
  const dstH = Math.max(1, Math.round(srcH * scale));

  const canvas = document.createElement('canvas');
  canvas.width = dstW;
  canvas.height = dstH;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    if ('close' in bitmap) bitmap.close();
    return readFileAsDataURL(file);
  }
  // JPEG tidak punya alpha — fill putih supaya transparent areas (PNG)
  // tidak jadi hitam saat di-encode JPEG.
  if (mimeType === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, dstW, dstH);
  }
  ctx.drawImage(bitmap as CanvasImageSource, 0, 0, dstW, dstH);
  if ('close' in bitmap) bitmap.close();

  // toDataURL synchronous (canvas.toBlob lebih hemat memory tapi async
  // dan kita perlu base64 untuk preview anyway).
  try {
    return canvas.toDataURL(mimeType, quality);
  } catch (err) {
    console.warn('[image-compress] toDataURL gagal, fallback:', err);
    return readFileAsDataURL(file);
  }
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') resolve(result);
      else reject(new Error('FileReader: hasil bukan string'));
    };
    reader.onerror = () => reject(reader.error ?? new Error('FileReader gagal'));
    reader.readAsDataURL(file);
  });
}

function loadImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Image load gagal'));
    };
    img.src = url;
  });
}
