import { Link } from "react-router";
import { ChevronLeft, ChevronRight, Flag, BookOpen, Loader2 } from "lucide-react";
import classnames from "classnames";
import styles from "./navigasi-latihan.module.css";

export interface NavigasiLatihanProps {
  className?: string;
  topicId: string;
  currentIndex: number;
  totalSoal: number;
  selectedAnswer: number | null;
  isSubmitted: boolean;
  isEssay?: boolean;
  essayImageUploaded?: boolean;
  isSubmittingFinal?: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onSelesai: () => void;
}

export function NavigasiLatihan({
  className,
  topicId,
  currentIndex,
  totalSoal,
  selectedAnswer,
  isSubmitted,
  isEssay = false,
  essayImageUploaded = false,
  isSubmittingFinal = false,
  onPrev,
  onNext,
  onSubmit,
  onSelesai,
}: NavigasiLatihanProps) {
  const isLast = currentIndex === totalSoal - 1;
  const canSubmit = isEssay ? essayImageUploaded : selectedAnswer !== null;

  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.navRow}>
          <button onClick={onPrev} disabled={currentIndex === 0} className={styles.navBtn}>
            <ChevronLeft size={18} />
            <span>Sebelumnya</span>
          </button>

          <div className={styles.centerActions}>
            <Link to={`/materi/${topicId}`} className={styles.backToMateri}>
              <BookOpen size={16} />
              <span>Kembali ke Materi</span>
            </Link>

            {!isSubmitted ? (
              <button
                onClick={onSubmit}
                disabled={!canSubmit}
                className={styles.submitBtn}
              >
                {isEssay ? 'Kumpulkan Jawaban' : 'Cek Jawaban'}
              </button>
            ) : isLast ? (
              <button
                onClick={onSelesai}
                className={styles.selesaiBtn}
                disabled={isSubmittingFinal}
              >
                {isSubmittingFinal ? (
                  <>
                    <Loader2 size={16} className={styles.spin} />
                    <span>Menyimpan ke server…</span>
                  </>
                ) : (
                  <>
                    <Flag size={16} />
                    <span>Selesai & Lihat Hasil</span>
                  </>
                )}
              </button>
            ) : (
              <button onClick={onNext} className={styles.nextBtn}>
                <span>Soal Berikutnya</span>
                <ChevronRight size={18} />
              </button>
            )}
          </div>

          <button onClick={onNext} disabled={!isSubmitted || isLast} className={styles.navBtn}>
            <span>Berikutnya</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
