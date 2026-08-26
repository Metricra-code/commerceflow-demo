import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap
} from 'rxjs';

import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductFacade } from '../../facade/product.facade';

@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe, IconComponent, ProductCardComponent, ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  private readonly productFacade = inject(ProductFacade);

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly loading = signal(true);
  readonly error = signal(false);

  readonly products$ = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    map(query => query.trim()),
    distinctUntilChanged(),
    tap(() => {
      this.loading.set(true);
      this.error.set(false);
    }),
    // switchMap unsubscribes stale searches so late responses cannot overwrite newer results.
    switchMap(query =>
      this.productFacade.searchProducts(query).pipe(
        catchError(() => {
          this.error.set(true);
          return of([]);
        }),
        finalize(() => this.loading.set(false))
      )
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  clearSearch(): void {
    this.searchControl.setValue('');
  }
}
