/**
 * Created by Crofty on 2/19/18.
 */
import {Component} from '@nestjs/common';
import {UsersProfileService} from '../api/users-profile/users-profile.service';
@Component()
export class MatchingServiceComponent {
  constructor(private profileService: UsersProfileService) {}
  matchUsers(preference: string) {
    return this.profileService.findByPreference(preference, 50);
  }
  private matching(example, list) {
  if (!list) {
    return [];
  }
  return Array.prototype.filter.call(list, function matches(obj) {
    if (!obj) {
      return;
    }
    for (const p in example) {
      if (obj[p] !== example[p]) {
        return;
      }
    }
    return true;
  });
};
}

