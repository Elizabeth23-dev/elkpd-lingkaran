import { useState, useCallback } from 'react';
import { daftarMateri, soalPerTopik } from '~/data/materi';
import { hasilKey } from '~/hooks/use-latihan';

/** Total jumlah soal di seluruh materi (sumber kebenaran: data soal). */
const totalSoalMax = daftarMateri.reduce(
  (sum, m) => sum + (soalPerTopik[m.id]?.length ?? 0),
  0
);

/** Total skor maksimal di seluruh materi (jumlah `skor` semua soal). */
const totalSkorMax = daftarMateri.reduce(
  (sum, m) => sum + (soalPerTopik[m.id]?.reduce((s, q) => s + (q.skor ?? 0), 0) ?? 0),
  0
);

interface StoredHasil {
  score: number;
  total: number;
  /** Sejak migrasi skor berbobot. Boleh tidak ada untuk hasil lama. */
  totalSkor?: number;
  skorDiperoleh?: number;
  submitted: Record<number, boolean>;
}

function computeProgress(siswaId: string) {
  const totalTopik = daftarMateri.length;
  let materiDipelajari = 0;
  let soalDikerjakan = 0;
  let skorDiperolehTotal = 0;
  let topikSelesai = 0;

  daftarMateri.forEach((m) => {
    try {
      const raw = sessionStorage.getItem(hasilKey(siswaId, m.id));
      if (!raw) return;
      const data = JSON.parse(raw) as StoredHasil;
      const jumlahDijawab = Object.keys(data.submitted ?? {}).length;
      if (jumlahDijawab > 0) materiDipelajari++;
      soalDikerjakan += jumlahDijawab;

      // Skor berbobot dari `data.skorDiperoleh` (sudah memperhitungkan
      // skor per soal dan jawaban essay). Fallback ke estimasi pro-rata
      // berbasis `score`/`total` × max skor topik kalau hasil lama belum
      // menyimpan field ini.
      if (typeof data.skorDiperoleh === 'number') {
        skorDiperolehTotal += data.skorDiperoleh;
      } else if (data.total > 0) {
        const skorTopikMax =
          soalPerTopik[m.id]?.reduce((s, q) => s + (q.skor ?? 0), 0) ?? 0;
        skorDiperolehTotal += Math.round((data.score / data.total) * skorTopikMax);
      }

      if (jumlahDijawab >= (data.total ?? 0) && data.total > 0) topikSelesai++;
    } catch {
      /* ignore */
    }
  });

  const progressKeseluruhan = totalTopik > 0 ? Math.round((topikSelesai / totalTopik) * 100) : 0;

  return {
    materiDipelajari,
    totalMateri: totalTopik,
    soalDikerjakan,
    totalSoal: totalSoalMax,
    skorDiperoleh: skorDiperolehTotal,
    totalSkor: totalSkorMax,
    progressKeseluruhan,
  };
}

export function useProgress(siswaId: string) {
  const [progress, setProgress] = useState(() => computeProgress(siswaId));

  const reset = useCallback(() => {
    daftarMateri.forEach((m) => sessionStorage.removeItem(hasilKey(siswaId, m.id)));
    setProgress(computeProgress(siswaId));
  }, [siswaId]);

  return { ...progress, reset };
}
