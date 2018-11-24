import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as jwt_decode from 'jwt-decode';

import { AdministratorService } from '../../../services/administrator.service';
import { AuthService } from '../../../services/auth.service';
import { PhotosService } from '../../../services/photos.service';
import { LoggedInUser } from '../../login/logged-in-user';

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
  public mainSectionIsVisible: boolean;
  public searchInput: string;
  public isLoggedIn: boolean;
  public loggedInUser: LoggedInUser;
  public currentUser = {} as any;
  public currentUserId: number;
  public currentUserAvatar: any;

  constructor(private administratorService: AdministratorService,
              private authService: AuthService,
              private photosService: PhotosService,
              private router: Router) {
    this.isLoggedInUser().subscribe(result => {
      this.isLoggedIn = result;

      if (this.isLoggedIn) {
        this.getLoggedInUser();
      }
    });
  }

  ngOnInit() {
    this.administratorService.navBarState.subscribe(data => {
      return this.mainSectionIsVisible = data;
    });

    this.currentUserId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);

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

  hideNavBar(): void {
    this.administratorService.changeNavBarState();
  }

  searchUsers(): void {
    if (this.searchInput) {
      this.administratorService.searchUsers(this.searchInput.trim().toLowerCase());
      this.router.navigate(['admin/search']);
    }
  }

  getLoggedInUser(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  isLoggedInUser(): Observable<boolean> {
    return this.authService.isLoggedInUser$();
  }

  logOut(): void {
    this.authService.logout();
  }

}
