import { Award, Clock, CheckCircle2, XCircle } from "lucide-react";
import classnames from "classnames";
import type { HasilData } from "~/hooks/use-hasil";
import { daftarMateri } from "~/data/materi";
import styles from "./ringkasan-skor.module.css";

export interface RingkasanSkorProps {
  className?: string;
  hasil: HasilData;
}

export function RingkasanSkor({ className, hasil }: RingkasanSkorProps) {
  const { score, total, timeTaken } = hasil;
  const percentage = Math.round((score / total) * 100);
  const materi = daftarMateri.find((m) => m.id === hasil.topicId) ?? daftarMateri[0];

  const getLevelInfo = () => {
    if (percentage >= 90) return { label: "Sangat Baik", color: "success", emoji: "🏆" };
    if (percentage >= 75) return { label: "Baik", color: "primary", emoji: "👍" };
    if (percentage >= 60) return { label: "Cukup", color: "accent", emoji: "💪" };
    return { label: "Perlu Ditingkatkan", color: "danger", emoji: "📚" };
  };

  const level = getLevelInfo();
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  const salah = total - score;
  const kkm = 75;

  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={classnames(styles.scoreCircle, styles[`scoreCircle_${level.color}`])}>
            <span className={styles.scoreEmoji}>{level.emoji}</span>
            <span className={styles.scoreNum}>{percentage}%</span>
            <span className={styles.scoreLabel}>Skor Anda</span>
          </div>
          <div className={styles.heroInfo}>
            <h1 className={styles.title}>Hasil Latihan</h1>
            <p className={styles.materiTitle}>{materi.title}</p>
            <div className={classnames(styles.levelBadge, styles[`level_${level.color}`])}>
              {level.label}
            </div>
            <p className={styles.kkmInfo}>
              {percentage >= kkm
                ? `🎉 Selamat! Kamu mencapai nilai KKM (${kkm})`
                : `Nilai KKM adalah ${kkm}. Tetap semangat!`}
            </p>
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statBox}>
            <CheckCircle2 size={24} className={styles.statIconGreen} />
            <div className={styles.statNum}>{score}</div>
            <div className={styles.statLabel}>Jawaban Benar</div>
          </div>
          <div className={styles.statBox}>
            <XCircle size={24} className={styles.statIconRed} />
            <div className={styles.statNum}>{salah}</div>
            <div className={styles.statLabel}>Jawaban Salah</div>
          </div>
          <div className={styles.statBox}>
            <Award size={24} className={styles.statIconBlue} />
            <div className={styles.statNum}>{score * 20}</div>
            <div className={styles.statLabel}>Poin Diperoleh</div>
          </div>
          <div className={styles.statBox}>
            <Clock size={24} className={styles.statIconGray} />
            <div className={styles.statNum}>{minutes}:{String(seconds).padStart(2, "0")}</div>
            <div className={styles.statLabel}>Waktu Pengerjaan</div>
          </div>
        </div>
      </div>
    </div>
  );
}
