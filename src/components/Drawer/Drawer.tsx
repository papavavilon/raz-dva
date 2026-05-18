import { type ReactNode, useEffect } from 'react';
import styles from './Drawer.module.css';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string | ReactNode;
  children: ReactNode;
}

const Drawer = ({ isOpen, onClose, title, children }: DrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={onClose}
      />

      <div
        className={`${styles.sideMenu} ${isOpen ? styles.sideMenuOpen : ''}`}
      >
        <div className={styles.menuHeader}>
          {typeof title === 'string' ? (
            <h2 className="title-page-l">{title}</h2>
          ) : (
            title
          )}
          <button className={styles.closeBtn} onClick={onClose}>
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5176 28.4812L28.4829 15.5195M15.5176 15.5195L28.4829 28.4812"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.drawerContent}>{children}</div>
      </div>
    </>
  );
};

export default Drawer;
