import type { ProductCategory } from '../types';

export function prettifyCategory(category: ProductCategory): string {
  return category
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
