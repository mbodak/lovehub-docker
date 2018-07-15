import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Like } from '../models/like';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LikesService {

  constructor(private http: HttpClient) { }

  // addLike(userId: number): Observable<Like> {
  //   const url = `api/users-profile/likes`;
  //   return this.http.post<Like>(url);
  // }

  getLikesByUserId(userId: number): Observable<Like[]> {
    const url = `api/users-profile/${userId}/likes/`;
    return this.http.get<Like[]>(url);
  }

  unlikeUser(userId: number): Observable<any> {
    const url = `api/users-profile/likes/${userId}`;
    return this.http.delete(url);
  }

}
