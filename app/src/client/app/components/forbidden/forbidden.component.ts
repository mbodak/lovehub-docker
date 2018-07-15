import {Component, HostListener, Input} from '@angular/core';
import { ModalForbiddenService } from '../../services/modal-forbidden.service';

@Component({
  moduleId: module.id,
  selector: 'app-forbidden',
  templateUrl: 'forbidden.component.html',
  styleUrls: ['forbidden.component.scss']
})
export class ForbiddenComponent {
  @Input() state: boolean;
  errorMessage = 'access forbidden!';
  userMessage = 'Your do not access to this resource';

  @HostListener('keyup')
  public onMouseEnter(event) {
    this.keyup(event);
  }

  constructor(private modalForbiddenService: ModalForbiddenService) {
  }

  public show(state: boolean): void {
    this.modalForbiddenService.sendState(state);
  }

  private keyup(event: KeyboardEvent): void {
    if (event.keyCode === 27) {
      this.show(false);
    }
  }
}
