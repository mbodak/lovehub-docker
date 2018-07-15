import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthErrorHandlerService } from '../services/auth-error-handler.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {catchError, tap} from 'rxjs/operators';
import {FilteredUsersProfile} from '../services/users-profile.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(public authErrorHandlerService: AuthErrorHandlerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).catch((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err['status'] === 401 || err['status'] === 403) {
          this.authErrorHandlerService.handleError(err);
        }
        return Observable.of(err);
      }
    });
  }

}
