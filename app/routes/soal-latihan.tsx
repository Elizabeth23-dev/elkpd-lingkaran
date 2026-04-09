import { useParams } from "react-router";
import { HeaderLatihan } from "../blocks/soal-latihan/header-latihan";
import { KontainerSoal } from "../blocks/soal-latihan/kontainer-soal";
import { BagianUmpanBalik } from "../blocks/soal-latihan/bagian-umpan-balik";
import { NavigasiLatihan } from "../blocks/soal-latihan/navigasi-latihan";
import { useLatihan } from "../hooks/use-latihan";
import styles from "./soal-latihan.module.css";

export default function SoalLatihan() {
  const { topicId = "definisi-unsur" } = useParams();
  const {
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
  } = useLatihan(topicId);

  return (
    <div className={styles.root}>
      <HeaderLatihan
        topicId={topicId}
        timeLeft={timeLeft}
        totalSoal={soalList.length}
        currentSoal={currentIndex + 1}
      />
      <KontainerSoal
        soal={currentSoal}
        soalNumber={currentIndex + 1}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
        isSubmitted={isSubmitted}
      />
      <BagianUmpanBalik
        soal={currentSoal}
        selectedAnswer={selectedAnswer}
        isVisible={isSubmitted}
      />
      <NavigasiLatihan
        topicId={topicId}
        currentIndex={currentIndex}
        totalSoal={soalList.length}
        selectedAnswer={selectedAnswer}
        isSubmitted={isSubmitted}
        onPrev={handlePrev}
        onNext={handleNext}
        onSubmit={handleSubmit}
        onSelesai={handleSelesai}
      />
    </div>
  );
}
