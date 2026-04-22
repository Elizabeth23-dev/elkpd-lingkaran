import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import { soalPerTopik } from "~/data/materi";
import { useAuth } from "~/hooks/use-auth";

/** Batas jumlah soal per sesi latihan */
const MAX_SOAL = 15;

export function hasilKey(siswaId: string, topicId: string) {
  return `hasil-${siswaId}-${topicId}`;
}

/** Cek apakah siswa sudah menyelesaikan latihan untuk topik ini */
export function sudahSelesai(siswaId: string, topicId: string): boolean {
  try {
    const raw = sessionStorage.getItem(hasilKey(siswaId, topicId));
    return raw !== null;
  } catch {
    return false;
  }
}

export function useLatihan(topicId: string) {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Ambil soal dan batasi ke 15 soal
  const allSoal = soalPerTopik[topicId] ?? soalPerTopik['definisi-unsur'];
  const soalList = allSoal.slice(0, MAX_SOAL);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  /** Base64 gambar untuk soal berpikir-kritis, keyed by soal index */
  const [essayImages, setEssayImages] = useState<Record<number, string>>({});
  /** Timer per soal — diinisialisasi dari waktu soal saat ini */
  const [soalTimeLeft, setSoalTimeLeft] = useState(soalList[0]?.waktu ?? 90);
  const [isFinished, setIsFinished] = useState(false);
  const startTimeRef = useRef(Date.now());
  /** Ref untuk menyimpan soalList agar dapat diakses di closure timer */
  const soalListRef = useRef(soalList);
  soalListRef.current = soalList;

  // Jika siswa sudah mengerjakan latihan ini, redirect ke halaman hasil
  useEffect(() => {
    if (user && user.role === 'siswa' && sudahSelesai(user.id, topicId)) {
      navigate(`/hasil/${topicId}`, { replace: true });
      return;
    }
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted({});
    setEssayImages({});
    setSoalTimeLeft(soalList[0]?.waktu ?? 90);
    setIsFinished(false);
    startTimeRef.current = Date.now();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId, user, navigate]);

  // Reset timer setiap ganti soal
  useEffect(() => {
    const waktuSoal = soalList[currentIndex]?.waktu ?? 90;
    setSoalTimeLeft(waktuSoal);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // Countdown per soal — ketika habis, otomatis pindah ke soal berikutnya atau selesai
  useEffect(() => {
    if (isFinished) return;
    // Jika soal sudah di-submit, timer berhenti (siswa bisa baca feedback)
    if (submitted[currentIndex]) return;

    if (soalTimeLeft <= 0) {
      // Waktu habis: paksa pindah ke soal berikutnya atau selesai
      const list = soalListRef.current;
      if (currentIndex < list.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        // Soal terakhir, auto-selesai
        handleSelesaiRef.current();
      }
      return;
    }

    const timer = setInterval(() => setSoalTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soalTimeLeft, isFinished, currentIndex, submitted]);

  const currentSoal = soalList[currentIndex];
  const selectedAnswer = answers[currentIndex] ?? null;
  const isSubmitted = submitted[currentIndex] ?? false;
  const currentEssayImage = essayImages[currentIndex] ?? null;

  const handleSelectAnswer = useCallback((idx: number) => {
    if (submitted[currentIndex]) return;
    setAnswers((prev) => ({ ...prev, [currentIndex]: idx }));
  }, [currentIndex, submitted]);

  const handleEssayImageUpload = useCallback((base64: string) => {
    setEssayImages((prev) => ({ ...prev, [currentIndex]: base64 }));
  }, [currentIndex]);

  const handleSubmit = useCallback(() => {
    const soal = soalList[currentIndex];
    if (soal.tipe === 'berpikir-kritis') {
      if (!essayImages[currentIndex]) return;
    } else {
      if (answers[currentIndex] === undefined) return;
    }
    setSubmitted((prev) => ({ ...prev, [currentIndex]: true }));
  }, [currentIndex, answers, soalList, essayImages]);

  const handleNext = useCallback(() => {
    if (currentIndex < soalList.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, soalList.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  /** Dibungkus dalam ref agar bisa dipanggil dari dalam effect timer tanpa stale closure */
  const handleSelesaiRef = useRef<() => void>(() => {});

  const handleSelesai = useCallback(() => {
    setIsFinished(true);

    const timeTaken = Math.round((Date.now() - startTimeRef.current) / 1000);

    // Hitung skor berbobot berdasarkan kesulitan
    const { score, totalSkor, skorDiperoleh } = soalList.reduce(
      (acc, soal, idx) => {
        acc.totalSkor += soal.skor;
        if (soal.tipe === 'berpikir-kritis') {
          if (essayImages[idx]) acc.skorDiperoleh += soal.skor;
        } else {
          if (answers[idx] === soal.jawabanBenar) {
            acc.skorDiperoleh += soal.skor;
            acc.score += 1;
          }
        }
        return acc;
      },
      { score: 0, totalSkor: 0, skorDiperoleh: 0 }
    );

    const resultData = {
      topicId,
      answers,
      submitted,
      essayImages,
      score,
      total: soalList.length,
      totalSkor,
      skorDiperoleh,
      timeTaken,
    };
    if (user) sessionStorage.setItem(hasilKey(user.id, topicId), JSON.stringify(resultData));
    navigate(`/hasil/${topicId}`);
  }, [topicId, answers, submitted, essayImages, soalList, navigate, user]);

  // Sinkronisasi ref setiap handleSelesai berubah
  handleSelesaiRef.current = handleSelesai;

  return {
    soalList,
    currentIndex,
    currentSoal,
    selectedAnswer,
    isSubmitted,
    soalTimeLeft,
    currentEssayImage,
    handleSelectAnswer,
    handleEssayImageUpload,
    handleSubmit,
    handleNext,
    handlePrev,
    handleSelesai,
  };
}
