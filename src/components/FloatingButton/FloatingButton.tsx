import type { ReactNode } from 'react';
import styles from './FloatingButton.module.css';

interface FloatingButtonProps {
  onClick: () => void;
  icon: ReactNode;
  count?: number;
  className?: string;
  isVisible?: boolean;
}

const MAX_COUNT = 9;

const FloatingButton = ({
  onClick,
  icon,
  count,
  className = '',
  isVisible = true,
}: FloatingButtonProps) => {
  const hasCount = count !== undefined && count > 0;

  return (
    <div
      className={`${styles.wrapper} ${!isVisible ? styles.wrapperHidden : ''} ${className}`}
    >
      <button className={styles.buttonContainer} onClick={onClick}>
        {icon}
        {hasCount && (
          <p>
            {Math.min(count, MAX_COUNT)}
            {count > MAX_COUNT ? '+' : ''}
          </p>
        )}
      </button>
    </div>
  );
};

export default FloatingButton;
