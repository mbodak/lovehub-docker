import { Component, OnInit } from '@angular/core';
import {MatchingService} from '../../services/matching.service';
import {User} from '../../models/user';
import {Observable} from 'rxjs/Observable';
import {UsersProfileService} from '../../services/users-profile.service';
import {UserProfileDto} from "../../../../server/modules/api/users-profile/dto/user-profile.dto";

interface RadioParams {
  label: string;
  value: string;
}
@Component({
  templateUrl: './user-match.component.html',
  styleUrls: ['./user-match.component.scss']
})
export class UserMatchComponent implements OnInit {
  title  = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
  radioParams: RadioParams[] = [
    {label: 'For  Date', value: 'DATE'},
    {label: 'For  Friend', value: 'FRIENDS'},
    {label: 'For  Party', value: 'PARTY'}
  ];
  users$: any[];
  // users$: Observable<User[]>;

  constructor(private matchingService: MatchingService,
              private usersProfileService: UsersProfileService) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => console.log(position));
    }
  }

  filter(value) {
    // this.users$ = this.matchingService.searchUsers(value);
    console.log('test');
    this.matchingService.matchUsers(value).subscribe(users => {
      this.users$ = users.rows;
      console.log(users.rows);
    });
  }
}
