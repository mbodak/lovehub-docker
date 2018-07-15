import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HomeService }   from '../../services/home.service';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public feedbacks;
  public reasons;
  public slider;

  public videoHeight;

  constructor(
    private httpClient: HttpClient,
    private _homeService: HomeService,
    private windowService: WindowService,
  ) {}

  ngOnInit() {
    const { videoHeight } = this.windowService;
    this.videoHeight = videoHeight;

    this.getAllInfo();
  }

  getAllInfo(){
    this._homeService.getAllInfo().subscribe(
      data => {
        this.slider = data[0];
        this.reasons = data[1];
        this.feedbacks = data[2];
      },
      err => {
        console.log(err)
      },
      () => console.log('done loading all info')
    );
  }
}
