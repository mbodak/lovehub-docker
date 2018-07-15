import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AuthErrorHandlerService } from '../services/auth-error-handler.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomHttpClient extends HttpClient {

  constructor(handler: HttpHandler, private authErrorHandlerService: AuthErrorHandlerService) {
    super(handler);
  }

  get<T>(url: string, ...params ): Observable<any> {
    const enhancedOptions = this.setAuthorizationHeader(params);

    return super.get<T>(url, {headers: enhancedOptions})
      .do(response => console.log('response ' + response))
      .catch(this.catchAuthError.bind(this));
  }

  private setAuthorizationHeader(params) {
    params.headers
    if(!params) {
      params = {};
    }

    if(!params.headers) {
      const token = localStorage.getItem('jwt_token');
      params.headers = new HttpHeaders({ 'authorization': `Bearer ${token}`});
    }

    return params;
  }

  private catchAuthError(error): Observable<any> {
    if (error instanceof HttpErrorResponse) {
      if (error['status'] === 401 || error['status'] === 403) {
        console.log('CustomHttpClient ', error);
        this.authErrorHandlerService.handleError(error);
      }
      return Observable.of(error);
    }
  }
}
