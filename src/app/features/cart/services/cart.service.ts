import { Injectable } from '@angular/core';
import { BehaviorSubject, map, shareReplay } from 'rxjs';

import { CartEntry } from '../../../core/models/cart-entry.model';
import { Product } from '../../../core/models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly entriesSubject = new BehaviorSubject<CartEntry[]>([]);

  readonly cart$ = this.entriesSubject.asObservable();
  readonly cartCount$ = this.cart$.pipe(
    map(entries => entries.reduce((sum, entry) => sum + entry.quantity, 0)),
    shareReplay({ bufferSize: 1, refCount: true })
  );
  readonly cartTotal$ = this.cart$.pipe(
    map(entries =>
      entries.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0)
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  add(product: Product, quantity = 1): void {
    const safeQuantity = Math.max(1, Math.floor(quantity));
    const entries = this.entriesSubject.value;
    const existingEntry = entries.find(entry => entry.product.code === product.code);

    const nextEntries = existingEntry
      ? entries.map(entry =>
          entry.product.code === product.code
            ? { ...entry, quantity: entry.quantity + safeQuantity }
            : entry
        )
      : [...entries, { product: { ...product }, quantity: safeQuantity }];

    this.entriesSubject.next(nextEntries);
  }

  remove(productCode: string): void {
    this.entriesSubject.next(
      this.entriesSubject.value.filter(entry => entry.product.code !== productCode)
    );
  }

  updateQuantity(productCode: string, quantity: number): void {
    if (quantity < 1) {
      this.remove(productCode);
      return;
    }

    const nextEntries = this.entriesSubject.value.map(entry =>
      entry.product.code === productCode
        ? { ...entry, quantity: Math.floor(quantity) }
        : entry
    );

    this.entriesSubject.next(nextEntries);
  }

  clear(): void {
    this.entriesSubject.next([]);
  }
}
