import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Popover.module.css';

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
  offset?: number;
  align?: 'left' | 'center' | 'right';
}

export const Popover: React.FC<PopoverProps> = ({
  isOpen,
  onClose,
  anchorEl,
  children,
  offset = 8,
  align = 'left',
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: -9999, left: -9999 });

  useEffect(() => {
    if (isOpen && anchorEl && popoverRef.current) {
      const calculatePosition = () => {
        const anchorRect = anchorEl.getBoundingClientRect();
        const popoverRect = popoverRef.current!.getBoundingClientRect();

        let left = 0;
        switch (align) {
          case 'center':
            left =
              anchorRect.left + anchorRect.width / 2 - popoverRect.width / 2;
            break;
          case 'right':
            left = anchorRect.right - popoverRect.width;
            break;
          case 'left':
          default:
            left = anchorRect.left;
            break;
        }

        let top = anchorRect.bottom + offset;

        if (left + popoverRect.width > window.innerWidth) {
          left = window.innerWidth - popoverRect.width - offset;
        }

        if (left < offset) {
          left = offset;
        }

        if (top + popoverRect.height > window.innerHeight) {
          top = anchorRect.top - popoverRect.height - offset;
        }

        setPosition({ top, left });
      };

      calculatePosition();

      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition, true);

      return () => {
        window.removeEventListener('resize', calculatePosition);
        window.removeEventListener('scroll', calculatePosition, true);
      };
    }
  }, [isOpen, anchorEl, offset, align]);

  return createPortal(
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={onClose}
      />
      <div
        ref={popoverRef}
        className={`${styles.container} ${isOpen ? styles.containerOpen : ''}`}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        {children}
      </div>
    </>,
    document.body,
  );
};
