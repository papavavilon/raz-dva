import type { ProductCard, ProductCategory, ProductDB } from '../types';
import { MOCK_PRODUCTS } from '../db.ts';

const toCard = (p: ProductDB): ProductCard => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  nameUa: p.nameUa,
  brand: p.brand,
  category: p.category,
  price: p.price,
  images: p.images,
  availableColors: p.availableColors,
  isAvailable: p.isAvailable,
});

export class ProductService {
  private readonly source: ProductDB[];

  constructor(source: ProductDB[] = MOCK_PRODUCTS) {
    this.source = source;
  }

  getAll(categories?: ProductCategory[]): ProductCard[] {
    if (!categories?.length) return this.source.map(toCard);
    return this.source
      .filter((p) => categories.includes(p.category))
      .map(toCard);
  }

  getById(id: string): ProductDB | undefined {
    return this.source.find((p) => p.id === id);
  }

  getBySlug(slug: string): ProductDB | undefined {
    return this.source.find((p) => p.slug === slug);
  }

  getCategories(): ProductCategory[] {
    return [...new Set(this.source.map((p) => p.category))];
  }
}

export const productService = new ProductService();
