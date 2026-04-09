import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { soalPerTopik } from "~/data/materi";

const WAKTU_AWAL = 10 * 60; // 10 menit

export function useLatihan(topicId: string) {
  const navigate = useNavigate();
  const soalList = soalPerTopik[topicId] ?? soalPerTopik['definisi-unsur'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(WAKTU_AWAL);
  const [isFinished, setIsFinished] = useState(false);

  // Reset semua state dan hapus data hasil lama saat masuk halaman latihan
  useEffect(() => {
    sessionStorage.removeItem(`hasil-${topicId}`);
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted({});
    setTimeLeft(WAKTU_AWAL);
    setIsFinished(false);
  }, [topicId]);

  useEffect(() => {
    if (isFinished) return;
    if (timeLeft <= 0) {
      handleSelesai();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  const currentSoal = soalList[currentIndex];
  const selectedAnswer = answers[currentIndex] ?? null;
  const isSubmitted = submitted[currentIndex] ?? false;

  const handleSelectAnswer = useCallback((idx: number) => {
    if (submitted[currentIndex]) return;
    setAnswers((prev) => ({ ...prev, [currentIndex]: idx }));
  }, [currentIndex, submitted]);

  const handleSubmit = useCallback(() => {
    if (answers[currentIndex] === undefined) return;
    setSubmitted((prev) => ({ ...prev, [currentIndex]: true }));
  }, [currentIndex, answers]);

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
      timeTaken: WAKTU_AWAL - timeLeft,
    };
    sessionStorage.setItem(`hasil-${topicId}`, JSON.stringify(resultData));
    navigate(`/hasil/${topicId}`);
  }, [topicId, answers, submitted, soalList, timeLeft, navigate]);

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
