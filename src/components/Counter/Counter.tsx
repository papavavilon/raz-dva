import React from 'react';
import styles from './Counter.module.css';

interface CounterProps {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
}

const Counter: React.FC<CounterProps> = ({
  value,
  onChange,
  min = 0,
  max = 99,
}) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.iconButton}
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Decrease"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.33398 8H12.6673"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <span className={`body-bold-l ${styles.countDisplay}`}>{value}</span>

      <button
        className={styles.iconButton}
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Increase"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.76125 3.4289C8.76125 3.22683 8.68098 3.03303 8.5381 2.89015C8.39521 2.74726 8.20142 2.66699 7.99935 2.66699C7.79728 2.66699 7.60349 2.74726 7.4606 2.89015C7.31772 3.03303 7.23744 3.22683 7.23744 3.4289V7.23842H3.42792C3.22585 7.23842 3.03206 7.31869 2.88917 7.46158C2.74629 7.60446 2.66602 7.79826 2.66602 8.00033C2.66602 8.2024 2.74629 8.39619 2.88917 8.53907C3.03206 8.68196 3.22585 8.76223 3.42792 8.76223H7.23744V12.5718C7.23744 12.7738 7.31772 12.9676 7.4606 13.1105C7.60349 13.2534 7.79728 13.3337 7.99935 13.3337C8.20142 13.3337 8.39521 13.2534 8.5381 13.1105C8.68098 12.9676 8.76125 12.7738 8.76125 12.5718V8.76223H12.5708C12.7728 8.76223 12.9666 8.68196 13.1095 8.53907C13.2524 8.39619 13.3327 8.2024 13.3327 8.00033C13.3327 7.79826 13.2524 7.60446 13.1095 7.46158C12.9666 7.31869 12.7728 7.23842 12.5708 7.23842H8.76125V3.4289Z"
            fill="black"
          />
        </svg>
      </button>
    </div>
  );
};

export default Counter;
