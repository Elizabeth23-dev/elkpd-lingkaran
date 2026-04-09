import { BookOpen, TrendingUp, RotateCcw, Star } from "lucide-react";
import { Link } from "react-router";
import classnames from "classnames";
import { soalPerTopik, daftarMateri } from "~/data/materi";
import type { HasilData } from "~/hooks/use-hasil";
import styles from "./saran-perbaikan.module.css";

export interface SaranPerbaikanProps {
  className?: string;
  hasil: HasilData;
}

export function SaranPerbaikan({ className, hasil }: SaranPerbaikanProps) {
  const soalList = soalPerTopik[hasil.topicId] ?? soalPerTopik['definisi-unsur'];
  const percentage = Math.round((hasil.score / hasil.total) * 100);

  const wrongSoal = soalList.filter((_, idx) => hasil.answers[idx] !== soalList[idx].jawabanBenar);
  const currentIdx = daftarMateri.findIndex((m) => m.id === hasil.topicId);
  const nextMateri = currentIdx < daftarMateri.length - 1 ? daftarMateri[currentIdx + 1] : null;

  const saran: string[] = [];
  if (percentage < 60) {
    saran.push("Pelajari kembali seluruh materi sebelum mencoba latihan lagi.");
    saran.push("Fokus pada konsep dasar dan rumus-rumus penting.");
    saran.push("Mintalah bantuan guru jika ada konsep yang sulit dipahami.");
  } else if (percentage < 80) {
    saran.push("Tinjau kembali soal-soal yang salah dan pelajari penjelasannya.");
    saran.push("Latihan lebih banyak soal untuk memperkuat pemahaman.");
    saran.push("Perhatikan pola kesalahan untuk mengetahui kelemahan konsep.");
  } else {
    saran.push("Pertahankan prestasi yang sudah baik ini!");
    saran.push("Coba kerjakan soal-soal dengan tingkat kesulitan lebih tinggi.");
    saran.push("Lanjutkan ke materi berikutnya untuk memperluas pengetahuan.");
  }

  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.container}>
        <h2 className={styles.title}>Saran Perbaikan</h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <TrendingUp size={18} className={styles.cardIcon} />
              <span>Analisis Hasil</span>
            </div>
            <ul className={styles.saranList}>
              {saran.map((s, i) => (
                <li key={i} className={styles.saranItem}>
                  <Star size={14} className={styles.saranIcon} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {wrongSoal.length > 0 && (
            <div className={styles.card}>
              <div className={styles.cardTitle}>
                <BookOpen size={18} className={styles.cardIconRed} />
                <span>Topik yang Perlu Diulang</span>
              </div>
              <div className={styles.wrongList}>
                {wrongSoal.slice(0, 3).map((soal, i) => (
                  <div key={i} className={styles.wrongItem}>
                    <span className={styles.wrongNum}>{i + 1}</span>
                    <p className={styles.wrongText}>{soal.pertanyaan}</p>
                  </div>
                ))}
                {wrongSoal.length > 3 && (
                  <p className={styles.moreWrong}>+{wrongSoal.length - 3} soal lainnya</p>
                )}
              </div>
            </div>
          )}
        </div>

        {nextMateri && percentage >= 60 && (
          <div className={styles.nextCard}>
            <div className={styles.nextInfo}>
              <div className={styles.nextBadge}>Materi Selanjutnya</div>
              <h3 className={styles.nextTitle}>{nextMateri.title}</h3>
              <p className={styles.nextDesc}>{nextMateri.description.substring(0, 100)}...</p>
            </div>
            <Link to={`/materi/${nextMateri.id}`} className={styles.nextBtn}>
              Pelajari Sekarang
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
