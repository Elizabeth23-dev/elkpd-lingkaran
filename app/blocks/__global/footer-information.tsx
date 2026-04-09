import { Mail, MessageCircle, BookOpen, Phone } from "lucide-react";
import classnames from "classnames";
import styles from "./footer-information.module.css";

export interface FooterInformationProps {
  className?: string;
}

export function FooterInformation({ className }: FooterInformationProps) {
  return (
    <footer className={classnames(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.brandRow}>
            <div className={styles.brandIcon}>
              <BookOpen size={18} />
            </div>
            <span className={styles.brandName}>E-LKPD Lingkaran</span>
          </div>
          <p className={styles.brandDesc}>
            Lembar Kerja Peserta Didik Elektronik untuk pembelajaran materi lingkaran Kelas 11 SMA.
          </p>
        </div>

        <div className={styles.info}>
          <h4 className={styles.colTitle}>Informasi</h4>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Kelas</span>
            <span className={styles.infoValue}>XI (Sebelas) SMA</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Mata Pelajaran</span>
            <span className={styles.infoValue}>Matematika Wajib</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Semester</span>
            <span className={styles.infoValue}>Ganjil 2024/2025</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Materi</span>
            <span className={styles.infoValue}>Persamaan Lingkaran</span>
          </div>
        </div>

        <div className={styles.contact}>
          <h4 className={styles.colTitle}>Hubungi Guru</h4>
          <a href="mailto:guru@sekolah.id" className={styles.contactItem}>
            <Mail size={16} />
            <span>guru@sekolah.id</span>
          </a>
          <a href="tel:+628123456789" className={styles.contactItem}>
            <Phone size={16} />
            <span>+62 812-3456-789</span>
          </a>
          <a href="#" className={styles.contactItem}>
            <MessageCircle size={16} />
            <span>Chat via WhatsApp</span>
          </a>
          <div className={styles.helpBadge}>Butuh bantuan? Jangan ragu untuk bertanya!</div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.bottomText}>
          &copy; 2024/2025 E-LKPD Lingkaran &mdash; Kelas XI SMA &mdash; Matematika Wajib
        </p>
      </div>
    </footer>
  );
}
