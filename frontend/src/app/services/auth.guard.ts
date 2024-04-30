import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateFn,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree => {
    const currentUser = this.authService.currentUserValue;
    console.log('CurrentUser:', currentUser);
    console.log('Required Roles:', route.data['roles']);

    if (currentUser) {
      if (
        route.data['roles'] &&
        !route.data['roles'].includes(currentUser.role)
      ) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
      return true;
    }

    // Redirect to login
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  };
}
