import type { FavouritesSlice, SliceCreator } from './types';

export const createFavouritesSlice: SliceCreator<FavouritesSlice> = (
  set,
  get,
) => ({
  favouriteIds: [],

  addToFavourites: (productId) => {
    if (get().isFavourite(productId)) return;

    set((state) => ({
      favouriteIds: [...state.favouriteIds, productId],
    }));
  },

  removeFromFavourites: (productId) => {
    set((state) => ({
      favouriteIds: state.favouriteIds.filter((id) => id !== productId),
    }));
  },

  isFavourite: (productId) => get().favouriteIds.includes(productId),

  clearFavourites: () => set({ favouriteIds: [] }),
});
