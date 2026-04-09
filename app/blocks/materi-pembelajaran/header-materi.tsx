import { Link } from "react-router";
import { ChevronRight, Clock, Home } from "lucide-react";
import classnames from "classnames";
import { daftarMateri } from "~/data/materi";
import styles from "./header-materi.module.css";

export interface HeaderMateriProps {
  className?: string;
  topicId: string;
}

export function HeaderMateri({ className, topicId }: HeaderMateriProps) {
  const materi = daftarMateri.find((m) => m.id === topicId) ?? daftarMateri[0];

  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link to="/" className={styles.breadcrumbLink}>
            <Home size={14} />
            <span>Beranda</span>
          </Link>
          <ChevronRight size={14} className={styles.breadcrumbSep} />
          <span className={styles.breadcrumbCurrent}>Materi</span>
          <ChevronRight size={14} className={styles.breadcrumbSep} />
          <span className={styles.breadcrumbCurrent}>{materi.title}</span>
        </nav>

        <div className={styles.meta}>
          <span className={styles.topicBadge}>{materi.subtitle}</span>
          <div className={styles.timeInfo}>
            <Clock size={14} />
            <span>Estimasi: {materi.estimasiWaktu}</span>
          </div>
        </div>

        <h1 className={styles.title}>{materi.title}</h1>
        <p className={styles.description}>{materi.description}</p>

        <div className={styles.topics}>
          {materi.topik.map((t, i) => (
            <span key={i} className={styles.topicTag}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
