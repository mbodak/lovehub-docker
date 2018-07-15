import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NavigationService } from '../../services/navigation.service';
import { WindowService } from '../../services/window.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoggedInUser } from '../login/logged-in-user';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menu: object[];
  logo = '/assets/img/logo3.png';
  public isLoggedIn: boolean;
  public loggedInUser: LoggedInUser;
  router: any;

  @ViewChild('header') elementView: ElementRef;

  constructor(
    private navService: NavigationService,
    private windowService: WindowService,
    private authService: AuthService,
    _router: Router
  ) {
    this.router = _router;
  }

  ngOnInit() {
    const headerHeight = this.elementView.nativeElement.offsetHeight;

    this.getMenu();
    this.setHeaderHeight(headerHeight);
    this.isLoggedInUser().subscribe(result => {
      this.isLoggedIn = result;
      if(this.isLoggedIn) {
        this.getLoggedInUser();
      }
    });
  }

  getMenu(): void {
    this.menu = this.navService.getMenuItems();
  }

  setHeaderHeight(height): void {
    this.windowService.headerHeight = height;
  }

  getLoggedInUser(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  isLoggedInUser(): Observable<boolean> {
    return this.authService.isLoggedInUser();
  }

  logoutUser(): void {
    this.authService.logout();
    this.router.navigate([ this.authService.getLoginUrl() ]);
  }
}
