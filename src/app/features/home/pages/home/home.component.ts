import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, map, of, shareReplay } from 'rxjs';

import { CmsFacade } from '../../../../core/cms/cms.facade';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ProductCardComponent } from '../../../products/components/product-card/product-card.component';
import { ProductFacade } from '../../../products/facade/product.facade';
import { CmsComponentRendererComponent } from '../../components/cms-component-renderer/cms-component-renderer.component';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    CmsComponentRendererComponent,
    IconComponent,
    ProductCardComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly cmsFacade = inject(CmsFacade);
  private readonly productFacade = inject(ProductFacade);

  readonly cmsError = signal(false);
  readonly featuredError = signal(false);

  readonly page$ = this.cmsFacade.getPage('homepage').pipe(
    catchError(() => {
      this.cmsError.set(true);
      return of(null);
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly featuredProducts$ = this.productFacade.getProducts().pipe(
    map(products => products.slice(0, 3)),
    catchError(() => {
      this.featuredError.set(true);
      return of([]);
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

}
