import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NavigationService } from '../../../services/navigation.service';
import * as jwt_decode from 'jwt-decode';
import { PhotosService } from '../../../services/photos.service';
import { InterestsService } from '../../../services/interests.service';
import { NotificationsService } from '../../../services/notifications.service';
import { UsersProfileService } from '../../../services/users-profile.service';

interface Results {
  interests: string[];
  hints: string[];
}

interface UserRating {
  rating: number;
  unfilledProfileEntries: string[];
  barWidth: string;
}

@Component({
  selector: 'app-left-part',
  templateUrl: './left-part.component.html',
  styleUrls: ['./left-part.component.scss']
})
export class LeftPartComponent implements OnInit {

  profileMenu: object[];
  userId: number;
  userIdUrl: number;
  isTrue = false;

  public profileOwnerId: number;
  public isUserOnline: boolean;
  public userHasAvatar: boolean;
  public userHasInterests: boolean;
  public lowRatingAlerted = false;
  public interests: string[] = [];
  public userProfile = {} as any;
  public userRating = <UserRating>{};

  constructor(
    private navService: NavigationService,
    private photosService: PhotosService,
    private interestsService: InterestsService,
    private usersProfileService: UsersProfileService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.route.params.subscribe(params => {
      this.profileOwnerId = parseInt(params.id, 10);
      this.checkIfUserIsOnline();

      this.interestsService.getData().subscribe((results: Results) => {
        this.interests = results.interests;
      });

      this.interestsService.getInterests(this.profileOwnerId);

      this.usersProfileService.findByUserId(this.profileOwnerId)
        .subscribe(result => {
          this.userProfile = result;
          this.lowRatingAlerted = false;

          this.photosService.getAvatar(this.profileOwnerId)
            .subscribe(avatar => {
              (avatar && avatar.base64) ? this.userHasAvatar = true : this.userHasAvatar = false;

              this.getUserRating();
              this.lowRatingAlerted = true;
            });
        });
    });
  }

  ngOnInit() {
    this.getProfileMenu();
    this.route.params.subscribe(params => {
      this.userId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
      this.userIdUrl = parseInt(params['id'], 10);
      this.isTrue = this.userId === this.userIdUrl;
    });

    this.notificationsService.isUserOnline.subscribe(data => {
      this.isUserOnline = data;
    });

    this.route.url.subscribe(() => {
      this.interestsService.getData().subscribe((results: Results) => {
        this.interests = results.interests;
      });

      this.interestsService.getInterests(this.profileOwnerId);

      this.usersProfileService.findByUserId(this.profileOwnerId)
        .subscribe(result => {
          this.userProfile = result;
          this.lowRatingAlerted = false;

          this.photosService.getAvatar(this.profileOwnerId)
            .subscribe(avatar => {
              (avatar && avatar.base64) ? this.userHasAvatar = true : this.userHasAvatar = false;

              this.getUserRating();
              this.lowRatingAlerted = true;
            });
        });
    });

    this.checkIfUserIsOnline();
  }

  getProfileMenu(): void {
    this.profileMenu = this.navService.getProfileMenuItems();
  }

  checkIfUserIsOnline(): void {
    this.notificationsService.checkIfUserIsOnline(this.profileOwnerId);
  }

  getUserRating() {
    const totalUserFieldsToFill = 9;
    const unfilledFields = [] as any;
    const notAffectingUserFields = [
      'userId', 'firstName', 'role', 'registrationDate', 'lastActiveDate', 'photo', 'isActive', 'isBaned', 'lastActiveDate'
    ];

    let rating: number;
    let filledFieldsNumber = 0;

    if (this.interests && this.interests.length > 0) {
      this.userHasInterests = true;
    }

    for (const p in this.userProfile) {
      if (this.userProfile.hasOwnProperty(p)) {
        if (notAffectingUserFields.every(field => p !== field)) {
          (this.userProfile[p]) ? (filledFieldsNumber += 1) : unfilledFields.push(p);
        }
      }
    }

    (this.userHasInterests) ? (filledFieldsNumber += 1) : unfilledFields.push('Interests');
    (this.userHasAvatar) ? (filledFieldsNumber += 1) : unfilledFields.push('Avatar');

    rating = Math.round(filledFieldsNumber / totalUserFieldsToFill * 100);

    if (rating && unfilledFields) {
      this.userRating.rating = rating;
      this.userRating.unfilledProfileEntries = unfilledFields;
      this.userRating.barWidth = `${rating}%`;
    }

    if (this.profileOwnerId === this.userId &&
        this.userRating.rating &&
        this.userRating.rating < 90 &&
        !this.lowRatingAlerted) {
      Notification.requestPermission().then(function(result) {
        if (result === 'granted') {
          const notificationOptions = {
            body: `Fill out additional fields: ${unfilledFields.join(', ')}`
          };
          const lowRatingNotification = new Notification('You rating is low!', notificationOptions);

          setTimeout(lowRatingNotification.close.bind(lowRatingNotification), 5000);
        }
      });
    }
  }

}
