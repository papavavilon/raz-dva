import { PRODUCT_CATEGORIES } from '../db.ts';

export type UAH = number;

export type SizeUS = number;
export type SizeCm = number;
export type SizeClothing = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type WeightOz = 10 | 12 | 14 | 16 | 18;

export type Size = SizeUS | SizeCm | SizeClothing;

export type SizeType = 'us' | 'eu' | 'cm' | 'clothing';

export interface SizeOption {
  type: SizeType;
  value: Size;
  label: string;
}

export type ProductColor =
  | 'black'
  | 'white'
  | 'red'
  | 'blue'
  | 'green'
  | 'gold'
  | 'silver'
  | 'grey'
  | (string & {});

export type ProductCategory =
  | (typeof PRODUCT_CATEGORIES)[number]
  | (string & {});

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductDB {
  id: string;
  slug: string;
  name: string;
  nameUa?: string;
  brand: string;
  category: ProductCategory;
  description: string;
  price: UAH;
  images: ProductImage[];

  availableColors: ProductColor[];
  availableSizes: SizeOption[];
  availableWeights?: WeightOz[];

  stock: number;
  isAvailable: boolean;

  createdAt: string;
}

export interface SelectedOptions {
  color?: ProductColor;
  size?: SizeOption;
  weight?: WeightOz;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  selectedOptions: SelectedOptions;
  quantity: number;
  addedAt: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderLineItem {
  lineItemId: string;
  productSnapshot: {
    productId: string;
    slug: string;
    name: string;
    nameUa?: string;
    brand: string;
    category: ProductCategory;
    imageUrl: string;
  };
  selectedOptions: SelectedOptions;
  quantity: number;
  unitPrice: UAH;
  totalPrice: UAH;
}

export interface ShippingAddress {
  email: string;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  postalCode: string;
  city: string;
  phone: string;
}

export type PaymentMethod = 'paypal' | 'card' | 'google' | 'apple';
export type CardProvider = 'Visa' | 'Mastercard' | 'Unknown';

export interface Order {
  orderId: string;
  orderNumber: string;
  userId?: string;
  status: OrderStatus;
  items: OrderLineItem[];
  shippingAddress: ShippingAddress;
  subtotal: UAH;
  shippingCost: UAH;
  discount: UAH;
  total: UAH;
  paymentMethod: PaymentMethod;
  cardNumberSnapshot?: string;
  cardProvider?: CardProvider;
  placedAt: string;
  updatedAt: string;
}

export type ProductCard = Pick<
  ProductDB,
  | 'id'
  | 'slug'
  | 'name'
  | 'nameUa'
  | 'brand'
  | 'category'
  | 'price'
  | 'images'
  | 'availableColors'
  | 'isAvailable'
>;
