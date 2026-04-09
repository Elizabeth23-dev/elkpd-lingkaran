import { Link } from "react-router";
import { RotateCcw, BookOpen, Home, ArrowRight } from "lucide-react";
import classnames from "classnames";
import styles from "./navigasi-hasil.module.css";

export interface NavigasiHasilProps {
  className?: string;
  topicId: string;
}

export function NavigasiHasil({ className, topicId }: NavigasiHasilProps) {
  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.btnGroup}>
          <Link to="/" className={styles.btnSecondary}>
            <Home size={18} />
            <span>Beranda</span>
          </Link>

          <Link to={`/materi/${topicId}`} className={styles.btnSecondary}>
            <BookOpen size={18} />
            <span>Kembali ke Materi</span>
          </Link>

          <Link to={`/latihan/${topicId}`} className={styles.btnPrimary}>
            <RotateCcw size={18} />
            <span>Coba Lagi</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
