import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { startWith, tap } from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

import { RequestCache } from '../services/request-cashe.service';

function sendRequest(req: HttpRequest<any>, next: HttpHandler, cache: RequestCache): Observable<HttpEvent<any>> {

  const clonedRequest = req.clone();

  return next.handle(clonedRequest).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cache.put(req, event);
      }
    })
  );
}

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cache: RequestCache) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!(req.method === 'GET')) {
      return next.handle(req);
    }

    if (req.url === 'api/chats/:id' || req.url === 'api/messages/:id' || req.url === 'api/photos') {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req);

    return cachedResponse ? of(cachedResponse) : sendRequest(req, next, this.cache);
  }
}
