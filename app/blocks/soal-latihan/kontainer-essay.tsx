import { useRef, useCallback, useState } from "react";
import classnames from "classnames";
import { Upload, ImageIcon, CheckCircle2, Lightbulb, Loader2 } from "lucide-react";
import type { SoalItem } from "~/data/materi";
import { compressImageFile } from "~/data/image-compress";
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
  const [isProcessing, setIsProcessing] = useState(false);
  const kesulitan = kesulitanConfig[soal.kesulitan];

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;
      setIsProcessing(true);
      try {
        // Kompres dulu sebelum simpan ke state — foto kamera HP biasanya
        // 4–12 MB; setelah resize ke 1600px JPEG 0.82 turun jadi ratusan KB.
        // Membuat upload ke ImgBB jauh lebih cepat di koneksi mobile.
        const base64 = await compressImageFile(file);
        onImageUpload(base64);
      } finally {
        setIsProcessing(false);
      }
    },
    [onImageUpload]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) void handleFile(file);
    },
    [handleFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) void handleFile(file);
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
            {soal.pertanyaan.split('\n').map((line, i) => (
              <p key={i} className={styles.pertanyaan}>{line || '\u00a0'}</p>
            ))}
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
                className={classnames(
                  styles.dropzone,
                  (isSubmitted || isProcessing) && styles.dropzoneDisabled
                )}
                onClick={() => !isSubmitted && !isProcessing && fileInputRef.current?.click()}
                onDrop={!isSubmitted && !isProcessing ? handleDrop : undefined}
                onDragOver={!isSubmitted && !isProcessing ? handleDragOver : undefined}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={32} className={styles.uploadIconSpin} />
                    <p className={styles.dropzoneText}>Mengompres gambar…</p>
                    <p className={styles.dropzoneHint}>Mohon tunggu sebentar</p>
                  </>
                ) : (
                  <>
                    <Upload size={32} className={styles.uploadIcon} />
                    <p className={styles.dropzoneText}>Klik atau seret foto jawaban ke sini</p>
                    <p className={styles.dropzoneHint}>Format: JPG, PNG (maks. 10 MB)</p>
                  </>
                )}
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
              {soal.penjelasan.split('\n').map((line, i) => (
                <p key={i} className={styles.kunciText}>{line || '\u00a0'}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
