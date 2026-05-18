import React, { type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonVariant =
  | 'outline-light'
  | 'outline-dark'
  | 'main'
  | 'secondary'
  | 'success'
  | 'light';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  children: React.ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  'outline-light': styles.outlineLight,
  'outline-dark': styles.outlineDark,
  main: styles.main,
  secondary: styles.secondary,
  success: styles.success,
  light: styles.light,
};

export const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  className,
  ...props
}) => {
  const classes = [styles.base, variantClass[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
