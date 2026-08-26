import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { CmsAdapter } from './core/cms/cms.adapter';
import { MockCmsAdapter } from './core/cms/mock-cms.adapter';
import { MockOccProductAdapter } from './features/products/adapters/mock-occ-product.adapter';
import { ProductAdapter } from './features/products/adapters/product.adapter';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    { provide: ProductAdapter, useClass: MockOccProductAdapter },
    { provide: CmsAdapter, useClass: MockCmsAdapter }
  ]
};
