import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {UsersProfileService} from '../../services/users-profile.service';
import {UserProfile} from '../../models/user-profile';
import {User} from '../../models/user';

@Component({
  selector: 'app-registration-full',
  templateUrl: './registration-full.component.html',
  styleUrls: ['./registration-full.component.scss']
})
export class RegistrationFullComponent implements OnInit {

  stage = 0;
  user: User;
  userProfile: UserProfile;
  enable = { step0: false, step1: false, step2: false, step3: false };

  public constructor(private usersProfileService: UsersProfileService, private usersService: UsersService) {}

  ngOnInit() {
    this.userProfile = new UserProfile();
    this.user = new User();
  }

  receiveSex($event) {
    this.userProfile.sex = $event;
    this.enable.step0 = true;
    this.stage++;
  }

  receivePreference($event) {
    this.userProfile.preference = $event;
    this.enable.step1 = true;
    this.stage++;
  }

  receiveOrientation($event) {
    this.userProfile.orientation = $event;
    this.enable.step2 = true;
    this.stage++;
  }

  receiveUserForm($event) {
    this.user.name = $event.firstName;
    this.user.email = $event.email;
    this.user.password = $event.password;
    this.enable.step3 = true;
    this.stage++;
    this.usersService.registration(this.user as User).subscribe(user => {
      this.userProfile.firstName = $event.firstName;
      this.userProfile.lastName = $event.lastName;
      this.userProfile.age = $event.age;
      this.userProfile.userId = user.id;
      this.usersProfileService.registration(this.userProfile as UserProfile).subscribe();
      console.log('Form Submitted!');
    });
    alert('Congratulation! You are registered!');
    // console.log(this.userProfile);
    // console.log(this.user);
    // this.router.navigate(['/login']);
  }

  isNext() {
    if (((this.enable.step0 === true && this.stage === 0) ||
        (this.enable.step1 === true && this.stage !== 2) ||
        (this.enable.step2 === true && this.stage !== 3)) &&
        this.stage !== 3) {
      this.stage++;
    }
  }

  isPrev() {
    if (this.stage !== 0) {
      this.stage--;
    }
  }
}
