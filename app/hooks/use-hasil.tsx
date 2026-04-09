import { useMemo } from "react";

export interface HasilData {
  topicId: string;
  answers: Record<number, number>;
  submitted: Record<number, boolean>;
  score: number;
  total: number;
  timeTaken: number;
}

export function useHasil(topicId: string): HasilData | null {
  return useMemo(() => {
    try {
      const raw = sessionStorage.getItem(`hasil-${topicId}`);
      if (raw) return JSON.parse(raw) as HasilData;
    } catch {
      /* ignore */
    }
    return null;
  }, [topicId]);
}
