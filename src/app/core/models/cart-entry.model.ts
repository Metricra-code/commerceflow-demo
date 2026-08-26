import { Product } from './product.model';

export interface CartEntry {
  product: Product;
  quantity: number;
}
