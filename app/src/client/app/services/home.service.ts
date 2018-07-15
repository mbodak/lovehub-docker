import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeService{
    constructor(private http: HttpClient) { }

    getFeedbacks() {
        return this.http.get('/api/home/feedbacks');
    }

    getReasons() {
        return this.http.get('/api/home/reasons');
    }

    getSlider() {
        return this.http.get('/api/home/slider');
    }

    getAllInfo(){
        return Observable.forkJoin(
            this.http.get('/api/home/slider'),
            this.http.get('/api/home/reasons'),
            this.http.get('/api/home/feedbacks'),
        );
    }
}
