import { useState, useCallback } from 'react';

const TOKEN_KEY = 'elkpd-materi-token';
const VALID_TOKEN = 'LINGKARAN2024';

function isTokenValid(): boolean {
  try {
    return sessionStorage.getItem(TOKEN_KEY) === VALID_TOKEN;
  } catch {
    return false;
  }
}

function saveToken(): void {
  try {
    sessionStorage.setItem(TOKEN_KEY, VALID_TOKEN);
  } catch {
    // ignore
  }
}

export interface UseTokenGateReturn {
  /** Whether the modal is currently open */
  isOpen: boolean;
  /** Destination path waiting for token confirmation */
  pendingPath: string | null;
  /** Call this to attempt navigation — opens modal if token not yet entered */
  requestNavigation: (path: string) => void;
  /** Submit token attempt; returns true if valid */
  submitToken: (token: string) => boolean;
  /** Dismiss modal without navigating */
  dismiss: () => void;
}

export function useTokenGate(): UseTokenGateReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  const requestNavigation = useCallback((path: string) => {
    if (isTokenValid()) {
      // Already verified — navigate directly via returned path
      setPendingPath(path);
      setIsOpen(false);
      // Signal immediate navigation by setting pending without modal
      // Parent reads pendingPath when isOpen=false as a ready signal
    } else {
      setPendingPath(path);
      setIsOpen(true);
    }
  }, []);

  const submitToken = useCallback((token: string): boolean => {
    if (token.trim().toUpperCase() === VALID_TOKEN) {
      saveToken();
      setIsOpen(false);
      return true;
    }
    return false;
  }, []);

  const dismiss = useCallback(() => {
    setIsOpen(false);
    setPendingPath(null);
  }, []);

  return { isOpen, pendingPath, requestNavigation, submitToken, dismiss };
}
