import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSelector.module.css';

const languageMap: Record<string, string> = {
  en: 'ENG',
  ua: 'UA',
};

interface LanguageSelectorProps {
  isDark?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  isDark = true,
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = i18n.language || 'en';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (langKey: string) => {
    i18n.changeLanguage(langKey);
    setIsOpen(false);
  };

  const textColorClass = isDark ? styles.textLight : styles.textDark;

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        className={`${styles.trigger} ${textColorClass}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`title-page-l ${styles.text}`}>
          {languageMap[currentLang] || currentLang.toUpperCase()}
        </span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.open : ''}`}
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.750005 0.75L5.72949 5.73638L10.7363 0.777237"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <ul
        className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}
        role="listbox"
      >
        {Object.keys(languageMap)
          .filter((langKey) => langKey !== currentLang)
          .map((langKey) => (
            <li
              key={langKey}
              role="option"
              aria-selected="false"
              className={`body-bold-l ${styles.menuItem} ${textColorClass}`}
              onClick={() => handleSelect(langKey)}
            >
              {languageMap[langKey]}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;
