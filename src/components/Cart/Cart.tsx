import { useState } from 'react';
import styles from './Cart.module.css';
import { useTranslation } from 'react-i18next';
import { useCartSlice } from '../../store';
import { Button } from '../Button/Button.tsx';
import CartItem from './components/CartItem.tsx';
import { useNavigate } from 'react-router-dom';
import FloatingButton from '../FloatingButton/FloatingButton.tsx';
import Drawer from '../Drawer/Drawer.tsx';
import { notify } from '../../utils';

const Cart = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cartSlice = useCartSlice();

  const [isOpen, setIsOpen] = useState(false);

  const isVisible = cartSlice.cartItems.length > 0;

  const handleQuantityChange = (cartItemId: string) => {
    return (quantity: number) => {
      try {
        cartSlice.updateCartQuantity(cartItemId, quantity);
      } catch (error) {
        if (error instanceof Error) {
          notify.error(error.message);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    };
  };

  const handleItemDelete = (cartItemId: string) => {
    return () => cartSlice.removeFromCart(cartItemId);
  };

  const handleCheckout = () => {
    if (cartSlice.cartSubtotal > 0) {
      navigate('/checkout');
    }
  };

  return (
    <>
      <FloatingButton
        onClick={() => setIsOpen(true)}
        icon={
          <svg
            className={styles.cartIcon}
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.02868 26.4017C5.51358 25.8685 5.25604 25.228 5.25604 24.48C5.25604 23.732 5.51358 23.0919 6.02868 22.5597C6.54377 22.0274 7.16223 21.7609 7.88406 21.76C8.60589 21.7591 9.22479 22.0256 9.74075 22.5597C10.2567 23.0937 10.5138 23.7338 10.5121 24.48C10.5103 25.2262 10.2532 25.8667 9.74075 26.4017C9.22829 26.9366 8.60939 27.2027 7.88406 27.2C7.15872 27.1973 6.54026 26.9312 6.02868 26.4017ZM19.1688 26.4017C18.6537 25.8685 18.3961 25.228 18.3961 24.48C18.3961 23.732 18.6537 23.0919 19.1688 22.5597C19.6839 22.0274 20.3023 21.7609 21.0242 21.76C21.746 21.7591 22.3649 22.0256 22.8808 22.5597C23.3968 23.0937 23.6539 23.7338 23.6522 24.48C23.6504 25.2262 23.3933 25.8667 22.8808 26.4017C22.3684 26.9366 21.7495 27.2027 21.0242 27.2C20.2988 27.1973 19.6804 26.9312 19.1688 26.4017ZM5.51884 2.72H27.2L20.6628 14.96H9.32947L7.88406 17.68H23.6522V20.4H3.44928L7.35845 13.056L2.62802 2.72H0V0H4.27053L5.51884 2.72Z"
              fill="black"
            />
          </svg>
        }
        count={cartSlice.cartItems.length}
        isVisible={isVisible}
      />

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={t('Your Cart')}
      >
        <div className={styles.cartContent}>
          {cartSlice.cartItems.length === 0 && (
            <div className={styles.emptyWrapper}>
              <p className="body-l">{t('Your cart is empty...')}</p>
            </div>
          )}
          <div className={styles.productsList}>
            {cartSlice.cartItems.map((item) => (
              <CartItem
                key={item.cartItemId}
                cartItem={item}
                onQuantityChange={handleQuantityChange(item.cartItemId)}
                onDelete={handleItemDelete(item.cartItemId)}
              />
            ))}
          </div>
          {cartSlice.cartSubtotal > 0 && (
            <Button
              variant="secondary"
              className={styles.checkoutBtn}
              onClick={handleCheckout}
            >
              <p className={styles.uah}>₴</p>
              <p>
                {cartSlice.cartSubtotal} {t('- CHECK OUT')}
              </p>
            </Button>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
