import {
  forwardRef,
  type ReactElement,
  type Ref,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './Select.module.css';

interface SelectProps<T extends string> {
  options: T[];
  value?: T;
  onChange?: (value: T) => void;
  onBlur?: () => void;
  placeholder?: string;
  getLabel?: (option: T) => string;
  getValue?: (option: T) => string;
}

const ChevronIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="#1E1E1E"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Select = forwardRef(
  <T extends string>(
    {
      options,
      value,
      onChange,
      onBlur,
      placeholder,
      getValue,
      getLabel,
    }: SelectProps<T>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const toLabel = (option: T) => getLabel?.(option) ?? String(option);
    const toValue = (option: T) => getValue?.(option) ?? String(option);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option: T) => {
      onChange?.(option);
      setOpen(false);
    };

    return (
      <div className={styles.wrapper} ref={wrapperRef}>
        <div
          ref={ref}
          className={`${styles.select} ${open ? styles.open : ''}`}
          onClick={() => setOpen((prev) => !prev)}
          onBlur={onBlur}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setOpen((prev) => !prev);
            if (e.key === 'Escape') setOpen(false);
          }}
        >
          <span className={`${styles.value} body-l`}>
            {value != null ? toLabel(value) : (placeholder ?? '')}
          </span>
          <span className={`${styles.arrow} ${open ? styles.arrowOpen : ''}`}>
            <ChevronIcon />
          </span>
        </div>

        {open && (
          <ul className={styles.dropdown} role="listbox">
            {options.map((option) => {
              const isSelected =
                value != null && toValue(option) === toValue(value);
              return (
                <li
                  key={toValue(option)}
                  className={`${styles.option} ${isSelected ? styles.selected : ''} body-l`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option)}
                >
                  {toLabel(option)}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  },
);

const TypedSelect = Select as <T extends string>(
  props: SelectProps<T> & { ref?: Ref<HTMLDivElement> },
) => ReactElement;

export default TypedSelect;
