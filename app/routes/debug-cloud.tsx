/**
 * Halaman setup & debug JSONBin.
 * Akses di /debug-cloud
 * Guru bisa input API key & BIN ID di sini agar tersimpan di localStorage.
 */
import { useState, useEffect } from 'react';
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
  return [{ title: 'Setup Cloud Storage — E-LKPD' }];
}

export default function DebugCloudPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [running, setRunning] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [inputBin, setInputBin] = useState('');
  const [saved, setSaved] = useState(false);
  const [currentKey, setCurrentKey] = useState('');
  const [currentBin, setCurrentBin] = useState('');

  useEffect(() => {
    setCurrentKey(getActiveApiKey());
    setCurrentBin(getActiveBinId());
  }, []);

  function handleSaveCredentials() {
    const key = inputKey.trim();
    const bin = inputBin.trim();
    if (!key || !bin) {
      alert('API Key dan BIN ID harus diisi');
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

    // Step 1: Cek konfigurasi
    log.push({
      step: '1. Konfigurasi',
      ok: Boolean(key && bin),
      message: key && bin
        ? `✅ API Key: ${key.slice(0, 12)}... | BIN ID: ${bin}`
        : `❌ KOSONG — Masukkan API Key & BIN ID di form di atas`,
    });
    setResults([...log]);
    if (!key || !bin) { setRunning(false); return; }

    // Step 2: Test fetch BIN
    try {
      const res = await fetch(`${JSONBIN_BASE}/b/${bin}/latest`, {
        headers: { 'X-Master-Key': key, 'X-Bin-Meta': 'false', 'Cache-Control': 'no-cache' },
      });
      const text = await res.text();
      let parsed: unknown = null;
      try { parsed = JSON.parse(text); } catch { /* ignore */ }
      log.push({
        step: '2. Koneksi ke JSONBin',
        ok: res.ok,
        message: res.ok
          ? `✅ HTTP ${res.status} — Berhasil terhubung ke JSONBin`
          : `❌ HTTP ${res.status} — ${text.slice(0, 200)}`,
        data: parsed,
      });
    } catch (err) {
      log.push({ step: '2. Koneksi ke JSONBin', ok: false, message: `❌ Network error: ${String(err)}` });
    }
    setResults([...log]);

    // Step 3: Fetch users via cloud-storage
    try {
      const users = await fetchCloudUsers(true);
      log.push({
        step: '3. Data Siswa di JSONBin',
        ok: true,
        message: `✅ ${users.length} siswa terdaftar di cloud`,
        data: users.map((u) => ({ name: u.name, username: u.username, kelas: u.kelas })),
      });
    } catch (err) {
      log.push({ step: '3. Data Siswa', ok: false, message: `❌ Error: ${String(err)}` });
    }
    setResults([...log]);

    // Step 4: localStorage backup
    try {
      const raw = localStorage.getItem('elkpd-registered-users');
      const users: CloudUser[] = raw ? (JSON.parse(raw) as CloudUser[]) : [];
      log.push({
        step: '4. Backup localStorage (browser ini)',
        ok: true,
        message: `${users.length} siswa di localStorage browser ini`,
        data: users.map((u) => ({ name: u.name, username: u.username })),
      });
    } catch {
      log.push({ step: '4. localStorage', ok: false, message: 'Error membaca localStorage' });
    }
    setResults([...log]);
    setRunning(false);
  }

  async function handleMigrate() {
    const key = getActiveApiKey();
    const bin = getActiveBinId();
    if (!key || !bin) { alert('Konfigurasi API Key & BIN ID terlebih dahulu'); return; }

    const raw = localStorage.getItem('elkpd-registered-users');
    const users: CloudUser[] = raw ? (JSON.parse(raw) as CloudUser[]) : [];
    if (users.length === 0) { alert('Tidak ada data siswa di localStorage browser ini'); return; }

    if (!confirm(`Migrate ${users.length} siswa dari localStorage ke JSONBin?`)) return;

    try {
      // Merge dengan data cloud yang ada
      const cloudUsers = await fetchCloudUsers(true);
      const merged = [...cloudUsers];
      for (const u of users) {
        if (!merged.some((c) => c.username === u.username)) {
          merged.push(u);
        }
      }
      await saveCloudUsers(merged);
      alert(`✅ Berhasil migrate! Total ${merged.length} siswa di JSONBin.`);
      void runTests();
    } catch (err) {
      alert(`❌ Gagal migrate: ${String(err)}`);
    }
  }

  const isReady = Boolean(currentKey && currentBin);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>⚙️ Setup Sinkronisasi Cloud</h1>
        <p className={styles.subtitle}>
          Masukkan API Key dan BIN ID JSONBin agar data siswa tersinkron di semua device.
          Lakukan ini <strong>di setiap browser/device</strong> yang digunakan.
        </p>

        {/* Status saat ini */}
        <div className={`${styles.card} ${isReady ? styles.cardSuccess : styles.cardWarning}`}>
          <h2 className={styles.cardTitle}>
            {isReady ? '✅ Konfigurasi Aktif' : '⚠️ Belum Dikonfigurasi'}
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
          {isReady && (
            <button className={styles.btnDanger} onClick={handleClearCredentials}>
              🗑️ Hapus Konfigurasi
            </button>
          )}
        </div>

        {/* Form input credentials */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>🔑 Input API Key & BIN ID</h2>
          <p className={styles.helpText}>
            Dapatkan dari <strong>jsonbin.io</strong> → login → Account → Master Key &amp; Bins.
            Simpan di browser ini agar tersinkron.
          </p>
          <div className={styles.inputRow}>
            <label className={styles.inputLabel}>Master Key (API Key):</label>
            <input
              className={styles.input}
              type="text"
              placeholder="$2a$10$..."
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
            />
          </div>
          <div className={styles.inputRow}>
            <label className={styles.inputLabel}>BIN ID:</label>
            <input
              className={styles.input}
              type="text"
              placeholder="6xxxxxxxxxxxxxxxxxxxxxxx"
              value={inputBin}
              onChange={(e) => setInputBin(e.target.value)}
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
          <h2 className={styles.cardTitle}>🧪 Test Koneksi</h2>
          <button
            className={styles.btnPrimary}
            onClick={() => void runTests()}
            disabled={running || !isReady}
          >
            {running ? '⏳ Testing...' : '▶ Jalankan Test'}
          </button>
          {!isReady && <p className={styles.helpText}>Simpan konfigurasi terlebih dahulu.</p>}

          {results.length > 0 && (
            <div className={styles.resultList}>
              {results.map((r, i) => (
                <div key={i} className={`${styles.resultRow} ${r.ok ? styles.resultOk : styles.resultFail}`}>
                  <div className={styles.resultStep}>{r.step}</div>
                  <div className={styles.resultMsg}>{r.message}</div>
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
          <h2 className={styles.cardTitle}>📤 Migrate Data ke Cloud</h2>
          <p className={styles.helpText}>
            Jika ada data siswa di browser/HP ini (localStorage) yang belum masuk JSONBin,
            klik tombol ini untuk memindahkannya ke cloud.
          </p>
          <button
            className={styles.btnWarning}
            onClick={() => void handleMigrate()}
            disabled={!isReady}
          >
            📤 Migrate Data localStorage → JSONBin
          </button>
        </div>

        <p className={styles.note}>
          💡 <strong>Tips:</strong> Buka halaman ini di HP yang berisi data siswa, lalu klik Migrate.
          Setelah itu, halaman admin akan otomatis sinkron dari JSONBin.
        </p>
      </div>
    </div>
  );
}
