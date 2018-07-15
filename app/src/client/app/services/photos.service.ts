import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../models/photo';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PhotosService {

  constructor(private http: HttpClient) {}

  uploadAvatar(file, userId): Observable<any> {
    const url = `api/avatars/users/${userId}`;
    console.log('send');
    return this.http.post<any>(url, {data: file}, httpOptions);
  }

  uploadPhoto(file, userId): Observable<any> {
    const url = `api/photos/users/${userId}`;
    console.log('send');
    return this.http.post<any>(url, {data: file}, httpOptions);
  }

  getPhotos(userId: number): Observable<Photo[]> {
    const url = `api/photos/users/${userId}`;
    return this.http.get<Photo[]>(url);
  }

  getAvatar(userId: number): Observable<Photo> {
    const url = `api/photos/users/${userId}/avatar`;
    return this.http.get<Photo>(url);
  }

  deletePhoto(photoId: string): Observable<any> {
    const url = `api/photos/${photoId}`;
    console.log(photoId);
    return this.http.delete<Photo>(url);
  }
}
