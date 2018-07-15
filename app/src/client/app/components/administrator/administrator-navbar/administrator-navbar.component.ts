import { Component, OnInit } from '@angular/core';

import { AdministratorService } from '../../../services/administrator.service';

@Component({
  selector: 'app-administrator-navbar',
  templateUrl: './administrator-navbar.component.html',
  styleUrls: [
    '../shared/normalize.scss',
    '../shared/default-styles.scss',
    './administrator-navbar.component.scss'
  ]
})
export class AdministratorNavbarComponent implements OnInit {
  dropdownLists = {
    homeDropdownList: false,
    usersDropdownList: false,
    analyticsDropdownList: false
  };

  currentUser = {
    userId: 1,        // TODO: get userId on init from URL
    firstName: '',
    lastName: '',
    role: ''
  };

  mainSectionIsVisible: boolean;

  constructor(private administratorService: AdministratorService) {
  }

  ngOnInit() {
    this.administratorService.navBarState.subscribe(data => {
      return this.mainSectionIsVisible = data;
    });

    this.administratorService.getCurrentUserParameters(this.currentUser.userId);

    this.administratorService.receivedCurrentUser.subscribe(data => {
      return this.currentUser = data;
    });
  }

  adminNavbarHandler(list): void {
    for (const prop in this.dropdownLists) {
      if (this.dropdownLists.hasOwnProperty(prop)) {
        if (prop !== list && this.dropdownLists[prop] !== false) {
          this.dropdownLists[prop] = false;
        }
      }
    }

    this.dropdownLists[list] = !this.dropdownLists[list];
  }

}
