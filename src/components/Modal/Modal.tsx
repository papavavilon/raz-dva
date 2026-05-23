import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ANIMATION_DURATION = 300;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setShouldRender(true);
      setIsAnimatingOut(false);
    } else {
      setIsAnimatingOut(true);
    }
  }

  useEffect(() => {
    if (isAnimatingOut) {
      const timerId = setTimeout(() => {
        setShouldRender(false);
        setIsAnimatingOut(false);
      }, ANIMATION_DURATION);

      return () => clearTimeout(timerId);
    }
  }, [isAnimatingOut]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return createPortal(
    <div
      className={`${styles.overlay} ${isAnimatingOut ? styles.overlayOut : ''}`}
      onClick={onClose}
    >
      <div
        className={`${styles.modal} ${isAnimatingOut ? styles.modalOut : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
