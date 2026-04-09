import { Link, NavLink } from "react-router";
import { BookOpen, Home, Menu, X } from "lucide-react";
import { useState } from "react";
import classnames from "classnames";
import styles from "./navigation-header.module.css";

export interface NavigationHeaderProps {
  className?: string;
}

const navLinks = [
  { to: "/", label: "Beranda", end: true },
  { to: "/materi/definisi-unsur", label: "Materi" },
  { to: "/latihan/definisi-unsur", label: "Latihan" },
  { to: "/hasil/definisi-unsur", label: "Evaluasi" },
];

export function NavigationHeader({ className }: NavigationHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={classnames(styles.root, className)}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>
          <div className={styles.brandIcon}>
            <BookOpen size={20} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>E-LKPD</span>
            <span className={styles.brandSub}>Lingkaran Kelas 11 SMA</span>
          </div>
        </Link>

        <div className={styles.links}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => classnames(styles.link, { [styles.linkActive]: isActive })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className={styles.actions}>
          <Link to="/" className={styles.homeBtn} title="Beranda">
            <Home size={18} />
          </Link>
          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => classnames(styles.mobileLink, { [styles.mobileLinkActive]: isActive })}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
