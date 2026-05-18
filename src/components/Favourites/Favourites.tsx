import { useState } from 'react';
import styles from './Favourites.module.css';
import { useTranslation } from 'react-i18next';
import { useFavouritesSlice } from '../../store';
import FloatingButton from '../FloatingButton/FloatingButton.tsx';
import Drawer from '../Drawer/Drawer.tsx';
import ProductCard from '../ProductCard/ProductCard.tsx';
import { getProductById } from '../../db.ts';

const Favourites = () => {
  const { t } = useTranslation();
  const favouritesSlice = useFavouritesSlice();
  const [isOpen, setIsOpen] = useState(false);

  const isVisible = favouritesSlice.favouriteIds.length > 0;

  const onProductClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <FloatingButton
        onClick={() => setIsOpen(true)}
        icon={
          <svg
            className={styles.heartIcon}
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_2801_618)">
              <path
                d="M26.839 5.93716C26.1812 5.27906 25.4002 4.75701 24.5406 4.40083C23.681 4.04465 22.7596 3.86133 21.8291 3.86133C20.8987 3.86133 19.9773 4.04465 19.1177 4.40083C18.2581 4.75701 17.4771 5.27906 16.8193 5.93716L15.4541 7.30232L14.089 5.93716C12.7603 4.60847 10.9582 3.86202 9.07914 3.86202C7.20008 3.86202 5.39798 4.60847 4.06929 5.93716C2.74059 7.26586 1.99414 9.06795 1.99414 10.947C1.99414 12.8261 2.74059 14.6282 4.06929 15.9569L15.4541 27.3417L26.839 15.9569C27.4971 15.2991 28.0191 14.5181 28.3753 13.6585C28.7315 12.7988 28.9148 11.8775 28.9148 10.947C28.9148 10.0165 28.7315 9.09518 28.3753 8.23557C28.0191 7.37596 27.4971 6.59496 26.839 5.93716Z"
                stroke="#1E1E1E"
                stroke-width="3.09091"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_2801_618">
                <rect width="30.9091" height="30.9091" fill="white" />
              </clipPath>
            </defs>
          </svg>
        }
        isVisible={isVisible}
      />

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={t('Favourites')}
      >
        <div className={styles.favouritesContent}>
          {favouritesSlice.favouriteIds.map((itemId) => (
            <ProductCard
              key={itemId}
              product={getProductById(itemId)}
              onClick={onProductClick}
            />
          ))}
          {favouritesSlice.favouriteIds.length === 0 && (
            <div className={styles.emptyWrapper}>
              <p className="body-l">{t('Your favourites are empty...')}</p>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Favourites;
