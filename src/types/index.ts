export interface Product {
  ref: string;
  name: string;
  weight: string;
  category: string;
  price: number;
}

export interface CartItem {
  id: string; // "${ref}-${selectedWeight}" para granel, "${ref}" para productos envasados
  product: Product;
  selectedWeight?: number; // en gramos (250, 500, 750, 1000, 1500, 2000...)
  quantity: number;
}

export type Category = string;
