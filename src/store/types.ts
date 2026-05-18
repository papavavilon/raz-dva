import type { StateCreator } from 'zustand';
import type {
  CartItem,
  Order,
  ProductDB,
  SelectedOptions,
  ShippingAddress,
  UAH,
  User,
} from '../types';

export interface UserSlice {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
  updateShippingAddress: (newAddress: ShippingAddress) => void;
}

export interface AddToCartParams {
  product: ProductDB;
  selectedOptions: SelectedOptions;
  quantity?: number;
}

export interface CartSlice {
  cartItems: CartItem[];
  cartSubtotal: UAH;
  addToCart: (params: AddToCartParams) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  isInCart: (productId: string, options?: SelectedOptions) => boolean;
  clearCart: () => void;
}

export interface FavouritesSlice {
  favouriteIds: string[];
  addToFavourites: (productId: string) => void;
  removeFromFavourites: (productId: string) => void;
  isFavourite: (productId: string) => boolean;
  clearFavourites: () => void;
}

export interface CreateOrderParams extends Omit<
  Order,
  'orderId' | 'orderNumber' | 'status' | 'placedAt' | 'updatedAt' | 'items'
> {
  cartItems: CartItem[];
}

export interface OrdersSlice {
  orders: Order[];
  addOrder: (params: CreateOrderParams) => Order;
  clearOrders: () => void;
}

export type StoreState = UserSlice & CartSlice & FavouritesSlice & OrdersSlice;

export type SliceCreator<T> = StateCreator<StoreState, [], [], T>;
