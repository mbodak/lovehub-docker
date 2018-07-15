import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import {AuthService} from './auth.service';

@Injectable()
export class AuthErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) {}

  public handleError(error: any): Observable<any> {
    console.log('AuthErrorHandler', error.status);
    const router = this.injector.get(Router),
      authService = this.injector.get(AuthService),
      loginUrl = authService.getLoginUrl();


    if(error.status === 401) {
      router.navigateByUrl(loginUrl);
      return Observable.empty();
    }

    throw error;
  }
}
