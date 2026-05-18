import { useState } from 'react';
import styles from './Catalog.module.css';
import { useSearchParams } from 'react-router-dom';
import type { ProductCategory } from '../../types';
import { MOCK_PRODUCTS, PRODUCT_CATEGORIES } from '../../db.ts';
import { prettifyCategory } from '../../utils';
import ProductCard from '../../components/ProductCard/ProductCard.tsx';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const selectedCategory = searchParams.get('category');

  const products = selectedCategory
    ? MOCK_PRODUCTS.filter((p) => p.category === selectedCategory)
    : MOCK_PRODUCTS;

  const selectCategory = (category: ProductCategory) => {
    const next = new URLSearchParams(searchParams);
    next.set('category', category);
    next.delete('page');
    setSearchParams(next, { replace: true });
  };

  const clearCategory = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('category');
    setSearchParams(next, { replace: true });
  };

  const handleCategoryCardClick = (category: ProductCategory) => {
    if (selectedCategory === category) {
      clearCategory();
    } else {
      selectCategory(category);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.filterToggleButton} ${isFiltersOpen || selectedCategory ? styles.active : ''}`}
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        aria-label="Toggle filters"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2872_2169)">
            <path
              d="M3.33301 17.5V11.6667M3.33301 8.33333V2.5M9.99967 17.5V10M9.99967 6.66667V2.5M16.6663 17.5V13.3333M16.6663 10V2.5M0.833008 11.6667H5.83301M7.49967 6.66667H12.4997M14.1663 13.3333H19.1663"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2872_2169">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>

      <div
        className={`${styles.filtersContainer} ${isFiltersOpen ? styles.open : ''}`}
      >
        {PRODUCT_CATEGORIES.map((category) => (
          <div
            className={`${styles.filterCard} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => handleCategoryCardClick(category)}
            key={category}
          >
            <svg
              className={styles.checkIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3337 4L6.00033 11.3333L2.66699 8"
                stroke="#F5F5F5"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="body-l">{prettifyCategory(category)}</p>
          </div>
        ))}
      </div>
      <div className={styles.productContainer} key={selectedCategory ?? 'all'}>
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} animationDelay={i * 70} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
