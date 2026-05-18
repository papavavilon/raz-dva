import { forwardRef, type InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, id, ...rest },
  ref,
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <label htmlFor={inputId} className={styles.wrapper}>
      <div className={styles.checkbox}>
        <input
          id={inputId}
          ref={ref}
          type="checkbox"
          className={styles.input}
          {...rest}
        />
        <svg
          className={styles.checkmark}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.3327 4L5.99935 11.3333L2.66602 8"
            stroke="#F5F5F5"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {label && <span className="body-l">{label}</span>}
    </label>
  );
});

export default Checkbox;
