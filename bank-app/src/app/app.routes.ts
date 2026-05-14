import { Routes } from '@angular/router';
import { MY_ROUTES } from './constants/my-routes.const';

export const routes: Routes = [
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  {
    path: MY_ROUTES.clients.path,
    loadComponent: () =>
      import('./pages/client-list/client-list.component')
      .then(m => m.ClientListComponent)
  },
  {
    path: MY_ROUTES.accounts.path,
    loadComponent: () =>
      import('./pages/account-list/account-list.component')
      .then(m => m.AccountListComponent)
  },
  {
    path: MY_ROUTES.transactions.path,
    loadComponent: () =>
      import('./pages/transaction-list/transaction-list.component')
      .then(m => m.TransactionListComponent)
  },
  {
    path: MY_ROUTES.reports.path,
    loadComponent: () =>
      import('./pages/report-view/report-view.component')
      .then(m => m.ReportViewComponent)
  },
  { path: '**', redirectTo: 'clients' }
];