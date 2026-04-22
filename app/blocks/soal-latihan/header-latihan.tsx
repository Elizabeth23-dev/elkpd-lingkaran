import { Clock, FileQuestion, ChevronRight, Home } from "lucide-react";
import { Link } from "react-router";
import classnames from "classnames";
import { daftarMateri, soalPerTopik } from "~/data/materi";
import styles from "./header-latihan.module.css";

export interface HeaderLatihanProps {
  className?: string;
  topicId: string;
  timeLeft: number;
  totalSoal: number;
  currentSoal: number;
}

export function HeaderLatihan({ className, topicId, timeLeft, totalSoal, currentSoal }: HeaderLatihanProps) {
  const materi = daftarMateri.find((m) => m.id === topicId) ?? daftarMateri[0];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((currentSoal) / totalSoal) * 100;

  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <nav className={styles.breadcrumb}>
            <Link to="/" className={styles.breadcrumbLink}><Home size={13} /></Link>
            <ChevronRight size={13} className={styles.sep} />
            <Link to={`/materi/${topicId}`} className={styles.breadcrumbLink}>Materi</Link>
            <ChevronRight size={13} className={styles.sep} />
            <span className={styles.breadcrumbCurrent}>Latihan</span>
          </nav>

          <div className={classnames(styles.timer, timeLeft < 300 && styles.timerWarning)}>
            <Clock size={16} />
            <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
          </div>
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>Latihan: {materi.title}</h1>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <FileQuestion size={15} />
              <span>Soal {currentSoal} dari {totalSoal}</span>
            </div>
          </div>
        </div>

        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressLabel}>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
