import { useParams } from "react-router";
import { RingkasanSkor } from "../blocks/hasil-evaluasi/ringkasan-skor";
import { TinjauanJawaban } from "../blocks/hasil-evaluasi/tinjauan-jawaban";
import { SaranPerbaikan } from "../blocks/hasil-evaluasi/saran-perbaikan";
import { NavigasiHasil } from "../blocks/hasil-evaluasi/navigasi-hasil";
import { useHasil } from "../hooks/use-hasil";
import styles from "./hasil-evaluasi.module.css";

export default function HasilEvaluasi() {
  const { topicId = "definisi-unsur" } = useParams();
  const hasil = useHasil(topicId);

  return (
    <div className={styles.root}>
      <RingkasanSkor hasil={hasil} />
      <TinjauanJawaban hasil={hasil} />
      <SaranPerbaikan hasil={hasil} />
      <NavigasiHasil topicId={topicId} />
    </div>
  );
}
