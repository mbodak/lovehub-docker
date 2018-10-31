import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-right-part',
  templateUrl: './right-part.component.html',
  styleUrls: ['./right-part.component.scss']
})
export class RightPartComponent implements OnInit {

  userId: number;
  userIdUrl: number;
  userName: string;
  age: number;
  isTrue = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.userName = jwt_decode(localStorage.getItem('jwt_token')).firstName;
    this.age = parseInt(jwt_decode(localStorage.getItem('jwt_token')).age, 10);
    this.route.params.subscribe(params => {
      this.userId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
      this.userIdUrl = parseInt(params['id'], 10);
      this.isTrue = this.userId === this.userIdUrl;
    });
  }

}
