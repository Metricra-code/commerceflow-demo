import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { defer, delay, map, Observable, of, shareReplay, switchMap, throwError } from 'rxjs';

import { MOCK_OCC_BASE_PATH } from '../../../core/api/occ.config';
import { OccProductListResponse, Product } from '../../../core/models/product.model';
import { ProductAdapter } from './product.adapter';

@Injectable()
export class MockOccProductAdapter extends ProductAdapter {
  private readonly http = inject(HttpClient);

  private readonly products$ = defer(() =>
    this.http.get<OccProductListResponse>(`${MOCK_OCC_BASE_PATH}/products.json`)
  ).pipe(
    delay(320),
    map(response => response.products),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  load(code: string): Observable<Product> {
    return this.products$.pipe(
      map(products => products.find(product => product.code === code)),
      switchMap(product =>
        product
          ? of({ ...product })
          : throwError(() => new Error(`Product ${code} was not found`))
      )
    );
  }

  loadAll(): Observable<Product[]> {
    return this.products$.pipe(map(products => products.map(product => ({ ...product }))));
  }

  search(query: string): Observable<Product[]> {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return this.loadAll().pipe(
      map(products => products.filter(product => this.matches(product, normalizedQuery)))
    );
  }

  private matches(product: Product, query: string): boolean {
    if (!query) {
      return true;
    }

    return [product.name, product.category, product.code].some(value =>
      value.toLocaleLowerCase().includes(query)
    );
  }
}
