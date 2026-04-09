import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BookOpen, Eye, EyeOff, LogIn, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '~/hooks/use-auth';
import type { UserRole } from '~/data/auth';
import styles from './login.module.css';

export function meta() {
  return [{ title: 'Login — E-LKPD Lingkaran Kelas 11 SMA' }];
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('siswa');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Username dan kata sandi tidak boleh kosong.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const ok = login(username.trim(), password.trim(), role);
      if (ok) {
        navigate(role === 'guru' ? '/admin' : '/');
      } else {
        setError('Username atau kata sandi salah. Coba lagi.');
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.logo}>
            <BookOpen size={28} />
          </div>
          <h1 className={styles.title}>E-LKPD Lingkaran</h1>
          <p className={styles.subtitle}>Kelas 11 SMA — Masuk ke akun Anda</p>
        </div>

        <div className={styles.roleTabs}>
          <button
            type="button"
            className={`${styles.roleTab} ${role === 'siswa' ? styles.roleTabActive : ''}`}
            onClick={() => { setRole('siswa'); setError(''); }}
          >
            <User size={16} />
            Siswa
          </button>
          <button
            type="button"
            className={`${styles.roleTab} ${role === 'guru' ? styles.roleTabActive : ''}`}
            onClick={() => { setRole('guru'); setError(''); }}
          >
            <ShieldCheck size={16} />
            Guru / Admin
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className={styles.input}
              placeholder={role === 'guru' ? 'guru' : 'Contoh: ahmad'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Kata Sandi
            </label>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            <LogIn size={18} />
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <div className={styles.hint}>
          <p className={styles.hintTitle}>Akun Demo:</p>
          <p>Siswa: <code>ahmad</code> / <code>siswa123</code></p>
        </div>


      </div>
    </div>
  );
}
