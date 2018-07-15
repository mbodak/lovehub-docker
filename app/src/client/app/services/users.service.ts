import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../models/user';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService {

  usersUrl = 'api/users';

  constructor(private http: HttpClient) { }

  verifyUserRole(userId: number, userRole: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.usersUrl}/verify`, {userId, userRole});
  }

  registration(user: User): Observable<User> {
    console.log('On Client Service:', this.http.post<User>(`${this.usersUrl}`, user, httpOptions));
    return this.http.post<User>(`${this.usersUrl}`, user, httpOptions);
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/${id}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
