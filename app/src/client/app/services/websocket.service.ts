import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class WebsocketService {
  private socket;

  constructor() { }

  createSocket() {
    this.socket = io(`${environment.CHAR_URL}/chat`);
  }

  connect(event: string): Rx.Observable<any> {
    if (!this.socket){
      this.createSocket();
    }

    const observable = new Observable(observer => {
        this.socket.on(event, (data) => {
          observer.next(data);
        });

        return () => {
          this.socket.disconnect();
        };
    });

    return observable;
  }

  send(event: string, data: any) {
    this.socket.emit(event, JSON.stringify(data));
  }
}
