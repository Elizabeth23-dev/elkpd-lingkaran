import { HeroSection } from "../blocks/home/hero-section";
import { DaftarMateri } from "../blocks/home/daftar-materi";
import { BagianProgress } from "../blocks/home/bagian-progress";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.root}>
      <HeroSection />
      <DaftarMateri />
      <BagianProgress />
    </div>
  );
}
