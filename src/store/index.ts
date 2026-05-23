import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import type { StoreState } from './types';
import { createUserSlice } from './userSlice';
import { createCartSlice } from './cartSlice';
import { createFavouritesSlice } from './favouritesSlice';
import { createOrdersSlice } from './ordersSlice.ts';

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...args) => ({
        ...createUserSlice(...args),
        ...createCartSlice(...args),
        ...createFavouritesSlice(...args),
        ...createOrdersSlice(...args),
      }),
      { name: 'app-storage' },
    ),
  ),
);

export const useUserSlice = () =>
  useStore(
    useShallow((s) => ({
      user: s.user,
      login: s.login,
      logout: s.logout,
      updateShippingAddress: s.updateShippingAddress,
    })),
  );

export const useCartSlice = () =>
  useStore(
    useShallow((s) => ({
      isCartOpen: s.isCartOpen,
      openCart: s.openCart,
      closeCart: s.closeCart,
      toggleCart: s.toggleCart,
      cartItems: s.cartItems,
      cartSubtotal: s.cartSubtotal,
      addToCart: s.addToCart,
      removeFromCart: s.removeFromCart,
      updateCartQuantity: s.updateCartQuantity,
      isInCart: s.isInCart,
      clearCart: s.clearCart,
    })),
  );

export const useFavouritesSlice = () =>
  useStore(
    useShallow((s) => ({
      favouriteIds: s.favouriteIds,
      addToFavourites: s.addToFavourites,
      removeFromFavourites: s.removeFromFavourites,
      isFavourite: s.isFavourite,
      clearFavourites: s.clearFavourites,
    })),
  );

export const useOrdersSlice = () =>
  useStore(
    useShallow((s) => ({
      orders: s.orders,
      addOrder: s.addOrder,
      clearOrders: s.clearOrders,
    })),
  );
