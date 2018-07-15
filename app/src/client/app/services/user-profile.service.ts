import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import fakeUsers from './fakeUsers';
// import { setTimeout } from 'timers';

@Injectable()
export class UserProfileService {

  constructor(private http: HttpClient) {}

  getUser (userId: number): Subject<any> {
    const mockUserSubject = new Subject();
    setTimeout(() => mockUserSubject.next(
      ...fakeUsers.filter(user => user.id === userId)
    ), 1000);

    return mockUserSubject;
  }

  updateUser (user) {
    setTimeout(() => {
      fakeUsers.map((oldUser) => {
        if (oldUser.id === user.id) {
          const { id, name, sex, age, location, interests, additInfo } = user;
          console.log('user-profile servise updateUser');
          console.log(id, name, sex, age, location, interests, additInfo);
        }
        return user;
      });
    }, 1000);
  }
}
