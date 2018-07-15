import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthProfileGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url,
      loginUrl = this.authService.getLoginUrl();

    if (this.authService.isLoggedInUser() && !this.authService.isTokenExpired()) {
      return true;
    } else {
      this.authService.setRedirectUrl(url);
      this.router.navigate([loginUrl]);
      return false;
    }
  }
}
