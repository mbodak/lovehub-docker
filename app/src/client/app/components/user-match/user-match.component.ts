import {Component, OnInit} from '@angular/core';
import {MatchingService, UsersAvatar} from '../../services/matching.service';
import {Observable} from 'rxjs/Observable';
import {Photo} from '../../models/photo';


interface RadioParams {
  label: string;
  value: string;
}
@Component({
  templateUrl: './user-match.component.html',
  styleUrls: ['./user-match.component.scss']
})
export class UserMatchComponent implements OnInit {
  public positions = [];
  title  = 'My first AGM project';
  lat: number ;
  lng: number ;

  radioParams: RadioParams[] = [
    {label: 'For  Date', value: 'DATE'},
    {label: 'For  Friend', value: 'FRIENDS'},
    {label: 'For  Party', value: 'PARTY'}
  ];
  photos: Photo[] = [ {userId: 0, _id: '', base64: '', avatar: false, name: ''} ];
  users$: Observable<UsersAvatar[]>;

  constructor(private matchingService: MatchingService,
  ) {
    this.findAll();
    this.positions = this.getRandomMarkers();
  }

  getRandomMarkers() {
    let randomLat: number, randomLng: number;

    const positions = [];
    for (let i = 0 ; i < 9; i++) {
      randomLat = Math.random() * (50.431084 - 50.431054) + 50.431054;
      randomLng = Math.random() * (30.550117699999998 - 30.5501178) + 30.5501178;
      positions.push([randomLat, randomLng]);
    }
    return positions;
  }

  showMarkersFromObservable() {
    Observable.of(this.getRandomMarkers()) // Think this as http call
      .subscribe( positions => {
        this.positions = positions;
      });
  }
  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => console.log(position));
    }
  }
  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }
  findAll() {
    // this.users$ = this.matchingService.searchUsers(value);
    this.users$ = this.matchingService.findAll();
  }
}
