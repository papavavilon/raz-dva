import { type MouseEvent, useState } from 'react';
import styles from './Navbar.module.css';
import LogoLight from '../../assets/logo-light.svg';
import LogoDark from '../../assets/logo-dark.svg';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button.tsx';
import { useCartSlice, useUserSlice } from '../../store';
import { Popover } from '../../components/Popover/Popover.tsx';
import Modal from '../../components/Modal/Modal.tsx';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector.tsx';

const DARK_LOCATIONS = ['/'];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const [profilePopoverAnchorEl, setProfilePopoverAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const closeProfilePopover = () => setProfilePopoverAnchorEl(null);

  const isDark = DARK_LOCATIONS.includes(location.pathname);
  const { user, logout } = useUserSlice();
  const { openCart } = useCartSlice();
  const isSignedIn = !!user;

  const currentLang = i18n.language || 'en';

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileLangOpen(false);
  };

  const handleSignInClick = () => navigate('/sign-in');
  const handleProfileClick = (e: MouseEvent<HTMLButtonElement>) => {
    setProfilePopoverAnchorEl(e.currentTarget);
  };

  const handleProfileInPopoverClick = () => {
    closeProfilePopover();
    closeMobileMenu();
    navigate('/profile');
  };

  const handleCartClick = () => {
    closeProfilePopover();
    closeMobileMenu();
    openCart();
  };

  const handleLogOutClick = () => {
    closeProfilePopover();
    setIsLogoutModalOpen(true);
  };

  const handleLogoutModal = () => {
    closeMobileMenu();
    setIsLogoutModalOpen(false);
    navigate('/');
    logout();
  };

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
          {t('Home')}
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
          <LanguageSelector isDark={isDark} />
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
          <LanguageSelector isDark={isDark} />
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
            {t('Home')}
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

          <div className={styles.mobileLangContainer}>
            <button
              className={`button-l ${styles.navButton} ${styles.mobileLangToggle}`}
              onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
            >
              {t('Language')}
            </button>
            <div
              className={`${styles.mobileLangList} ${isMobileLangOpen ? styles.open : ''}`}
            >
              <button
                className={`button-l ${styles.mobileLangItem} ${currentLang === 'en' ? styles.active : ''}`}
                onClick={() => i18n.changeLanguage('en')}
              >
                {t('English')}
              </button>
              <button
                className={`button-l ${styles.mobileLangItem} ${currentLang === 'ua' ? styles.active : ''}`}
                onClick={() => i18n.changeLanguage('ua')}
              >
                {t('Ukrainian')}
              </button>
            </div>
          </div>

          {isSignedIn ? (
            <button
              onClick={handleProfileClick}
              className={`button-l ${styles.navButton}`}
            >
              {t('Profile')}
            </button>
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

      {user && (
        <Popover
          isOpen={Boolean(profilePopoverAnchorEl)}
          onClose={closeProfilePopover}
          anchorEl={profilePopoverAnchorEl}
          align={'right'}
        >
          <div className={styles.profilePopoverContent}>
            <div className={styles.profilePopoverHeader}>
              <div className={styles.profilePopoverPFP}>
                {user.name[0].toUpperCase()}
              </div>
              <p className={'body-l'}>{user.name}</p>
            </div>
            <div className={styles.profilePopoverDivider}></div>
            <div className={styles.profilePopoverLinksContainer}>
              <div
                className={styles.profilePopoverLinkItem}
                onClick={handleProfileInPopoverClick}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6673 17.5V15.8333C16.6673 14.9493 16.3161 14.1014 15.691 13.4763C15.0659 12.8512 14.218 12.5 13.334 12.5H6.66732C5.78326 12.5 4.93542 12.8512 4.31029 13.4763C3.68517 14.1014 3.33398 14.9493 3.33398 15.8333V17.5M13.334 5.83333C13.334 7.67428 11.8416 9.16667 10.0007 9.16667C8.1597 9.16667 6.66732 7.67428 6.66732 5.83333C6.66732 3.99238 8.1597 2.5 10.0007 2.5C11.8416 2.5 13.334 3.99238 13.334 5.83333Z"
                    stroke="#1E1E1E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className={'body-l'}>{t('Profile')}</p>
              </div>
              <div
                className={styles.profilePopoverLinkItem}
                onClick={handleCartClick}
              >
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.54628 16.5304C5.24328 16.2168 5.09179 15.84 5.09179 15.4C5.09179 14.96 5.24328 14.5835 5.54628 14.2704C5.84927 13.9573 6.21308 13.8005 6.63768 13.8C7.06229 13.7995 7.42634 13.9563 7.72985 14.2704C8.03336 14.5845 8.1846 14.9611 8.18357 15.4C8.18254 15.8389 8.0313 16.2157 7.72985 16.5304C7.42841 16.8451 7.06435 17.0016 6.63768 17C6.21101 16.9984 5.84721 16.8419 5.54628 16.5304ZM13.2757 16.5304C12.9728 16.2168 12.8213 15.84 12.8213 15.4C12.8213 14.96 12.9728 14.5835 13.2757 14.2704C13.5787 13.9573 13.9425 13.8005 14.3671 13.8C14.7918 13.7995 15.1558 13.9563 15.4593 14.2704C15.7628 14.5845 15.9141 14.9611 15.913 15.4C15.912 15.8389 15.7608 16.2157 15.4593 16.5304C15.1579 16.8451 14.7938 17.0016 14.3671 17C13.9405 16.9984 13.5767 16.8419 13.2757 16.5304ZM5.24638 2.6H18L14.1546 9.79999H7.48792L6.63768 11.4H15.913V13H4.02899L6.3285 8.67999L3.54589 2.6H2V1H4.51208L5.24638 2.6Z"
                    fill="black"
                  />
                </svg>
                <p className={'body-l'}>{t('Cart')}</p>
              </div>
              <div
                className={styles.profilePopoverLinkItem}
                onClick={handleLogOutClick}
              >
                <svg
                  width="23"
                  height="20"
                  viewBox="0 0 23 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.1176 10H9.73529M16.3529 12.625L19 10L16.3529 7.375M11.9412 5.625V4.75C11.9412 4.28587 11.7553 3.84075 11.4243 3.51256C11.0934 3.18437 10.6445 3 10.1765 3H5.76471C5.29668 3 4.84782 3.18437 4.51687 3.51256C4.18592 3.84075 4 4.28587 4 4.75V15.25C4 15.7141 4.18592 16.1592 4.51687 16.4874C4.84782 16.8156 5.29668 17 5.76471 17H10.1765C10.6445 17 11.0934 16.8156 11.4243 16.4874C11.7553 16.1592 11.9412 15.7141 11.9412 15.25V14.375"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className={'body-l'}>{t('Log out')}</p>
              </div>
            </div>
          </div>
        </Popover>
      )}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      >
        <div className={styles.logoutModalContent}>
          <h1>
            <Trans i18nKey="logoutText">
              Are you sure you
              <br />
              want to log out?
            </Trans>
          </h1>
          <div className={styles.logoutButtonsContainer}>
            <Button variant={'secondary'} onClick={handleLogoutModal}>
              <p className={'body-l'}>{t('Log out')}</p>
            </Button>
            <Button
              variant={'light'}
              onClick={() => setIsLogoutModalOpen(false)}
            >
              <p className={'body-l'}>{t('Cancel')}</p>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
