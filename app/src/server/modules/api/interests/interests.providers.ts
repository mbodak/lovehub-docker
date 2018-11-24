import { UserProfile } from '../users-profile/user-profile.entity';
import { UserProfileInterest } from '../users-profile/user-profile-interest.entity';
import { Interest } from '../users-profile/interest.entity';

export const InterestsProviders = [
  {
    provide: 'UsersProfileRepository',
    useValue: UserProfile
  },
  {
    provide: 'UserProfileInterestRepository',
    useValue: UserProfileInterest
  },
  {
    provide: 'InterestRepository',
    useValue: Interest
  }
];
