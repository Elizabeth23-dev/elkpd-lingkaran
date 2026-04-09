import { useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router';
import {
  Users, BookOpen, BarChart2, Award, Clock, CheckCircle,
  XCircle, LogOut, ChevronRight, Layers, RotateCcw
} from 'lucide-react';
import { useAuth } from '~/hooks/use-auth';
import { daftarAkun } from '~/data/auth';
import { daftarMateri } from '~/data/materi';
import { hasilKey } from '~/hooks/use-latihan';
import styles from './admin.module.css';

export function meta() {
  return [{ title: 'Admin Guru — E-LKPD Lingkaran Kelas 11 SMA' }];
}

const siswaList = daftarAkun.filter((u) => u.role === 'siswa');

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}m ${s}s`;
}

function gradeLabel(score: number, total: number): { label: string; className: string } {
  const pct = (score / total) * 100;
  if (pct >= 90) return { label: 'A', className: styles.gradeA };
  if (pct >= 80) return { label: 'B', className: styles.gradeB };
  if (pct >= 70) return { label: 'C', className: styles.gradeC };
  if (pct >= 60) return { label: 'D', className: styles.gradeD };
  return { label: 'E', className: styles.gradeE };
}

export default function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleResetNilai = useCallback((siswaId: string) => {
    daftarMateri.forEach((m) => sessionStorage.removeItem(hasilKey(siswaId, m.id)));
  }, []);

  const getHasil = useCallback((siswaId: string, topicId: string) => {
    try {
      const raw = sessionStorage.getItem(hasilKey(siswaId, topicId));
      if (raw) {
        const data = JSON.parse(raw) as { score: number; total: number; timeTaken: number };
        return { score: data.score, total: data.total, timeTaken: data.timeTaken, done: true };
      }
    } catch { /* ignore */ }
    return { score: 0, total: 5, timeTaken: 0, done: false };
  }, []);

  useEffect(() => {
    if (!user || user.role !== 'guru') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'guru') return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalSiswa = siswaList.length;
  const totalMateri = daftarMateri.length;

  // Aggregate stats — baca langsung dari sessionStorage
  let totalDone = 0;
  let totalScore = 0;
  let totalPossible = 0;
  siswaList.forEach((s) => {
    daftarMateri.forEach((m) => {
      try {
        const raw = sessionStorage.getItem(hasilKey(s.id, m.id));
        if (raw) {
          const data = JSON.parse(raw) as { score: number; total: number };
          totalDone++;
          totalScore += data.score;
          totalPossible += data.total;
        }
      } catch { /* ignore */ }
    });
  });
  const avgScore = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

  const stats = [
    { icon: <Users size={22} />, label: 'Total Siswa', value: totalSiswa, color: styles.statPrimary },
    { icon: <Layers size={22} />, label: 'Total Materi', value: totalMateri, color: styles.statSecondary },
    { icon: <CheckCircle size={22} />, label: 'Latihan Selesai', value: totalDone, color: styles.statSuccess },
    { icon: <BarChart2 size={22} />, label: 'Rata-rata Skor', value: `${avgScore}%`, color: styles.statAccent },
  ];

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.topBarLeft}>
            <div className={styles.adminBadge}>
              <BookOpen size={18} />
              Panel Guru
            </div>
            <div>
              <h1 className={styles.pageTitle}>Dashboard Admin</h1>
              <p className={styles.pageSubtitle}>Selamat datang, {user.name}</p>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={16} />
            Keluar
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {/* Stat cards */}
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <div key={i} className={`${styles.statCard} ${s.color}`}>
              <div className={styles.statIcon}>{s.icon}</div>
              <div>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Materi overview */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Daftar Materi</h2>
          <div className={styles.materiGrid}>
            {daftarMateri.map((m) => (
              <Link key={m.id} to={`/materi/${m.id}`} className={styles.materiCard}>
                <div className={styles.materiCardLeft}>
                  <div className={styles.materiDot} />
                  <div>
                    <div className={styles.materiTitle}>{m.title}</div>
                    <div className={styles.materiSub}>{m.subtitle} · {m.estimasiWaktu}</div>
                  </div>
                </div>
                <ChevronRight size={16} className={styles.chevron} />
              </Link>
            ))}
          </div>
        </section>

        {/* Student progress table */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Users size={20} /> Rekap Nilai Siswa
          </h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nama Siswa</th>
                  <th>Kelas</th>
                  {daftarMateri.map((m) => (
                    <th key={m.id}>{m.title.split(' ').slice(0, 2).join(' ')}</th>
                  ))}
                  <th>Avg</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {siswaList.map((siswa) => {
                  const hasilList = daftarMateri.map((m) => getHasil(siswa.id, m.id));
                  const doneCount = hasilList.filter((h) => h.done).length;
                  const totalScoreS = hasilList.filter((h) => h.done).reduce((a, h) => a + h.score, 0);
                  const totalPossS = hasilList.filter((h) => h.done).reduce((a, h) => a + h.total, 0);
                  const avgS = totalPossS > 0 ? Math.round((totalScoreS / totalPossS) * 100) : 0;
                                  return (
                    <tr key={siswa.id}>
                      <td className={styles.tdName}>
                        <div className={styles.avatarCell}>
                          <div className={styles.avatar}>{siswa.name.charAt(0)}</div>
                          <span>{siswa.name}</span>
                        </div>
                      </td>
                      <td className={styles.tdCenter}>{siswa.kelas}</td>
                      {hasilList.map((h, idx) => {
                        if (!h.done) {
                          return (
                            <td key={idx} className={styles.tdCenter}>
                              <span className={styles.belum}>—</span>
                            </td>
                          );
                        }
                        const g = gradeLabel(h.score, h.total);
                        return (
                          <td key={idx} className={styles.tdCenter}>
                            <div className={styles.scoreCell}>
                              <span className={`${styles.gradeBadge} ${g.className}`}>{g.label}</span>
                              <span className={styles.scoreNum}>{h.score}/{h.total}</span>
                            </div>
                          </td>
                        );
                      })}
                      <td className={styles.tdCenter}>
                        <div className={styles.avgCell}>
                          <span className={styles.avgPct}>{avgS}%</span>
                          <span className={styles.doneCount}>{doneCount}/{daftarMateri.length}</span>
                        </div>
                      </td>
                      <td className={styles.tdCenter}>
                        <button
                          className={styles.resetBtn}
                          onClick={() => handleResetNilai(siswa.id)}
                          title="Reset nilai siswa ini"
                        >
                          <RotateCcw size={13} />
                          Reset
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed per-student cards */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Award size={20} /> Detail Progres Per Siswa
          </h2>
          <div className={styles.studentCards}>
            {siswaList.map((siswa) => {
              const hasilList = daftarMateri.map((m) => ({
                materi: m,
                hasil: getHasil(siswa.id, m.id),
              }));
              const done = hasilList.filter((h) => h.hasil.done);
              const avg = done.length > 0
                ? Math.round((done.reduce((a, h) => a + h.hasil.score, 0) / done.reduce((a, h) => a + h.hasil.total, 0)) * 100)
                : 0;

              return (
                <div key={siswa.id} className={styles.studentCard}>
                  <div className={styles.studentCardHeader}>
                    <div className={styles.avatarLg}>{siswa.name.charAt(0)}</div>
                    <div>
                      <div className={styles.studentName}>{siswa.name}</div>
                      <div className={styles.studentKelas}>{siswa.kelas}</div>
                    </div>
                    <div className={styles.studentAvg}>
                      <div className={styles.studentAvgNum}>{avg}%</div>
                      <div className={styles.studentAvgLabel}>Rata-rata</div>
                    </div>
                  </div>
                  <div className={styles.studentMateriList}>
                    {hasilList.map(({ materi, hasil }) => (
                      <div key={materi.id} className={styles.studentMateriRow}>
                        <div className={styles.studentMateriName}>{materi.title}</div>
                        {hasil.done ? (
                          <div className={styles.studentMateriInfo}>
                            <span className={styles.scoreChip}>{hasil.score}/{hasil.total}</span>
                            <span className={styles.timeChip}>
                              <Clock size={11} /> {formatTime(hasil.timeTaken)}
                            </span>
                          </div>
                        ) : (
                          <span className={styles.belumChip}>
                            <XCircle size={12} /> Belum
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
