import { Injectable } from '@angular/core';

import { ProductAdapter } from '../adapters/product.adapter';

@Injectable({ providedIn: 'root' })
export class ProductConnector {
  constructor(private readonly adapter: ProductAdapter) {}

  get(code: string) {
    return this.adapter.load(code);
  }

  getAll() {
    return this.adapter.loadAll();
  }

  search(query: string) {
    return this.adapter.search(query);
  }
}
