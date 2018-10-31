import { User } from '../users/user.entity';
import { UserProfile } from '../users-profile/user-profile.entity';

export const AdministratorProviders = [
  {
    provide: 'UsersRepository',
    useValue: User
  },
  {
    provide: 'UsersProfileRepository',
    useValue: UserProfile
  }
];
