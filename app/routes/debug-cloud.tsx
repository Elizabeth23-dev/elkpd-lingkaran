/**
 * Halaman setup & sinkronisasi JSONBin.
 * Akses di /debug-cloud — bisa juga dari tombol "Setup Cloud" di halaman Admin.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  getActiveApiKey,
  getActiveBinId,
  setManualCredentials,
  clearManualCredentials,
  fetchCloudUsers,
  saveCloudUsers,
  type CloudUser,
} from '~/data/cloud-storage';
import styles from './debug-cloud.module.css';

const JSONBIN_BASE = 'https://api.jsonbin.io/v3';

interface TestResult {
  step: string;
  ok: boolean;
  message: string;
  data?: unknown;
}

export function meta() {
  return [{ title: 'Setup Sinkronisasi Cloud — E-LKPD' }];
}

export default function DebugCloudPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [running, setRunning] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [inputBin, setInputBin] = useState('');
  const [saved, setSaved] = useState(false);
  const [currentKey, setCurrentKey] = useState('');
  const [currentBin, setCurrentBin] = useState('');
  const [localCount, setLocalCount] = useState(0);

  useEffect(() => {
    setCurrentKey(getActiveApiKey());
    setCurrentBin(getActiveBinId());
    // Hitung data di localStorage
    try {
      const raw = localStorage.getItem('elkpd-registered-users');
      const users: CloudUser[] = raw ? (JSON.parse(raw) as CloudUser[]) : [];
      setLocalCount(users.length);
    } catch { /* ignore */ }
  }, []);

  function handleSaveCredentials() {
    const key = inputKey.trim();
    const bin = inputBin.trim();
    if (!key || !bin) {
      alert('API Key dan BIN ID harus diisi!');
      return;
    }
    if (!key.startsWith('$2a$10$')) {
      alert('Format API Key tidak valid. Harus diawali $2a$10$');
      return;
    }
    setManualCredentials(key, bin);
    setCurrentKey(getActiveApiKey());
    setCurrentBin(getActiveBinId());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setResults([]);
  }

  function handleClearCredentials() {
    if (!confirm('Hapus konfigurasi API Key & BIN ID dari browser ini?')) return;
    clearManualCredentials();
    setCurrentKey(getActiveApiKey());
    setCurrentBin(getActiveBinId());
    setInputKey('');
    setInputBin('');
    setResults([]);
  }

  async function runTests() {
    const key = getActiveApiKey();
    const bin = getActiveBinId();
    const log: TestResult[] = [];
    setResults([]);
    setRunning(true);

    // Step 1: Konfigurasi
    log.push({
      step: 'Langkah 1 — Konfigurasi',
      ok: Boolean(key && bin),
      message: key && bin
        ? `API Key: ${key.slice(0, 15)}... | BIN ID: ${bin}`
        : 'KOSONG — Masukkan API Key & BIN ID di form di bawah lalu klik Simpan',
    });
    setResults([...log]);
    if (!key || !bin) { setRunning(false); return; }

    // Step 2: Test koneksi JSONBin
    try {
      const res = await fetch(`${JSONBIN_BASE}/b/${bin}/latest`, {
        headers: { 'X-Master-Key': key, 'X-Bin-Meta': 'false', 'Cache-Control': 'no-cache' },
      });
      const text = await res.text();
      let parsed: unknown = null;
      try { parsed = JSON.parse(text); } catch { /* ignore */ }
      log.push({
        step: 'Langkah 2 — Koneksi ke JSONBin',
        ok: res.ok,
        message: res.ok
          ? `Berhasil terhubung ke JSONBin (HTTP ${res.status})`
          : `GAGAL: HTTP ${res.status} — ${text.slice(0, 200)}`,
        data: parsed,
      });
    } catch (err) {
      log.push({ step: 'Langkah 2 — Koneksi ke JSONBin', ok: false, message: `Network error: ${String(err)}` });
    }
    setResults([...log]);

    // Step 3: Data siswa di cloud
    try {
      const users = await fetchCloudUsers(true);
      log.push({
        step: 'Langkah 3 — Data Siswa di Cloud',
        ok: true,
        message: users.length > 0
          ? `${users.length} siswa tersimpan di JSONBin`
          : 'Cloud kosong (belum ada siswa — lakukan Migrate dari HP yang menyimpan data)',
        data: users.map((u) => ({ nama: u.name, username: u.username, kelas: u.kelas })),
      });
    } catch (err) {
      log.push({ step: 'Langkah 3 — Data Siswa di Cloud', ok: false, message: `Error: ${String(err)}` });
    }
    setResults([...log]);
    setRunning(false);
  }

  async function handleMigrate() {
    const key = getActiveApiKey();
    const bin = getActiveBinId();
    if (!key || !bin) {
      alert('Simpan konfigurasi API Key & BIN ID terlebih dahulu, lalu jalankan Test untuk memastikan koneksi berhasil.');
      return;
    }

    const raw = localStorage.getItem('elkpd-registered-users');
    const users: CloudUser[] = raw ? (JSON.parse(raw) as CloudUser[]) : [];
    if (users.length === 0) {
      alert('Tidak ada data siswa di browser/HP ini. Coba buka halaman ini di HP yang digunakan siswa untuk daftar.');
      return;
    }

    if (!confirm(`Upload ${users.length} siswa dari browser ini ke JSONBin agar bisa diakses semua device?`)) return;

    try {
      const cloudUsers = await fetchCloudUsers(true);
      const merged = [...cloudUsers];
      for (const u of users) {
        if (!merged.some((c) => c.username === u.username)) {
          merged.push(u);
        }
      }
      await saveCloudUsers(merged);
      alert(`Berhasil! Total ${merged.length} siswa tersimpan di JSONBin. Sekarang buka halaman Admin untuk melihat daftar siswa.`);
      void runTests();
    } catch (err) {
      alert(`Gagal upload: ${String(err)}`);
    }
  }

  const isReady = Boolean(currentKey && currentBin);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>⚙️ Setup Sinkronisasi Cloud</h1>
          <Link to="/admin" className={styles.backBtn}>← Kembali ke Admin</Link>
        </div>

        {/* Panduan singkat */}
        <div className={styles.guideBox}>
          <h2 className={styles.guideTitle}>📋 Cara Setup (Lakukan di SETIAP device/browser)</h2>
          <ol className={styles.guideList}>
            <li>Dapatkan <strong>Master Key</strong> dari <a href="https://jsonbin.io/app/app" target="_blank" rel="noreferrer" className={styles.guideLink}>jsonbin.io → Account Settings</a></li>
            <li>Dapatkan <strong>BIN ID</strong> dari <a href="https://jsonbin.io/app/bins" target="_blank" rel="noreferrer" className={styles.guideLink}>jsonbin.io → Bins</a> (klik nama BIN, salin ID dari URL)</li>
            <li>Isi form di bawah → klik <strong>Simpan Konfigurasi</strong></li>
            <li>Klik <strong>Jalankan Test</strong> untuk verifikasi koneksi</li>
            <li>Jika Langkah 3 menampilkan 0 siswa, klik <strong>Migrate Data</strong> di HP yang menyimpan data siswa</li>
          </ol>
        </div>

        {/* Status saat ini */}
        <div className={`${styles.card} ${isReady ? styles.cardSuccess : styles.cardWarning}`}>
          <h2 className={styles.cardTitle}>
            {isReady ? '✅ Konfigurasi Aktif di Browser Ini' : '⚠️ Belum Dikonfigurasi di Browser Ini'}
          </h2>
          <div className={styles.configRow}>
            <span className={styles.configLabel}>API Key:</span>
            <code className={styles.configValue}>
              {currentKey ? `${currentKey.slice(0, 15)}...` : '❌ KOSONG'}
            </code>
          </div>
          <div className={styles.configRow}>
            <span className={styles.configLabel}>BIN ID:</span>
            <code className={styles.configValue}>{currentBin || '❌ KOSONG'}</code>
          </div>
          <div className={styles.configRow}>
            <span className={styles.configLabel}>Data lokal:</span>
            <code className={styles.configValue}>{localCount} siswa di browser ini</code>
          </div>
          {isReady && (
            <button className={styles.btnDanger} onClick={handleClearCredentials}>
              🗑️ Hapus Konfigurasi
            </button>
          )}
        </div>

        {/* Form input credentials */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>🔑 Masukkan API Key &amp; BIN ID JSONBin</h2>
          <p className={styles.helpText}>
            Salin dari <strong>jsonbin.io</strong>. Konfigurasi ini disimpan di browser ini saja.
            Ulangi di setiap device yang ingin sinkron.
          </p>
          <div className={styles.inputRow}>
            <label className={styles.inputLabel}>Master Key (API Key) — dimulai dengan $2a$10$...</label>
            <input
              className={styles.input}
              type="text"
              placeholder="$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className={styles.inputRow}>
            <label className={styles.inputLabel}>BIN ID — 24 karakter hex</label>
            <input
              className={styles.input}
              type="text"
              placeholder="6xxxxxxxxxxxxxxxxxxxxxxx"
              value={inputBin}
              onChange={(e) => setInputBin(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className={styles.btnRow}>
            <button className={styles.btnPrimary} onClick={handleSaveCredentials}>
              {saved ? '✅ Tersimpan!' : '💾 Simpan Konfigurasi'}
            </button>
          </div>
        </div>

        {/* Test koneksi */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>🧪 Test Koneksi JSONBin</h2>
          <p className={styles.helpText}>
            Klik tombol di bawah untuk memverifikasi API Key dan BIN ID benar.
          </p>
          <button
            className={styles.btnPrimary}
            onClick={() => void runTests()}
            disabled={running || !isReady}
          >
            {running ? '⏳ Testing...' : '▶ Jalankan Test'}
          </button>
          {!isReady && <p className={styles.helpText}>⬆️ Simpan konfigurasi terlebih dahulu.</p>}

          {results.length > 0 && (
            <div className={styles.resultList}>
              {results.map((r, i) => (
                <div key={i} className={`${styles.resultRow} ${r.ok ? styles.resultOk : styles.resultFail}`}>
                  <div className={styles.resultStep}>{r.step}</div>
                  <div className={styles.resultMsg}>
                    {r.ok ? '✅ ' : '❌ '}{r.message}
                  </div>
                  {r.data !== undefined && (
                    <pre className={styles.resultData}>{JSON.stringify(r.data, null, 2)}</pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Migrate data */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>📤 Migrate Data Siswa ke Cloud</h2>
          <p className={styles.helpText}>
            Jika ada data siswa di browser/HP ini yang belum masuk JSONBin
            (misal: data 6 siswa yang tersimpan di HP), klik tombol ini
            untuk meng-upload semua data ke cloud sehingga bisa diakses semua device.
          </p>
          <div className={styles.migrateInfo}>
            <span>Data di browser ini:</span>
            <strong>{localCount} siswa</strong>
          </div>
          <button
            className={styles.btnWarning}
            onClick={() => void handleMigrate()}
            disabled={!isReady || localCount === 0}
          >
            📤 Upload Data ke JSONBin ({localCount} siswa)
          </button>
          {localCount === 0 && (
            <p className={styles.helpText}>
              ℹ️ Tidak ada data siswa di browser ini. Buka halaman ini di HP/browser yang digunakan siswa mendaftar.
            </p>
          )}
        </div>

        <div className={styles.note}>
          <strong>💡 Tips Penting:</strong>
          <ul className={styles.tipList}>
            <li>Konfigurasi ini hanya tersimpan di browser ini — ulangi di setiap device yang berbeda.</li>
            <li>Buka halaman ini di HP yang berisi 6 data siswa → klik <strong>Upload Data ke JSONBin</strong>.</li>
            <li>Setelah migrate, buka halaman Admin di PC — data siswa akan muncul.</li>
            <li>BIN ID dan API Key bisa dicek di <a href="https://jsonbin.io/app" target="_blank" rel="noreferrer" className={styles.guideLink}>jsonbin.io/app</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
