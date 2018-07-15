import { UserProfile } from '../users-profile/user-profile.entity';

export const AdministratorProviders = [
  {
    provide: 'UsersProfileRepository',
    useValue: UserProfile
  },
];
