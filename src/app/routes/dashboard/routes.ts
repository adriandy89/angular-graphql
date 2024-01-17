import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';

export const DASHBOARD_ROUTES: Route[] = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
];
