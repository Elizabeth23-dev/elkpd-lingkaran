/**
 * Halaman debug untuk mengecek status koneksi JSONBin
 * Akses di /debug-cloud
 */
import { useState } from 'react';
import styles from './debug-cloud.module.css';

const JSONBIN_BASE = 'https://api.jsonbin.io/v3';

interface TestResult {
  step: string;
  ok: boolean;
  message: string;
  data?: unknown;
}

export function meta() {
  return [{ title: 'Debug Cloud Storage' }];
}

export default function DebugCloudPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [running, setRunning] = useState(false);
  const [manualKey, setManualKey] = useState('');
  const [manualBin, setManualBin] = useState('');

  const apiKey = (import.meta.env.VITE_JSONBIN_API_KEY as string) ?? '';
  const binId = (import.meta.env.VITE_JSONBIN_BIN_ID as string) ?? '';

  async function runTests(overrideKey?: string, overrideBin?: string) {
    const key = overrideKey ?? apiKey;
    const bin = overrideBin ?? binId;
    const log: TestResult[] = [];
    setResults([]);
    setRunning(true);

    // Step 1: Cek env vars
    log.push({
      step: '1. Environment Variables',
      ok: Boolean(key && bin),
      message: key && bin
        ? `API Key: ${key.slice(0, 10)}... | BIN ID: ${bin}`
        : `KOSONG! API Key: "${key}" | BIN ID: "${bin}"`,
    });
    setResults([...log]);

    if (!key || !bin) {
      setRunning(false);
      return;
    }

    // Step 2: Test fetch BIN
    try {
      const res = await fetch(`${JSONBIN_BASE}/b/${bin}/latest`, {
        headers: {
          'X-Master-Key': key,
          'X-Bin-Meta': 'false',
          'Cache-Control': 'no-cache',
        },
      });
      const text = await res.text();
      let parsed: unknown = null;
      try { parsed = JSON.parse(text); } catch { /* ignore */ }

      log.push({
        step: '2. Fetch BIN dari JSONBin',
        ok: res.ok,
        message: res.ok
          ? `✅ HTTP ${res.status} — Berhasil fetch data dari BIN`
          : `❌ HTTP ${res.status} — ${text.slice(0, 200)}`,
        data: parsed,
      });
    } catch (err) {
      log.push({
        step: '2. Fetch BIN dari JSONBin',
        ok: false,
        message: `❌ Network error: ${String(err)}`,
      });
    }
    setResults([...log]);

    // Step 3: Cek localStorage fallback
    try {
      const raw = localStorage.getItem('elkpd-registered-users');
      const users = raw ? JSON.parse(raw) as unknown[] : [];
      log.push({
        step: '3. Data di localStorage (fallback)',
        ok: true,
        message: `${users.length} user tersimpan di localStorage browser ini`,
        data: users,
      });
    } catch {
      log.push({ step: '3. localStorage', ok: false, message: 'Error membaca localStorage' });
    }
    setResults([...log]);

    // Step 4: Cek cache
    try {
      const raw = localStorage.getItem('elkpd-cloud-cache');
      if (raw) {
        const entry = JSON.parse(raw) as { data: unknown[]; ts: number };
        const age = Math.round((Date.now() - entry.ts) / 1000);
        log.push({
          step: '4. Cache JSONBin di localStorage',
          ok: true,
          message: `Cache berumur ${age}s — ${entry.data.length} user`,
          data: entry.data,
        });
      } else {
        log.push({ step: '4. Cache', ok: true, message: 'Tidak ada cache tersimpan' });
      }
    } catch {
      log.push({ step: '4. Cache', ok: false, message: 'Error membaca cache' });
    }
    setResults([...log]);

    setRunning(false);
  }

  async function handleMigrate() {
    const key = manualKey || apiKey;
    const bin = manualBin || binId;
    if (!key || !bin) {
      alert('Masukkan API Key dan BIN ID terlebih dahulu');
      return;
    }

    // Ambil data dari localStorage
    const raw = localStorage.getItem('elkpd-registered-users');
    const users = raw ? JSON.parse(raw) as unknown[] : [];
    if (users.length === 0) {
      alert('Tidak ada data di localStorage untuk di-migrate');
      return;
    }

    try {
      const res = await fetch(`${JSONBIN_BASE}/b/${bin}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': key,
        },
        body: JSON.stringify({ users }),
      });
      if (res.ok) {
        alert(`✅ Berhasil migrate ${users.length} user ke JSONBin!`);
        void runTests(key, bin);
      } else {
        const txt = await res.text();
        alert(`❌ Gagal: HTTP ${res.status} — ${txt}`);
      }
    } catch (err) {
      alert(`❌ Network error: ${String(err)}`);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>🔧 Debug Cloud Storage</h1>
        <p className={styles.subtitle}>Halaman ini hanya untuk diagnosa. Jangan dibagikan ke siswa.</p>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Konfigurasi Saat Ini</h2>
          <div className={styles.configRow}>
            <span className={styles.configLabel}>API Key (embed):</span>
            <code className={styles.configValue}>
              {apiKey ? `${apiKey.slice(0, 12)}...` : '❌ KOSONG'}
            </code>
          </div>
          <div className={styles.configRow}>
            <span className={styles.configLabel}>BIN ID (embed):</span>
            <code className={styles.configValue}>{binId || '❌ KOSONG'}</code>
          </div>
          <button
            className={styles.btnPrimary}
            onClick={() => void runTests()}
            disabled={running}
          >
            {running ? '⏳ Testing...' : '▶ Jalankan Test'}
          </button>
        </div>

        {results.length > 0 && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Hasil Test</h2>
            {results.map((r, i) => (
              <div key={i} className={`${styles.resultRow} ${r.ok ? styles.resultOk : styles.resultFail}`}>
                <div className={styles.resultStep}>{r.step}</div>
                <div className={styles.resultMsg}>{r.message}</div>
                {r.data !== undefined && (
                  <pre className={styles.resultData}>
                    {JSON.stringify(r.data, null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>🔄 Migrate Data localStorage → JSONBin</h2>
          <p className={styles.helpText}>
            Jika data siswa sudah ada di HP (localStorage) tapi belum masuk JSONBin,
            gunakan ini untuk memindahkan datanya.
          </p>
          <div className={styles.inputRow}>
            <label className={styles.inputLabel}>Override API Key (opsional):</label>
            <input
              className={styles.input}
              type="text"
              placeholder="$2a$10$..."
              value={manualKey}
              onChange={(e) => setManualKey(e.target.value)}
            />
          </div>
          <div className={styles.inputRow}>
            <label className={styles.inputLabel}>Override BIN ID (opsional):</label>
            <input
              className={styles.input}
              type="text"
              placeholder="69dfa7b1..."
              value={manualBin}
              onChange={(e) => setManualBin(e.target.value)}
            />
          </div>
          <button className={styles.btnWarning} onClick={() => void handleMigrate()}>
            📤 Migrate Data ke JSONBin
          </button>
        </div>
      </div>
    </div>
  );
}
