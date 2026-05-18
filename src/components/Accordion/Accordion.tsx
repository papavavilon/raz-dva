import { useState } from 'react';
import styles from './Accordion.module.css';

interface AccordionProps {
  index: number;
  question: string;
  answer: string;
}

const ArrowUp = () => (
  <svg
    width="28"
    height="32"
    viewBox="0 0 28 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M-0.000440203 13.5765L3.39365 16.9706L11.0304 9.33381L11.0305 31.3956L16.1216 31.3956L16.1216 9.33375L23.7584 16.9705L27.1524 13.5764L13.576 4.0461e-06L-0.000440203 13.5765Z"
      fill="#EBEBEB"
    />
  </svg>
);

const ArrowDown = () => (
  <svg
    width="28"
    height="32"
    viewBox="0 0 28 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.1528 17.8189L23.7587 14.4248L16.1219 22.0616L16.1219 -0.000189184L11.0307 -0.000186823L11.0307 22.0616L3.39399 14.4249L-0.000102775 17.8189L13.5763 31.3954L27.1528 17.8189Z"
      fill="#EBEBEB"
    />
  </svg>
);

export default function Accordion({ index, question, answer }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const label = String(index).padStart(2, '0');

  return (
    <div className={styles.item}>
      <button
        className={styles.header}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className="subtitle-l">{label}</span>
        <span className="subtitle-l">{question}</span>
        <span className={styles.icon}>
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </span>
      </button>

      <div className={`${styles.body} ${isOpen ? styles.bodyOpen : ''}`}>
        <p className={`${styles.content} body-l`}>{answer}</p>
      </div>
    </div>
  );
}
