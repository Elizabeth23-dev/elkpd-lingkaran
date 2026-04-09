import { useState, useCallback } from 'react';
import { daftarMateri, soalPerTopik } from '~/data/materi';
import { hasilKey } from '~/hooks/use-latihan';

const totalSoal = daftarMateri.reduce((sum, m) => sum + (soalPerTopik[m.id]?.length ?? 0), 0);

function computeProgress(siswaId: string) {
  const totalTopik = daftarMateri.length;
  let materiDipelajari = 0;
  let soalDikerjakan = 0;
  let totalSkorPersen = 0;
  let topikSelesai = 0;

  daftarMateri.forEach((m) => {
    try {
      const raw = sessionStorage.getItem(hasilKey(siswaId, m.id));
      if (!raw) return;
      const data = JSON.parse(raw) as { score: number; total: number; submitted: Record<number, boolean> };
      const jumlahDijawab = Object.keys(data.submitted ?? {}).length;
      if (jumlahDijawab > 0) materiDipelajari++;
      soalDikerjakan += jumlahDijawab;
      totalSkorPersen += data.total > 0 ? Math.round((data.score / data.total) * 100) : 0;
      if (jumlahDijawab >= (data.total ?? 0) && data.total > 0) topikSelesai++;
    } catch {
      /* ignore */
    }
  });

  const skorRataRata = materiDipelajari > 0 ? Math.round(totalSkorPersen / materiDipelajari) : 0;
  const progressKeseluruhan = totalTopik > 0 ? Math.round((topikSelesai / totalTopik) * 100) : 0;

  return { materiDipelajari, totalMateri: totalTopik, soalDikerjakan, totalSoal, skorRataRata, progressKeseluruhan };
}

export function useProgress(siswaId: string) {
  const [progress, setProgress] = useState(() => computeProgress(siswaId));

  const reset = useCallback(() => {
    daftarMateri.forEach((m) => sessionStorage.removeItem(hasilKey(siswaId, m.id)));
    setProgress(computeProgress(siswaId));
  }, [siswaId]);

  return { ...progress, reset };
}
