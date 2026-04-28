import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import classnames from "classnames";
import type { SoalItem } from "~/data/materi";
import styles from "./bagian-umpan-balik.module.css";

export interface BagianUmpanBalikProps {
  className?: string;
  soal: SoalItem;
  selectedAnswer: number | null;
  isVisible: boolean;
}

export function BagianUmpanBalik({ className, soal, selectedAnswer, isVisible }: BagianUmpanBalikProps) {
  if (!isVisible || selectedAnswer === null) return null;

  const isCorrect = selectedAnswer === soal.jawabanBenar;

  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.container}>
        <div className={classnames(styles.card, isCorrect ? styles.cardCorrect : styles.cardWrong)}>
          <div className={styles.resultRow}>
            {isCorrect ? (
              <CheckCircle2 size={24} className={styles.iconCorrect} />
            ) : (
              <XCircle size={24} className={styles.iconWrong} />
            )}
            <span className={classnames(styles.resultText, isCorrect ? styles.textCorrect : styles.textWrong)}>
              {isCorrect ? "Jawaban Benar! 🎉" : "Jawaban Kurang Tepat"}
            </span>
          </div>

          {!isCorrect && (
            <div className={styles.jawabanBenar}>
              <span className={styles.jawabanBenarLabel}>Jawaban yang benar:</span>
              <span className={styles.jawabanBenarValue}>
                {String.fromCharCode(65 + soal.jawabanBenar)}. {soal.pilihan[soal.jawabanBenar]}
              </span>
            </div>
          )}

          <div className={styles.penjelasan}>
            <div className={styles.penjelasanHeader}>
              <Lightbulb size={16} className={styles.penjelasanIcon} />
              <span>Penjelasan</span>
            </div>
            {soal.penjelasan.split('\n').map((line, i) => (
              <p key={i} className={styles.penjelasanText}>{line || '\u00a0'}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
