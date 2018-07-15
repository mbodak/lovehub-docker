import { Component, OnInit } from '@angular/core';

import { AdministratorService } from '../../../services/administrator.service';

@Component({
  selector: 'app-administrator-header',
  templateUrl: './administrator-header.component.html',
  styleUrls: [
    '../shared/normalize.scss',
    '../shared/default-styles.scss',
    './administrator-header.component.scss'
  ]
})
export class AdministratorHeaderComponent implements OnInit {
  mainSectionIsVisible: boolean;

  currentUser = {
    firstName: '',
    lastName: '',
    role: ''
  };

  constructor(private administratorService: AdministratorService) {
  }

  ngOnInit() {
    this.administratorService.navBarState.subscribe(data => {
      return this.mainSectionIsVisible = data;
    });

    this.administratorService.receivedCurrentUser.subscribe(data => {
      return this.currentUser = data;
    });
  }

  hideNavBar(): void {
    this.administratorService.changeNavBarState();
  }
}
