import {UserProfile} from './user-profile.entity';

export const usersProfileProviders = [
  {
    provide: 'UsersProfileRepository',
    useValue: UserProfile,
  },
];
