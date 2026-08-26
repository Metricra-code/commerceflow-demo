import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, EMPTY, filter, finalize, map, shareReplay, switchMap, tap } from 'rxjs';

import { Product, STOCK_STATUS_LABEL } from '../../../../core/models/product.model';
import { CartService } from '../../../cart/services/cart.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ProductFacade } from '../../facade/product.facade';

@Component({
  selector: 'app-product-detail',
  imports: [AsyncPipe, CurrencyPipe, IconComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productFacade = inject(ProductFacade);
  private readonly cartService = inject(CartService);

  readonly quantityControl = new FormControl(1, { nonNullable: true });
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly added = signal(false);
  readonly stockLabels = STOCK_STATUS_LABEL;

  readonly product$ = this.route.paramMap.pipe(
    map(params => params.get('code')),
    filter((code): code is string => Boolean(code)),
    tap(() => {
      this.loading.set(true);
      this.error.set(false);
    }),
    switchMap(code =>
      this.productFacade.getProduct(code).pipe(finalize(() => this.loading.set(false)))
    ),
    catchError(() => {
      this.error.set(true);
      return EMPTY;
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  adjustQuantity(delta: number): void {
    this.quantityControl.setValue(Math.max(1, this.quantityControl.value + delta));
  }

  normalizeQuantity(): void {
    this.quantityControl.setValue(Math.max(1, Math.floor(this.quantityControl.value || 1)));
  }

  addToCart(product: Product): void {
    this.normalizeQuantity();
    this.cartService.add(product, this.quantityControl.value);
    this.added.set(true);
  }
}
