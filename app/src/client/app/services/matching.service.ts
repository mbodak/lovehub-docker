import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../models/user';

import { HttpClient } from '@angular/common/http';
import {UserProfileDto} from "../../../server/modules/api/users-profile/dto/user-profile.dto";

@Injectable()
export class MatchingService {

  constructor(private http: HttpClient) {
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<User[]>(`api/users?name=${term}`)
      .pipe(
      tap(_ => console.log(`found users matching "${term}"`)),
      catchError(this.handleError<User[]>('matchUser', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  matchUsers(term: string): Observable<any> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<any>(`api/matching?preference=${term}`)
      .pipe(
      tap(_ => console.log(`found users matching "${term}"`)),
      catchError(this.handleError<any>('matchUser', []))
    );
  }
}
