import { useState } from 'react';
import { getProductById } from '../../../db.ts';
import styles from './CartItem.module.css';
import type { CartItem as ICartItem } from '../../../types';
import { useTranslation } from 'react-i18next';
import toTitleCase from '../../../utils/toTitleCase.ts';
import Counter from '../../Counter/Counter.tsx';
import { getProductPreviewImg } from '../../../utils';

interface CartItemProps {
  cartItem: ICartItem;
  onQuantityChange: (quantity: number) => void;
  onDelete: () => void;
}

const CartItem = ({ cartItem, onQuantityChange, onDelete }: CartItemProps) => {
  const { t, i18n } = useTranslation();
  const [isDeleting, setIsDeleting] = useState(false);

  const product = getProductById(cartItem.productId);
  const productPreviewImg = getProductPreviewImg(cartItem.productId);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete();
    }, 300);
  };

  return (
    <div className={`${styles.container} ${isDeleting ? styles.deleting : ''}`}>
      <div className={styles.imgContainer}>
        <img src={productPreviewImg.url} alt={productPreviewImg.alt} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <p className="body-bold-l">
            {i18n.language === 'ua' ? product.nameUa : product.name}
          </p>
          <button className={styles.deleteContainer} onClick={handleDelete}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.46484 15.5348L15.5368 8.46484M8.46484 8.46484L15.5368 15.5348"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        <div className={styles.priceContainer}>
          <p className="body-bold-m">₴</p>
          <p className="body-bold-l">{product.price}</p>
        </div>
        <div className={styles.variantsWrapper}>
          {cartItem.selectedOptions.color && (
            <div className={styles.variantContainer}>
              <p className="body-m">{t('Color')}</p>
              <p className="body-l">
                {toTitleCase(t(cartItem.selectedOptions.color))}
              </p>
            </div>
          )}
          {cartItem.selectedOptions.size && (
            <div className={styles.variantContainer}>
              <p className="body-m">{t('Size')}</p>
              <p className="body-l">{cartItem.selectedOptions.size.label}</p>
            </div>
          )}
          {cartItem.selectedOptions.weight && (
            <div className={styles.variantContainer}>
              <p className="body-m">{t('Weight')}</p>
              <p className="body-l">{cartItem.selectedOptions.weight} Oz</p>
            </div>
          )}
        </div>
        <div className={styles.counterWrapper}>
          <Counter
            value={cartItem.quantity}
            onChange={onQuantityChange}
            min={1}
            max={100}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
