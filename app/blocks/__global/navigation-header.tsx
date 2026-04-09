import { Link, NavLink, useNavigate } from "react-router";
import { BookOpen, Home, Menu, X, LogIn, LogOut, ShieldCheck, User } from "lucide-react";
import { useState } from "react";
import classnames from "classnames";
import { useAuth } from "~/hooks/use-auth";
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
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

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
          {user?.role === 'guru' && (
            <NavLink
              to="/admin"
              className={({ isActive }) => classnames(styles.link, { [styles.linkActive]: isActive })}
            >
              Admin
            </NavLink>
          )}
        </div>

        <div className={styles.actions}>
          {user ? (
            <div className={styles.userArea}>
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  {user.role === 'guru' ? <ShieldCheck size={14} /> : <User size={14} />}
                </div>
                <div className={styles.userMeta}>
                  <span className={styles.userName}>{user.name.split(' ')[0]}</span>
                  <span className={styles.userRole}>{user.role === 'guru' ? 'Guru' : user.kelas}</span>
                </div>
              </div>
              <button className={styles.logoutBtn} onClick={handleLogout} title="Keluar">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className={styles.loginBtn}>
              <LogIn size={15} />
              Masuk
            </Link>
          )}
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
          {user?.role === 'guru' && (
            <NavLink
              to="/admin"
              className={({ isActive }) => classnames(styles.mobileLink, { [styles.mobileLinkActive]: isActive })}
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </NavLink>
          )}
          {user ? (
            <button className={styles.mobileLogoutBtn} onClick={handleLogout}>
              <LogOut size={15} /> Keluar ({user.name.split(' ')[0]})
            </button>
          ) : (
            <Link to="/login" className={styles.mobileLoginLink} onClick={() => setMenuOpen(false)}>
              <LogIn size={15} /> Masuk
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
