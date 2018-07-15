import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../models/photo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LikesService {

  constructor(private http: HttpClient) { }

  getLikedUsers(userId: number): Observable<Photo[]> {
    const url = `api/likes/users/${userId}`;
    return this.http.get<Photo[]>(url);
  }
  //
  // unlikePhoto(photoId: string): Observable<any> {
  //   const url = `api/likes/${photoId}`;
  //   console.log(photoId);
  //   return this.http.delete<Photo>(url);
  // }

}
