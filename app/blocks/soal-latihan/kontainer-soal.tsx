import classnames from "classnames";
import type { SoalItem } from "~/data/materi";
import styles from "./kontainer-soal.module.css";

export interface KontainerSoalProps {
  className?: string;
  soal: SoalItem;
  soalNumber: number;
  selectedAnswer: number | null;
  onSelectAnswer: (idx: number) => void;
  isSubmitted: boolean;
}

const kesulitanConfig = {
  mudah: { label: "Mudah", color: "success" },
  sedang: { label: "Sedang", color: "accent" },
  sulit: { label: "Sulit", color: "danger" },
} as const;

export function KontainerSoal({
  className,
  soal,
  soalNumber,
  selectedAnswer,
  onSelectAnswer,
  isSubmitted,
}: KontainerSoalProps) {
  const kesulitan = kesulitanConfig[soal.kesulitan];

  const getOptionClass = (idx: number) => {
    if (!isSubmitted) {
      return classnames(styles.option, { [styles.optionSelected]: selectedAnswer === idx });
    }
    if (idx === soal.jawabanBenar) return classnames(styles.option, styles.optionCorrect);
    if (idx === selectedAnswer && selectedAnswer !== soal.jawabanBenar)
      return classnames(styles.option, styles.optionWrong);
    return styles.option;
  };

  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.soalNum}>Soal {soalNumber}</div>
            <span className={classnames(styles.kesulitan, styles[`kesulitan_${kesulitan.color}`])}>
              {kesulitan.label}
            </span>
          </div>

          <p className={styles.pertanyaan}>{soal.pertanyaan}</p>

          <div className={styles.options}>
            {soal.pilihan.map((pilihan, idx) => (
              <button
                key={idx}
                className={getOptionClass(idx)}
                onClick={() => !isSubmitted && onSelectAnswer(idx)}
                disabled={isSubmitted}
              >
                <span className={styles.optionLetter}>{String.fromCharCode(65 + idx)}</span>
                <span className={styles.optionText}>{pilihan}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
