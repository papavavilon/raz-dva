import { useState } from 'react';
import styles from './Navbar.module.css';
import LogoLight from '../../assets/logo-light.svg';
import LogoDark from '../../assets/logo-dark.svg';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button.tsx';
import { useUserSlice } from '../../store';

const DARK_LOCATIONS = ['/'];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isDark = DARK_LOCATIONS.includes(location.pathname);
  const { user } = useUserSlice();
  const isSignedIn = !!user;

  const handleSignInClick = () => navigate('/sign-in');
  const handleProfileClick = () => navigate('/profile');

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className={`${styles.wrapper} ${isDark ? styles.dark : styles.light}`}>
      <img
        className={styles.logo}
        src={isDark ? LogoLight : LogoDark}
        alt="Logo"
      />

      <div
        className={`${styles.navButtonsContainer} ${isDark ? styles.dark : styles.light} ${styles.desktopOnly}`}
      >
        <Link to="/" className={`nav-item ${styles.navButton}`}>
          {t('Products')}
        </Link>
        <Link to="/catalog" className={`nav-item ${styles.navButton}`}>
          {t('Catalog')}
        </Link>
        <Link to="/" className={`nav-item ${styles.navButton}`}>
          {t('Contacts')}
        </Link>
      </div>

      {isSignedIn ? (
        <div className={`${styles.iconButtonContainer} ${styles.desktopOnly}`}>
          <button
            className={`${styles.iconButton} ${isDark ? styles.dark : styles.light}`}
            onClick={handleProfileClick}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6663 17.5V15.8333C16.6663 14.9493 16.3152 14.1014 15.69 13.4763C15.0649 12.8512 14.2171 12.5 13.333 12.5H6.66634C5.78229 12.5 4.93444 12.8512 4.30932 13.4763C3.6842 14.1014 3.33301 14.9493 3.33301 15.8333V17.5M13.333 5.83333C13.333 7.67428 11.8406 9.16667 9.99967 9.16667C8.15873 9.16667 6.66634 7.67428 6.66634 5.83333C6.66634 3.99238 8.15873 2.5 9.99967 2.5C11.8406 2.5 13.333 3.99238 13.333 5.83333Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className={`${styles.buttonContainer} ${styles.desktopOnly}`}>
          <Button variant="main" onClick={handleSignInClick}>
            <p className="nav-item">{t('Sign in')}</p>
          </Button>
          <Button
            variant={isDark ? 'outline-light' : 'outline-dark'}
            onClick={handleSignInClick}
          >
            <p className="nav-item">{t('Register')}</p>
          </Button>
        </div>
      )}

      <button
        className={`${styles.burgerButton} ${isDark ? styles.dark : styles.light}`}
        onClick={toggleMobileMenu}
        aria-label="Open menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <div
        className={`${styles.backdrop} ${isMobileMenuOpen ? styles.open : ''}`}
        onClick={toggleMobileMenu}
        aria-hidden="true"
      />

      <div
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
      >
        <img src={LogoDark} alt="" />
        <div className={styles.mobileNavContainer}>
          <Link
            to="/"
            onClick={closeMobileMenu}
            className={`button-l ${styles.navButton}`}
          >
            {t('Products')}
          </Link>
          <Link
            to="/catalog"
            onClick={closeMobileMenu}
            className={`button-l ${styles.navButton}`}
          >
            {t('Catalog')}
          </Link>
          <Link
            to="/"
            onClick={closeMobileMenu}
            className={`button-l ${styles.navButton}`}
          >
            {t('Contacts')}
          </Link>
          {isSignedIn ? (
            <Link
              to="/profile"
              onClick={closeMobileMenu}
              className={`button-l ${styles.navButton}`}
            >
              {t('Profile')}
            </Link>
          ) : (
            <>
              <Link
                to="/sign-in"
                onClick={closeMobileMenu}
                className={`button-l ${styles.navButton}`}
              >
                {t('Sign In')}
              </Link>
              <Link
                to="/sign-in"
                onClick={closeMobileMenu}
                className={`button-l ${styles.navButton}`}
              >
                {t('Register')}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
