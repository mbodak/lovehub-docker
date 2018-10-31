import { UserProfile } from './user-profile.entity';
import { Likes } from './likes.entity';

export const usersProfileProviders = [
  {
    provide: 'UsersProfileRepository',
    useValue: UserProfile,
  },
];

export const likesProvider = [
  {
    provide: 'LikesRepository',
    useValue: Likes,
  },
];
