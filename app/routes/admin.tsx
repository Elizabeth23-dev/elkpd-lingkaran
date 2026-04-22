import { useEffect, useCallback, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import {
  Users, BookOpen, BarChart2, Award, Clock, CheckCircle,
  XCircle, LogOut, ChevronRight, Layers, RotateCcw, FileText,
  ChevronDown, ChevronUp, Image
} from 'lucide-react';
import { useAuth } from '~/hooks/use-auth';
import { getDaftarAkunAsync } from '~/data/auth';
import { invalidateCloudCache } from '~/data/cloud-storage';
import type { User } from '~/data/auth';
import { daftarMateri, soalPerTopik } from '~/data/materi';
import { hasilKey } from '~/hooks/use-latihan';
import styles from './admin.module.css';

export function meta() {
  return [{ title: 'Admin Guru — E-LKPD Lingkaran Kelas 11 SMA' }];
}

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

interface HasilSiswa {
  score: number;
  total: number;
  totalSkor: number;
  skorDiperoleh: number;
  timeTaken: number;
  done: boolean;
  answers?: Record<number, number>;
  essayImages?: Record<number, string>;
  submitted?: Record<number, boolean>;
}

export default function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [siswaList, setSiswaList] = useState<User[]>([]);
  const [loadingSiswa, setLoadingSiswa] = useState(false);
  const [expandedSiswa, setExpandedSiswa] = useState<string | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const refreshSiswaList = useCallback(async (bypass = false) => {
    setLoadingSiswa(true);
    try {
      const all = await getDaftarAkunAsync(bypass);
      setSiswaList(all.filter((u) => u.role === 'siswa'));
    } catch {
      // fallback sudah ditangani di getDaftarAkunAsync
    } finally {
      setLoadingSiswa(false);
    }
  }, []);

  useEffect(() => {
    invalidateCloudCache();
    void refreshSiswaList(true);

    const interval = setInterval(() => {
      invalidateCloudCache();
      void refreshSiswaList(true);
    }, 15_000);

    const onStorage = () => {
      invalidateCloudCache();
      void refreshSiswaList(true);
    };
    window.addEventListener('storage', onStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', onStorage);
    };
  }, [refreshSiswaList]);

  const handleResetNilai = useCallback((siswaId: string) => {
    daftarMateri.forEach((m) => sessionStorage.removeItem(hasilKey(siswaId, m.id)));
  }, []);

  const getHasil = useCallback((siswaId: string, topicId: string): HasilSiswa => {
    try {
      const raw = sessionStorage.getItem(hasilKey(siswaId, topicId));
      if (raw) {
        const data = JSON.parse(raw) as HasilSiswa & { score: number; total: number; timeTaken: number };
        return {
          score: data.score,
          total: data.total,
          totalSkor: data.totalSkor ?? data.total * 10,
          skorDiperoleh: data.skorDiperoleh ?? data.score * 10,
          timeTaken: data.timeTaken,
          answers: data.answers,
          essayImages: data.essayImages,
          submitted: data.submitted,
          done: true,
        };
      }
    } catch { /* ignore */ }
    return { score: 0, total: 15, totalSkor: 0, skorDiperoleh: 0, timeTaken: 0, done: false };
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

  const toggleSiswa = (id: string) => {
    setExpandedSiswa((prev) => (prev === id ? null : id));
    setExpandedTopic(null);
  };

  const toggleTopic = (key: string) => {
    setExpandedTopic((prev) => (prev === key ? null : key));
  };

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
          <div className={styles.topBarActions}>
            <Link to="/debug-cloud" className={styles.setupCloudBtn}>
              ☁️ Setup Cloud
            </Link>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <LogOut size={16} />
              Keluar
            </button>
          </div>
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
            <button className={styles.refreshBtn} onClick={() => void refreshSiswaList(true)} title="Muat ulang daftar siswa" disabled={loadingSiswa}>
              <RotateCcw size={14} className={loadingSiswa ? styles.spinning : undefined} />
              {loadingSiswa ? 'Memuat...' : 'Refresh'}
            </button>
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

        {/* Jawaban per kelompok */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <FileText size={20} /> Jawaban Per Kelompok
          </h2>
          <div className={styles.jawabanList}>
            {siswaList.map((siswa) => {
              const isOpen = expandedSiswa === siswa.id;
              return (
                <div key={siswa.id} className={styles.jawabanCard}>
                  <button
                    className={styles.jawabanCardHeader}
                    onClick={() => toggleSiswa(siswa.id)}
                  >
                    <div className={styles.jawabanAvatarRow}>
                      <div className={styles.avatarLg}>{siswa.name.charAt(0)}</div>
                      <div>
                        <div className={styles.studentName}>{siswa.name}</div>
                        <div className={styles.studentKelas}>{siswa.kelas}</div>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {isOpen && (
                    <div className={styles.jawabanTopicList}>
                      {daftarMateri.map((materi) => {
                        const hasil = getHasil(siswa.id, materi.id);
                        const topicKey = `${siswa.id}-${materi.id}`;
                        const isTopicOpen = expandedTopic === topicKey;
                        const soalList = soalPerTopik[materi.id]?.slice(0, 15) ?? [];

                        return (
                          <div key={materi.id} className={styles.jawabanTopic}>
                            <button
                              className={styles.jawabanTopicHeader}
                              onClick={() => toggleTopic(topicKey)}
                            >
                              <div className={styles.jawabanTopicTitle}>
                                <div className={styles.materiDot} />
                                {materi.title}
                              </div>
                              <div className={styles.jawabanTopicMeta}>
                                {hasil.done ? (
                                  <span className={styles.scoreChip}>
                                    {hasil.skorDiperoleh}/{hasil.totalSkor} poin · {formatTime(hasil.timeTaken)}
                                  </span>
                                ) : (
                                  <span className={styles.belumChip}><XCircle size={12} /> Belum dikerjakan</span>
                                )}
                                {isTopicOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              </div>
                            </button>

                            {isTopicOpen && hasil.done && (
                              <div className={styles.soalJawabanList}>
                                {soalList.map((soal, idx) => {
                                  const jawaban = hasil.answers?.[idx];
                                  const isKritis = soal.tipe === 'berpikir-kritis';
                                  const gambar = hasil.essayImages?.[idx];
                                  const isBenar = !isKritis && jawaban === soal.jawabanBenar;

                                  return (
                                    <div key={soal.id} className={styles.soalJawabanItem}>
                                      <div className={styles.soalJawabanHeader}>
                                        <span className={styles.soalNum}>Soal {idx + 1}</span>
                                        <span className={`${styles.tipeBadge} ${isKritis ? styles.tipeBerpikir : styles.tipePG}`}>
                                          {isKritis ? '🧠 Berpikir Kritis' : 'PG'}
                                        </span>
                                        {!isKritis && (
                                          <span className={isBenar ? styles.benarChip : styles.salahChip}>
                                            {isBenar ? '✓ Benar' : jawaban === undefined ? '— Tidak dijawab' : '✗ Salah'}
                                          </span>
                                        )}
                                        {isKritis && gambar && (
                                          <span className={styles.benarChip}>📸 Jawaban diunggah</span>
                                        )}
                                      </div>

                                      <p className={styles.soalPertanyaan}>{soal.pertanyaan}</p>

                                      {!isKritis && (
                                        <div className={styles.pilihanGrid}>
                                          {soal.pilihan.map((p, pi) => (
                                            <div
                                              key={pi}
                                              className={`${styles.pilihanItem}
                                                ${pi === soal.jawabanBenar ? styles.pilihanBenar : ''}
                                                ${pi === jawaban && pi !== soal.jawabanBenar ? styles.pilihanSalah : ''}
                                              `}
                                            >
                                              <span className={styles.pilihanLetter}>{String.fromCharCode(65 + pi)}</span>
                                              <span>{p}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}

                                      {isKritis && gambar && (
                                        <div className={styles.gambarWrap}>
                                          <div className={styles.gambarLabel}>
                                            <Image size={14} /> Jawaban Tulisan Tangan
                                          </div>
                                          <img
                                            src={gambar}
                                            alt={`Jawaban soal ${idx + 1}`}
                                            className={styles.gambarJawaban}
                                          />
                                        </div>
                                      )}

                                      {isKritis && !gambar && (
                                        <p className={styles.tidakAdaGambar}>Tidak ada gambar yang diunggah</p>
                                      )}

                                      <div className={styles.pembahasanWrap}>
                                        <span className={styles.pembahasanLabel}>Pembahasan:</span>
                                        <span className={styles.pembahasanText}>{soal.penjelasan}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {isTopicOpen && !hasil.done && (
                              <div className={styles.belumInfo}>
                                Siswa belum mengerjakan latihan pada materi ini.
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
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
