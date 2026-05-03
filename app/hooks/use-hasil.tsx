import { useState, useEffect } from "react";
import { useAuth } from "~/hooks/use-auth";
import { hasilKey } from "~/hooks/use-latihan";
import { reconcileLocalHasil } from "~/data/result-storage";

export interface HasilData {
  topicId: string;
  answers: Record<number, number>;
  submitted: Record<number, boolean>;
  essayImages?: Record<number, string>;
  score: number;
  total: number;
  totalSkor: number;
  skorDiperoleh: number;
  timeTaken: number;
}

function readLocal(siswaId: string, topicId: string): HasilData | null {
  try {
    const raw = sessionStorage.getItem(hasilKey(siswaId, topicId));
    return raw ? (JSON.parse(raw) as HasilData) : null;
  } catch {
    return null;
  }
}

export function useHasil(topicId: string): HasilData | null {
  const { user } = useAuth();
  // Initial paint: tampilkan apa yang ada di sessionStorage dulu (cepat),
  // setelah itu reconcile dengan cloud — kalau cloud kosong (admin reset),
  // setHasil(null) akan trigger redirect di /hasil page.
  const [hasil, setHasil] = useState<HasilData | null>(() =>
    user ? readLocal(user.id, topicId) : null
  );

  useEffect(() => {
    if (!user) {
      setHasil(null);
      return;
    }
    let cancelled = false;
    (async () => {
      if (user.role === 'siswa') {
        try {
          await reconcileLocalHasil(user.id);
        } catch { /* ignore */ }
      }
      if (cancelled) return;
      setHasil(readLocal(user.id, topicId));
    })();
    return () => { cancelled = true; };
  }, [topicId, user]);

  return hasil;
}
