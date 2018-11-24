import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserProfile } from '../models/user-profile';

import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { CustomHttpClient } from '../http-interceptors/custom-http-client';


export interface FilteredUsersProfile {
  rows?: UserProfile[];
  count?: number;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersProfileService {

  usersProfileUrl = 'api/users-profile/';

  constructor(private http: HttpClient) { }

  registration(user: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(this.usersProfileUrl, user, httpOptions);
  }

  findByUserId(userId: number): Observable<UserProfile | {}> {
    return this.http.get<UserProfile>(`${this.usersProfileUrl}/${userId}`).pipe(
      tap(_ => console.log(`found UsersProfile-profile by userId ${userId}`)),
      catchError(this.handleError<UserProfile>(`repository users-profile: findByUserId(${userId})` ))
    );
  }

  findShortInfo(userId: number): Observable<FilteredUsersProfile> {
    return this.http.get<FilteredUsersProfile>(`${this.usersProfileUrl}/${userId}`).pipe(
      tap(_ => console.log(`found UsersProfile-profile by userId ${userId}`)),
      catchError(this.handleError<FilteredUsersProfile>(`repository users-profile: findByUserId(${userId})` ))
    );
  }

  update(user: UserProfile): Observable<[number, UserProfile[]]> {
    console.log('UsersProfileService updateUser ', user.id, user.firstName);
    return this.http.put<[number, UserProfile[]]>(this.usersProfileUrl, user, httpOptions).pipe(
      tap(_ => console.log(`update users-profile with id: "${user.id}"`)),
      catchError(this.handleError<[number, UserProfile[]]>(`repository users-profile: update(${user.id})` ))
    );
  }

  searchUsers(type, term, offset, perPage): Observable<FilteredUsersProfile> {
    console.log(`angular: within searchUsers(${type}, ${term})`);
    if (type === 'firstName') {
      return this.findByName(term, offset, perPage);
    } else if (type === 'age') {
      return this.findByAge(term, offset, perPage);
    } else if (type === 'sex') {
      return this.findBySex(term, offset, perPage);
    } else if (type === 'radio') {
      return this.findByPreference(term, perPage);
    }
  }

  findByName(name, offset, limit): Observable<FilteredUsersProfile | {}> {
    console.log(`angular: within findByName(${name})`);
    if (!name.trim()) {
      return of([]);
    }

    return this.http.get<FilteredUsersProfile>(`${this.usersProfileUrl}?name=${name}&&offset=${offset}&&limit=${limit}`)
      .pipe(
        tap(_ => console.log(`found users-profile by "${name}"`)),
        catchError(this.handleError<FilteredUsersProfile>(`repository users-profile: findByName(${name})` ))
      );
  }
  findAll(): Observable <FilteredUsersProfile> {
    return this.http.get<FilteredUsersProfile>(`${this.usersProfileUrl}`)
      .pipe(
        tap(_ => console.log(`found users-profile`)),
        catchError(this.handleError<FilteredUsersProfile>(`repository users-profile` ))
      );
  }

  findByAge(age, offset, limit): Observable<FilteredUsersProfile | {}> {
    if (!parseInt(age.trim(), 10)) {
      return of([]);
    }

    return this.http.get<FilteredUsersProfile>(`${this.usersProfileUrl}?age=${age}&&offset=${offset}&&limit=${limit}`)
      .pipe(
        tap(_ => console.log(`found users-profile by "${age}"`)),
        catchError(this.handleError<FilteredUsersProfile>(`repository users-profile: findByAge(${age})` ))
    );
  }

  findBySex(sex, offset, limit): Observable<FilteredUsersProfile | {}> {
    if (!sex.trim()) {
      return of([]);
    }

    return this.http.get<FilteredUsersProfile>(`${this.usersProfileUrl}?sex=${sex}&&offset=${offset}&&limit=${limit}`)
      .pipe(
        tap(_ => console.log(`found users-profile by "${sex}"`)),
        catchError(this.handleError<FilteredUsersProfile>(`repository users-profile: findBySex(${sex})` ))
    );
  }

  findByPreference(preference, limit): Observable<FilteredUsersProfile | {}> {
    if (!preference.trim()) {
      return of([]);
    }

    return this.http.get<FilteredUsersProfile>(`${this.usersProfileUrl}?preference=${preference}&&limit=${limit}`).pipe(
      tap(_ => console.log(`found users-profile by "${preference}"`)),
      catchError(this.handleError<FilteredUsersProfile>(`repository users-profile: findByPreference(${preference})` ))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: status - ${error.status}, message - ${error.message}`);
      return of(result as T);
    };
  }
}
