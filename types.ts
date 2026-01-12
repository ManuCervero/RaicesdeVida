export type Category = 'velas' | 'aromatizadores' | 'combos';

export interface Variant {
  id: string;
  name: string; // e.g., "200g", "500ml"
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number; // Base price for display
  category: Category;
  images: string[];
  tags: string[]; // e.g., "Holística", "Cálida", "Difusor", "Spray"
  variants: Variant[];
  isFeatured: boolean;
  isNew: boolean;
  notes: string[]; // Aroma notes
}

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  variantName: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  location?: string;
  date: string;
}

export interface Order {
  orderNumber: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped';
  customer: {
    name: string;
    email: string;
  };
}