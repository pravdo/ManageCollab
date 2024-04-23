import { Routes } from '@angular/router';
import { AllUsersComponent } from './components/users/all-users/all-users.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'all',
    component: AllUsersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
