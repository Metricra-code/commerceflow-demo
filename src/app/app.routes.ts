import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Home · CommerceFlow',
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then(module => module.HomeComponent)
  },
  {
    path: 'products',
    title: 'Products · CommerceFlow',
    loadComponent: () =>
      import('./features/products/pages/product-list/product-list.component').then(
        module => module.ProductListComponent
      )
  },
  {
    path: 'products/:code',
    title: 'Product · CommerceFlow',
    loadComponent: () =>
      import('./features/products/pages/product-detail/product-detail.component').then(
        module => module.ProductDetailComponent
      )
  },
  {
    path: 'cart',
    title: 'Cart · CommerceFlow',
    loadComponent: () =>
      import('./features/cart/pages/cart/cart.component').then(module => module.CartComponent)
  },
  { path: '**', redirectTo: '' }
];
