import { useRef, useCallback } from "react";
import classnames from "classnames";
import { Upload, ImageIcon, CheckCircle2, Lightbulb } from "lucide-react";
import type { SoalItem } from "~/data/materi";
import styles from "./kontainer-essay.module.css";

export interface KontainerEssayProps {
  className?: string;
  soal: SoalItem;
  soalNumber: number;
  uploadedImage: string | null;
  onImageUpload: (base64: string) => void;
  isSubmitted: boolean;
}

const kesulitanConfig = {
  mudah: { label: "Mudah", color: "success" },
  sedang: { label: "Sedang", color: "accent" },
  sulit: { label: "Sulit", color: "danger" },
} as const;

export function KontainerEssay({
  className,
  soal,
  soalNumber,
  uploadedImage,
  onImageUpload,
  isSubmitted,
}: KontainerEssayProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const kesulitan = kesulitanConfig[soal.kesulitan];

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        if (base64) onImageUpload(base64);
      };
      reader.readAsDataURL(file);
    },
    [onImageUpload]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.soalNum}>Soal {soalNumber}</div>
            <div className={styles.badges}>
              <span className={styles.essayBadge}>
                <Lightbulb size={12} />
                Berpikir Kritis
              </span>
              <span className={classnames(styles.kesulitan, styles[`kesulitan_${kesulitan.color}`])}>
                {kesulitan.label}
              </span>
              <span className={styles.skor}>+{soal.skor} poin</span>
            </div>
          </div>

          <div className={styles.soalInstruksi}>
            <p className={styles.pertanyaan}>{soal.pertanyaan}</p>
          </div>

          <div className={styles.uploadSection}>
            <div className={styles.uploadLabel}>
              <ImageIcon size={16} />
              <span>Upload Foto Jawaban Tulisan Tangan</span>
            </div>

            {uploadedImage ? (
              <div className={styles.previewWrap}>
                <img src={uploadedImage} alt="Jawaban" className={styles.preview} />
                {!isSubmitted && (
                  <button
                    className={styles.changeBtn}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Ganti Foto
                  </button>
                )}
                {isSubmitted && (
                  <div className={styles.submittedBadge}>
                    <CheckCircle2 size={14} />
                    <span>Jawaban Terkirim</span>
                  </div>
                )}
              </div>
            ) : (
              <div
                className={classnames(styles.dropzone, isSubmitted && styles.dropzoneDisabled)}
                onClick={() => !isSubmitted && fileInputRef.current?.click()}
                onDrop={!isSubmitted ? handleDrop : undefined}
                onDragOver={!isSubmitted ? handleDragOver : undefined}
              >
                <Upload size={32} className={styles.uploadIcon} />
                <p className={styles.dropzoneText}>Klik atau seret foto jawaban ke sini</p>
                <p className={styles.dropzoneHint}>Format: JPG, PNG, HEIC (maks. 10 MB)</p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              className={styles.fileInput}
              disabled={isSubmitted}
            />
          </div>

          {isSubmitted && (
            <div className={styles.kunciJawaban}>
              <div className={styles.kunciHeader}>
                <Lightbulb size={16} className={styles.kunciIcon} />
                <span>Kunci Jawaban &amp; Rubrik</span>
              </div>
              <p className={styles.kunciText}>{soal.penjelasan}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
