import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import { UserCredentialsError} from '../../../shared/UserCredentialsError';

@Injectable()
export class RecoverPassService {

  constructor(private http: HttpClient) {}

  recoverUserPassword(email: string): Observable<any> {
    return this.http.post('http://localhost:4200/api/forgot', {email});
  }

  resetUserPassword(password: string, token: string): Observable<any> {
    return this.http.post(`http://localhost:4200/api/forgot/${token}`, {password});
  }

  isTokenValid(token: string): Observable<any> {
    return this.http.get(`http://localhost:4200/api/forgot/${token}`);
  }
}
