import React from 'react';
import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import styles from './RadioAccordion.module.css';

export type AccordionOption = {
  value: string;
  label: React.ReactNode;
  content?: React.ReactNode;
  headerRightContent?: React.ReactNode;
};

type Props<T extends FieldValues> = {
  name: Path<T>;
  options: AccordionOption[];
  register: UseFormRegister<T>;
  selectedValue?: string;
};

export function RadioAccordion<T extends FieldValues>({
  name,
  options,
  register,
  selectedValue,
}: Props<T>) {
  return (
    <div className={styles.container}>
      {options.map((opt) => {
        const isActive = selectedValue === opt.value;

        return (
          <div key={opt.value} className={styles.item}>
            <label className={styles.headerWrapper}>
              <div className={styles.header}>
                <input
                  type="radio"
                  value={opt.value}
                  {...register(name)}
                  className={styles.hiddenInput}
                />

                <div className={styles.radioOuter}>
                  <div
                    className={`${styles.radioInner} ${
                      isActive ? styles.radioInnerActive : ''
                    }`}
                  />
                </div>

                <p className="body-bold-xl">{opt.label}</p>
              </div>
              {opt.headerRightContent}
            </label>

            {opt.content && (
              <div
                className={`${styles.contentWrapper} ${
                  isActive ? styles.contentWrapperActive : ''
                }`}
              >
                <div className={styles.contentInner}>
                  <div className={styles.content}>{opt.content}</div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
