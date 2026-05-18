import { forwardRef, type InputHTMLAttributes } from 'react';
import type { FieldError } from 'react-hook-form';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: FieldError | string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, id, ...rest },
  ref,
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <div className={`${styles.row} ${error ? styles.error : ''}`}>
        <input
          id={inputId}
          ref={ref}
          className={`${styles.input} body-l`}
          {...rest}
        />
      </div>

      {errorMessage && (
        <span className={styles.errorMessage} role="alert">
          {errorMessage}
        </span>
      )}

      {hint && !error && <span className={styles.hint}>{hint}</span>}
    </div>
  );
});

export default Input;
