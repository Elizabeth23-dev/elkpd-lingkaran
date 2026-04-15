import { useState, useEffect, useRef } from 'react';
import { KeyRound, X, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import styles from './token-gate-modal.module.css';

export interface TokenGateModalProps {
  isOpen: boolean;
  onSubmit: (token: string) => boolean;
  onDismiss: () => void;
}

export function TokenGateModal({ isOpen, onSubmit, onDismiss }: TokenGateModalProps) {
  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setToken('');
      setError('');
      setShowToken(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setError('Token tidak boleh kosong.');
      return;
    }
    const ok = onSubmit(token);
    if (!ok) {
      setError('Token tidak valid. Silakan cek kembali.');
      setToken('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onDismiss();
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-labelledby="token-modal-title">
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onDismiss} aria-label="Tutup">
          <X size={18} />
        </button>

        <div className={styles.iconWrap}>
          <KeyRound size={28} />
        </div>

        <h2 id="token-modal-title" className={styles.title}>Masukkan Token Akses</h2>
        <p className={styles.desc}>
          Masukkan token yang diberikan oleh guru untuk mengakses materi pembelajaran.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.inputWrap}>
            <input
              ref={inputRef}
              type={showToken ? 'text' : 'password'}
              className={`${styles.input} ${error ? styles.inputError : ''}`}
              placeholder="Masukkan token di sini"
              value={token}
              onChange={(e) => { setToken(e.target.value); setError(''); }}
              autoComplete="off"
            />
            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowToken((v) => !v)}
              aria-label={showToken ? 'Sembunyikan token' : 'Tampilkan token'}
            >
              {showToken ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {error && (
            <div className={styles.errorBox}>
              <ShieldAlert size={14} />
              <span>{error}</span>
            </div>
          )}

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onDismiss}>
              Batal
            </button>
            <button type="submit" className={styles.submitBtn}>
              <KeyRound size={16} />
              Verifikasi Token
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
