import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { UsersProfileService } from './users-profile.service';

import { ModalForbiddenService } from './modal-forbidden.service';
import {UserProfile} from '../models/user-profile';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService,
              private usersService: UsersService,
              private usersProfileService: UsersProfileService,
              private modalForbiddenService: ModalForbiddenService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url,
      loginUrl = this.authService.getLoginUrl();

    if (this.authService.isLoggedInUser()) {
      let { userId } = this.authService.getLoggedInUser(),
        userRole;
      return this.usersProfileService.findByUserId(userId)
        .map(userProfile => (<UserProfile>userProfile).role)
        .switchMap(userRole => this.usersService.verifyUserRole(userId, userRole))
        .switchMap(isAuth => {
          if (isAuth) {
            return Observable.of(true);
          } else {
            this.modalForbiddenService.sendState(true);
            return Observable.of(false);
          }
        });
    } else {
      this.authService.setRedirectUrl(url);
      this.router.navigate([loginUrl]);
      return false;
    }
  }
}
