import { Outlet } from 'react-router-dom';
import Cart from '../../components/Cart/Cart.tsx';
import Favourites from '../../components/Favourites/Favourites.tsx';
import styles from './CatalogLayout.module.css';

export default function CatalogLayout() {
  return (
    <>
      <Outlet />
      <div className={styles.floatingContainer}>
        <Favourites />
        <Cart />
      </div>
    </>
  );
}
