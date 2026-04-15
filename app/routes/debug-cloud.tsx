/**
 * Halaman Sinkronisasi Data Siswa.
 * Guru bisa Export data dari HP → Import di PC (atau sebaliknya).
 * Tidak perlu API key atau layanan cloud eksternal.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import type { CloudUser } from '~/data/cloud-storage';
import styles from './debug-cloud.module.css';

const LOCAL_KEY = 'elkpd-registered-users';

export function meta() {
  return [{ title: 'Sinkronisasi Data Siswa — E-LKPD' }];
}

function readLocalUsers(): CloudUser[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as CloudUser[]) : [];
  } catch {
    return [];
  }
}

export default function SinkronisasiPage() {
  const [localUsers, setLocalUsers] = useState<CloudUser[]>([]);
  const [importResult, setImportResult] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

  useEffect(() => {
    setLocalUsers(readLocalUsers());
  }, []);

  // ---- Export ----
  function handleExport() {
    const users = readLocalUsers();
    if (users.length === 0) {
      alert('Tidak ada data siswa di browser/HP ini untuk di-export.');
      return;
    }
    const blob = new Blob([JSON.stringify({ users }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elkpd-siswa-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ---- Import ----
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImportResult(null);
    setImportError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string) as { users: CloudUser[] };
        if (!Array.isArray(parsed.users)) throw new Error('Format file tidak valid.');

        const existing = readLocalUsers();
        const merged = [...existing];
        let added = 0;
        for (const u of parsed.users) {
          if (!merged.some((x) => x.username === u.username)) {
            merged.push(u);
            added++;
          }
        }
        localStorage.setItem(LOCAL_KEY, JSON.stringify(merged));
        setLocalUsers(merged);
        setImportResult(
          `Berhasil! ${added} siswa baru ditambahkan. Total sekarang: ${merged.length} siswa.`
        );
        // Trigger storage event so admin page refreshes
        window.dispatchEvent(new StorageEvent('storage', { key: LOCAL_KEY }));
      } catch (err) {
        setImportError(`Gagal membaca file: ${String(err)}`);
      }
      // reset file input
      e.target.value = '';
    };
    reader.readAsText(file);
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>📂 Sinkronisasi Data Siswa</h1>
          <Link to="/admin" className={styles.backBtn}>← Kembali ke Admin</Link>
        </div>

        {/* Status */}
        <div className={`${styles.card} ${localUsers.length > 0 ? styles.cardSuccess : styles.cardWarning}`}>
          <h2 className={styles.cardTitle}>
            {localUsers.length > 0 ? '✅ Data Ditemukan' : '⚠️ Belum Ada Data'}
          </h2>
          <p className={styles.helpText}>
            Browser/HP ini menyimpan <strong>{localUsers.length} data siswa</strong>.
          </p>
          {localUsers.length > 0 && (
            <ul className={styles.userList}>
              {localUsers.map((u) => (
                <li key={u.id} className={styles.userItem}>
                  <span className={styles.userName}>{u.name}</span>
                  <span className={styles.userMeta}>{u.username} · {u.kelas}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Panduan */}
        <div className={styles.guideBox}>
          <h2 className={styles.guideTitle}>📋 Cara Sinkronisasi Antar Device</h2>
          <ol className={styles.guideList}>
            <li>Buka halaman ini di <strong>HP/browser yang menyimpan data siswa</strong></li>
            <li>Klik <strong>Export Data Siswa</strong> → file JSON akan terdownload</li>
            <li>Kirim file tersebut ke PC (via WhatsApp, email, USB, dll.)</li>
            <li>Buka halaman ini di <strong>PC/browser yang ingin disinkronkan</strong></li>
            <li>Klik <strong>Import File JSON</strong> → pilih file yang sudah dikirim</li>
            <li>Selesai — data siswa akan muncul di halaman Admin PC</li>
          </ol>
        </div>

        {/* Export */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>📤 Export Data Siswa</h2>
          <p className={styles.helpText}>
            Lakukan ini di <strong>HP/browser yang berisi data siswa</strong>.
            File JSON akan terdownload dan bisa dikirim ke device lain.
          </p>
          <div className={styles.migrateInfo}>
            <span>Data di browser ini:</span>
            <strong>{localUsers.length} siswa</strong>
          </div>
          <button
            className={styles.btnPrimary}
            onClick={handleExport}
            disabled={localUsers.length === 0}
          >
            📥 Export Data Siswa ({localUsers.length} siswa)
          </button>
          {localUsers.length === 0 && (
            <p className={styles.helpText}>
              ℹ️ Tidak ada data di browser ini. Coba buka halaman ini di HP yang digunakan siswa mendaftar.
            </p>
          )}
        </div>

        {/* Import */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>📂 Import File JSON</h2>
          <p className={styles.helpText}>
            Lakukan ini di <strong>PC/browser yang ingin mendapat data siswa</strong>.
            Pilih file JSON yang sudah di-export dari HP.
          </p>
          <label className={styles.fileLabel}>
            <input
              type="file"
              accept=".json,application/json"
              className={styles.fileInput}
              onChange={handleFileChange}
            />
            📂 Pilih File JSON (elkpd-siswa-*.json)
          </label>
          {importResult && (
            <div className={styles.alertSuccess}>{importResult}</div>
          )}
          {importError && (
            <div className={styles.alertError}>{importError}</div>
          )}
        </div>

        <div className={styles.note}>
          <strong>💡 Tips:</strong> Setelah import, buka <Link to="/admin" className={styles.guideLink}>halaman Admin</Link> dan klik tombol <strong>Refresh</strong> — semua siswa akan muncul.
        </div>
      </div>
    </div>
  );
}
