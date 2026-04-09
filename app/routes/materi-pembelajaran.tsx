import { useParams } from "react-router";
import { HeaderMateri } from "../blocks/materi-pembelajaran/header-materi";
import { KontenMateri } from "../blocks/materi-pembelajaran/konten-materi";
import { NavigasiMateri } from "../blocks/materi-pembelajaran/navigasi-materi";
import styles from "./materi-pembelajaran.module.css";

export default function MateriPembelajaran() {
  const { topicId = "definisi-unsur" } = useParams();

  return (
    <div className={styles.root}>
      <HeaderMateri topicId={topicId} />
      <KontenMateri topicId={topicId} />
      <NavigasiMateri topicId={topicId} />
    </div>
  );
}
