import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import { soalPerTopik } from "~/data/materi";
import { useAuth } from "~/hooks/use-auth";

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
  const soalList = soalPerTopik[topicId] ?? soalPerTopik['definisi-unsur'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  /** Base64 gambar untuk soal berpikir-kritis, keyed by soal index */
  const [essayImages, setEssayImages] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(soalList[0]?.waktu ?? 120);
  const [isFinished, setIsFinished] = useState(false);
  const totalTimeRef = useRef(0);

  const currentWaktu = soalList[currentIndex]?.waktu ?? 120;

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
    setTimeLeft(soalList[0]?.waktu ?? 120);
    setIsFinished(false);
    totalTimeRef.current = 0;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId, user, navigate]);

  // Reset timer saat pindah soal
  useEffect(() => {
    setTimeLeft(currentWaktu);
  }, [currentIndex, currentWaktu]);

  // Countdown timer — auto-submit soal jika waktu habis
  useEffect(() => {
    if (isFinished) return;
    if (timeLeft <= 0) {
      setSubmitted((prev) => ({ ...prev, [currentIndex]: true }));
      totalTimeRef.current += currentWaktu;
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished, currentIndex, currentWaktu]);

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
      // Essay dianggap submitted saat ada gambar atau setelah waktu habis
      if (!essayImages[currentIndex]) return;
    } else {
      if (answers[currentIndex] === undefined) return;
    }
    totalTimeRef.current += currentWaktu - timeLeft;
    setSubmitted((prev) => ({ ...prev, [currentIndex]: true }));
  }, [currentIndex, answers, timeLeft, soalList, essayImages, currentWaktu]);

  const handleNext = useCallback(() => {
    if (currentIndex < soalList.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, soalList.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  const handleSelesai = useCallback(() => {
    setIsFinished(true);

    // Hitung skor berbobot berdasarkan kesulitan
    const { score, totalSkor, skorDiperoleh } = soalList.reduce(
      (acc, soal, idx) => {
        acc.totalSkor += soal.skor;
        if (soal.tipe === 'berpikir-kritis') {
          // Essay: skor penuh jika ada gambar yang diupload
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
      timeTaken: totalTimeRef.current,
    };
    if (user) sessionStorage.setItem(hasilKey(user.id, topicId), JSON.stringify(resultData));
    navigate(`/hasil/${topicId}`);
  }, [topicId, answers, submitted, essayImages, soalList, navigate, user]);

  return {
    soalList,
    currentIndex,
    currentSoal,
    selectedAnswer,
    isSubmitted,
    timeLeft,
    currentEssayImage,
    handleSelectAnswer,
    handleEssayImageUpload,
    handleSubmit,
    handleNext,
    handlePrev,
    handleSelesai,
  };
}
