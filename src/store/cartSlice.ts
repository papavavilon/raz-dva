import type { CartSlice, SliceCreator } from './types';
import type { CartItem, SelectedOptions, UAH } from '../types';
import { getProductById } from '../db';

const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const isSameLine = (
  item: CartItem,
  productId: string,
  options: SelectedOptions,
): boolean =>
  item.productId === productId &&
  item.selectedOptions.color === options.color &&
  String(item.selectedOptions.size?.value ?? '') ===
    String(options.size?.value ?? '') &&
  (item.selectedOptions.weight ?? null) === (options.weight ?? null);

const calcSubtotal = (items: CartItem[]): UAH =>
  items.reduce((sum, i) => {
    const product = getProductById(i.productId);
    return sum + product.price * i.quantity;
  }, 0);

export const createCartSlice: SliceCreator<CartSlice> = (set, get) => ({
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  cartItems: [],
  cartSubtotal: 0,

  addToCart: ({ product, selectedOptions, quantity = 1 }) => {
    const existingQty =
      get().cartItems.find((i) => isSameLine(i, product.id, selectedOptions))
        ?.quantity ?? 0;

    if (product.stock < existingQty + quantity) {
      throw new Error(`Only ${product.stock} in stock.`);
    }

    set((state) => {
      const existingIdx = state.cartItems.findIndex((i) =>
        isSameLine(i, product.id, selectedOptions),
      );

      let nextItems: CartItem[];

      if (existingIdx !== -1) {
        nextItems = state.cartItems.map((item, idx) =>
          idx === existingIdx
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        const newItem: CartItem = {
          cartItemId: generateId(),
          productId: product.id,
          selectedOptions,
          quantity,
          addedAt: new Date().toISOString(),
        };
        nextItems = [...state.cartItems, newItem];
      }

      return { cartItems: nextItems, cartSubtotal: calcSubtotal(nextItems) };
    });
  },

  removeFromCart: (cartItemId) => {
    set((state) => {
      const nextItems = state.cartItems.filter(
        (i) => i.cartItemId !== cartItemId,
      );
      return { cartItems: nextItems, cartSubtotal: calcSubtotal(nextItems) };
    });
  },

  updateCartQuantity: (cartItemId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(cartItemId);
      return;
    }

    const item = get().cartItems.find((i) => i.cartItemId === cartItemId);
    if (!item) return;

    const stock = getProductById(item.productId).stock;
    if (stock < quantity) {
      throw new Error(`Only ${stock} in stock.`);
    }

    set((state) => {
      const nextItems = state.cartItems.map((i) =>
        i.cartItemId === cartItemId ? { ...i, quantity } : i,
      );
      return { cartItems: nextItems, cartSubtotal: calcSubtotal(nextItems) };
    });
  },

  isInCart: (productId, options) =>
    get().cartItems.some((i) =>
      options ? isSameLine(i, productId, options) : i.productId === productId,
    ),

  clearCart: () => set({ cartItems: [], cartSubtotal: 0 }),
});
