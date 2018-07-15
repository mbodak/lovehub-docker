import { UserProfile } from '../models/user-profile';

export interface IUserStorage {
  getUser(): UserProfile;
  setUser(user: UserProfile);
  deleteUser(user: UserProfile);
}
