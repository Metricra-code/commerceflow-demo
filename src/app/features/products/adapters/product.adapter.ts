import { Observable } from 'rxjs';

import { Product } from '../../../core/models/product.model';

// The abstract adapter keeps OCC-specific transport concerns out of the feature layers.
export abstract class ProductAdapter {
  abstract load(code: string): Observable<Product>;
  abstract loadAll(): Observable<Product[]>;
  abstract search(query: string): Observable<Product[]>;
}
