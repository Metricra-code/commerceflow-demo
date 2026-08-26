import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product, STOCK_STATUS_LABEL } from '../../../../core/models/product.model';
import { CartService } from '../../../cart/services/cart.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, IconComponent, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly sequence = input(1);
  readonly stockLabels = STOCK_STATUS_LABEL;

  constructor(private readonly cartService: CartService) {}

  addToCart(): void {
    this.cartService.add(this.product());
  }
}
