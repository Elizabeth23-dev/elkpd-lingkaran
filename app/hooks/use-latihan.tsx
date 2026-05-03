import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import { buildSoalList } from "~/data/materi";
import { useAuth } from "~/hooks/use-auth";
import { uploadImageToImgBB, isImgBBConfigured } from "~/data/image-upload";
import { pushHasil, reconcileLocalHasil } from "~/data/result-storage";

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

// Progress disimpan di localStorage supaya tahan terhadap refresh, tab
// ditutup, atau browser ditutup — siswa yang tidak sengaja kepencet refresh
// (atau HP-nya restart) bisa lanjut dari soal terakhir, bukan ulang dari awal.
// sessionStorage juga dibaca sebagai fallback supaya progress lama (sebelum
// migrasi ini) tidak hilang.
function loadProgress(siswaId: string, topicId: string): ProgressData | null {
  const key = progressKey(siswaId, topicId);
  try {
    const raw = localStorage.getItem(key) ?? sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as ProgressData) : null;
  } catch {
    return null;
  }
}

function saveProgress(siswaId: string, topicId: string, data: ProgressData) {
  try {
    localStorage.setItem(progressKey(siswaId, topicId), JSON.stringify(data));
  } catch { /* ignore */ }
}

function clearProgress(siswaId: string, topicId: string) {
  const key = progressKey(siswaId, topicId);
  try { localStorage.removeItem(key); } catch { /* ignore */ }
  try { sessionStorage.removeItem(key); } catch { /* ignore */ }
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

  // Urutan: 1 soal berpikir-kritis dulu, baru pilihan-ganda. Helper dibagi
  // dengan admin & halaman hasil siswa agar indeks jawaban konsisten.
  const soalList = buildSoalList(topicId);

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
  const [isSubmittingFinal, setIsSubmittingFinal] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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
    let cancelled = false;
    (async () => {
      // Sinkron dengan cloud dulu — kalau guru sudah reset nilai siswa via /admin,
      // hapus sessionStorage hasil/progress yang basi sebelum cek sudahSelesai.
      if (user.role === 'siswa') {
        try {
          await reconcileLocalHasil(user.id);
        } catch { /* ignore */ }
      }
      if (cancelled) return;

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
    })();
    return () => { cancelled = true; };
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

  const handleSelesai = useCallback(async () => {
    if (isSubmittingFinal) return;
    setIsSubmittingFinal(true);
    setSubmitError(null);
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

    // Simpan dulu ke sessionStorage agar halaman /hasil bisa langsung baca
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

    // Upload gambar essay ke ImgBB (paralel) — hanya jika dikonfigurasi
    const essayImageUrls: Record<number, string> = {};
    if (user && isImgBBConfigured()) {
      const uploadEntries = Object.entries(essayImages);
      const uploadResults = await Promise.all(
        uploadEntries.map(async ([idx, base64]) => {
          const r = await uploadImageToImgBB(base64);
          return [Number(idx), r?.url ?? null] as const;
        })
      );
      for (const [idx, url] of uploadResults) {
        if (url) essayImageUrls[idx] = url;
      }
    }

    // Push hasil (tanpa base64) ke JSONBin agar admin bisa lihat dari device manapun
    let cloudFailed = false;
    if (user) {
      try {
        await pushHasil({
          id: `${user.id}-${topicId}`,
          siswaId: user.id,
          siswaName: user.name,
          topicId,
          score,
          total: soalList.length,
          totalSkor,
          skorDiperoleh,
          timeTaken,
          answers,
          submitted,
          essayImageUrls,
          submittedAt: Date.now(),
        });
      } catch (err) {
        console.warn('[use-latihan] Cloud push gagal (data tetap tersimpan lokal):', err);
        cloudFailed = true;
        setSubmitError(
          'Sinkron ke admin gagal — periksa koneksi internet. Hasil sudah tersimpan di perangkatmu, ' +
          'tapi mungkin belum terlihat oleh guru. Mohon laporkan ke guru.'
        );
      }
    }

    setIsSubmittingFinal(false);

    // Kalau cloud gagal, tahan navigasi sebentar (lewat alert blocking) supaya
    // siswa benar-benar membaca peringatannya. Kalau sukses, langsung pindah.
    if (cloudFailed && typeof window !== 'undefined') {
      window.alert(
        'Hasil sudah disimpan di perangkat ini, tapi sinkronisasi ke server gagal.\n\n' +
        'Guru mungkin belum bisa melihat hasil pengerjaanmu sampai koneksi pulih. ' +
        'Mohon laporkan kepada guru.'
      );
    }
    navigate(`/hasil/${topicId}`);
  }, [topicId, answers, submitted, essayImages, soalList, navigate, user, isSubmittingFinal]);

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
    isSubmittingFinal,
    submitError,
    handleSelectAnswer,
    handleEssayImageUpload,
    handleSubmit,
    handleNext,
    handlePrev,
    handleSelesai,
  };
}
