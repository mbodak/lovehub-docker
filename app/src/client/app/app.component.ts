import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ModalForbiddenService } from './services/modal-forbidden.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  pongMessage$: Observable<any>;
  isOpen: boolean;
  subscription: Subscription;

  constructor(private modalForbiddenService: ModalForbiddenService) {}

  ngOnInit() {
    this.subscription = this.modalForbiddenService.getState()
      .subscribe(state => this.isOpen = state);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
