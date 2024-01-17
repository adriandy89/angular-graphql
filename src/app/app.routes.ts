import { Routes } from '@angular/router';
import { authGuard, loggedGuard } from './core/Auth/guards';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    loadComponent: () =>
      import('./routes/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
  },
  {
    path: 'dashboard',
    canActivate: [loggedGuard],
    canActivateChild: [loggedGuard],
    loadChildren: () =>
      import('./routes/dashboard/routes').then((mod) => mod.DASHBOARD_ROUTES),
  },
  { path: '**', redirectTo: 'dashboard' },
];
