import { useMemo } from "react";
import { useAuth } from "~/hooks/use-auth";
import { hasilKey } from "~/hooks/use-latihan";

export interface HasilData {
  topicId: string;
  answers: Record<number, number>;
  submitted: Record<number, boolean>;
  score: number;
  total: number;
  timeTaken: number;
}

export function useHasil(topicId: string): HasilData | null {
  const { user } = useAuth();
  return useMemo(() => {
    if (!user) return null;
    try {
      const raw = sessionStorage.getItem(hasilKey(user.id, topicId));
      if (raw) return JSON.parse(raw) as HasilData;
    } catch {
      /* ignore */
    }
    return null;
  }, [topicId, user]);
}
