import { useMemo } from "react";
import { soalPerTopik } from "~/data/materi";

export interface HasilData {
  topicId: string;
  answers: Record<number, number>;
  submitted: Record<number, boolean>;
  score: number;
  total: number;
  timeTaken: number;
}

export function useHasil(topicId: string): HasilData {
  const soalList = soalPerTopik[topicId] ?? soalPerTopik['definisi-unsur'];

  return useMemo(() => {
    try {
      const raw = sessionStorage.getItem(`hasil-${topicId}`);
      if (raw) return JSON.parse(raw) as HasilData;
    } catch {
      /* ignore */
    }
    // Default demo data
    const answers: Record<number, number> = {};
    const submitted: Record<number, boolean> = {};
    soalList.forEach((soal, idx) => {
      answers[idx] = idx % 2 === 0 ? soal.jawabanBenar : (soal.jawabanBenar + 1) % soal.pilihan.length;
      submitted[idx] = true;
    });
    const score = soalList.filter((soal, idx) => answers[idx] === soal.jawabanBenar).length;
    return { topicId, answers, submitted, score, total: soalList.length, timeTaken: 420 };
  }, [topicId, soalList]);
}
