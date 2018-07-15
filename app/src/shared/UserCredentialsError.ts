import {Observable} from 'rxjs/Observable';

export class UserCredentialsError extends Observable<any> {
  constructor(public message: string) {
    super();
  }
}
