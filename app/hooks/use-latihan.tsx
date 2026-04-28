import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import { soalPerTopik } from "~/data/materi";
import { useAuth } from "~/hooks/use-auth";

/** Jumlah soal berpikir-kritis per sesi */
const MAX_BERPIKIR_KRITIS = 1;
/** Jumlah soal pilihan-ganda per sesi */
const MAX_PILIHAN_GANDA = 14;

export function hasilKey(siswaId: string, topicId: string) {
  return `hasil-${siswaId}-${topicId}`;
}

/** Key untuk menyimpan progress latihan yang sedang berlangsung */
function progressKey(siswaId: string, topicId: string) {
  return `progress-${siswaId}-${topicId}`;
}

interface ProgressData {
  currentIndex: number;
  answers: Record<number, number>;
  submitted: Record<number, boolean>;
  essayImages: Record<number, string>;
  startTime: number;
}

function loadProgress(siswaId: string, topicId: string): ProgressData | null {
  try {
    const raw = sessionStorage.getItem(progressKey(siswaId, topicId));
    return raw ? (JSON.parse(raw) as ProgressData) : null;
  } catch {
    return null;
  }
}

function saveProgress(siswaId: string, topicId: string, data: ProgressData) {
  try {
    sessionStorage.setItem(progressKey(siswaId, topicId), JSON.stringify(data));
  } catch { /* ignore */ }
}

function clearProgress(siswaId: string, topicId: string) {
  try {
    sessionStorage.removeItem(progressKey(siswaId, topicId));
  } catch { /* ignore */ }
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

  const allSoal = soalPerTopik[topicId] ?? soalPerTopik['definisi-unsur'];
  // 1 soal berpikir-kritis di urutan pertama, diikuti 14 soal pilihan-ganda
  const soalList = [
    ...allSoal.filter((s) => s.tipe === 'berpikir-kritis').slice(0, MAX_BERPIKIR_KRITIS),
    ...allSoal.filter((s) => s.tipe !== 'berpikir-kritis').slice(0, MAX_PILIHAN_GANDA),
  ];

  // Inisialisasi state dari progress yang tersimpan (jika ada)
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (!user) return 0;
    return loadProgress(user.id, topicId)?.currentIndex ?? 0;
  });
  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    if (!user) return {};
    return loadProgress(user.id, topicId)?.answers ?? {};
  });
  const [submitted, setSubmitted] = useState<Record<number, boolean>>(() => {
    if (!user) return {};
    return loadProgress(user.id, topicId)?.submitted ?? {};
  });
  const [essayImages, setEssayImages] = useState<Record<number, string>>(() => {
    if (!user) return {};
    return loadProgress(user.id, topicId)?.essayImages ?? {};
  });
  /** Timer per soal — diinisialisasi dari waktu soal saat ini */
  const [soalTimeLeft, setSoalTimeLeft] = useState(() => {
    const savedIndex = user ? (loadProgress(user.id, topicId)?.currentIndex ?? 0) : 0;
    return soalList[savedIndex]?.waktu ?? 90;
  });
  const [isFinished, setIsFinished] = useState(false);
  const startTimeRef = useRef<number>(
    user ? (loadProgress(user.id, topicId)?.startTime ?? Date.now()) : Date.now()
  );
  /** Ref untuk menyimpan soalList agar dapat diakses di closure timer */
  const soalListRef = useRef(soalList);
  soalListRef.current = soalList;

  // Jika siswa sudah menyelesaikan latihan ini, redirect ke halaman hasil
  // Hanya reset state jika topicId benar-benar berubah (bukan saat kembali dari materi)
  const initializedTopicRef = useRef<string | null>(null);
  useEffect(() => {
    if (!user) return;
    if (user.role === 'siswa' && sudahSelesai(user.id, topicId)) {
      navigate(`/hasil/${topicId}`, { replace: true });
      return;
    }
    // Hanya reset jika topicId berubah (bukan re-render biasa)
    if (initializedTopicRef.current === topicId) return;
    initializedTopicRef.current = topicId;

    const saved = loadProgress(user.id, topicId);
    if (saved) {
      // Restore dari progress tersimpan
      setCurrentIndex(saved.currentIndex);
      setAnswers(saved.answers);
      setSubmitted(saved.submitted);
      setEssayImages(saved.essayImages);
      setSoalTimeLeft(soalList[saved.currentIndex]?.waktu ?? 90);
      startTimeRef.current = saved.startTime;
    } else {
      // Mulai sesi baru
      setCurrentIndex(0);
      setAnswers({});
      setSubmitted({});
      setEssayImages({});
      setSoalTimeLeft(soalList[0]?.waktu ?? 90);
      setIsFinished(false);
      startTimeRef.current = Date.now();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId, user]);

  // Reset timer setiap ganti soal
  useEffect(() => {
    const waktuSoal = soalList[currentIndex]?.waktu ?? 90;
    setSoalTimeLeft(waktuSoal);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // Simpan progress ke sessionStorage setiap kali state penting berubah
  useEffect(() => {
    if (!user || isFinished) return;
    saveProgress(user.id, topicId, {
      currentIndex,
      answers,
      submitted,
      essayImages,
      startTime: startTimeRef.current,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, answers, submitted, essayImages, isFinished]);

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
    if (user) clearProgress(user.id, topicId);

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
