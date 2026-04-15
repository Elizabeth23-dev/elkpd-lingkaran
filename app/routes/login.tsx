import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, LogIn, User, ShieldCheck, UserPlus, ArrowLeft } from 'lucide-react';
import { useAuth } from '~/hooks/use-auth';
import type { UserRole } from '~/data/auth';
import styles from './login.module.css';

export function meta() {
  return [{ title: 'Login — E-LKPD Lingkaran Kelas 11 SMA' }];
}

type Mode = 'login' | 'register';

const KELAS_OPTIONS = [
  'XI IPA 1', 'XI IPA 2', 'XI IPA 3',
  'XI IPS 1', 'XI IPS 2', 'XI IPS 3',
];

export default function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>('login');
  const [role, setRole] = useState<UserRole>('siswa');

  // Login fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register fields
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regKelas, setRegKelas] = useState(KELAS_OPTIONS[0]);
  const [showRegPassword, setShowRegPassword] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const switchMode = (next: Mode) => {
    setMode(next);
    setError('');
    setSuccess('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Username dan kata sandi tidak boleh kosong.');
      return;
    }
    setLoading(true);
    try {
      const ok = await login(username.trim(), password.trim(), role);
      if (ok) {
        navigate(role === 'guru' ? '/admin' : '/');
      } else {
        setError('Username atau kata sandi salah. Coba lagi.');
      }
    } catch {
      setError('Terjadi kesalahan. Periksa koneksi internet Anda.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!regName.trim() || !regUsername.trim() || !regPassword.trim()) {
      setError('Semua field harus diisi.');
      return;
    }
    if (regPassword.trim().length < 6) {
      setError('Kata sandi minimal 6 karakter.');
      return;
    }
    setLoading(true);
    try {
      const result = await register({
        name: regName.trim(),
        username: regUsername.trim(),
        password: regPassword.trim(),
        kelas: regKelas,
      });
      if (result.ok) {
        setSuccess(`Akun berhasil dibuat! Silakan masuk dengan username "${regUsername.trim()}".`);
        setRegName('');
        setRegUsername('');
        setRegPassword('');
      } else {
        setError(result.error);
      }
    } catch {
      setError('Terjadi kesalahan saat mendaftar. Periksa koneksi internet Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.logo} />
          <h1 className={styles.title}>E-LKPD Lingkaran</h1>
          <p className={styles.subtitle}>
            {mode === 'login' ? 'Kelas 11 SMA — Masuk ke akun Anda' : 'Daftarkan akun siswa baru'}
          </p>
        </div>

        {mode === 'login' ? (
          <>
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

            <form className={styles.form} onSubmit={handleLogin} noValidate>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  className={styles.input}
                  placeholder={role === 'guru' ? 'Contoh: Sir' : 'Contoh: ahmad'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  autoFocus
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="password">Kata Sandi</label>
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

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                <LogIn size={18} />
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>

            {role === 'siswa' && (
              <div className={styles.registerLink}>
                <span>Belum punya akun?</span>
                <button type="button" className={styles.linkBtn} onClick={() => switchMode('register')}>
                  <UserPlus size={14} /> Daftar Akun
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <form className={styles.form} onSubmit={handleRegister} noValidate>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="regName">Nama Lengkap</label>
                <input
                  id="regName"
                  type="text"
                  className={styles.input}
                  placeholder="Contoh: Budi Santoso"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="regUsername">Username</label>
                <input
                  id="regUsername"
                  type="text"
                  className={styles.input}
                  placeholder="Buat username unik, contoh: budi22"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="regPassword">Kata Sandi</label>
                <div className={styles.passwordWrapper}>
                  <input
                    id="regPassword"
                    type={showRegPassword ? 'text' : 'password'}
                    className={styles.input}
                    placeholder="Minimal 6 karakter"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowRegPassword((v) => !v)}
                    aria-label={showRegPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  >
                    {showRegPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="regKelas">Kelas</label>
                <select
                  id="regKelas"
                  className={styles.input}
                  value={regKelas}
                  onChange={(e) => setRegKelas(e.target.value)}
                >
                  {KELAS_OPTIONS.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>

              {error && <p className={styles.error}>{error}</p>}
              {success && <p className={styles.successMsg}>{success}</p>}

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                <UserPlus size={18} />
                {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
              </button>
            </form>

            <div className={styles.registerLink}>
              <button type="button" className={styles.linkBtn} onClick={() => switchMode('login')}>
                <ArrowLeft size={14} /> Kembali ke Masuk
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
