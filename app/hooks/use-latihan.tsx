import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import { soalPerTopik } from "~/data/materi";
import { useAuth } from "~/hooks/use-auth";

/** Waktu per soal dalam detik (2 menit) */
const WAKTU_PER_SOAL = 2 * 60;

export function hasilKey(siswaId: string, topicId: string) {
  return `hasil-${siswaId}-${topicId}`;
}

export function useLatihan(topicId: string) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const soalList = soalPerTopik[topicId] ?? soalPerTopik['definisi-unsur'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(WAKTU_PER_SOAL);
  const [isFinished, setIsFinished] = useState(false);
  const totalTimeRef = useRef(0);

  // Reset semua state dan hapus data hasil lama saat masuk halaman latihan
  useEffect(() => {
    if (user) sessionStorage.removeItem(hasilKey(user.id, topicId));
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted({});
    setTimeLeft(WAKTU_PER_SOAL);
    setIsFinished(false);
    totalTimeRef.current = 0;
  }, [topicId, user]);

  // Reset timer saat pindah soal
  useEffect(() => {
    setTimeLeft(WAKTU_PER_SOAL);
  }, [currentIndex]);

  // Countdown timer — auto-submit soal jika waktu habis
  useEffect(() => {
    if (isFinished) return;
    if (timeLeft <= 0) {
      // Tandai soal sebagai submitted (waktu habis, tanpa jawaban jika belum dipilih)
      setSubmitted((prev) => ({ ...prev, [currentIndex]: true }));
      totalTimeRef.current += WAKTU_PER_SOAL;
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished, currentIndex]);

  const currentSoal = soalList[currentIndex];
  const selectedAnswer = answers[currentIndex] ?? null;
  const isSubmitted = submitted[currentIndex] ?? false;

  const handleSelectAnswer = useCallback((idx: number) => {
    if (submitted[currentIndex]) return;
    setAnswers((prev) => ({ ...prev, [currentIndex]: idx }));
  }, [currentIndex, submitted]);

  const handleSubmit = useCallback(() => {
    if (answers[currentIndex] === undefined) return;
    totalTimeRef.current += WAKTU_PER_SOAL - timeLeft;
    setSubmitted((prev) => ({ ...prev, [currentIndex]: true }));
  }, [currentIndex, answers, timeLeft]);

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
    const score = soalList.reduce((acc, soal, idx) => {
      if (answers[idx] === soal.jawabanBenar) return acc + 1;
      return acc;
    }, 0);
    const resultData = {
      topicId,
      answers,
      submitted,
      score,
      total: soalList.length,
      timeTaken: totalTimeRef.current,
    };
    if (user) sessionStorage.setItem(hasilKey(user.id, topicId), JSON.stringify(resultData));
    navigate(`/hasil/${topicId}`);
  }, [topicId, answers, submitted, soalList, navigate, user]);

  return {
    soalList,
    currentIndex,
    currentSoal,
    selectedAnswer,
    isSubmitted,
    timeLeft,
    handleSelectAnswer,
    handleSubmit,
    handleNext,
    handlePrev,
    handleSelesai,
  };
}
