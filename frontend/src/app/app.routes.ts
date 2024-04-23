import { Routes } from '@angular/router';
import { AllUsersComponent } from './components/users/all-users/all-users.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'all',
    component: AllUsersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
];
