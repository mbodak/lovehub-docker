import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalForbiddenService {
  private subject = new Subject<boolean>();

  public sendState(state: boolean): void {
    this.subject.next(state);
  }

  public getState(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
