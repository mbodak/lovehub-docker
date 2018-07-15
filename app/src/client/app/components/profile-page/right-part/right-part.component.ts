import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-right-part',
  templateUrl: './right-part.component.html',
  styleUrls: ['./right-part.component.scss']
})
export class RightPartComponent implements OnInit {

  userId: number;
  userName: string;
  age: number;

  constructor() { }

  ngOnInit() {
    this.userId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
    this.userName = jwt_decode(localStorage.getItem('jwt_token')).firstName;
    this.age = parseInt(jwt_decode(localStorage.getItem('jwt_token')).age, 10);
  }

}
