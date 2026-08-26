import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProductConnector } from '../connectors/product.connector';
import { ProductFacade } from './product.facade';

describe('ProductFacade', () => {
  let facade: ProductFacade;
  let connector: jasmine.SpyObj<ProductConnector>;

  beforeEach(() => {
    connector = jasmine.createSpyObj<ProductConnector>('ProductConnector', [
      'get',
      'getAll',
      'search'
    ]);
    connector.getAll.and.returnValue(of([]));

    TestBed.configureTestingModule({
      providers: [ProductFacade, { provide: ProductConnector, useValue: connector }]
    });

    facade = TestBed.inject(ProductFacade);
  });

  it('delegates product loading to the connector', () => {
    facade.getProducts();

    expect(connector.getAll).toHaveBeenCalledOnceWith();
  });
});
