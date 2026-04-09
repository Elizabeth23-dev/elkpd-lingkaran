import { Award, BookOpen, CheckCircle2, TrendingUp } from "lucide-react";
import classnames from "classnames";
import styles from "./bagian-progress.module.css";

export interface BagianProgressProps {
  className?: string;
}

const stats = [
  { icon: BookOpen, label: "Materi Dipelajari", value: "1", total: "4", color: "primary" },
  { icon: CheckCircle2, label: "Soal Dikerjakan", value: "5", total: "20", color: "success" },
  { icon: Award, label: "Skor Rata-rata", value: "80", total: "100", color: "accent" },
  { icon: TrendingUp, label: "Progress Keseluruhan", value: "25", total: "100", color: "secondary" },
];

export function BagianProgress({ className }: BagianProgressProps) {
  const overallProgress = 25;

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
            <span className={styles.progressBarValue}>{overallProgress}%</span>
          </div>
          <div className={styles.bar}>
            <div className={styles.barFill} style={{ width: `${overallProgress}%` }} />
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
