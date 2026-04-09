import { Link } from "react-router";
import { ArrowRight, Circle, Target, BookOpen } from "lucide-react";
import classnames from "classnames";
import styles from "./hero-section.module.css";

export interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={classnames(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <BookOpen size={14} />
            <span>E-LKPD Matematika Kelas 11 SMA</span>
          </div>
          <h1 className={styles.title}>
            Belajar <span className={styles.titleHighlight}>Lingkaran</span>{" "}
            dengan Cara Menyenangkan
          </h1>
          <p className={styles.description}>
            Platform e-LKPD interaktif untuk memahami konsep lingkaran, persamaan lingkaran,
            garis singgung, dan hubungan antar lingkaran secara mendalam dan menyenangkan.
          </p>
          <div className={styles.goals}>
            <div className={styles.goalItem}>
              <Target size={16} className={styles.goalIcon} />
              <span>Memahami konsep dan unsur lingkaran</span>
            </div>
            <div className={styles.goalItem}>
              <Target size={16} className={styles.goalIcon} />
              <span>Menguasai persamaan lingkaran dan garis singgung</span>
            </div>
            <div className={styles.goalItem}>
              <Target size={16} className={styles.goalIcon} />
              <span>Mengerjakan soal-soal latihan interaktif</span>
            </div>
          </div>
          <div className={styles.ctas}>
            <Link to="/materi/definisi-unsur" className={styles.ctaPrimary}>
              Mulai Belajar
              <ArrowRight size={18} />
            </Link>
            <Link to="/latihan/definisi-unsur" className={styles.ctaSecondary}>
              Coba Latihan
            </Link>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.circleOuter}>
            <div className={styles.circleMiddle}>
              <div className={styles.circleInner}>
                <Circle size={48} className={styles.circleIcon} />
              </div>
            </div>
          </div>
          <div className={styles.floatCard} style={{ top: "10%", right: "0" }}>
            <span className={styles.floatCardEmoji}>📐</span>
            <span className={styles.floatCardText}>Geometri Analitik</span>
          </div>
          <div className={styles.floatCard} style={{ bottom: "15%", left: "0" }}>
            <span className={styles.floatCardEmoji}>✏️</span>
            <span className={styles.floatCardText}>Soal Interaktif</span>
          </div>
          <div className={styles.formulaTag} style={{ top: "55%", right: "-10px" }}>
            x² + y² = r²
          </div>
          <div className={styles.formulaTag} style={{ top: "25%", left: "-15px" }}>
            K = 2πr
          </div>
        </div>
      </div>
    </section>
  );
}
