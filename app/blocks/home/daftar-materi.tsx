import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle2, Clock, Circle, ChevronRight } from 'lucide-react';
import classnames from 'classnames';
import { daftarMateri } from '~/data/materi';
import { useTokenGate } from '~/hooks/use-token-gate';
import { TokenGateModal } from '~/components/token-gate-modal/token-gate-modal';
import styles from './daftar-materi.module.css';

export interface DaftarMateriProps {
  className?: string;
}

const iconColors = [
  { bg: "#eef2ff", icon: "#4f46e5" },
  { bg: "#ecfeff", icon: "#06b6d4" },
  { bg: "#ecfdf5", icon: "#10b981" },
];

const statusLabels = ["Selesai", "Sedang dipelajari", "Belum dimulai"];
const statusTypes: Array<"done" | "active" | "idle"> = ["done", "active", "idle"];

export function DaftarMateri({ className }: DaftarMateriProps) {
  const navigate = useNavigate();
  const { isOpen, pendingPath, requestNavigation, submitToken, dismiss } = useTokenGate();

  // When modal closes with a valid token, navigate to pending path
  useEffect(() => {
    if (!isOpen && pendingPath) {
      navigate(pendingPath);
    }
  }, [isOpen, pendingPath, navigate]);

  const handleCardClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    requestNavigation(path);
  };

  return (
    <>
      <section className={classnames(styles.root, className)}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Daftar Materi</h2>
            <p className={styles.subtitle}>
              Pelajari setiap topik secara berurutan untuk pemahaman yang lebih baik
            </p>
          </div>

          <div className={styles.grid}>
            {daftarMateri.map((materi, idx) => {
              const color = iconColors[idx % iconColors.length];
              const status = statusTypes[idx];
              const statusLabel = statusLabels[idx];

              return (
                <a
                  href={`/materi/${materi.id}`}
                  key={materi.id}
                  className={styles.card}
                  onClick={(e) => handleCardClick(e, `/materi/${materi.id}`)}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrap} style={{ background: color.bg }}>
                      <Circle size={28} color={color.icon} />
                    </div>
                    <div className={classnames(styles.statusBadge, styles[`status_${status}`])}>
                      {status === 'done' && <CheckCircle2 size={13} />}
                      {status === 'active' && <div className={styles.activeDot} />}
                      {status === 'idle' && <Circle size={13} />}
                      <span>{statusLabel}</span>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <span className={styles.cardSubtitle}>{materi.subtitle}</span>
                    <h3 className={styles.cardTitle}>{materi.title}</h3>
                    <p className={styles.cardDesc}>{materi.description}</p>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.time}>
                      <Clock size={14} />
                      <span>{materi.estimasiWaktu}</span>
                    </div>
                    <div className={styles.topicCount}>
                      {materi.topik.length} topik
                    </div>
                  </div>

                  <div className={styles.cardAction}>
                    <span>Pelajari</span>
                    <ChevronRight size={16} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <TokenGateModal
        isOpen={isOpen}
        onSubmit={submitToken}
        onDismiss={dismiss}
      />
    </>
  );
}
