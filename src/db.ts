import type { ProductDB } from './types';
import { loadProductImages } from './utils';

export const PRODUCT_CATEGORIES = [
  'gloves',
  'rashguards',
  'pads',
  'bags',
  'shoes',
  'shorts',
  'gear',
] as const;

const now = new Date().toISOString();

export const MOCK_PRODUCTS: ProductDB[] = [
  {
    id: 'prod-001',
    slug: 'rudis-ninety-5',
    name: 'Rudis Ninety 5',
    nameUa: 'Борцівки Rudis Ninety 5',
    brand: 'Rudis',
    category: 'shoes',
    description:
      'High-performance wrestling shoes with superior ankle support.',
    price: 4200,
    images: loadProductImages('prod-001', 'Rudis Ninety 5 Wrestling Shoes'),
    availableColors: [],
    availableSizes: [{ type: 'us', value: 9, label: '9US (27 cm)' }],
    stock: 5,
    isAvailable: true,
    createdAt: now,
  },

  {
    id: 'prod-009',
    slug: 'nike-hyper-ko2',
    name: 'Nike Hyper KO 2',
    nameUa: 'Боксерки Nike Hyper KO 2',
    brand: 'Nike',
    category: 'shoes',
    description:
      'Lightweight boxing shoes built for speed and agility in the ring.',
    price: 7700,
    images: loadProductImages('prod-009', 'Nike Hyper KO 2 boxing shoes'),
    availableColors: [],
    availableSizes: [{ type: 'us', value: 8, label: '8US' }],
    stock: 3,
    isAvailable: true,
    createdAt: now,
  },

  {
    id: 'prod-015',
    slug: 'ks-infinity-edge-cowboy',
    name: 'KS Infinity Edge Adult Wrestling Shoes – Cowboy',
    nameUa: 'Борцівки KS Infinity Edge Adult Wrestling Shoes – Cowboy',
    brand: 'KS',
    category: 'shoes',
    description:
      'Adult wrestling shoes with Infinity Edge technology – Cowboy colorway.',
    price: 4800,
    images: loadProductImages(
      'prod-015',
      'KS Infinity Edge Adult Wrestling Shoes – Cowboy',
    ),
    availableColors: [],
    availableSizes: [{ type: 'cm', value: 28, label: '28 cm (insole)' }],
    stock: 4,
    isAvailable: true,
    createdAt: now,
  },

  {
    id: 'prod-016',
    slug: 'ks-infinity-edge-ammo',
    name: 'KS Infinity Edge Adult Wrestling Shoes – Ammo',
    nameUa: 'Борцівки KS Infinity Edge Adult Wrestling Shoes – Ammo',
    brand: 'KS',
    category: 'shoes',
    description:
      'Adult wrestling shoes with Infinity Edge technology – Ammo colorway.',
    price: 5200,
    images: loadProductImages(
      'prod-016',
      'KS Infinity Edge Adult Wrestling Shoes – Ammo',
    ),
    availableColors: [],
    availableSizes: [{ type: 'cm', value: 28, label: '28 cm (insole)' }],
    stock: 4,
    isAvailable: true,
    createdAt: now,
  },

  {
    id: 'prod-017',
    slug: 'nike-hypersweep',
    name: 'Nike Hypersweep',
    nameUa: 'Борцівки Nike Hypersweep',
    brand: 'Nike',
    category: 'shoes',
    description:
      'Premium wrestling shoes with excellent mat feel and durability.',
    price: 3800,
    images: loadProductImages('prod-017', 'Nike Hypersweep Wrestling Shoes'),
    availableColors: [],
    availableSizes: [{ type: 'cm', value: 29.5, label: '29.5 cm (insole)' }],
    stock: 2,
    isAvailable: true,
    createdAt: now,
  },

  {
    id: 'prod-002',
    slug: 'boxing-gloves-aura-plus',
    name: 'Boxing Gloves Aura Plus',
    nameUa: 'Боксерські рукавиці Boxing Gloves Aura Plus',
    brand: 'Aura',
    category: 'gloves',
    description:
      'Premium boxing gloves available in black and green. Great wrist support and knuckle padding.',
    price: 2400,
    images: loadProductImages('prod-002', 'Boxing Gloves Aura Plus'),
    availableColors: ['black', 'green'],
    availableSizes: [],
    availableWeights: [12, 14],
    stock: 23,
    isAvailable: true,
    createdAt: now,
  },

  {
    id: 'prod-004',
    slug: 'venum-top-rank-original-hammer',
    name: 'Venum x Top Rank Original Hammer',
    nameUa: 'Боксерські рукавиці Venum x Top Rank Original Hammer',
    brand: 'Venum',
    category: 'gloves',
    description:
      'Co-branded Venum x Top Rank boxing gloves with superior protection.',
    price: 9200,
    images: loadProductImages(
      'prod-004',
      'Venum x Top Rank Original Hammer Boxing Gloves',
    ),
    availableColors: ['black'],
    availableSizes: [],
    availableWeights: [12, 14],
    stock: 9,
    isAvailable: true,
    createdAt: now,
  },

  {
    id: 'prod-005',
    slug: 'hayabusa-star-wars-boba-fett',
    name: 'Hayabusa x Star Wars – Boba Fett Edition',
    nameUa: 'Боксерські рукавиці Hayabusa x Star Wars – Boba Fett Edition',
    brand: 'Hayabusa',
    category: 'gloves',
    description:
      'Limited edition Hayabusa boxing gloves featuring the iconic Boba Fett design.',
    price: 12300,
    images: loadProductImages(
      'prod-005',
      'Hayabusa x Star Wars – Boba Fett Edition Boxing Gloves',
    ),
    availableColors: ['green'],
    availableSizes: [],
    availableWeights: [12],
    stock: 3,
    isAvailable: true,
    createdAt: now,
  },

  {
    id: 'prod-006',
    slug: 'hayabusa-star-wars-trooper',
    name: 'Hayabusa x Star Wars – Trooper Edition',
    nameUa: 'Боксерські рукавиці Hayabusa x Star Wars – Trooper Edition',
    brand: 'Hayabusa',
    category: 'gloves',
    description:
      'Limited edition Hayabusa boxing gloves featuring the Stormtrooper design.',
    price: 12300,
    images: loadProductImages(
      'prod-006',
      'Hayabusa x Star Wars Trooper Boxing Gloves',
    ),
    availableColors: ['white'],
    availableSizes: [],
    availableWeights: [12],
    stock: 3,
    isAvailable: true,
    createdAt: now,
  },

  {
    id: 'prod-007',
    slug: 'hayabusa-star-wars-sith',
    name: 'Hayabusa x Star Wars – Sith Edition',
    nameUa: 'Боксерські рукавиці Hayabusa x Star Wars – Sith Edition',
    brand: 'Hayabusa',
    category: 'gloves',
    description:
      'Limited edition Hayabusa boxing gloves featuring the Sith / Darth Vader design.',
    price: 12300,
    images: loadProductImages(
      'prod-007',
      'Hayabusa x Star Wars Sith Boxing Gloves',
    ),
    availableColors: ['black', 'red'],
    availableSizes: [],
    availableWeights: [12],
    stock: 3,
    isAvailable: true,
    createdAt: now,
  },

  {
    id: 'prod-012',
    slug: 'rdx-immaf-gloves',
    name: 'RDX IMMAF Gloves',
    nameUa: 'Рукавиці для ММА RDX IMMAF',
    brand: 'RDX',
    category: 'gloves',
    description: 'Official IMMAF-approved RDX competition gloves.',
    price: 2500,
    images: loadProductImages('prod-012', 'RDX IMMAF Gloves'),
    availableColors: ['blue'],
    availableSizes: [
      { type: 'clothing', value: 'S', label: 'S' },
      { type: 'clothing', value: 'L', label: 'L' },
    ],
    stock: 11,
    isAvailable: true,
    createdAt: now,
  },

  {
    id: 'prod-008',
    slug: 'honour-conviction-shorts',
    name: 'Honour & Conviction Shorts',
    nameUa: 'Шорти Honour & Conviction',
    brand: 'Honour & Conviction',
    category: 'shorts',
    description: 'High-quality MMA/boxing shorts with a comfortable fit.',
    price: 2000,
    images: loadProductImages('prod-008', 'Honour & Conviction Shorts'),
    availableColors: [],
    availableSizes: [
      { type: 'clothing', value: 'M', label: 'M' },
      { type: 'clothing', value: 'L', label: 'L' },
    ],
    stock: 13,
    isAvailable: true,
    createdAt: now,
  },

  {
    id: 'prod-011',
    slug: 'rdx-immaf-shorts-red',
    name: 'RDX IMMAF Shorts red',
    nameUa: 'Шорти RDX IMMAF',
    brand: 'RDX',
    category: 'shorts',
    description:
      'Official IMMAF-approved RDX competition shorts, available in red and blue.',
    price: 2300,
    images: loadProductImages('prod-011', 'RDX IMMAF Shorts'),
    availableColors: ['red'],
    availableSizes: [
      { type: 'clothing', value: 'S', label: 'S' },
      { type: 'clothing', value: 'M', label: 'M' },
    ],
    stock: 10,
    isAvailable: true,
    createdAt: now,
  },

  {
    id: 'prod-014',
    slug: 'rdx-immaf-shorts-blue',
    name: 'RDX IMMAF Shorts blue',
    nameUa: 'Шорти RDX IMMAF',
    brand: 'RDX',
    category: 'shorts',
    description:
      'Official IMMAF-approved RDX competition shorts, available in red and blue.',
    price: 2300,
    images: loadProductImages('prod-014', 'RDX IMMAF Shorts'),
    availableColors: ['blue'],
    availableSizes: [
      { type: 'clothing', value: 'S', label: 'S' },
      { type: 'clothing', value: 'M', label: 'M' },
    ],
    stock: 10,
    isAvailable: true,
    createdAt: now,
  },

  {
    id: 'prod-010',
    slug: 'rdx-immaf-rashguard-red',
    name: 'RDX IMMAF Rashguard red',
    nameUa: 'Рашгард RDX IMMAF',
    brand: 'RDX',
    category: 'rashguards',
    description:
      'Official IMMAF-approved RDX compression rashguard for competition and training.',
    price: 2100,
    images: loadProductImages('prod-010', 'RDX IMMAF Rashguard'),
    availableColors: ['red'],
    availableSizes: [
      { type: 'clothing', value: 'S', label: 'S' },
      { type: 'clothing', value: 'M', label: 'M' },
    ],
    stock: 15,
    isAvailable: true,
    createdAt: now,
  },

  {
    id: 'prod-013',
    slug: 'rdx-immaf-rashguard-blue',
    name: 'RDX IMMAF Rashguard blue',
    nameUa: 'Рашгард RDX IMMAF',
    brand: 'RDX',
    category: 'rashguards',
    description:
      'Official IMMAF-approved RDX compression rashguard for competition and training.',
    price: 2100,
    images: loadProductImages('prod-013', 'RDX IMMAF Rashguard'),
    availableColors: ['blue'],
    availableSizes: [
      { type: 'clothing', value: 'S', label: 'S' },
      { type: 'clothing', value: 'M', label: 'M' },
    ],
    stock: 15,
    isAvailable: true,
    createdAt: now,
  },

  {
    id: 'prod-003',
    slug: 'fuji-duffle-backpack',
    name: 'Fuji Duffle Backpack',
    nameUa: 'Сумка-рюкзак Fuji Duffle Backpack',
    brand: 'Fuji',
    category: 'bags',
    description: 'Spacious and durable duffle backpack for gym and travel.',
    price: 3200,
    images: loadProductImages('prod-003', 'Fuji Duffle Backpack'),
    availableColors: ['black'],
    availableSizes: [],
    stock: 10,
    isAvailable: true,
    createdAt: now,
  },

  {
    id: 'prod-018',
    slug: 'rdx-t13-mitts',
    name: 'RDX T-13 Pads',
    nameUa: 'Лапи для боксу RDX T-13',
    brand: 'RDX',
    category: 'pads',
    description: 'Durable and shock-absorbing boxing mitts for trainers.',
    price: 2200,
    images: loadProductImages('prod-018', 'RDX T-13 Boxing Mitts'),
    availableColors: ['red'],
    availableSizes: [],
    stock: 9,
    isAvailable: true,
    createdAt: now,
  },
];

export const getProductById = (id: string): ProductDB => {
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  if (!product) {
    throw new Error('404: Product not found');
  }
  return product;
};

export const getProductBySlug = (slug: string): ProductDB => {
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    throw new Error('404: Product not found');
  }
  return product;
};
