import type { SliceCreator, UserSlice } from './types';
import type { ShippingAddress } from '../types';

export const createUserSlice: SliceCreator<UserSlice> = (set, get) => ({
  user: null,
  login: (name) => set({ user: { id: '1', name, shippingAddress: {} } }),
  logout: () => {
    get().clearFavourites();
    set({ user: null });
  },
  updateShippingAddress: (newAddress: ShippingAddress) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            shippingAddress: {
              ...state.user.shippingAddress,
              ...newAddress,
            },
          }
        : null,
    })),
});
