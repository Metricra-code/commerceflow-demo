import { Injectable } from '@angular/core';

import { ProductConnector } from '../connectors/product.connector';

@Injectable({ providedIn: 'root' })
export class ProductFacade {
  // Components depend on this stable API instead of knowing which commerce backend is active.
  constructor(private readonly connector: ProductConnector) {}

  getProduct(code: string) {
    return this.connector.get(code);
  }

  getProducts() {
    return this.connector.getAll();
  }

  searchProducts(query: string) {
    return this.connector.search(query);
  }
}
