import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { RingkasanSkor } from "../blocks/hasil-evaluasi/ringkasan-skor";
import { TinjauanJawaban } from "../blocks/hasil-evaluasi/tinjauan-jawaban";
import { SaranPerbaikan } from "../blocks/hasil-evaluasi/saran-perbaikan";
import { NavigasiHasil } from "../blocks/hasil-evaluasi/navigasi-hasil";
import { useHasil } from "../hooks/use-hasil";
import styles from "./hasil-evaluasi.module.css";

export default function HasilEvaluasi() {
  const { topicId = "definisi-unsur" } = useParams();
  const hasil = useHasil(topicId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasil) {
      navigate(`/latihan/${topicId}`, { replace: true });
    }
  }, [hasil, topicId, navigate]);

  if (!hasil) return null;

  return (
    <div className={styles.root}>
      <RingkasanSkor hasil={hasil} />
      <TinjauanJawaban hasil={hasil} />
      <SaranPerbaikan hasil={hasil} />
      <NavigasiHasil topicId={topicId} />
    </div>
  );
}
