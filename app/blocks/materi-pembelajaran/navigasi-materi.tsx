import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, PenLine } from "lucide-react";
import { useEffect } from "react";
import classnames from "classnames";
import { daftarMateri } from "~/data/materi";
import { useTokenGate } from "~/hooks/use-token-gate";
import { TokenGateModal } from "~/components/token-gate-modal/token-gate-modal";
import styles from "./navigasi-materi.module.css";

export interface NavigasiMateriProps {
  className?: string;
  topicId: string;
}

export function NavigasiMateri({ className, topicId }: NavigasiMateriProps) {
  const currentIdx = daftarMateri.findIndex((m) => m.id === topicId);
  const prev = currentIdx > 0 ? daftarMateri[currentIdx - 1] : null;
  const next = currentIdx < daftarMateri.length - 1 ? daftarMateri[currentIdx + 1] : null;

  const navigate = useNavigate();
  const { isOpen, pendingPath, requestNavigation, submitToken, dismiss } = useTokenGate();

  // When token verified and pendingPath set (modal closed), navigate
  useEffect(() => {
    if (!isOpen && pendingPath) {
      navigate(pendingPath);
    }
  }, [isOpen, pendingPath, navigate]);

  const handleNextClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    requestNavigation(path);
  };

  return (
    <>
      <div className={classnames(styles.root, className)}>
        <div className={styles.container}>
          <div className={styles.navSection}>
            {prev ? (
              <a
                href={`/materi/${prev.id}`}
                className={styles.navBtn}
                onClick={(e) => { e.preventDefault(); navigate(`/materi/${prev.id}`); }}
              >
                <ArrowLeft size={18} />
                <div className={styles.navInfo}>
                  <span className={styles.navHint}>Materi Sebelumnya</span>
                  <span className={styles.navTitle}>{prev.title}</span>
                </div>
              </a>
            ) : (
              <div />
            )}

            <a href={`/latihan/${topicId}`} className={styles.latihanBtn} onClick={(e) => { e.preventDefault(); navigate(`/latihan/${topicId}`); }}>
              <PenLine size={18} />
              <span>Kerjakan Latihan</span>
            </a>

            {next ? (
              <a
                href={`/materi/${next.id}`}
                className={styles.navBtn}
                onClick={(e) => handleNextClick(e, `/materi/${next.id}`)}
              >
                <div className={styles.navInfo} style={{ textAlign: "right" }}>
                  <span className={styles.navHint}>Materi Selanjutnya</span>
                  <span className={styles.navTitle}>{next.title}</span>
                </div>
                <ArrowRight size={18} />
              </a>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      <TokenGateModal
        isOpen={isOpen}
        onSubmit={submitToken}
        onDismiss={dismiss}
      />
    </>
  );
}
