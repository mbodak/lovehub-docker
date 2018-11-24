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

  addLike(like: Like): Observable<Like> {
    const url = `api/users-profile/likes`;
    return this.http.post<Like>(url, like, httpOptions);
  }

  getLikes(): Observable<Like[]> {
    const url = `api/users-profile/likes`;
    return this.http.get<Like[]>(url);
  }

  getWhoLikesUser(userId: number): Observable<number[]> {
    const url = `api/users-profile/${userId}/likes/who`;
    return this.http.get<number[]>(url);
  }

  getWhatLikeUser(userId: number): Observable<number[]> {
    const url = `api/users-profile/${userId}/likes/what`;
    return this.http.get<number[]>(url);
  }

  dislikeUser(userId: number, userIdUrl: number): Observable<any> {
    const url = `api/users-profile/${userId}/likes/${userIdUrl}`;
    return this.http.delete(url);
  }

}
