import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },

  {
    path: 'books',
    loadComponent: () =>
      import('./components/book/book.component').then((m) => m.BookComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-book/add-edit-book.component').then(
        (m) => m.AddEditBookComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/add-edit-book/add-edit-book.component').then(
        (m) => m.AddEditBookComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./components/checkout-list/checkout-list.component').then(
        (m) => m.CheckoutListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'view/:id',
    loadComponent: () =>
      import('./components/view-book/view-book.component').then(
        (m) => m.ViewBookComponent
      ),
    canActivate: [AuthGuard],
  },
];
