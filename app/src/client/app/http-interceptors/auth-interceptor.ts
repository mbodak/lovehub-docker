import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import {AuthErrorHandlerService} from '../services/auth-error-handler.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authErrorHandlerService: AuthErrorHandlerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = localStorage.getItem('jwt_token');

    if(token) {
      const clonedRequest = req.clone({ setHeaders: { authorization: `Bearer ${token}` }});
      return next.handle(clonedRequest);
    } else {
      return next.handle(req);
    }
  }
}
