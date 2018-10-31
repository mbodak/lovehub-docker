import { Component, Inject, Injector, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { UsersService } from '../../services/users.service';
import { UsersProfileService } from '../../services/users-profile.service';

import { UserProfile } from '../../models/user-profile';
import { User }  from '../../models/user';

import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'app-user-profile-settings',
  templateUrl: 'user-profile-settings.component.html',
  styleUrls: ['user-profile-settings.component.scss']
})
export class UserProfileSettingsComponent implements OnInit {

  private userId: number;
  public user: User;
  public userProfile: UserProfile = new UserProfile();
  public canUpdate = false;
  public isSuccess = false;

  constructor(private injector: Injector) { }

  ngOnInit() {
    const usersService = this.injector.get(UsersService),
      route = this.injector.get(ActivatedRoute);

    route.paramMap
      .switchMap((params: ParamMap) => {
        this.userId = +params.get('id');
        return usersService.findById(this.userId);
      }).subscribe(user => {
        this.user = <User>user;
        this.userProfile = <UserProfile>user.userProfile;
        console.log(this.userProfile.firstName);
    });
  }

  public updateUser() {
    const usersProfileService = this.injector.get(UsersProfileService);
    usersProfileService.update(this.userProfile)
      .subscribe(updatedUser => {
        const [affected] = updatedUser;
        if(affected) {
          this.isSuccess = !this.isSuccess;
          setTimeout(() => this.isSuccess = !this.isSuccess, 3000);
          this.canUpdate = false
        }
      });
  }

  public triggerButton(flag: boolean) {
    this.canUpdate = flag;
  }
}
