import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { OccProductListResponse } from '../../../core/models/product.model';
import { MockOccProductAdapter } from './mock-occ-product.adapter';

const RESPONSE: OccProductListResponse = {
  products: [
    {
      code: 'shoe001',
      name: 'Urban Runner',
      description: 'Road shoe',
      category: 'Road Running',
      price: 138,
      currency: 'USD',
      imageUrl: '/images/shoe001.svg',
      stockStatus: 'IN_STOCK'
    },
    {
      code: 'shoe003',
      name: 'Trail One',
      description: 'Trail shoe',
      category: 'Trail',
      price: 164,
      currency: 'USD',
      imageUrl: '/images/shoe003.svg',
      stockStatus: 'IN_STOCK'
    }
  ],
  pagination: { currentPage: 0, pageSize: 2, totalResults: 2 }
};

describe('MockOccProductAdapter', () => {
  let adapter: MockOccProductAdapter;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockOccProductAdapter, provideHttpClient(), provideHttpClientTesting()]
    });

    adapter = TestBed.inject(MockOccProductAdapter);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it('filters products by category without case sensitivity', fakeAsync(() => {
    let resultCount = 0;

    adapter.search('trail').subscribe(products => (resultCount = products.length));
    httpController.expectOne('/api/occ/v2/electronics-spa/products.json').flush(RESPONSE);
    tick(320);

    expect(resultCount).toBe(1);
  }));
});
