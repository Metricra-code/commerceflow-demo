import { firstValueFrom } from 'rxjs';

import { Product } from '../../../core/models/product.model';
import { CartService } from './cart.service';

const PRODUCT: Product = {
  code: 'shoe001',
  name: 'Urban Runner',
  description: 'Test product',
  category: 'Road Running',
  price: 138,
  currency: 'USD',
  imageUrl: '/images/shoe001.svg',
  stockStatus: 'IN_STOCK'
};

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    service = new CartService();
  });

  it('calculates the total from price and quantity', async () => {
    service.add(PRODUCT, 2);

    expect(await firstValueFrom(service.cartTotal$)).toBe(276);
  });

  it('increments an existing product instead of adding a duplicate entry', async () => {
    service.add(PRODUCT);
    service.add(PRODUCT, 2);

    const entries = await firstValueFrom(service.cart$);

    expect(entries.length).toBe(1);
    expect(entries[0].quantity).toBe(3);
  });
});
