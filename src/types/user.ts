import type { ShippingAddress } from './products.ts';

export interface User {
  id: string;
  name: string;
  shippingAddress: Partial<ShippingAddress>;
}
