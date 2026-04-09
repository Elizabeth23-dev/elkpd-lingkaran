import { useState } from "react";
import { CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import classnames from "classnames";
import { soalPerTopik } from "~/data/materi";
import type { HasilData } from "~/hooks/use-hasil";
import styles from "./tinjauan-jawaban.module.css";

export interface TinjauanJawabanProps {
  className?: string;
  hasil: HasilData;
}

export function TinjauanJawaban({ className, hasil }: TinjauanJawabanProps) {
  const soalList = soalPerTopik[hasil.topicId] ?? soalPerTopik['definisi-unsur'];
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpanded((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.container}>
        <h2 className={styles.title}>Tinjauan Jawaban</h2>
        <p className={styles.subtitle}>Klik setiap soal untuk melihat penjelasan detail</p>

        <div className={styles.list}>
          {soalList.map((soal, idx) => {
            const userAnswer = hasil.answers[idx];
            const isCorrect = userAnswer === soal.jawabanBenar;
            const isOpen = expanded === idx;

            return (
              <div
                key={idx}
                className={classnames(styles.item, isCorrect ? styles.itemCorrect : styles.itemWrong)}
              >
                <button className={styles.itemHeader} onClick={() => toggleExpand(idx)}>
                  <div className={styles.itemLeft}>
                    {isCorrect ? (
                      <CheckCircle2 size={20} className={styles.iconCorrect} />
                    ) : (
                      <XCircle size={20} className={styles.iconWrong} />
                    )}
                    <span className={styles.itemNum}>Soal {idx + 1}</span>
                    <span className={styles.itemQuestion}>{soal.pertanyaan}</span>
                  </div>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isOpen && (
                  <div className={styles.itemDetail}>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Jawaban Kamu:</span>
                      <span className={classnames(styles.detailAnswer, isCorrect ? styles.answerCorrect : styles.answerWrong)}>
                        {userAnswer !== undefined
                          ? `${String.fromCharCode(65 + userAnswer)}. ${soal.pilihan[userAnswer]}`
                          : 'Tidak dijawab'}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Jawaban Benar:</span>
                        <span className={classnames(styles.detailAnswer, styles.answerCorrect)}>
                          {String.fromCharCode(65 + soal.jawabanBenar)}. {soal.pilihan[soal.jawabanBenar]}
                        </span>
                      </div>
                    )}
                    <div className={styles.penjelasan}>
                      <span className={styles.penjelasanLabel}>💡 Penjelasan:</span>
                      <p className={styles.penjelasanText}>{soal.penjelasan}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
