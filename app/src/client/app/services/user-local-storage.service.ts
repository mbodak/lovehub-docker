import { Injectable } from '@angular/core';
import {IUserStorage} from './IUserStorage';
import { UserProfile } from '../models/user-profile';

@Injectable()
export class UserLocalStorageService implements IUserStorage {

  getUser(): UserProfile {
    const user = JSON.parse(localStorage.getItem('user'));

    return user;
  }

  setUser(user: UserProfile): void {
    const currUser = JSON.stringify(user);
    localStorage.setItem('user', currUser);
    console.log('User saved');
  }

  deleteUser(user: UserProfile) {
    localStorage.removeItem('user');
    console.log('user removed');
  }
}
