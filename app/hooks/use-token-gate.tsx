import { useState, useCallback } from 'react';

/** Token yang valid per ID materi */
const MATERI_TOKENS: Record<string, string> = {
  'lingkaran-busur': 'GARBAGE',
  'lingkaran-garis-singgung': 'GOOBER',
};

const SESSION_PREFIX = 'elkpd-token-';

function isTokenValidForMateri(materiId: string): boolean {
  const required = MATERI_TOKENS[materiId];
  if (!required) return true; // Materi tanpa token → bebas akses
  try {
    return sessionStorage.getItem(`${SESSION_PREFIX}${materiId}`) === required;
  } catch {
    return false;
  }
}

function saveTokenForMateri(materiId: string): void {
  const required = MATERI_TOKENS[materiId];
  if (!required) return;
  try {
    sessionStorage.setItem(`${SESSION_PREFIX}${materiId}`, required);
  } catch {
    // ignore
  }
}

/** Ambil ID materi dari path, e.g. '/materi/lingkaran-busur' → 'lingkaran-busur' */
function materiIdFromPath(path: string): string {
  const match = path.match(/\/materi\/([^/]+)/);
  return match ? match[1] : '';
}

export interface UseTokenGateReturn {
  isOpen: boolean;
  /** Path yang sudah diverifikasi dan siap dinavigasi (sekali pakai) */
  confirmedPath: string | null;
  /** Token yang dibutuhkan untuk materi yang sedang ditunggu */
  requiredMateriId: string | null;
  requestNavigation: (path: string) => void;
  submitToken: (token: string) => boolean;
  dismiss: () => void;
  /** Dipanggil setelah navigasi ke confirmedPath dilakukan untuk mereset state */
  clearConfirmedPath: () => void;
}

export function useTokenGate(): UseTokenGateReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmedPath, setConfirmedPath] = useState<string | null>(null);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [requiredMateriId, setRequiredMateriId] = useState<string | null>(null);

  const requestNavigation = useCallback((path: string) => {
    const materiId = materiIdFromPath(path);
    if (isTokenValidForMateri(materiId)) {
      // Bebas akses — langsung tandai sebagai confirmed
      setConfirmedPath(path);
      setIsOpen(false);
    } else {
      setRequiredMateriId(materiId);
      setPendingPath(path);
      setIsOpen(true);
    }
  }, []);

  const submitToken = useCallback((token: string): boolean => {
    if (!requiredMateriId) return false;
    const required = MATERI_TOKENS[requiredMateriId];
    if (token.trim().toUpperCase() === required?.toUpperCase()) {
      saveTokenForMateri(requiredMateriId);
      setIsOpen(false);
      setConfirmedPath(pendingPath);
      setPendingPath(null);
      setRequiredMateriId(null);
      return true;
    }
    return false;
  }, [requiredMateriId, pendingPath]);

  const dismiss = useCallback(() => {
    setIsOpen(false);
    setPendingPath(null);
    setRequiredMateriId(null);
  }, []);

  const clearConfirmedPath = useCallback(() => {
    setConfirmedPath(null);
  }, []);

  return { isOpen, confirmedPath, requiredMateriId, requestNavigation, submitToken, dismiss, clearConfirmedPath };
}
