import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import {AuthService} from './auth.service';
import {ModalForbiddenService} from './modal-forbidden.service';
import {ModalAuthService} from './modal-auth.service';

@Injectable()
export class AuthErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) {}

  public handleError(error: any): Observable<any> {
    const router = this.injector.get(Router),
      authService = this.injector.get(AuthService),
      modalService = this.injector.get(ModalAuthService),
      loginUrl = authService.getLoginUrl();

    if(error.status === 401) {
      router.navigateByUrl(loginUrl);
      modalService.sendState(true);
      return Observable.empty();
    }

    throw error;
  }
}
