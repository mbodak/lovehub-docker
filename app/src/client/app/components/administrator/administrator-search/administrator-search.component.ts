import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AdministratorService } from '../../../services/administrator.service';
import { PhotosService } from '../../../services/photos.service';

@Component({
  selector: 'app-administrator-search',
  templateUrl: './administrator-search.component.html',
  styleUrls: [
    '../shared/normalize.scss',
    '../shared/default-styles.scss',
    '../shared/default-layout-styles.scss',
    './administrator-search.component.scss']
})
export class AdministratorSearchComponent implements OnInit {
  public mainSectionIsVisible: boolean;
  public searchResults = {} as any;
  public isSearchUnsuccessful: boolean;

  constructor(private administratorService: AdministratorService,
              private photosService: PhotosService,
              private router: Router) {
  }

  ngOnInit() {
    this.administratorService.navBarState.subscribe(data => {
      return this.mainSectionIsVisible = data;
    });

    this.administratorService.receivedSearchResults.subscribe(data => {
      (data.users && data.users.length > 0) ? (this.isSearchUnsuccessful = false) : (this.isSearchUnsuccessful = true);
      this.searchResults = data;

      if (this.searchResults.users) {
        this.getUsersAvatars(this.searchResults.users);
      }
    });
  }

  getUsersAvatars(users) {
    users.forEach(user => {
      this.photosService.getAvatar(user.id)
        .subscribe(avatar => {
          if (avatar) {
            const img = new Image();

            img.src = avatar.base64;

            return user['avatarUrl'] = 'url(\'' + img.src + '\')';
          }
        });
    });
  }

  sendEmail(user): void {
    this.router.navigate(['admin/email'])
        .then(() => {
          this.administratorService.receivedSelectedUserData.next(user);
        });
  }

}
