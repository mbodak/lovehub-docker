import { Component, OnInit } from '@angular/core';

import { AdministratorService } from '../../../services/administrator.service';

@Component({
  selector: 'app-administrator-footer',
  templateUrl: './administrator-footer.component.html',
  styleUrls: [
    '../shared/normalize.scss',
    '../shared/default-styles.scss',
    './administrator-footer.component.scss'
  ]
})
export class AdministratorFooterComponent implements OnInit {

  mainSectionIsVisible: boolean;

  constructor(private administratorService: AdministratorService) {
  }

  ngOnInit() {
    this.administratorService.navBarState.subscribe(data => {
      return this.mainSectionIsVisible = data;
    });
  }

}
