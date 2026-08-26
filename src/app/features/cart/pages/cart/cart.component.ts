import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartEntry } from '../../../../core/models/cart-entry.model';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe, CurrencyPipe, IconComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  private readonly cartService = inject(CartService);

  readonly cart$ = this.cartService.cart$;
  readonly cartCount$ = this.cartService.cartCount$;
  readonly cartTotal$ = this.cartService.cartTotal$;

  decrease(entry: CartEntry): void {
    this.cartService.updateQuantity(entry.product.code, entry.quantity - 1);
  }

  increase(entry: CartEntry): void {
    this.cartService.updateQuantity(entry.product.code, entry.quantity + 1);
  }

  remove(productCode: string): void {
    this.cartService.remove(productCode);
  }

  clear(): void {
    this.cartService.clear();
  }
}
