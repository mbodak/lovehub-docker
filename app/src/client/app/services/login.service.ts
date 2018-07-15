import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User} from '../models/user';
import { UserProfile } from '../models/user-profile';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import { UserCredentialsError } from '../../../shared/UserCredentialsError';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {}

  logUser(email: string, password: number): Observable<UserProfile> {
    return this.http.post<UserProfile>('http://localhost:4200/api/login', {email, password})
      .pipe(
        tap(user => console.log(user)),
        map(user => {
          if (Object.keys(user).length === 0) {
            throw new UserCredentialsError('Wrong email or password');
          }
          user = user['userProfile'];
          return user;
        }),
        catchError(this.handleError)
      );

  }

  handleError(error: HttpErrorResponse) {

    console.log(error);

    if (error instanceof UserCredentialsError) {
      console.log(error);
      console.log('im here');
      return new ErrorObservable(error.message);
    } else  if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return new ErrorObservable('Something went wrong, try again later.');
  }
}
