import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-left-part',
  templateUrl: './left-part.component.html',
  styleUrls: ['./left-part.component.scss']
})
export class LeftPartComponent implements OnInit {

  profileMenu: object[];

  constructor(
    private navService: NavigationService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.getProfileMenu();
  }

  getProfileMenu(): void {
    this.profileMenu = this.navService.getProfileMenuItems();
  }
}
