import { Award, BookOpen, CheckCircle2, TrendingUp, RotateCcw } from "lucide-react";
import classnames from "classnames";
import { useProgress } from "~/hooks/use-progress";
import styles from "./bagian-progress.module.css";

export interface BagianProgressProps {
  className?: string;
}

export function BagianProgress({ className }: BagianProgressProps) {
  const {
    materiDipelajari,
    totalMateri,
    soalDikerjakan,
    totalSoal,
    skorRataRata,
    progressKeseluruhan,
    reset,
  } = useProgress();

  const stats = [
    { icon: BookOpen, label: 'Materi Dipelajari', value: String(materiDipelajari), total: String(totalMateri), color: 'primary' },
    { icon: CheckCircle2, label: 'Soal Dikerjakan', value: String(soalDikerjakan), total: String(totalSoal), color: 'success' },
    { icon: Award, label: 'Skor Rata-rata', value: String(skorRataRata), total: '100', color: 'accent' },
    { icon: TrendingUp, label: 'Progress Keseluruhan', value: String(progressKeseluruhan), total: '100', color: 'secondary' },
  ];

  return (
    <section className={classnames(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Progress Pembelajaran Kamu</h2>
          <p className={styles.subtitle}>Pantau perkembangan belajarmu dan terus tingkatkan!</p>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressBarLabel}>
            <span className={styles.progressBarTitle}>Penyelesaian Keseluruhan</span>
            <div className={styles.progressBarRight}>
              <span className={styles.progressBarValue}>{progressKeseluruhan}%</span>
              <button
                className={styles.resetButton}
                onClick={reset}
                title="Reset progress"
                type="button"
              >
                <RotateCcw size={15} />
                Reset
              </button>
            </div>
          </div>
          <div className={styles.bar}>
            <div className={styles.barFill} style={{ width: `${progressKeseluruhan}%` }} />
          </div>
        </div>

        <div className={styles.statsGrid}>
          {stats.map(({ icon: Icon, label, value, total, color }) => (
            <div key={label} className={classnames(styles.statCard, styles[`color_${color}`])}>
              <div className={styles.statIcon}>
                <Icon size={22} />
              </div>
              <div className={styles.statBody}>
                <div className={styles.statValue}>
                  <span className={styles.statNum}>{value}</span>
                  <span className={styles.statTotal}>/ {total}</span>
                </div>
                <div className={styles.statLabel}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
