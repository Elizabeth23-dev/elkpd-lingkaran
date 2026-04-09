import { Link } from "react-router";
import { ArrowLeft, ArrowRight, PenLine } from "lucide-react";
import classnames from "classnames";
import { daftarMateri } from "~/data/materi";
import styles from "./navigasi-materi.module.css";

export interface NavigasiMateriProps {
  className?: string;
  topicId: string;
}

export function NavigasiMateri({ className, topicId }: NavigasiMateriProps) {
  const currentIdx = daftarMateri.findIndex((m) => m.id === topicId);
  const prev = currentIdx > 0 ? daftarMateri[currentIdx - 1] : null;
  const next = currentIdx < daftarMateri.length - 1 ? daftarMateri[currentIdx + 1] : null;

  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.navSection}>
          {prev ? (
            <Link to={`/materi/${prev.id}`} className={styles.navBtn}>
              <ArrowLeft size={18} />
              <div className={styles.navInfo}>
                <span className={styles.navHint}>Materi Sebelumnya</span>
                <span className={styles.navTitle}>{prev.title}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link to={`/latihan/${topicId}`} className={styles.latihanBtn}>
            <PenLine size={18} />
            <span>Kerjakan Latihan</span>
          </Link>

          {next ? (
            <Link to={`/materi/${next.id}`} className={styles.navBtn}>
              <div className={styles.navInfo} style={{ textAlign: "right" }}>
                <span className={styles.navHint}>Materi Selanjutnya</span>
                <span className={styles.navTitle}>{next.title}</span>
              </div>
              <ArrowRight size={18} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
