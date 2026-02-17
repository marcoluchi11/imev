export interface Product {
  ref: string;
  name: string;
  weight: string;
  category: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Category = string;
