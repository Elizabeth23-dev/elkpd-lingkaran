import { useParams } from "react-router";
import { HeaderLatihan } from "../blocks/soal-latihan/header-latihan";
import { KontainerSoal } from "../blocks/soal-latihan/kontainer-soal";
import { KontainerEssay } from "../blocks/soal-latihan/kontainer-essay";
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
  } = useLatihan(topicId);

  const isEssay = currentSoal.tipe === 'berpikir-kritis';

  return (
    <div className={styles.root}>
      <HeaderLatihan
        topicId={topicId}
        timeLeft={soalTimeLeft}
        totalSoal={soalList.length}
        currentSoal={currentIndex + 1}
      />

      {isEssay ? (
        <KontainerEssay
          soal={currentSoal}
          soalNumber={currentIndex + 1}
          uploadedImage={currentEssayImage}
          onImageUpload={handleEssayImageUpload}
          isSubmitted={isSubmitted}
        />
      ) : (
        <>
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
        </>
      )}

      {submitError && (
        <div className={styles.submitError} role="alert">
          {submitError}
        </div>
      )}

      <NavigasiLatihan
        topicId={topicId}
        currentIndex={currentIndex}
        totalSoal={soalList.length}
        selectedAnswer={selectedAnswer}
        isSubmitted={isSubmitted}
        isEssay={isEssay}
        essayImageUploaded={!!currentEssayImage}
        isSubmittingFinal={isSubmittingFinal}
        onPrev={handlePrev}
        onNext={handleNext}
        onSubmit={handleSubmit}
        onSelesai={handleSelesai}
      />
    </div>
  );
}
