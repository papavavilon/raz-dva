import type { CreateOrderParams, OrdersSlice, SliceCreator } from './types';
import type { Order, OrderLineItem } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { getProductById } from '../db.ts';
import { getProductPreviewImg } from '../utils';

const generateOrderNumber = () =>
  `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

export const createOrdersSlice: SliceCreator<OrdersSlice> = (set) => ({
  orders: [],

  addOrder: (params: CreateOrderParams) => {
    const now = new Date().toISOString();
    const { cartItems, ...orderData } = params;

    const orderItems: OrderLineItem[] = cartItems.map((cartItem) => {
      const product = getProductById(cartItem.productId);

      const primaryImage = getProductPreviewImg(product.id);

      return {
        lineItemId: uuidv4(),
        productSnapshot: {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          nameUa: product.nameUa,
          brand: product.brand,
          category: product.category,
          imageUrl: primaryImage?.url || '',
        },
        selectedOptions: cartItem.selectedOptions,
        quantity: cartItem.quantity,
        unitPrice: product.price,
        totalPrice: product.price * cartItem.quantity,
      };
    });

    const newOrder: Order = {
      ...orderData,
      items: orderItems,
      orderId: uuidv4(),
      orderNumber: generateOrderNumber(),
      status: 'pending',
      placedAt: now,
      updatedAt: now,
    };

    set((state) => ({
      orders: [newOrder, ...state.orders],
    }));

    return newOrder;
  },

  clearOrders: () => set({ orders: [] }),
});
