import { getProductById } from '../db.ts';

const imageModules = import.meta.glob<{ default: string }>(
  '@assets/products/prod-*.png',
  { eager: true },
);

const imageMap: Record<string, string> = Object.fromEntries(
  Object.entries(imageModules).map(([path, mod]) => {
    const filename = path.split('/').pop()!.replace('.png', '');
    return [filename, mod.default];
  }),
);

import type { ProductImage } from '../types';

export const loadProductImages = (
  productId: string,
  altText?: string,
): ProductImage[] => {
  const matched = Object.entries(imageMap)
    .filter(([key]) => key.startsWith(`${productId}-`))
    .sort(([a], [b]) => a.localeCompare(b));

  return matched.map(([key, url], idx) => ({
    url,
    alt: altText ?? `${key.replace(/-\d+$/, '')} image ${idx + 1}`,
    isPrimary: idx === 0,
  }));
};

export const getProductImages = (productId: string) => {
  const product = getProductById(productId);

  return product.images.filter((i) => !i.isPrimary);
};

export const getProductPreviewImg = (productId: string) => {
  const product = getProductById(productId);

  return product.images.find((i) => i.isPrimary) ?? product.images[0];
};
