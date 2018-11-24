import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

import { AdministratorService } from '../../../services/administrator.service';
import { PhotosService } from '../../../services/photos.service';

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
  public dropdownLists = {
    homeDropdownList: false,
    usersDropdownList: false,
    analyticsDropdownList: false
  };
  public currentUser = {} as any;
  public currentUserId: number;
  public currentUserAvatar: any;
  public mainSectionIsVisible: boolean;

  constructor(private administratorService: AdministratorService,
              private photosService: PhotosService) {
  }

  ngOnInit() {
    this.administratorService.navBarState.subscribe(data => {
      return this.mainSectionIsVisible = data;
    });

    this.currentUserId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);

    this.administratorService.getCurrentUserParameters(this.currentUserId);

    this.administratorService.receivedCurrentUser.subscribe(data => {
      return this.currentUser = data;
    });

    this.photosService.getAvatar(this.currentUserId)
      .subscribe(avatar => {
        const img = new Image();

        if (avatar && avatar.base64) {
          img.src = avatar.base64;
          this.currentUserAvatar = 'url(\'' + img.src + '\')';
        }
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
