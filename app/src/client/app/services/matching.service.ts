import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, tap} from 'rxjs/operators';

import {User} from '../models/user';

import {HttpClient} from '@angular/common/http';
import {UsersProfileService} from './users-profile.service';
import {AuthService} from './auth.service';
import {UserProfile} from '../models/user-profile';
import {PhotosService} from './photos.service';

export interface UsersAvatar {
  userProfile: UserProfile;
  avatar: string;
}

@Injectable()
export class MatchingService {
  dbRef: any;
  geoFire: any;

  constructor(private http: HttpClient,
              private usersProfileService: UsersProfileService,
              private auth: AuthService,
              private photoService: PhotosService) {}
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

    findAll(): Observable<UsersAvatar[]> {
    const someArray: UsersAvatar[] = [];
          return this.usersProfileService.findAll()
        .flatMap(fup => Observable.from(fup.rows))
        .mergeMap(userProfile => this.photoService.getAvatar(userProfile.userId),
          (user, photo) => {
            return {userProfile: user as UserProfile, avatar: photo.base64};
          }).reduce<UsersAvatar>((acc, value, index) => {
            someArray.push(value);
            return someArray;
        }, []);
  }

  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
}
